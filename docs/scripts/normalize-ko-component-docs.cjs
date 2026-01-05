/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'content', 'ko', 'components');

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeFile(p, content) {
  fs.writeFileSync(p, content, 'utf8');
}

function listMdxFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listMdxFiles(abs));
    else if (e.isFile() && e.name.endsWith('.mdx')) out.push(abs);
  }
  return out;
}

function replaceAll(content) {
  let next = content;

  // Fix accidental literal "\n" sequences in markdown text (keep code blocks intact as much as possible).
  next = next.replace(/\\n\+/g, '\n'); // artifacts like "\n+"
  next = next.replace(/\\n/g, '\n');

  // Common tone and terminology normalizations.
  next = next.replace(
    /> 공통 전제: 앱 엔트리에서 unistyles side-effect import는 필수다\.\s*/g,
    '> 공통 전제: 앱 **엔트리 파일**에서 unistyles side-effect import는 필수예요.  \n',
  );

  next = next.replace(
    /우측 Playground 데모에서 아래 범용 UI props는 충분히 확인 가능하므로, 문서에서는 반복 예제를 최소화한다\./g,
    '우측 Playground 데모에서 아래 범용 UI props는 충분히 확인할 수 있어요. 그래서 문서에서는 반복 예제를 줄여요.',
  );

  next = next.replace(
    /우측 Playground 데모에서 아래 범용 UI props는 충분히 확인 가능하므로, 문서에서는 반복 예제를 최소화한다\./g,
    '우측 Playground 데모에서 아래 범용 UI props는 충분히 확인할 수 있어요. 그래서 문서에서는 반복 예제를 줄여요.',
  );

  next = next.replace(/문서에서는 반복 예제를 최소화한다\./g, '문서에서는 반복 예제를 줄여요.');
  next = next.replace(/에 집중한다\./g, '에 집중해요.');

  // Light safe replacements (avoid overly aggressive verb changes).
  next = next.replace(/요구하지 않는다\./g, '요구하지 않아요.');
  next = next.replace(/사용한다\./g, '써요.');
  next = next.replace(/권장한다\./g, '권장해요.');

  // Normalize section header label.
  next = next.replace(/### \(B\) 설치방법/g, '### (B) 설치 방법');

  return next;
}

function ensureA11yBullets(content) {
  const lines = content.split('\n');
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);

    if (/^### \(F\)\s*접근성/.test(lines[i])) {
      // Lookahead: count bullet lines until next section divider.
      let j = i + 1;
      let bulletCount = 0;

      while (j < lines.length) {
        const l = lines[j];
        if (/^###\s/.test(l) || /^---\s*$/.test(l)) break;
        if (l.trim().startsWith('- ')) bulletCount++;
        j++;
      }

      if (bulletCount < 3) {
        // Insert a small recommended rule block if missing.
        out.push('');
        out.push('권장 규칙:');
        out.push('- (웹) 키보드/포커스 이동이 자연스러운지 확인해요.');
        out.push('- (공통) 상태 변화가 스크린리더에 충분히 전달되는지 확인해요.');
      }
    }
  }

  return out.join('\n');
}

function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`[docs] not found: ${TARGET_DIR}`);
    process.exit(1);
  }

  const files = listMdxFiles(TARGET_DIR);
  let changed = 0;

  for (const f of files) {
    const before = readFile(f);
    let after = replaceAll(before);
    after = ensureA11yBullets(after);

    if (after !== before) {
      writeFile(f, after);
      changed++;
      console.log(`[docs] updated: ${path.relative(ROOT, f)}`);
    }
  }

  console.log(`[docs] done: ${changed}/${files.length} files updated`);
}

main();

