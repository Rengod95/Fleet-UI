import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createHighlighter } from 'shiki';

type ComponentItem = { name: string; slug: string };

function removeImportStatements(tsxSource: string, virtualFileName: string) {
  const sf = ts.createSourceFile(
    virtualFileName,
    tsxSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const importStmts = sf.statements.filter(
    (s) => ts.isImportDeclaration(s) || ts.isImportEqualsDeclaration(s),
  );

  if (importStmts.length === 0) return tsxSource.trim();

  const ranges = importStmts
    .map((s) => [s.getFullStart(), s.getEnd()] as const)
    .sort((a, b) => b[0] - a[0]); // remove from bottom to top

  let out = tsxSource;
  for (const [start, end] of ranges) {
    out = out.slice(0, start) + out.slice(end);
  }

  return out.replace(/^\s+/, '').replace(/\s+$/, '');
}

function extractDefaultExportReturnInner({
  tsxSource,
  virtualFileName,
}: {
  tsxSource: string;
  virtualFileName: string;
}) {
  const sf = ts.createSourceFile(
    virtualFileName,
    tsxSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  function isDefaultExported(node: ts.Node) {
    const mods = (node as { modifiers?: ts.NodeArray<ts.Modifier> }).modifiers;
    if (!mods) return false;
    return (
      mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
      mods.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)
    );
  }

  function findFunctionByName(name: string) {
    for (const st of sf.statements) {
      if (ts.isFunctionDeclaration(st) && st.name?.text === name) return st;
      if (ts.isVariableStatement(st)) {
        for (const decl of st.declarationList.declarations) {
          if (ts.isIdentifier(decl.name) && decl.name.text === name) {
            const init = decl.initializer;
            if (init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) return init;
          }
        }
      }
    }
    return null;
  }

  function getTopLevelReturnExpr(fn: ts.FunctionLikeDeclarationBase | ts.ArrowFunction | ts.FunctionExpression) {
    if (!('body' in fn) || !fn.body) return null;
    if (ts.isBlock(fn.body)) {
      for (const st of fn.body.statements) {
        if (ts.isReturnStatement(st) && st.expression) return st.expression;
      }
      return null;
    }
    // Expression-bodied arrow function: `() => (<View />)`
    return fn.body;
  }

  // 1) export default function Foo() {}
  for (const st of sf.statements) {
    if (ts.isFunctionDeclaration(st) && isDefaultExported(st) && st.body) {
      const expr = getTopLevelReturnExpr(st);
      if (expr) return expr;
    }
  }

  // 2) export default (...) => {}
  for (const st of sf.statements) {
    if (ts.isExportAssignment(st)) {
      const expr = st.expression;
      if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
        const ret = getTopLevelReturnExpr(expr);
        if (ret) return ret;
      }
      if (ts.isIdentifier(expr)) {
        const target = findFunctionByName(expr.text);
        if (
          target &&
          (ts.isFunctionDeclaration(target) ||
            ts.isArrowFunction(target) ||
            ts.isFunctionExpression(target))
        ) {
          const ret = getTopLevelReturnExpr(
            target as ts.FunctionLikeDeclarationBase | ts.ArrowFunction | ts.FunctionExpression,
          );
          if (ret) return ret;
        }
      }
    }
  }

  return null;
}

function stripOuterParens(exprText: string) {
  let out = exprText.trim();
  // Best-effort: remove one pair of wrapping parens if present.
  if (out.startsWith('(') && out.endsWith(')')) {
    out = out.slice(1, -1).trim();
  }
  return out;
}

function dedent(src: string) {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return src.trim();
  const indents = nonEmpty.map((l) => (l.match(/^[\t ]+/)?.[0].length ?? 0));
  const minIndent = Math.min(...indents);
  const out = lines.map((l) => (l.length >= minIndent ? l.slice(minIndent) : l)).join('\n');
  return out.replace(/^\s+/, '').replace(/\s+$/, '');
}

