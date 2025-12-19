import fs from 'node:fs';
import path from 'node:path';

import { darkTheme } from '../../packages/core/src/theme/darkTheme';
import { lightTheme } from '../../packages/core/src/theme/lightTheme';

type Palette = Record<string, string>;

function gradientToCss(values: Record<string, string>) {
	// values keys are stops like "0", "0.4", "1"
	const stops = Object.entries(values)
		.map(([k, v]) => [Number(k), v] as const)
		.sort((a, b) => a[0] - b[0])
		.map(([k, v]) => `${v} ${Math.round(k * 100)}%`)
		.join(', ');
	return `linear-gradient(135deg, ${stops})`;
}

function pickThemeVars(theme: any) {
	const neutral = theme.colors.neutral as Palette;
	const primary = theme.colors.primary as Palette;

	return {
		background: neutral.content_1,
		foreground: neutral.text_1,
		muted: neutral.content_2,
		mutedForeground: neutral.text_3,
		border: neutral.border_default,
		primary: primary.solid ?? primary.border_default,
		primaryForeground: primary.text_inversed ?? neutral.text_inversed,
		gradientPrimary: gradientToCss(theme.gradients.primary.values),
	};
}

function toCssBlock(selector: string, vars: ReturnType<typeof pickThemeVars>) {
	return `${selector} {\n` +
		`  /* Generated file. Do not edit by hand. */\n` +
		`  --background: ${vars.background};\n` +
		`  --foreground: ${vars.foreground};\n` +
		`  --muted: ${vars.muted};\n` +
		`  --muted-foreground: ${vars.mutedForeground};\n` +
		`  --border: ${vars.border};\n` +
		`  --primary: ${vars.primary};\n` +
		`  --primary-foreground: ${vars.primaryForeground};\n` +
		`  --fleet-gradient-primary: ${vars.gradientPrimary};\n` +
		`}\n`;
}

const outPath = path.join(__dirname, '..', 'styles', 'fleet-ui-theme.css');
const light = pickThemeVars(lightTheme);
const dark = pickThemeVars(darkTheme);

const css =
	`${toCssBlock(':root', light)}\n` +
	`${toCssBlock('.dark', dark)}\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, css, 'utf8');

console.log(`[docs] generated: ${outPath}`);

