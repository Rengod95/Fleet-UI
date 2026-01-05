import fs from 'node:fs';
import path from 'node:path';

import { darkTheme } from '../../packages/core/src/theme/darkTheme';
import { lightTheme } from '../../packages/core/src/theme/lightTheme';

type Palette = Record<string, string>;
type TypographyScale = {
	fontSize: number;
	fontWeight: string;
	lineHeight: number;
	letterSpacing: number;
};

function px(n: number) {
	return `${n}px`;
}

function fontFamilyToCss(value: unknown) {
	if (Array.isArray(value)) return value.join(', ');
	if (typeof value === 'string') return value;
	return 'system-ui, -apple-system, sans-serif';
}

function gradientToCss(values: Record<string, string>) {
	// values keys are stops like "0", "0.4", "1"
	const stops = Object.entries(values)
		.map(([k, v]) => [Number(k), v] as const)
		.sort((a, b) => a[0] - b[0])
		.map(([k, v]) => `${v} ${Math.round(k * 100)}%`)
		.join(', ');
	return `linear-gradient(135deg, ${stops})`;
}

function pickThemeVars(theme: any, mode: 'light' | 'dark') {
	const neutral = theme.colors.neutral as Palette;
	const primary = theme.colors.primary as Palette;
	const error = theme.colors.error as Palette;
	const success = theme.colors.success as Palette;
	const warning = theme.colors.warning as Palette;
	const info = theme.colors.info as Palette;

	// "borderless surface" 스타일:
	// - Light: page background는 content_2(살짝 그레이), card는 content_1(화이트)
	// - Dark: page background는 content_1(가장 어두운), card는 content_2(살짝 밝은)
	const background = mode === 'light' ? neutral.content_2 : neutral.content_1;
	const card = mode === 'light' ? neutral.content_1 : neutral.content_2;

	return {
		// Core (Fleet)
		background,
		foreground: neutral.text_1,
		muted: mode === 'light' ? neutral.content_3 : neutral.content_2,
		mutedForeground: neutral.text_3,
		border: neutral.border_subtle,
		primary: primary.solid ?? primary.border_default,
		primaryForeground: primary.text_inversed ?? neutral.text_inversed,
		gradientPrimary: gradientToCss(theme.gradients.primary.values),

		// shadcn/ui variables (derive from Fleet tokens)
		radius: '0.625rem',
		card,
		cardForeground: neutral.text_1,
		popover: card,
		popoverForeground: neutral.text_1,
		secondary: mode === 'light' ? neutral.content_3 : neutral.content_2,
		secondaryForeground: neutral.text_1,
		accent: mode === 'light' ? neutral.content_3 : neutral.content_2,
		accentForeground: neutral.text_1,
		destructive: error.solid ?? error.border_default,
		input: neutral.border_subtle,
		ring: primary.border_default ?? primary.solid,

		// optional but expected by shadcn defaults
		sidebar: background,
		sidebarForeground: neutral.text_1,
		sidebarPrimary: primary.solid ?? primary.border_default,
		sidebarPrimaryForeground: primary.text_inversed ?? neutral.text_inversed,
		sidebarAccent: mode === 'light' ? neutral.content_3 : neutral.content_2,
		sidebarAccentForeground: neutral.text_1,
		sidebarBorder: neutral.border_subtle,
		sidebarRing: primary.border_default ?? primary.solid,
		chart1: primary.solid ?? primary.border_default,
		chart2: success.solid ?? success.border_default,
		chart3: warning.solid ?? warning.border_default,
		chart4: info.solid ?? info.border_default,
		chart5: error.solid ?? error.border_default,

		// Typography
		fontSans: fontFamilyToCss(theme.text?.fontFamily?.primary),
		fontMono: fontFamilyToCss(theme.text?.fontFamily?.mono),
		typography: theme.typography as Record<string, TypographyScale>,
	};
}

function toCssBlock(selector: string, vars: ReturnType<typeof pickThemeVars>) {
	const typographyLines = Object.entries(vars.typography ?? {})
		.map(([key, v]) => {
			return (
				`  --fleet-typo-${key}-font-size: ${px(v.fontSize)};\n` +
				`  --fleet-typo-${key}-line-height: ${px(v.lineHeight)};\n` +
				`  --fleet-typo-${key}-font-weight: ${v.fontWeight};\n` +
				`  --fleet-typo-${key}-letter-spacing: ${px(v.letterSpacing)};\n`
			);
		})
		.join('');

	return `${selector} {\n` +
		`  /* Generated file. Do not edit by hand. */\n` +
		`  --radius: ${vars.radius};\n` +
		`  --background: ${vars.background};\n` +
		`  --foreground: ${vars.foreground};\n` +
		`  --card: ${vars.card};\n` +
		`  --card-foreground: ${vars.cardForeground};\n` +
		`  --popover: ${vars.popover};\n` +
		`  --popover-foreground: ${vars.popoverForeground};\n` +
		`  --muted: ${vars.muted};\n` +
		`  --muted-foreground: ${vars.mutedForeground};\n` +
		`  --secondary: ${vars.secondary};\n` +
		`  --secondary-foreground: ${vars.secondaryForeground};\n` +
		`  --accent: ${vars.accent};\n` +
		`  --accent-foreground: ${vars.accentForeground};\n` +
		`  --destructive: ${vars.destructive};\n` +
		`  --border: ${vars.border};\n` +
		`  --input: ${vars.input};\n` +
		`  --ring: ${vars.ring};\n` +
		`  --primary: ${vars.primary};\n` +
		`  --primary-foreground: ${vars.primaryForeground};\n` +
		`  --sidebar: ${vars.sidebar};\n` +
		`  --sidebar-foreground: ${vars.sidebarForeground};\n` +
		`  --sidebar-primary: ${vars.sidebarPrimary};\n` +
		`  --sidebar-primary-foreground: ${vars.sidebarPrimaryForeground};\n` +
		`  --sidebar-accent: ${vars.sidebarAccent};\n` +
		`  --sidebar-accent-foreground: ${vars.sidebarAccentForeground};\n` +
		`  --sidebar-border: ${vars.sidebarBorder};\n` +
		`  --sidebar-ring: ${vars.sidebarRing};\n` +
		`  --chart-1: ${vars.chart1};\n` +
		`  --chart-2: ${vars.chart2};\n` +
		`  --chart-3: ${vars.chart3};\n` +
		`  --chart-4: ${vars.chart4};\n` +
		`  --chart-5: ${vars.chart5};\n` +
		`  --fleet-font-sans: ${vars.fontSans};\n` +
		`  --fleet-font-mono: ${vars.fontMono};\n` +
		typographyLines +
		`  --fleet-gradient-primary: ${vars.gradientPrimary};\n` +
		`}\n`;
}

const outPath = path.join(__dirname, '..', 'styles', 'fleet-ui-theme.css');
const light = pickThemeVars(lightTheme, 'light');
const dark = pickThemeVars(darkTheme, 'dark');

const css =
	`${toCssBlock(':root', light)}\n` +
	`${toCssBlock('.dark', dark)}\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, css, 'utf8');

console.log(`[docs] generated: ${outPath}`);