function escapeForTemplateLiteral(src: string) {
  // Keep newlines for readability; escape only what breaks template literals.
  return src.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function collectJsxElementHighlightLines({
  tsxSource,
  virtualFileName,
  componentName,
}: {
  tsxSource: string;
  virtualFileName: string;
  componentName: string;
}) {
  const sf = ts.createSourceFile(
    virtualFileName,
    tsxSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const lines = new Set<number>(); // 1-based line numbers

  function tagNameText(tagName: ts.JsxTagNameExpression): string | null {
    if (ts.isIdentifier(tagName)) return tagName.text;
    return null;
  }

  function addRange(startPos: number, endPos: number) {
    const start = sf.getLineAndCharacterOfPosition(startPos).line + 1;
    const end = sf.getLineAndCharacterOfPosition(endPos).line + 1;
    for (let ln = start; ln <= end; ln += 1) lines.add(ln);
  }

  function visit(node: ts.Node) {
    if (ts.isJsxSelfClosingElement(node)) {
      const name = tagNameText(node.tagName);
      if (name === componentName) addRange(node.getStart(sf), node.getEnd());
    } else if (ts.isJsxElement(node)) {
      const name = tagNameText(node.openingElement.tagName);
      if (name === componentName) addRange(node.getStart(sf), node.getEnd());
    }

    ts.forEachChild(node, visit);
  }

  visit(sf);
  return lines;
}

function normalizeShikiHtmlToDocsMarkup(html: string, highlightedLines: Set<number>) {
  // - Use docs' existing rehype-pretty-code CSS (`pre[data-theme]`, `code[data-theme]`, and CSS variables)
  // - Add `data-line` to each line span so existing line styles can apply
  let lineNo = 0;
  const withLineAttrs = html.replace(/class="line"/g, () => {
    lineNo += 1;
    const highlighted = highlightedLines.has(lineNo) ? ' data-highlighted-line' : '';
    return `class="line" data-line${highlighted}`;
  });

  return (
    withLineAttrs
      // Ensure pre/code have `data-theme` (so globals.css styles apply)
      .replace('<pre', '<pre data-theme="fleet"')
      .replace('<code', '<code data-theme="fleet"')
      // Remove shiki pre class to reduce coupling, keep our global styles
      .replace(/\sclass="shiki"/, '')
      .replace(/\sclass="shiki\s+[^"]*"/, '')
      // IMPORTANT: do NOT remove span styles (they carry token colors via CSS vars).
      // Only remove inline styles on the outer <pre> (background, etc).
      .replace(/<pre([^>]*?)\sstyle="[^"]*"/, '<pre$1')
  );
}

async function main() {
  const docsRoot = path.resolve(__dirname, '..'); // docs/
  const monorepoRoot = path.resolve(docsRoot, '..'); // repo root

  const componentsFile = path.join(docsRoot, 'lib/generated/components.ts');
  const componentsModule = (await import(pathToFileUrl(componentsFile).toString())) as {
    components: ComponentItem[];
  };
  const { components } = componentsModule;

  const playgroundComponentsDir = path.join(
    monorepoRoot,
    'apps/playground/app/components',
  );

  const outDir = path.join(docsRoot, 'lib/generated/playground-samples');
  const outMapFile = path.join(docsRoot, 'lib/generated/playground-sample-code.ts');

  fs.mkdirSync(outDir, { recursive: true });

  const highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['tsx'],
  });

  const mapLines: string[] = [];
  mapLines.push('/* eslint-disable */');
  mapLines.push('// This file is generated by scripts/generate-playground-sample-code.ts');
  mapLines.push('');
  mapLines.push(
    'export const playgroundSampleCode: Record<string, () => Promise<{ sampleCode: string; sampleCodeHtml: string }>> = {',
  );

  for (const c of components) {
    const srcFile = path.join(playgroundComponentsDir, `${c.slug}.tsx`);
    if (!fs.existsSync(srcFile)) continue;

    const raw = fs.readFileSync(srcFile, 'utf8');
    const withoutImports = removeImportStatements(raw, srcFile);
    const returnExpr = extractDefaultExportReturnInner({
      tsxSource: withoutImports,
      virtualFileName: srcFile,
    });
    if (!returnExpr) continue;

    // Extract only inside `return (...)`
    const exprText = withoutImports.slice(returnExpr.getStart(), returnExpr.getEnd());
    const trimmed = dedent(stripOuterParens(exprText));

    const highlightedLines = collectJsxElementHighlightLines({
      tsxSource: trimmed,
      virtualFileName: srcFile,
      componentName: c.name,
    });

    const html = highlighter.codeToHtml(trimmed, {
      lang: 'tsx',
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    });
    const normalizedHtml = normalizeShikiHtmlToDocsMarkup(html, highlightedLines);

    const outFile = path.join(outDir, `${c.slug}.ts`);
    const payload =
      '/* eslint-disable */\n' +
      '// This file is generated by scripts/generate-playground-sample-code.ts\n' +
      '\n' +
      `export const sampleCode = \`\n${escapeForTemplateLiteral(trimmed)}\n\`;\n` +
      `export const sampleCodeHtml = \`${escapeForTemplateLiteral(normalizedHtml)}\`;\n`;

    fs.writeFileSync(outFile, payload, 'utf8');

    const rel = `./playground-samples/${c.slug}`;
    mapLines.push(`  ${JSON.stringify(c.slug)}: () => import(${JSON.stringify(rel)}),`);
  }

  mapLines.push('} as const;');
  mapLines.push('');

  fs.writeFileSync(outMapFile, mapLines.join('\n'), 'utf8');
  console.log(`[docs] generated: ${path.relative(docsRoot, outMapFile)}`);
  console.log(`[docs] generated: ${path.relative(docsRoot, outDir)}/**/*.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

function pathToFileUrl(p: string) {
  const resolved = path.resolve(p);
  const prefix = process.platform === 'win32' ? 'file:///' : 'file://';
  return new URL(prefix + resolved.replace(/\\/g, '/'));
}

