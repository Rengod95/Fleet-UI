import path from 'node:path';
import { exists, readJson, writeJson } from './fs';

type TsConfig = {
	compilerOptions?: {
		baseUrl?: string;
		paths?: Record<string, string[]>;
		[k: string]: unknown;
	};
	extends?: string;
	[k: string]: unknown;
};

export type PatchTsconfigResult = {
	tsconfigPath: string;
	changed: boolean;
};

export function patchTsconfigPaths(opts: {
	projectRoot: string;
	aliasPrefix: string; // e.g. @fleet-ui/local
	targetDir: string; // e.g. fleet-ui
}): PatchTsconfigResult {
	const tsconfigPath = path.join(opts.projectRoot, 'tsconfig.json');
	if (!exists(tsconfigPath)) {
		// For now, we only support projects with tsconfig.json.
		// Doctor will report this as an action item.
		return { tsconfigPath, changed: false };
	}

	const json = readJson<TsConfig>(tsconfigPath);
	const compilerOptions = (json.compilerOptions ??= {});

	if (!compilerOptions.baseUrl) compilerOptions.baseUrl = '.';
	const paths = (compilerOptions.paths ??= {});

	const key = `${opts.aliasPrefix}/*`;
	const value = [`${opts.targetDir}/*`];

	const current = paths[key];
	if (Array.isArray(current) && current.join('|') === value.join('|')) {
		return { tsconfigPath, changed: false };
	}

	paths[key] = value;
	writeJson(tsconfigPath, json);
	return { tsconfigPath, changed: true };
}

