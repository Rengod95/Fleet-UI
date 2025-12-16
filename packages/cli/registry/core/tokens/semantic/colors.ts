import { primitiveColors } from '../primitive/colors';

type ColorScale = Record<
	'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11',
	string
>;

const buildBasePalette = (scale: ColorScale) => ({
	content_1: scale['1'],
	content_2: scale['2'],
	content_3: scale['3'],
	content_4: scale['4'],
	content_inversed: scale['11'],
	hover: scale['8'],
	pressed: scale['8'],
	border_subtle: scale['4'],
	border_default: scale['5'],
	border_strong: scale['6'],
	text_4: scale['7'],
	text_3: scale['8'],
	text_2: scale['9'],
	text_1: scale['11'],
	text_inversed: scale['1'],
	shadow: scale['11'],
});

const buildColorPalette = (scale: ColorScale) => ({
	content_1: scale['1'],
	content_2: scale['2'],
	content_3: scale['3'],
	content_4: scale['4'],
	content_inversed: scale['11'],
	hover: scale['4'],
	pressed: scale['6'],
	border_subtle: scale['5'],
	border_default: scale['6'],
	border_strong: scale['7'],
	text_4: scale['8'],
	text_3: scale['9'],
	text_2: scale['10'],
	text_1: scale['11'],
	text_inversed: scale['1'],
	solid: scale['5'],
});

export const semanticColors = {
	light: {
		neutral: buildBasePalette(primitiveColors.neutral.light),
		primary: buildColorPalette(primitiveColors.primary.light),
		warning: buildColorPalette(primitiveColors.warning.light),
		success: buildColorPalette(primitiveColors.success.light),
		info: buildColorPalette(primitiveColors.info.light),
		error: buildColorPalette(primitiveColors.error.light),
	},
	dark: {
		white: primitiveColors.white,
		black: primitiveColors.black,
		transparent: primitiveColors.transparent,
		neutral: buildBasePalette(primitiveColors.neutral.dark),
		primary: buildColorPalette(primitiveColors.primary.dark),
		warning: buildColorPalette(primitiveColors.warning.dark),
		success: buildColorPalette(primitiveColors.success.dark),
		info: buildColorPalette(primitiveColors.info.dark),
		error: buildColorPalette(primitiveColors.error.dark),
	},
} as const;

export const semanticGradients = {
	neutral: {
		values: {
			0: '#022C5E',
			1: '#4079BC',
		},
		hover_value: '#022C5E',
	},
	primary: {
		values: {
			0: '#C800FF',
			0.4: '#FF3AD7',
			0.6: '#FF3AD7',
			1: '#FF9AE6',
		},
		hover_value: '#FF3AD7',
	},
	success: {
		values: {
			0: '#083367',
			1: '#9EE8C1',
		},
		hover_value: '#3A7085',
	},
	warning: {
		values: {
			0: '#FF6A56',
			0.3: '#FF9156',
			1: '#FFDD87',
		},
		hover_value: '#FF9156',
	},
	info: {
		values: {
			0: '#0A7AFF',
			1: '#59B9FF',
		},
		hover_value: '#0A7AFF',
	},
	error: {
		values: {
			0: '#6772AF',
			0.6: '#B88BB6',
			1: '#FFA6AC',
		},
		hover_value: '#B88BB6',
	},
} as const;

export type SemanticColors = typeof semanticColors;
export type SemanticGradients = typeof semanticGradients;
