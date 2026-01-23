/**
 * Fixture-based tests for fleet-ui CLI without touching real apps.
 *
 * Strategy:
 *  - Copy fixture into a temp directory under packages/cli/tmp
 *  - Run CLI (dist) commands against it
 *  - Assert that expected file patches happened
 *
 * Note: this does NOT install dependencies; it validates file edits only.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

// Simple logger for scripts
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

const log = {
  info: (msg) => console.log(`${CYAN}fleet-ui${RESET} → ${msg}`),
  success: (msg) => console.log(`${CYAN}fleet-ui${RESET} ${GREEN}✓${RESET} ${msg}`),
  warn: (msg) => console.log(`${CYAN}fleet-ui${RESET} ${YELLOW}⚠${RESET} ${msg}`),
  error: (msg) => console.log(`${CYAN}fleet-ui${RESET} ${RED}✗${RESET} ${msg}`),
  detail: (msg) => console.log(`         ${DIM}›${RESET} ${msg}`),
  section: (title) => console.log(`\n${CYAN}fleet-ui${RESET} ${DIM}━━━${RESET} ${title} ${DIM}━━━${RESET}`),
  test: (name) => console.log(`${CYAN}fleet-ui${RESET} ${DIM}[test]${RESET} ${name}`),
  pass: (name) => console.log(`${CYAN}fleet-ui${RESET} ${GREEN}✓${RESET} ${name}`),
  fail: (name, err) => console.log(`${CYAN}fleet-ui${RESET} ${RED}✗${RESET} ${name}\n         ${RED}${err}${RESET}`),
  newline: () => console.log(''),
};

const repoRoot = path.resolve(__dirname, '../../..');
const cliDist = path.join(repoRoot, 'packages/cli/dist/index.js');
const cliRoot = path.join(repoRoot, 'packages/cli');
const tmpRoot = path.join(cliRoot, 'tmp');
const fixtureRoot = path.join(cliRoot, 'fixtures');

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}
function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}
function copyDir(src, dst) {
  mkdirp(dst);
  fs.cpSync(src, dst, { recursive: true });
}
function readText(p) {
  return fs.readFileSync(p, 'utf8');
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}
function run(args, cwd) {
  const r = spawnSync('node', [cliDist, ...args], { cwd, stdio: 'pipe', encoding: 'utf8' });
  if (r.status !== 0) {
    const out = (r.stdout || '') + (r.stderr || '');
    throw new Error(`CLI failed (${args.join(' ')}):\n${out}`);
  }
  return r.stdout + r.stderr;
}

function testExpoRouterMinimal() {
  const name = 'expo-router-minimal';
  log.test(name);

  const src = path.join(fixtureRoot, name);
  const dst = path.join(tmpRoot, `${name}-${Date.now()}`);
  copyDir(src, dst);
  log.detail('Fixture copied to temp directory');

  // Test: init
  log.detail('Running: fleet-ui init');
  run(['init', '--cwd', dst], repoRoot);

  const tsconfig = readText(path.join(dst, 'tsconfig.json'));
  assert(tsconfig.includes('"baseUrl"'), 'tsconfig.json should include baseUrl');
  assert(tsconfig.includes('"@fleet-ui/local/*"'), 'tsconfig.json should include @fleet-ui/local/* paths');
  log.detail('tsconfig.json configured correctly');

  const babel = readText(path.join(dst, 'babel.config.js'));
  assert(babel.includes("'module-resolver'") || babel.includes('"module-resolver"'), 'babel.config.js should include module-resolver');
  assert(babel.includes("'@fleet-ui/local'") || babel.includes('"@fleet-ui/local"'), 'babel.config.js should include @fleet-ui/local alias');
  assert(babel.includes('autoProcessImports'), 'babel.config.js should include autoProcessImports');
  log.detail('babel.config.js configured correctly');

  const entry = readText(path.join(dst, 'app/_layout.tsx'));
  assert(entry.includes("import '@fleet-ui/local/core/unistyles';"), 'entry should import local unistyles');
  log.detail('Entry file import added');

  assert(fs.existsSync(path.join(dst, 'fleet-ui.json')), 'fleet-ui.json should be created');
  assert(fs.existsSync(path.join(dst, 'fleet-ui/core/unistyles.ts')), 'core should be copied');
  log.detail('Core files created');

  // Test: add
  log.detail('Running: fleet-ui add Button Modal');
  run(['add', 'Button', 'Modal', '--cwd', dst], repoRoot);
  assert(fs.existsSync(path.join(dst, 'fleet-ui/components/Button')), 'Button component should be added');
  assert(fs.existsSync(path.join(dst, 'fleet-ui/components/Modal')), 'Modal component should be added');
  assert(fs.existsSync(path.join(dst, 'fleet-ui/components/index.ts')), 'components barrel should exist');
  log.detail('Components added successfully');

  // Test: doctor
  log.detail('Running: fleet-ui doctor');
  const doctorOut = run(['doctor', '--cwd', dst], repoRoot);
  assert(doctorOut.includes('doctor') || doctorOut.includes('passed') || doctorOut.includes('configured'), 'doctor should run');
  log.detail('Doctor check passed');

  log.pass(name);
}

function main() {
  log.section('Running fixture tests');

  rmrf(tmpRoot);
  mkdirp(tmpRoot);

  if (!fs.existsSync(cliDist)) {
    log.error('CLI dist not found');
    log.detail('Run: pnpm --filter @fleet-ui/cli build');
    process.exit(1);
  }

  const tests = [testExpoRouterMinimal];
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      test();
      passed++;
    } catch (err) {
      log.fail(test.name, err.message);
      failed++;
    }
  }

  log.newline();
  if (failed === 0) {
    log.success(`All ${passed} test(s) passed`);
  } else {
    log.error(`${failed}/${passed + failed} test(s) failed`);
    process.exit(1);
  }
}

main();

