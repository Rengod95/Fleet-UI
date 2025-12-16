import path from 'node:path';
import { exists } from './fs';

export type PackageManager = 'pnpm' | 'yarn' | 'npm';

export function detectPackageManager(projectRoot: string): PackageManager {
	if (exists(path.join(projectRoot, 'pnpm-lock.yaml'))) return 'pnpm';
	if (exists(path.join(projectRoot, 'yarn.lock'))) return 'yarn';
	if (exists(path.join(projectRoot, 'package-lock.json'))) return 'npm';
	return 'npm';
}

export function formatInstallCommand(
	pm: PackageManager,
	deps: string[],
	dev = false
) {
	const list = deps.join(' ');
	if (pm === 'pnpm') return dev ? `pnpm add -D ${list}` : `pnpm add ${list}`;
	if (pm === 'yarn') return dev ? `yarn add -D ${list}` : `yarn add ${list}`;
	return dev ? `npm i -D ${list}` : `npm i ${list}`;
}

