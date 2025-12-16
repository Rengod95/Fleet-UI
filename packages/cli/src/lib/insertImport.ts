import { readText, writeText } from './fs';

export type InsertImportResult = {
	changed: boolean;
};

export function ensureSideEffectImport(opts: {
	filePath: string;
	importPath: string;
}): InsertImportResult {
	const original = readText(opts.filePath);
	if (original.includes(`import '${opts.importPath}';`) || original.includes(`import \"${opts.importPath}\";`)) {
		return { changed: false };
	}

	// Insert after shebang if present, otherwise at file start.
	const lines = original.split('\n');
	let insertAt = 0;
	if (lines[0]?.startsWith('#!')) insertAt = 1;

	// Insert before first non-import statement, but after initial comment blocks.
	// Simple heuristic: find first line that starts with import.
	let firstImportLine = -1;
	for (let i = insertAt; i < lines.length; i++) {
		const line = lines[i] ?? '';
		if (line.trim().startsWith('import ')) {
			firstImportLine = i;
			break;
		}
		// stop if we reach actual code before any imports
		if (line.trim() && !line.trim().startsWith('//') && !line.trim().startsWith('/*') && !line.trim().startsWith('*')) {
			break;
		}
	}

	const importLine = `import '${opts.importPath}';`;
	if (firstImportLine >= 0) {
		lines.splice(firstImportLine, 0, importLine);
	} else {
		lines.splice(insertAt, 0, importLine);
	}

	writeText(opts.filePath, lines.join('\n'));
	return { changed: true };
}

