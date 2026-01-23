import path from 'node:path';
import { DEFAULT_ALIAS_PREFIX, DEFAULT_COMPONENTS_DIR } from '../lib/constants';
import { resolveProjectRoot } from '../lib/detectProject';
import { readFleetUiConfig } from '../lib/fleetUiJson';
import { copyDir, ensureDir, exists, readText, writeText } from '../lib/fs';
import { logger } from '../lib/logger';
import { runInit } from './init';
import { loadRegistryManifest, resolveRegistryPath } from '../lib/registry';
import { replaceCoreImports } from '../lib/replaceImports';

type AddOptions = {
	cwd?: string;
	componentsDir?: string;
	alias?: string;
};

export async function runAdd(names: string[], opts: AddOptions) {
	const projectRoot = resolveProjectRoot(opts.cwd);
	const aliasPrefix = opts.alias ?? DEFAULT_ALIAS_PREFIX;
	const componentsDir = opts.componentsDir ?? DEFAULT_COMPONENTS_DIR;

	// Ensure init
	if (!readFleetUiConfig(projectRoot)) {
		logger.info('Project not initialized, running init first...');
		await runInit({ cwd: projectRoot, alias: aliasPrefix, componentsDir });
	}

	const manifest = loadRegistryManifest();
	const compsTargetAbs = path.join(projectRoot, componentsDir);
	ensureDir(compsTargetAbs);

	logger.section(`Adding ${names.length} component(s)`);

	const added: string[] = [];
	const skipped: string[] = [];
	const notFound: string[] = [];

	for (const rawName of names) {
		const name = rawName.trim();
		const meta = manifest.components.available[name];

		if (!meta) {
			notFound.push(name);
			logger.error(`Unknown component: ${name}`);
			continue;
		}

		const srcAbs = resolveRegistryPath(meta.source);
		const dstAbs = path.join(compsTargetAbs, name);

		if (exists(dstAbs)) {
			skipped.push(name);
			logger.skip(`${name} (already exists)`);
			continue;
		}

		copyDir(srcAbs, dstAbs);

		// Rewrite imports inside copied files (best-effort)
		const filesToRewrite = [
			path.join(dstAbs, `${name}.tsx`),
			path.join(dstAbs, `${name}.types.ts`),
			path.join(dstAbs, 'index.ts'),
			path.join(dstAbs, `${name}.context.ts`),
			path.join(dstAbs, `${name}.context.tsx`),
			path.join(dstAbs, `${name}.ts`),
		];
		for (const f of filesToRewrite) {
			if (!exists(f)) continue;
			const before = readText(f);
			const after = replaceCoreImports({
				contents: before,
				fromPrefix: '@fleet-ui/core',
				toPrefix: `${aliasPrefix}/core`,
			});
			if (after !== before) writeText(f, after);
		}

		added.push(name);
		logger.success(`${name} → ${path.relative(projectRoot, dstAbs)}`);
	}

	// Update barrel file
	const exported = [...added, ...skipped];
	if (exported.length) {
		const indexPath = path.join(compsTargetAbs, 'index.ts');
		const existing = exists(indexPath) ? readText(indexPath) : '';
		const lines = new Set(existing.split('\n').filter(Boolean));
		for (const name of exported) {
			lines.add(`export * from './${name}';`);
		}
		const sorted = Array.from(lines).sort();
		writeText(indexPath, `${sorted.join('\n')}\n`);
		logger.detail('Updated components/index.ts');
	}

	// Summary
	logger.newline();
	if (added.length) {
		logger.success(`Added ${added.length} component(s): ${added.join(', ')}`);
	}
	if (skipped.length) {
		logger.info(`Skipped ${skipped.length} (already exist): ${skipped.join(', ')}`);
	}
	if (notFound.length) {
		logger.warn(`Not found: ${notFound.join(', ')}`);
		logger.detail('Available components:');
		logger.command(Object.keys(manifest.components.available).join(', '));
	}
}

