/*
 * Raw Color Generator
 * - HSL based generator moved from legacy theme.ts
 * - Produces 10-step scales for light/dark palettes per category
 */

type ColorScale = {
	'1': string;
	'2': string;
	'3': string;
	'4': string;
	'5': string;
	'6': string;
	'7': string;
	'8': string;
	'9': string;
	'10': string;
};

const clamp = (v: number, min: number, max: number) =>
	Math.max(min, Math.min(max, v));

const hsl = (h: number, s: number, l: number) =>
	`hsl(${Math.round(h)} ${clamp(s, 0, 100)}% ${clamp(l, 0, 100)}%)`;

const arrayToScale = (values: string[]): ColorScale =>
	Object.fromEntries(
		values.map((value, index) => [String(index + 1), value])
	) as ColorScale;

const buildScale = (h: number, sArr: number[], lArr: number[]) =>
	arrayToScale(sArr.map((s, i) => hsl(h, s, lArr[i])));

const buildSemanticScale = (
	h: number,
	sLight: number,
	sStrong: number,
	lLight: number,
	lStrong: number
): ColorScale => {
	const steps = 10;
	const sStep = (sStrong - sLight) / (steps - 1);
	const lStep = (lStrong - lLight) / (steps - 1);
	const out: string[] = [];

	for (let i = 0; i < steps; i++) {
		out.push(hsl(h, sLight + sStep * i, lLight + lStep * i));
	}

	return arrayToScale(out);
};

const buildSemanticDarkScale = (
	h: number,
	sLow: number,
	sHigh: number,
	lLow: number,
	lHigh: number
): ColorScale => {
	const steps = 10;
	const sStep = (sHigh - sLow) / (steps - 1);
	const lStep = (lHigh - lLow) / (steps - 1);
	const out: string[] = [];

	for (let i = 0; i < steps; i++) {
		out.push(hsl(h, sLow + sStep * i, lLow + lStep * i));
	}

	return arrayToScale(out);
};

const NEUTRAL_H = 220;
const neutralLightS = [2, 2, 2, 2, 3, 3, 4, 5, 6, 7];
const neutralLightL = [99, 97, 95, 92, 88, 78, 64, 48, 34, 16];
const neutralDarkS = [2, 2, 2, 2, 3, 3, 4, 5, 6, 7];
const neutralDarkL = [2, 4, 6, 8, 10, 12, 16, 76, 84, 92];

const neutralLightScale = buildScale(NEUTRAL_H, neutralLightS, neutralLightL);
const neutralDarkScale = buildScale(NEUTRAL_H, neutralDarkS, neutralDarkL);

const warningLightScale = buildSemanticScale(28, 72, 90, 96, 42);
const warningDarkScale = buildSemanticDarkScale(28, 72, 90, 14, 64);

const successLightScale = buildSemanticScale(142, 60, 82, 96, 40);
const successDarkScale = buildSemanticDarkScale(142, 60, 82, 14, 62);

const infoLightScale = buildSemanticScale(210, 70, 88, 96, 40);
const infoDarkScale = buildSemanticDarkScale(210, 70, 88, 14, 62);

const accentLightScale = buildSemanticScale(333, 70, 84, 96, 40);
const accentDarkScale = buildSemanticDarkScale(333, 70, 84, 14, 60);

const errorLightScale = buildSemanticScale(358, 70, 88, 96, 40);
const errorDarkScale = buildSemanticDarkScale(358, 70, 88, 14, 62);

export const rawColors = {
	neutral: {
		light: neutralLightScale,
		dark: neutralDarkScale,
	},
	warning: {
		light: warningLightScale,
		dark: warningDarkScale,
	},
	success: {
		light: successLightScale,
		dark: successDarkScale,
	},
	info: {
		light: infoLightScale,
		dark: infoDarkScale,
	},
	accent: {
		light: accentLightScale,
		dark: accentDarkScale,
	},
	error: {
		light: errorLightScale,
		dark: errorDarkScale,
	},
	white: '#ffffff',
	black: '#000000',
	transparent: 'transparent',
} as const;

export type RawColors = typeof rawColors;
