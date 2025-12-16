import path from 'node:path';
import { exists, readText, writeText } from './fs';

export type PatchBabelResult = {
	babelConfigPath: string;
	changed: boolean;
	warnings: string[];
};

function detectBabelConfig(projectRoot: string) {
	const candidates = ['babel.config.js', 'babel.config.cjs', 'babel.config.mjs'];
	for (const f of candidates) {
		const p = path.join(projectRoot, f);
		if (exists(p)) return p;
	}
	return null;
}

function hasSubstring(haystack: string, needle: string) {
	return haystack.includes(needle);
}

export function patchBabelConfig(opts: {
	projectRoot: string;
	aliasPrefix: string; // @fleet-ui/local
	aliasTargetDir: string; // ./fleet-ui
}): PatchBabelResult {
	const warnings: string[] = [];
	const babelConfigPath = detectBabelConfig(opts.projectRoot);
	if (!babelConfigPath) {
		return { babelConfigPath: path.join(opts.projectRoot, 'babel.config.js'), changed: false, warnings: ['No babel.config.* found.'] };
	}

	const original = readText(babelConfigPath);

	// Idempotency checks
	const hasModuleResolver = hasSubstring(original, 'module-resolver') || hasSubstring(original, 'babel-plugin-module-resolver');
	const hasAlias = hasSubstring(original, `'${opts.aliasPrefix}'`) || hasSubstring(original, `"${opts.aliasPrefix}"`);
	const hasUnistylesPlugin = hasSubstring(original, 'react-native-unistyles/plugin');
	const hasAutoProcessImports = hasSubstring(original, 'autoProcessImports');

	let next = original;

	// 1) Ensure module-resolver plugin block exists (best-effort string patch)
	// We insert it at the top of plugins array if a plugins: [ ... ] is found.
	if (!hasModuleResolver) {
		const pluginsArrayMatch = next.match(/plugins\s*:\s*\[/);
		if (pluginsArrayMatch) {
			next = next.replace(
				/plugins\s*:\s*\[/,
				`plugins: [\n\t\t\t[\n\t\t\t\t'module-resolver',\n\t\t\t\t{\n\t\t\t\t\troot: ['./'],\n\t\t\t\t\talias: {\n\t\t\t\t\t\t'${opts.aliasPrefix}': '${opts.aliasTargetDir}',\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t],`
			);
		} else {
			warnings.push('Could not find plugins: [ ... ] in babel config. Please add module-resolver manually.');
		}
	} else if (!hasAlias) {
		warnings.push(`module-resolver detected but alias '${opts.aliasPrefix}' not found. Please ensure it points to '${opts.aliasTargetDir}'.`);
	}

	// 2) Ensure unistyles plugin processes imports from alias (autoProcessImports)
	// If unistyles plugin exists and autoProcessImports is missing, we try to inject it into the options object.
	if (hasUnistylesPlugin && !hasAutoProcessImports) {
		// Best-effort: if we find `root: '...'` inside the unistyles options object, inject autoProcessImports after it.
		// This intentionally supports the most common Expo config style.
		const rootLine = next.match(/root\s*:\s*['"][^'"]+['"]\s*,/);
		if (rootLine) {
			next = next.replace(
				rootLine[0],
				`${rootLine[0]}\n\t\t\t\t\tautoProcessImports: ['${opts.aliasPrefix}'],`
			);
		} else {
			warnings.push('Unistyles plugin detected but could not locate `root:` to inject autoProcessImports.');
		}
	}

	if (next === original) {
		return { babelConfigPath, changed: false, warnings };
	}

	writeText(babelConfigPath, next);
	return { babelConfigPath, changed: true, warnings };
}

