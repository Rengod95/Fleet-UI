import path from 'node:path';
import { DEFAULT_ALIAS_PREFIX, DEFAULT_COMPONENTS_DIR, DEFAULT_CORE_DIR, REQUIRED_DEV_DEPS, REQUIRED_PEER_DEPS } from '../lib/constants';
import { detectEntryFile } from '../lib/detectEntry';
import { copyDir, exists, readJson, readText } from '../lib/fs';
import { ensureSideEffectImport } from '../lib/insertImport';
import { detectPackageManager, formatInstallCommand } from '../lib/packageManager';
import { patchBabelConfig } from '../lib/patchBabelConfig';
import { patchTsconfigPaths } from '../lib/patchTsconfig';
import { resolveProjectRoot } from '../lib/detectProject';
import { writeFleetUiConfig } from '../lib/fleetUiJson';
import { resolveRegistryPath } from '../lib/registry';

type InitOptions = {
	cwd?: string;
	coreDir?: string;
	componentsDir?: string;
	alias?: string;
};

export async function runInit(opts: InitOptions) {
	const projectRoot = resolveProjectRoot(opts.cwd);

	const aliasPrefix = opts.alias ?? DEFAULT_ALIAS_PREFIX;
	const coreDir = opts.coreDir ?? DEFAULT_CORE_DIR;
	const componentsDir = opts.componentsDir ?? DEFAULT_COMPONENTS_DIR;

	const registryCore = resolveRegistryPath('core');

	const coreTargetAbs = path.join(projectRoot, coreDir);

	// 1) Detect entry
	const entry = detectEntryFile(projectRoot);
	if (!entry) {
		throw new Error(
			`[fleet-ui] Could not detect entry file. Expected app/_layout.tsx (Expo Router) or App.tsx/index.tsx in: ${projectRoot}`
		);
	}

	// 2) Copy core templates if missing
	if (!exists(coreTargetAbs)) {
		copyDir(registryCore, coreTargetAbs);
		console.log(`[fleet-ui] Created core at ${path.relative(projectRoot, coreTargetAbs)}`);
	} else {
		console.log(`[fleet-ui] Core already exists at ${path.relative(projectRoot, coreTargetAbs)} (skipped)`);
	}

	// 3) Patch tsconfig paths
	const tsPatch = patchTsconfigPaths({
		projectRoot,
		aliasPrefix,
		targetDir: 'fleet-ui',
	});
	console.log(`[fleet-ui] tsconfig paths ${tsPatch.changed ? 'updated' : 'ok'}: ${path.relative(projectRoot, tsPatch.tsconfigPath)}`);

	// 4) Patch babel config (alias + unistyles autoProcessImports)
	const babelPatch = patchBabelConfig({
		projectRoot,
		aliasPrefix,
		aliasTargetDir: './fleet-ui',
	});
	console.log(`[fleet-ui] babel config ${babelPatch.changed ? 'updated' : 'ok'}: ${path.relative(projectRoot, babelPatch.babelConfigPath)}`);
	for (const w of babelPatch.warnings) {
		console.warn(`[fleet-ui] warning: ${w}`);
	}

	// 5) Ensure entry import
	const importResult = ensureSideEffectImport({
		filePath: entry.entryFile,
		importPath: `${aliasPrefix}/core/unistyles`,
	});
	console.log(`[fleet-ui] entry import ${importResult.changed ? 'inserted' : 'ok'}: ${path.relative(projectRoot, entry.entryFile)}`);

	// Warn if the project still imports the package-based unistyles entry.
	// We do not auto-remove it to avoid unexpected changes, but importing both can configure twice.
	try {
		const entryText = readText(entry.entryFile);
		if (entryText.includes("import '@fleet-ui/core/unistyles';") || entryText.includes('import \"@fleet-ui/core/unistyles\";')) {
			console.warn(
				`[fleet-ui] warning: ${path.relative(projectRoot, entry.entryFile)} still imports '@fleet-ui/core/unistyles'. ` +
					`For local install track, keep only '${aliasPrefix}/core/unistyles'.`
			);
		}
	} catch {
		// ignore
	}

	// 6) Write fleet-ui.json
	writeFleetUiConfig(projectRoot, {
		schema: 1,
		aliasPrefix,
		coreDir,
		componentsDir,
		entryFile: path.relative(projectRoot, entry.entryFile),
	});

	// 7) Required peer deps check (instructions only)
	const pm = detectPackageManager(projectRoot);
	const pkgJsonPath = path.join(projectRoot, 'package.json');
	const missing: string[] = [];
	const missingDev: string[] = [];
	if (exists(pkgJsonPath)) {
		const pkg = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(pkgJsonPath);
		const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
		for (const dep of REQUIRED_PEER_DEPS) if (!deps[dep]) missing.push(dep);
		for (const dep of REQUIRED_DEV_DEPS) if (!deps[dep]) missingDev.push(dep);
	}

	if (missing.length) {
		console.warn('[fleet-ui] Missing required dependencies (Fleet UI will not run without these):');
		for (const dep of missing) console.warn(`  - ${dep}`);
		console.warn(`[fleet-ui] Install them with:\n  ${formatInstallCommand(pm, missing)}`);
	}

	if (missingDev.length) {
		console.warn('[fleet-ui] Missing required dev dependencies (needed for alias resolution):');
		for (const dep of missingDev) console.warn(`  - ${dep}`);
		console.warn(`[fleet-ui] Install them with:\n  ${formatInstallCommand(pm, missingDev, true)}`);
	}
}

