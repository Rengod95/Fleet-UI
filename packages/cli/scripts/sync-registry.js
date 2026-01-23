/**
 * Sync embedded registry from monorepo source.
 *
 * Source:
 *  - packages/core/src/**        -> packages/cli/registry/core/**
 *  - packages/components/src/**  -> packages/cli/registry/components/**
 *
 * Also:
 *  - rewrites `@fleet-ui/core` imports to `@fleet-ui/local/core` inside registry components
 *  - rewrites unistyles.ts JSDoc example to local import
 *  - regenerates registry/manifest.json based on component directories
 */
const fs = require('node:fs');
const path = require('node:path');

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
	newline: () => console.log(''),
};

const repoRoot = path.resolve(__dirname, '../../..');
const srcCore = path.join(repoRoot, 'packages/core/src');
const srcComponents = path.join(repoRoot, 'packages/components/src');

const cliRoot = path.join(repoRoot, 'packages/cli');
const registryRoot = path.join(cliRoot, 'registry');
const outCore = path.join(registryRoot, 'core');
const outComponents = path.join(registryRoot, 'components');

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

function writeText(p, s) {
	mkdirp(path.dirname(p));
	fs.writeFileSync(p, s, 'utf8');
}

function listFilesRecursive(dir) {
	const out = [];
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const abs = path.join(dir, ent.name);
		if (ent.isDirectory()) out.push(...listFilesRecursive(abs));
		else out.push(abs);
	}
	return out;
}

function rewriteInFile(filePath, replacers) {
	const before = readText(filePath);
	let after = before;
	for (const [from, to] of replacers) after = after.split(from).join(to);
	if (after !== before) writeText(filePath, after);
}

function isComponentDir(name) {
	// src has folders + some files (index.ts, global.d.ts)
	if (name.startsWith('.')) return false;
	if (name === 'index.ts') return false;
	if (name === 'global.d.ts') return false;
	return true;
}

function main() {
	log.section('Syncing registry');

	// Validate sources
	if (!fs.existsSync(srcCore)) {
		log.error(`Source not found: ${srcCore}`);
		process.exit(1);
	}
	if (!fs.existsSync(srcComponents)) {
		log.error(`Source not found: ${srcComponents}`);
		process.exit(1);
	}

	// Clean
	log.info('Cleaning registry...');
	mkdirp(registryRoot);
	rmrf(outCore);
	rmrf(outComponents);

	// Core
	log.info('Syncing core...');
	copyDir(srcCore, outCore);
	const coreUnistyles = path.join(outCore, 'unistyles.ts');
	if (fs.existsSync(coreUnistyles)) {
		rewriteInFile(coreUnistyles, [["import '@fleet-ui/core/unistyles';", "import '@fleet-ui/local/core/unistyles';"]]);
	}
	log.detail('Core files copied');

	// Components
	log.info('Syncing components...');
	mkdirp(outComponents);

	// Copy global.d.ts (if exists)
	const globalDts = path.join(srcComponents, 'global.d.ts');
	if (fs.existsSync(globalDts)) {
		writeText(path.join(outComponents, 'global.d.ts'), readText(globalDts));
	}

	const available = {};
	for (const ent of fs.readdirSync(srcComponents, { withFileTypes: true })) {
		if (!ent.isDirectory()) continue;
		if (!isComponentDir(ent.name)) continue;
		const name = ent.name;
		const srcDir = path.join(srcComponents, name);
		const dstDir = path.join(outComponents, name);
		copyDir(srcDir, dstDir);
		available[name] = { source: `components/${name}`, optionalPeerDeps: [] };
	}
	log.detail(`${Object.keys(available).length} components copied`);

	// Rewrite imports
	log.info('Rewriting imports...');
	let rewriteCount = 0;
	for (const file of listFilesRecursive(outComponents)) {
		if (!file.endsWith('.ts') && !file.endsWith('.tsx') && !file.endsWith('.d.ts')) continue;
		const before = readText(file);
		let after = before;
		for (const [from, to] of [
			["'@fleet-ui/core", "'@fleet-ui/local/core"],
			['"@fleet-ui/core', '"@fleet-ui/local/core'],
		]) {
			after = after.split(from).join(to);
		}
		if (after !== before) {
			writeText(file, after);
			rewriteCount++;
		}
	}
	log.detail(`${rewriteCount} files updated`);

	// Manifest
	log.info('Writing manifest...');
	const manifest = {
		schema: 1,
		aliasPrefix: '@fleet-ui/local',
		core: { source: 'core', defaultTargetDir: 'fleet-ui/core' },
		components: { defaultTargetDir: 'fleet-ui/components', available },
	};
	writeText(path.join(registryRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

	log.newline();
	log.success(`Registry synced: core + ${Object.keys(available).length} components`);
}

main();

