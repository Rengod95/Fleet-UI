import path from 'node:path';
import { DEFAULT_ALIAS_PREFIX, DEFAULT_COMPONENTS_DIR, DEFAULT_CORE_DIR, REQUIRED_DEV_DEPS, REQUIRED_PEER_DEPS } from '../lib/constants';
import { detectEntryFile } from '../lib/detectEntry';
import { copyDir, exists, readJson, readText } from '../lib/fs';
import { ensureSideEffectImport } from '../lib/insertImport';
import { logger } from '../lib/logger';
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
	entry?: string;
};

type StepStatus = 'success' | 'failed' | 'skipped';

type StepResult = {
	step: number;
	name: string;
	status: StepStatus;
	message?: string;
	error?: Error;
};

function runStep<T>(
	step: number,
	name: string,
	fn: () => T,
): { result: T | null; stepResult: StepResult } {
	try {
		const result = fn();
		return {
			result,
			stepResult: { step, name, status: 'success' },
		};
	} catch (err) {
		const error = err instanceof Error ? err : new Error(String(err));
		return {
			result: null,
			stepResult: { step, name, status: 'failed', error, message: error.message },
		};
	}
}

export async function runInit(opts: InitOptions) {
	const projectRoot = resolveProjectRoot(opts.cwd);

	const aliasPrefix = opts.alias ?? DEFAULT_ALIAS_PREFIX;
	const coreDir = opts.coreDir ?? DEFAULT_CORE_DIR;
	const componentsDir = opts.componentsDir ?? DEFAULT_COMPONENTS_DIR;

	const registryCore = resolveRegistryPath('core');
	const coreTargetAbs = path.join(projectRoot, coreDir);

	const results: StepResult[] = [];
	const TOTAL_STEPS = 6;

	logger.section('Initializing Fleet UI');

	// 1) Detect or use specified entry
	logger.step(1, TOTAL_STEPS, opts.entry ? 'Using specified entry file' : 'Detecting entry file');
	const { result: entry, stepResult: step1Result } = runStep(1, 'Detect entry file', () => {
		// If user specified an entry file, use it
		if (opts.entry) {
			const entryPath = path.isAbsolute(opts.entry) ? opts.entry : path.join(projectRoot, opts.entry);
			if (!exists(entryPath)) {
				throw new Error(`Specified entry file not found: ${opts.entry}`);
			}
			logger.detail(`Using: ${path.relative(projectRoot, entryPath)}`);
			return { entryFile: entryPath, type: 'custom' as const };
		}

		// Otherwise, auto-detect
		const detected = detectEntryFile(projectRoot);
		if (!detected) {
			throw new Error(
				`Could not detect entry file. Expected app/_layout.tsx (Expo Router) or App.tsx/index.tsx in: ${projectRoot}\n` +
					`Tip: Use --entry <path> to specify the entry file manually.`
			);
		}
		logger.detail(`Found: ${path.relative(projectRoot, detected.entryFile)}`);
		return detected;
	});
	results.push(step1Result);

	// 2) Copy core templates if missing
	logger.step(2, TOTAL_STEPS, 'Setting up core templates');
	const { stepResult: step2Result } = runStep(2, 'Copy core templates', () => {
		if (!exists(coreTargetAbs)) {
			copyDir(registryCore, coreTargetAbs);
			logger.detail(`Created: ${path.relative(projectRoot, coreTargetAbs)}`);
		} else {
			logger.detail(`Already exists: ${path.relative(projectRoot, coreTargetAbs)}`);
		}
	});
	results.push(step2Result);

	// 3) Patch tsconfig paths
	logger.step(3, TOTAL_STEPS, 'Configuring TypeScript paths');
	const { stepResult: step3Result } = runStep(3, 'Patch tsconfig paths', () => {
		const tsPatch = patchTsconfigPaths({
			projectRoot,
			aliasPrefix,
			targetDir: 'fleet-ui',
		});
		logger.detail(`${path.relative(projectRoot, tsPatch.tsconfigPath)} ${tsPatch.changed ? '(updated)' : '(no changes)'}`);
	});
	results.push(step3Result);

	// 4) Patch babel config (alias + unistyles autoProcessImports)
	logger.step(4, TOTAL_STEPS, 'Configuring Babel');
	const { stepResult: step4Result } = runStep(4, 'Patch babel config', () => {
		const babelPatch = patchBabelConfig({
			projectRoot,
			aliasPrefix,
			aliasTargetDir: './fleet-ui',
		});
		logger.detail(`${path.relative(projectRoot, babelPatch.babelConfigPath)} ${babelPatch.changed ? '(updated)' : '(no changes)'}`);
		for (const w of babelPatch.warnings) {
			logger.warn(w);
		}
	});
	results.push(step4Result);

	// 5) Ensure entry import (depends on step 1)
	logger.step(5, TOTAL_STEPS, 'Adding unistyles import');
	if (entry) {
		const { stepResult: step5Result } = runStep(5, 'Ensure entry import', () => {
			const importResult = ensureSideEffectImport({
				filePath: entry.entryFile,
				importPath: `${aliasPrefix}/core/unistyles`,
			});
			logger.detail(`${path.relative(projectRoot, entry.entryFile)} ${importResult.changed ? '(updated)' : '(no changes)'}`);

			// Warn if the project still imports the package-based unistyles entry.
			try {
				const entryText = readText(entry.entryFile);
				if (entryText.includes("import '@fleet-ui/core/unistyles';") || entryText.includes('import "@fleet-ui/core/unistyles";')) {
					logger.warn(`Remove '@fleet-ui/core/unistyles' import, keep only '${aliasPrefix}/core/unistyles'`);
				}
			} catch {
				// ignore
			}
		});
		results.push(step5Result);
	} else {
		results.push({ step: 5, name: 'Ensure entry import', status: 'skipped', message: 'Entry file not detected' });
		logger.skip('Skipped (entry file not detected)');
	}

	// 6) Write fleet-ui.json (depends on step 1 for entryFile path)
	logger.step(6, TOTAL_STEPS, 'Writing configuration');
	const { stepResult: step6Result } = runStep(6, 'Write fleet-ui.json', () => {
		writeFleetUiConfig(projectRoot, {
			schema: 1,
			aliasPrefix,
			coreDir,
			componentsDir,
			entryFile: entry ? path.relative(projectRoot, entry.entryFile) : undefined,
		});
		logger.detail('fleet-ui.json created');
	});
	results.push(step6Result);

	// Print summary
	const failed = results.filter((r) => r.status === 'failed');

	logger.summary(
		results.map((r) => ({
			label: `Step ${r.step}: ${r.name}`,
			status: r.status,
			detail: r.message,
		})),
	);

	if (failed.length > 0) {
		logger.newline();
		logger.error(`${failed.length} step(s) failed. Fix the errors and run init again.`);
	}

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
		logger.newline();
		logger.warn('Missing required dependencies:');
		logger.list(missing);
		logger.detail('Install with:');
		logger.command(formatInstallCommand(pm, missing));
	}

	if (missingDev.length) {
		logger.newline();
		logger.warn('Missing dev dependencies (for alias resolution):');
		logger.list(missingDev);
		logger.detail('Install with:');
		logger.command(formatInstallCommand(pm, missingDev, true));
	}

	if (!failed.length && !missing.length && !missingDev.length) {
		logger.newline();
		logger.success('Fleet UI initialized successfully!');
	}
}

