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
  const src = path.join(fixtureRoot, name);
  const dst = path.join(tmpRoot, `${name}-${Date.now()}`);
  copyDir(src, dst);

  run(['init', '--cwd', dst], repoRoot);

  const tsconfig = readText(path.join(dst, 'tsconfig.json'));
  assert(tsconfig.includes('"baseUrl"'), 'tsconfig.json should include baseUrl');
  assert(tsconfig.includes('"@fleet-ui/local/*"'), 'tsconfig.json should include @fleet-ui/local/* paths');

  const babel = readText(path.join(dst, 'babel.config.js'));
  assert(babel.includes("'module-resolver'") || babel.includes('"module-resolver"'), 'babel.config.js should include module-resolver');
  assert(babel.includes("'@fleet-ui/local'") || babel.includes('"@fleet-ui/local"'), 'babel.config.js should include @fleet-ui/local alias');
  assert(babel.includes('autoProcessImports'), 'babel.config.js should include autoProcessImports');

  const entry = readText(path.join(dst, 'app/_layout.tsx'));
  assert(entry.includes("import '@fleet-ui/local/core/unistyles';"), 'entry should import local unistyles');

  assert(fs.existsSync(path.join(dst, 'fleet-ui.json')), 'fleet-ui.json should be created');
  assert(fs.existsSync(path.join(dst, 'fleet-ui/core/unistyles.ts')), 'core should be copied');

  run(['add', 'Button', 'Modal', '--cwd', dst], repoRoot);
  assert(fs.existsSync(path.join(dst, 'fleet-ui/components/Button')), 'Button component should be added');
  assert(fs.existsSync(path.join(dst, 'fleet-ui/components/Modal')), 'Modal component should be added');
  assert(fs.existsSync(path.join(dst, 'fleet-ui/components/index.ts')), 'components barrel should exist');

  const doctorOut = run(['doctor', '--cwd', dst], repoRoot);
  assert(doctorOut.includes('doctor') || doctorOut.includes('all good'), 'doctor should run');
}

function main() {
  rmrf(tmpRoot);
  mkdirp(tmpRoot);

  if (!fs.existsSync(cliDist)) {
    throw new Error('CLI dist not found. Run: pnpm --filter @fleet-ui/cli build');
  }

  testExpoRouterMinimal();
  console.log('[fleet-ui] fixture tests: OK');
}

main();

