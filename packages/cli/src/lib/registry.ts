import path from 'node:path';
import { readJson } from './fs';

type RegistryManifest = {
	schema: number;
	aliasPrefix: string;
	core: { source: string; defaultTargetDir: string };
	components: {
		defaultTargetDir: string;
		available: Record<string, { source: string; optionalPeerDeps: string[] }>;
	};
};

export function registryRootDir() {
	// Note: tsup bundles the CLI into dist/index.js, so __dirname is typically `.../packages/cli/dist`.
	// The embedded registry is located at `.../packages/cli/registry`.
	return path.resolve(__dirname, '../registry');
}

export function loadRegistryManifest(): RegistryManifest {
	const root = registryRootDir();
	return readJson<RegistryManifest>(path.join(root, 'manifest.json'));
}

export function resolveRegistryPath(rel: string) {
	return path.join(registryRootDir(), rel);
}

