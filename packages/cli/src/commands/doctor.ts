import path from 'node:path';
import { DEFAULT_ALIAS_PREFIX, REQUIRED_DEV_DEPS, REQUIRED_PEER_DEPS } from '../lib/constants';
import { resolveProjectRoot } from '../lib/detectProject';
import { detectEntryFile } from '../lib/detectEntry';
import { readFleetUiConfig } from '../lib/fleetUiJson';
import { exists, readJson, readText } from '../lib/fs';
import { logger } from '../lib/logger';
import { detectPackageManager, formatInstallCommand } from '../lib/packageManager';

type DoctorOptions = {
	cwd?: string;
	alias?: string;
};

export async function runDoctor(opts: DoctorOptions) {
	const projectRoot = resolveProjectRoot(opts.cwd);
	const aliasPrefix = opts.alias ?? DEFAULT_ALIAS_PREFIX;

	logger.section('Running diagnostics');

	const issues: { title: string; details: string; fix?: string }[] = [];

	// fleet-ui.json
	const cfg = readFleetUiConfig(projectRoot);
	if (!cfg) {
		issues.push({
			title: 'fleet-ui.json not found',
			details: 'Project has not been initialized',
			fix: 'fleet-ui init',
		});
	} else {
		logger.success('fleet-ui.json found');
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
				details: path.relative(projectRoot, entry.entryFile),
				fix: expected,
			});
		} else {
			logger.success(`Entry import configured (${path.relative(projectRoot, entry.entryFile)})`);
		}
	}

	// tsconfig alias
	const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
	if (!exists(tsconfigPath)) {
		issues.push({
			title: 'tsconfig.json not found',
			details: 'TypeScript configuration is missing',
		});
	} else {
		const ts = readJson<Record<string, unknown>>(tsconfigPath);
		const compilerOptions = ts?.compilerOptions as Record<string, unknown> | undefined;
		const paths = (compilerOptions?.paths as Record<string, string[]>) ?? {};
		const key = `${aliasPrefix}/*`;
		const val = paths[key];
		if (!Array.isArray(val) || val[0] !== 'fleet-ui/*') {
			issues.push({
				title: 'TypeScript paths alias missing',
				details: `compilerOptions.paths["${key}"] should be ["fleet-ui/*"]`,
			});
		} else {
			logger.success('TypeScript paths configured');
		}
	}

	// babel config alias + unistyles autoProcessImports (best-effort check)
	const babelCandidates = ['babel.config.js', 'babel.config.cjs', 'babel.config.mjs'];
	const babelPath = babelCandidates.map((f) => path.join(projectRoot, f)).find(exists);
	if (!babelPath) {
		issues.push({
			title: 'babel.config.* not found',
			details: 'Babel configuration required for module resolution',
		});
	} else {
		const babel = readText(babelPath);
		let babelOk = true;
		if (!babel.includes('module-resolver')) {
			babelOk = false;
			issues.push({
				title: 'babel-plugin-module-resolver not configured',
				details: `In ${path.relative(projectRoot, babelPath)}`,
				fix: `alias { '${aliasPrefix}': './fleet-ui' }`,
			});
		}
		if (babel.includes('react-native-unistyles/plugin') && !babel.includes('autoProcessImports')) {
			babelOk = false;
			issues.push({
				title: 'Unistyles autoProcessImports not set',
				details: `In ${path.relative(projectRoot, babelPath)}`,
				fix: `autoProcessImports: ['${aliasPrefix}']`,
			});
		}
		if (babelOk) {
			logger.success('Babel configured');
		}
	}

	// required deps
	const pkgJsonPath = path.join(projectRoot, 'package.json');
	if (!exists(pkgJsonPath)) {
		issues.push({ title: 'package.json not found', details: 'Project root may be incorrect' });
	} else {
		const pkg = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(pkgJsonPath);
		const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
		const missing = REQUIRED_PEER_DEPS.filter((d) => !deps[d]);
		const missingDev = REQUIRED_DEV_DEPS.filter((d) => !deps[d]);
		if (missing.length) {
			const pm = detectPackageManager(projectRoot);
			issues.push({
				title: 'Missing required dependencies',
				details: missing.join(', '),
				fix: formatInstallCommand(pm, missing as unknown as string[]),
			});
		} else {
			logger.success('Required dependencies installed');
		}
		if (missingDev.length) {
			const pm = detectPackageManager(projectRoot);
			issues.push({
				title: 'Missing dev dependencies',
				details: missingDev.join(', '),
				fix: formatInstallCommand(pm, missingDev as unknown as string[], true),
			});
		} else {
			logger.success('Dev dependencies installed');
		}
	}

	logger.newline();

	if (!issues.length) {
		logger.success('All checks passed! Fleet UI is properly configured.');
		return;
	}

	logger.error(`Found ${issues.length} issue(s):`);
	logger.newline();

	for (let i = 0; i < issues.length; i++) {
		const issue = issues[i];
		logger.warn(`${i + 1}. ${issue.title}`);
		logger.detail(issue.details);
		if (issue.fix) {
			logger.command(issue.fix);
		}
		logger.newline();
	}
}

