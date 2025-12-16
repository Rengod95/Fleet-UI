import path from 'node:path';
import { DEFAULT_ALIAS_PREFIX, REQUIRED_DEV_DEPS, REQUIRED_PEER_DEPS } from '../lib/constants';
import { resolveProjectRoot } from '../lib/detectProject';
import { detectEntryFile } from '../lib/detectEntry';
import { readFleetUiConfig } from '../lib/fleetUiJson';
import { exists, readJson, readText } from '../lib/fs';
import { detectPackageManager, formatInstallCommand } from '../lib/packageManager';

type DoctorOptions = {
	cwd?: string;
	alias?: string;
};

export async function runDoctor(opts: DoctorOptions) {
	const projectRoot = resolveProjectRoot(opts.cwd);
	const aliasPrefix = opts.alias ?? DEFAULT_ALIAS_PREFIX;

	const issues: { title: string; details: string }[] = [];

	// fleet-ui.json
	const cfg = readFleetUiConfig(projectRoot);
	if (!cfg) {
		issues.push({
			title: 'fleet-ui.json not found',
			details: `Run: fleet-ui init (project root: ${projectRoot})`,
		});
	}

	// entry import
	const entry = detectEntryFile(projectRoot);
	if (!entry) {
		issues.push({
			title: 'Entry file not detected',
			details: `Expected app/_layout.tsx (Expo Router) or App.tsx/index.tsx in ${projectRoot}`,
		});
	} else {
		const content = readText(entry.entryFile);
		const expected = `import '${aliasPrefix}/core/unistyles';`;
		if (!content.includes(expected)) {
			issues.push({
				title: 'Entry is missing Fleet UI unistyles import',
				details: `Add this to ${path.relative(projectRoot, entry.entryFile)}:\n${expected}`,
			});
		}
	}

	// tsconfig alias
	const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
	if (!exists(tsconfigPath)) {
		issues.push({
			title: 'tsconfig.json not found',
			details: 'Create tsconfig.json and add compilerOptions.paths for @fleet-ui/local/* → fleet-ui/*',
		});
	} else {
		const ts = readJson<any>(tsconfigPath);
		const paths = ts?.compilerOptions?.paths ?? {};
		const key = `${aliasPrefix}/*`;
		const val = paths[key];
		if (!Array.isArray(val) || val[0] !== 'fleet-ui/*') {
			issues.push({
				title: 'TypeScript paths alias missing or incorrect',
				details: `In tsconfig.json set:\n  compilerOptions.baseUrl = \".\"\n  compilerOptions.paths[\"${key}\"] = [\"fleet-ui/*\"]`,
			});
		}
	}

	// babel config alias + unistyles autoProcessImports (best-effort check)
	const babelCandidates = ['babel.config.js', 'babel.config.cjs', 'babel.config.mjs'];
	const babelPath = babelCandidates.map((f) => path.join(projectRoot, f)).find(exists);
	if (!babelPath) {
		issues.push({
			title: 'babel.config.* not found',
			details: 'Add babel-plugin-module-resolver with alias @fleet-ui/local → ./fleet-ui',
		});
	} else {
		const babel = readText(babelPath);
		if (!babel.includes('module-resolver')) {
			issues.push({
				title: 'babel-plugin-module-resolver not configured',
				details: `Add module-resolver plugin in ${path.relative(projectRoot, babelPath)} with alias '${aliasPrefix}': './fleet-ui'`,
			});
		}
		if (babel.includes('react-native-unistyles/plugin') && !babel.includes('autoProcessImports')) {
			issues.push({
				title: 'Unistyles plugin should include autoProcessImports',
				details: `In ${path.relative(projectRoot, babelPath)} add: autoProcessImports: ['${aliasPrefix}']`,
			});
		}
	}

	// required deps
	const pkgJsonPath = path.join(projectRoot, 'package.json');
	if (!exists(pkgJsonPath)) {
		issues.push({ title: 'package.json not found', details: `Expected ${pkgJsonPath}` });
	} else {
		const pkg = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(pkgJsonPath);
		const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
		const missing = REQUIRED_PEER_DEPS.filter((d) => !deps[d]);
		const missingDev = REQUIRED_DEV_DEPS.filter((d) => !deps[d]);
		if (missing.length) {
			const pm = detectPackageManager(projectRoot);
			issues.push({
				title: 'Missing required dependencies (Fleet UI will not run)',
				details: `Install:\n  ${formatInstallCommand(pm, missing as unknown as string[])}`,
			});
		}
		if (missingDev.length) {
			const pm = detectPackageManager(projectRoot);
			issues.push({
				title: 'Missing required dev dependencies (alias resolution)',
				details: `Install:\n  ${formatInstallCommand(pm, missingDev as unknown as string[], true)}`,
			});
		}
	}

	if (!issues.length) {
		console.log('[fleet-ui] ✅ doctor: all good');
		return;
	}

	console.log(`[fleet-ui] doctor found ${issues.length} issue(s):`);
	for (const it of issues) {
		console.log(`\n- ${it.title}\n${it.details}`);
	}
}

