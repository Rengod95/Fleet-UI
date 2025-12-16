import path from 'node:path';
import { exists } from './fs';

export type EntryDetection = {
	entryFile: string; // absolute
	kind: 'expo-router' | 'react-native' | 'unknown';
};

export function detectEntryFile(projectRoot: string): EntryDetection | null {
	const expoRouterLayout = path.join(projectRoot, 'app', '_layout.tsx');
	if (exists(expoRouterLayout)) {
		return { entryFile: expoRouterLayout, kind: 'expo-router' };
	}

	const candidates = [
		'App.tsx',
		'App.ts',
		'src/App.tsx',
		'src/App.ts',
		'index.tsx',
		'index.ts',
		'index.js',
	];

	for (const rel of candidates) {
		const abs = path.join(projectRoot, rel);
		if (exists(abs)) return { entryFile: abs, kind: 'react-native' };
	}

	return null;
}

