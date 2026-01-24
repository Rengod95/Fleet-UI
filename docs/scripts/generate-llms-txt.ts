import fs from 'node:fs';
import path from 'node:path';

type ComponentItem = { name: string; slug: string };

interface ComponentInfo {
  name: string;
  slug: string;
  oneLiner: string;
  coreFeatures: string;
  stateAndAnimation: string;
  accessibility: string;
  propsTables: string[];
  examples: string[];
}

/**
 * Extract (A) One-liner section
 */
function extractOneLiner(content: string): string {
  const match = content.match(/###\s*\(A\)\s*One-liner\s*\n+([\s\S]*?)(?=\n---|\n###)/i);
  if (match) {
    return match[1]
      .trim()
      .split('\n')
      .filter(l => l.trim() && !l.startsWith('>'))
      .join(' ')
      .replace(/\*\*/g, '')
      .replace(/`/g, "'")
      .trim();
  }
  return '';
}

/**
 * Extract (D) Core Features & Usage section
 */
function extractCoreFeatures(content: string): string {
  const match = content.match(/###\s*\(D\)\s*Core Features[^\n]*\n+([\s\S]*?)(?=\n---|\n###\s*\(E\))/i);
  if (!match) return '';

  const section = match[1];
  const lines: string[] = [];

  // Extract subsections (#### headings)
  const subsections = section.split(/\n####\s+/).filter(Boolean);

  for (const sub of subsections) {
    const subLines = sub.trim().split('\n');
    const heading = subLines[0]?.replace(/^D-\d+\.\s*/, '').trim();
    if (!heading) continue;

    // Get content (non-code-block text + simplified code)
    const subContent = subLines.slice(1).join('\n');

    // Extract key points (bullet points and important text)
    const bullets = subContent
      .split('\n')
      .filter(l => l.trim().startsWith('-') || l.trim().startsWith('>'))
      .map(l => l.trim())
      .slice(0, 5);

    if (heading && (bullets.length > 0 || subContent.includes('`'))) {
      lines.push(`**${heading}**`);
      if (bullets.length > 0) {
        lines.push(...bullets);
      }
    }
  }

  // Also extract any code examples (limit to 2)
  const codeBlocks = section.match(/```tsx[^\n]*\n([\s\S]*?)```/g);
  if (codeBlocks && codeBlocks.length > 0) {
    const example = codeBlocks[0]
      .replace(/```tsx[^\n]*\n/, '')
      .replace(/```$/, '')
      .trim()
      .split('\n')
      .slice(0, 15)
      .join('\n');
    if (example) {
      lines.push('');
      lines.push('```tsx');
      lines.push(example);
      lines.push('```');
    }
  }

  return lines.join('\n');
}

/**
 * Extract (E) Internal State / Shared Value / Animation section
 */
function extractStateAndAnimation(content: string): string {
  const match = content.match(/###\s*\(E\)\s*Internal State[^\n]*\n+([\s\S]*?)(?=\n---|\n###\s*\(F\))/i);
  if (!match) return '';

  const section = match[1];
  const lines: string[] = [];

  // Extract State Model
  const stateModelMatch = section.match(/####\s*E-1[^\n]*State Model[^\n]*\n+([\s\S]*?)(?=\n####|$)/i);
  if (stateModelMatch) {
    const stateContent = stateModelMatch[1];
    const bullets = stateContent
      .split('\n')
      .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
      .map(l => l.trim().replace(/^\*\s*/, '- '))
      .slice(0, 8);

    if (bullets.length > 0) {
      lines.push('**State Model:**');
      lines.push(...bullets);
    }
  }

  // Extract Animation/Shared Value info
  const animMatch = section.match(/####\s*E-2[^\n]*(?:Reanimated|Shared Value|Animation)[^\n]*\n+([\s\S]*?)(?=\n####|$)/i);
  if (animMatch) {
    const animContent = animMatch[1];
    const bullets = animContent
      .split('\n')
      .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
      .map(l => l.trim().replace(/^\*\s*/, '- '))
      .slice(0, 6);

    if (bullets.length > 0) {
      lines.push('');
      lines.push('**Animation:**');
      lines.push(...bullets);
    }
  }

  return lines.join('\n');
}

/**
 * Extract (F) Accessibility section
 */
function extractAccessibility(content: string): string {
  const match = content.match(/###\s*\(F\)\s*Accessibility[^\n]*\n+([\s\S]*?)(?=\n---|\n###\s*\(G\))/i);
  if (!match) return '';

  const section = match[1];

  // Extract key accessibility info
  const bullets = section
    .split('\n')
    .filter(l => {
      const t = l.trim();
      return t.startsWith('-') || t.startsWith('*') || t.includes('role') || t.includes('label') || t.includes('state');
    })
    .map(l => l.trim().replace(/^\*\s*/, '- '))
    .filter(l => l.length > 0 && l.length < 200)
    .slice(0, 8);

  return bullets.join('\n');
}

/**
 * Extract all Props tables from (G) section
 */
function extractPropsTables(content: string): string[] {
  const match = content.match(/###\s*\(G\)\s*Props[^\n]*\n+([\s\S]*?)(?=\n---\s*$|\n##[^#]|$)/i);
  if (!match) return [];

  const section = match[1];
  const tables: string[] = [];

  // Find all tables with their headings
  const parts = section.split(/\n####\s+/);

  for (const part of parts) {
    if (!part.trim()) continue;

    const lines = part.split('\n');
    const heading = lines[0]?.trim().replace(/[—–-]\s*`[^`]+`/, '').trim();

    // Find table in this part
    const tableMatch = part.match(/\|[^\n]+\|\n\|[-:\s|]+\|\n((?:\|[^\n]+\|\n?)+)/);
    if (tableMatch) {
      const tableRows = tableMatch[0].split('\n').filter(r => r.trim().startsWith('|'));
      if (tableRows.length >= 2) {
        if (heading && !heading.startsWith('|')) {
          tables.push(`**${heading}**\n${tableRows.join('\n')}`);
        } else {
          tables.push(tableRows.join('\n'));
        }
      }
    }
  }

  // If no headed tables found, try to find any table
  if (tables.length === 0) {
    const simpleTableMatch = section.match(/\|[^\n]+\|\n\|[-:\s|]+\|\n((?:\|[^\n]+\|\n?)+)/g);
    if (simpleTableMatch) {
      tables.push(...simpleTableMatch);
    }
  }

  return tables;
}

/**
 * Extract code examples
 */
function extractExamples(content: string): string[] {
  const examples: string[] = [];

  // Find examples in Core Features section
  const coreMatch = content.match(/###\s*\(D\)\s*Core Features[^\n]*\n+([\s\S]*?)(?=\n---|\n###\s*\(E\))/i);
  if (coreMatch) {
    const codeBlocks = coreMatch[1].match(/```tsx[^\n]*\n([\s\S]*?)```/g);
    if (codeBlocks) {
      for (const block of codeBlocks.slice(0, 3)) {
        const code = block
          .replace(/```tsx[^\n]*\n/, '')
          .replace(/```$/, '')
          .trim();
        if (code.length > 20 && code.length < 1500) {
          examples.push(code);
        }
      }
    }
  }

  // Fallback: find first meaningful code block
  if (examples.length === 0) {
    const allBlocks = content.match(/```tsx[^\n]*\n([\s\S]*?)```/g);
    if (allBlocks) {
      for (const block of allBlocks.slice(0, 2)) {
        const code = block
          .replace(/```tsx[^\n]*\n/, '')
          .replace(/```$/, '')
          .trim();
        if (code.includes('<') && code.length > 20 && code.length < 1500) {
          examples.push(code);
          break;
        }
      }
    }
  }

  return examples;
}

/**
 * Parse a component MDX file
 */
function parseComponentMdx(filePath: string, component: ComponentItem): ComponentInfo {
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';

  return {
    name: component.name,
    slug: component.slug,
    oneLiner: extractOneLiner(content),
    coreFeatures: extractCoreFeatures(content),
    stateAndAnimation: extractStateAndAnimation(content),
    accessibility: extractAccessibility(content),
    propsTables: extractPropsTables(content),
    examples: extractExamples(content),
  };
}

/**
 * Generate the llms.txt content
 */
function generateLlmsTxt(components: ComponentInfo[]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fleet-ui.vercel.app';

  const lines: string[] = [];

  // ===== HEADER =====
  lines.push(`# Fleet UI`);
  lines.push(``);
  lines.push(`> React Native UI SDK: theming (react-native-unistyles) + animation (react-native-reanimated) + components`);
  lines.push(``);
  lines.push(`Fleet UI provides production-ready UI components with consistent design, fluid animations, and a systematic token architecture.`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // ===== PACKAGE ARCHITECTURE =====
  lines.push(`## Package Architecture`);
  lines.push(``);
  lines.push(`### @fleet-ui/core`);
  lines.push(`- **Role**: Design token system + theme configuration`);
  lines.push(`- **Exports**: tokens, themes (light/dark), utility hooks`);
  lines.push(`- **Entry**: \`import '@fleet-ui/core/unistyles'\` (required in app entry)`);
  lines.push(``);
  lines.push(`### @fleet-ui/components`);
  lines.push(`- **Role**: UI components consuming core tokens`);
  lines.push(`- **Depends on**: @fleet-ui/core (peer dependency)`);
  lines.push(`- **Pattern**: Components use \`useStyles()\` hook with theme tokens`);
  lines.push(``);
  lines.push(`### Interaction Flow`);
  lines.push(`1. App imports \`@fleet-ui/core/unistyles\` → registers themes with Unistyles`);
  lines.push(`2. Components import from \`@fleet-ui/components\``);
  lines.push(`3. Components access \`theme.*\` via \`useStyles()\` → consume semantic tokens`);
  lines.push(`4. Theme switch (light/dark) automatically propagates to all components`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // ===== TOKEN SYSTEM =====
  lines.push(`## Token System`);
  lines.push(``);
  lines.push(`### Pipeline`);
  lines.push(`raw → primitive → semantic → theme → runtime(Unistyles)`);
  lines.push(``);
  lines.push(`### Layers`);
  lines.push(`- **Raw**: 11-step color scales per scheme (primary, neutral, error, success, warning, info)`);
  lines.push(`- **Primitive**: spacing (0..20), rounded (none→full), typography atoms, shadow geometry`);
  lines.push(`- **Semantic**: colors (content_1..4, text_1..4, border_*, solid), typography (h1..h6, body1..3), shadows (card, button, overlay)`);
  lines.push(`- **Theme**: light/dark bundles combining semantic + primitive`);
  lines.push(``);
  lines.push(`### Token Access`);
  lines.push(`\`\`\`ts`);
  lines.push(`theme.colors.primary.solid      // accent color`);
  lines.push(`theme.colors.neutral.content_1  // background`);
  lines.push(`theme.colors.neutral.text_1     // text`);
  lines.push(`theme.typography.h1             // heading style object`);
  lines.push(`theme.rounded.md                // 16px radius`);
  lines.push(`theme.shadows.card              // shadow string`);
  lines.push(`theme.spacing[4]                // spacing value`);
  lines.push(`\`\`\``);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // ===== INSTALLATION =====
  lines.push(`## Installation`);
  lines.push(``);
  lines.push(`### Track A (CLI/Local - like Shadcn)`);
  lines.push(`\`\`\`bash`);
  lines.push(`pnpm dlx @fleet-ui/cli init`);
  lines.push(`pnpm dlx @fleet-ui/cli add Button Modal`);
  lines.push(`\`\`\``);
  lines.push(`Import: \`import { Button } from '@fleet-ui/local/components'\``);
  lines.push(``);
  lines.push(`### Track B (NPM Package)`);
  lines.push(`\`\`\`bash`);
  lines.push(`pnpm add @fleet-ui/core @fleet-ui/components`);
  lines.push(`\`\`\``);
  lines.push(`Entry: \`import '@fleet-ui/core/unistyles'\``);
  lines.push(`Import: \`import { Button } from '@fleet-ui/components'\``);
  lines.push(``);
  lines.push(`### Dependencies`);
  lines.push(`\`\`\`bash`);
  lines.push(`pnpm add react-native-unistyles react-native-reanimated react-native-gesture-handler react-native-worklets`);
  lines.push(`\`\`\``);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // ===== STYLING PATTERN =====
  lines.push(`## Styling Pattern`);
  lines.push(``);
  lines.push(`\`\`\`tsx`);
  lines.push(`import { StyleSheet, useStyles } from 'react-native-unistyles';`);
  lines.push(``);
  lines.push(`const stylesheet = StyleSheet.create((theme) => ({`);
  lines.push(`  container: {`);
  lines.push(`    backgroundColor: theme.colors.neutral.content_1,`);
  lines.push(`    borderRadius: theme.rounded.md,`);
  lines.push(`    padding: theme.spacing[4],`);
  lines.push(`  },`);
  lines.push(`}));`);
  lines.push(``);
  lines.push(`function MyComponent() {`);
  lines.push(`  const { styles } = useStyles(stylesheet);`);
  lines.push(`  return <View style={styles.container}>...</View>;`);
  lines.push(`}`);
  lines.push(`\`\`\``);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // ===== VARIANT SYSTEM =====
  lines.push(`## Variant System`);
  lines.push(``);
  lines.push(`- **colorScheme**: primary, neutral, error, success, warning, info`);
  lines.push(`- **variant**: filled, outlined, flat, ghost, faded`);
  lines.push(`- **size**: sm, md, lg, xl`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  // ===== COMPONENTS REFERENCE =====
  lines.push(`## Components Reference`);
  lines.push(``);

  for (const comp of components) {
    lines.push(`### ${comp.name}`);
    lines.push(``);

    // One-liner / Role
    if (comp.oneLiner) {
      lines.push(`${comp.oneLiner}`);
      lines.push(``);
    }

    lines.push(`**Docs**: ${siteUrl}/en/components/${comp.slug}`);
    lines.push(``);

    // Core Features
    if (comp.coreFeatures) {
      lines.push(`#### Core Features`);
      lines.push(comp.coreFeatures);
      lines.push(``);
    }

    // State & Animation
    if (comp.stateAndAnimation) {
      lines.push(`#### State & Animation`);
      lines.push(comp.stateAndAnimation);
      lines.push(``);
    }

    // Accessibility
    if (comp.accessibility) {
      lines.push(`#### Accessibility`);
      lines.push(comp.accessibility);
      lines.push(``);
    }

    // Props Tables
    if (comp.propsTables.length > 0) {
      lines.push(`#### Props`);
      for (const table of comp.propsTables) {
        lines.push(table);
        lines.push(``);
      }
    }

    // Examples
    if (comp.examples.length > 0) {
      lines.push(`#### Example`);
      lines.push(`\`\`\`tsx`);
      lines.push(comp.examples[0]);
      lines.push(`\`\`\``);
      lines.push(``);
    }

    lines.push(`---`);
    lines.push(``);
  }

  // ===== DOCUMENTATION LINKS =====
  lines.push(`## Documentation`);
  lines.push(``);
  lines.push(`- [Introduction](${siteUrl}/en/introduce)`);
  lines.push(`- [Installation](${siteUrl}/en/getting-started/install)`);
  lines.push(`- [Token Architecture](${siteUrl}/en/fundamental/token-architecture)`);
  lines.push(`- [Theming](${siteUrl}/en/fundamental/theming)`);
  lines.push(`- [Components](${siteUrl}/en/components)`);
  lines.push(``);

  return lines.join('\n');
}

function main() {
  const docsRoot = path.resolve(__dirname, '..');
  const componentsFile = path.join(docsRoot, 'lib/generated/components.ts');
  const contentDir = path.join(docsRoot, 'content/en/components');
  const outFile = path.join(docsRoot, 'public/llms.txt');

  // Load components list
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { components } = require(componentsFile) as { components: ComponentItem[] };

  // Parse each component's MDX
  const componentInfos: ComponentInfo[] = components.map((comp) => {
    const mdxPath = path.join(contentDir, `${comp.slug}.mdx`);
    return parseComponentMdx(mdxPath, comp);
  });

  // Generate llms.txt
  const content = generateLlmsTxt(componentInfos);

  // Ensure public directory exists
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, content, 'utf8');

  // Stats
  const lineCount = content.split('\n').length;
  const sizeKb = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);

  console.log(`[docs] generated: ${path.relative(docsRoot, outFile)}`);
  console.log(`[docs] ${componentInfos.length} components, ${lineCount} lines, ${sizeKb} KB`);
}

main();
