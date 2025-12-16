import path from 'node:path';

export function resolveProjectRoot(cwd?: string) {
	return path.resolve(cwd ?? process.cwd());
}

