import fs from 'node:fs';
import path from 'node:path';

type Mode = 'warn' | 'strict';

function getMode(): Mode {
  const arg = process.argv.find((a) => a.startsWith('--mode='));
  const mode = arg?.split('=')[1];
  if (mode === 'strict') return 'strict';
  return 'warn';
}

function listMdxFiles(root: string) {
  const out: string[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) walk(abs);
      else if (e.isFile() && e.name.endsWith('.mdx')) out.push(abs);
    }
  }

  if (fs.existsSync(root)) walk(root);
  return out
    .map((abs) => path.relative(root, abs).replace(/\\/g, '/'))
    .sort((a, b) => a.localeCompare(b));
}

function diff(a: string[], b: string[]) {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
}

function main() {
  const mode = getMode();
  const docsRoot = path.resolve(__dirname, '..');

  const pairs = [
    {
      label: 'components',
      ko: path.join(docsRoot, 'content/ko/components'),
      en: path.join(docsRoot, 'content/en/components'),
    },
    {
      label: 'pages',
      ko: path.join(docsRoot, 'content/ko/pages'),
      en: path.join(docsRoot, 'content/en/pages'),
    },
  ] as const;

  let hasIssues = false;

  for (const p of pairs) {
    const koFiles = listMdxFiles(p.ko);
    const enFiles = listMdxFiles(p.en);

    const missingInEn = diff(koFiles, enFiles);
    const missingInKo = diff(enFiles, koFiles);

    if (missingInEn.length || missingInKo.length) {
      hasIssues = true;
      console.log(`[i18n-sync] ${p.label}`);
      if (missingInEn.length) {
        console.log(`  missing in en (${missingInEn.length}):`);
        for (const f of missingInEn) console.log(`   - ${f}`);
      }
      if (missingInKo.length) {
        console.log(`  missing in ko (${missingInKo.length}):`);
        for (const f of missingInKo) console.log(`   - ${f}`);
      }
    } else {
      console.log(`[i18n-sync] ${p.label}: OK (${koFiles.length} files)`);
    }
  }

  if (hasIssues) {
    const msg =
      mode === 'strict'
        ? '[i18n-sync] FAIL (strict mode)'
        : '[i18n-sync] WARN (use --mode=strict to fail CI)';
    console.log(msg);
    process.exit(mode === 'strict' ? 1 : 0);
  }

  process.exit(0);
}

main();

