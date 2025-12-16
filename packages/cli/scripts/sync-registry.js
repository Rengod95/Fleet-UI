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
	if (!fs.existsSync(srcCore)) throw new Error(`missing: ${srcCore}`);
	if (!fs.existsSync(srcComponents)) throw new Error(`missing: ${srcComponents}`);

	// clean
	mkdirp(registryRoot);
	rmrf(outCore);
	rmrf(outComponents);

	// core
	copyDir(srcCore, outCore);
	// rewrite core unistyles.ts example
	const coreUnistyles = path.join(outCore, 'unistyles.ts');
	if (fs.existsSync(coreUnistyles)) {
		rewriteInFile(coreUnistyles, [["import '@fleet-ui/core/unistyles';", "import '@fleet-ui/local/core/unistyles';"]]);
	}

	// components
	mkdirp(outComponents);
	// copy global.d.ts (if exists)
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

	// rewrite imports inside all component files
	for (const file of listFilesRecursive(outComponents)) {
		if (!file.endsWith('.ts') && !file.endsWith('.tsx') && !file.endsWith('.d.ts')) continue;
		rewriteInFile(file, [
			["'@fleet-ui/core", "'@fleet-ui/local/core"],
			['"@fleet-ui/core', '"@fleet-ui/local/core'],
		]);
	}

	// manifest
	const manifest = {
		schema: 1,
		aliasPrefix: '@fleet-ui/local',
		core: { source: 'core', defaultTargetDir: 'fleet-ui/core' },
		components: { defaultTargetDir: 'fleet-ui/components', available },
	};
	writeText(path.join(registryRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

	console.log(`[fleet-ui] synced registry: core + ${Object.keys(available).length} components`);
}

main();

