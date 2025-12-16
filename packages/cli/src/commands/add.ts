import path from 'node:path';
import { DEFAULT_ALIAS_PREFIX, DEFAULT_COMPONENTS_DIR } from '../lib/constants';
import { resolveProjectRoot } from '../lib/detectProject';
import { readFleetUiConfig } from '../lib/fleetUiJson';
import { copyDir, ensureDir, exists, readText, writeText } from '../lib/fs';
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
		await runInit({ cwd: projectRoot, alias: aliasPrefix, componentsDir });
	}

	const manifest = loadRegistryManifest();

	const compsTargetAbs = path.join(projectRoot, componentsDir);
	ensureDir(compsTargetAbs);

	const exported: string[] = [];

	for (const rawName of names) {
		const name = rawName.trim();
		const meta = manifest.components.available[name];
		if (!meta) {
			console.warn(`[fleet-ui] Unknown component: ${name}. Available: ${Object.keys(manifest.components.available).join(', ')}`);
			continue;
		}

		const srcAbs = resolveRegistryPath(meta.source);
		const dstAbs = path.join(compsTargetAbs, name);

		if (exists(dstAbs)) {
			console.warn(`[fleet-ui] Component already exists (skipped): ${path.relative(projectRoot, dstAbs)}`);
			exported.push(name);
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

		console.log(`[fleet-ui] Added ${name}: ${path.relative(projectRoot, dstAbs)}`);
		exported.push(name);
	}

	// Update barrel file
	if (exported.length) {
		const indexPath = path.join(compsTargetAbs, 'index.ts');
		const existing = exists(indexPath) ? readText(indexPath) : '';
		const lines = new Set(existing.split('\n').filter(Boolean));
		for (const name of exported) {
			lines.add(`export * from './${name}';`);
		}
		const sorted = Array.from(lines).sort();
		writeText(indexPath, `${sorted.join('\n')}\n`);
	}
}

