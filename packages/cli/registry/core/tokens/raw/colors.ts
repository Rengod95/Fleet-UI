/*
 * Raw Color Scales
 * - 11-step color scales with easing curves
 * - Generated from ColorBox.io with optimized perceptual distribution
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
	'11': string;
};

// Primary (Accent) - Light Scale
const primaryLightScale: ColorScale = {
	'1': '#f0ffff',
	'2': '#dbffff',
	'3': '#77fbff',
	'4': '#00e7ff',
	'5': '#00c5ff',
	'6': '#0098ff',
	'7': '#0069bb',
	'8': '#004679',
	'9': '#002f4e',
	'10': '#002236',
	'11': '#001e2e',
};

// Primary (Accent) - Dark Scale (reversed)
const primaryDarkScale: ColorScale = {
	'1': '#001e2e',
	'2': '#002236',
	'3': '#002f4e',
	'4': '#004679',
	'5': '#0069bb',
	'6': '#0098ff',
	'7': '#00c5ff',
	'8': '#00e7ff',
	'9': '#77fbff',
	'10': '#dbffff',
	'11': '#f0ffff',
};

// Warning - Light Scale
const warningLightScale: ColorScale = {
	'1': '#ffffda',
	'2': '#fffcd7',
	'3': '#fff2a8',
	'4': '#ffde00',
	'5': '#ffc500',
	'6': '#eda900',
	'7': '#9d7100',
	'8': '#644800',
	'9': '#3e2e00',
	'10': '#291f00',
	'11': '#221a00',
};

// Warning - Dark Scale (reversed)
const warningDarkScale: ColorScale = {
	'1': '#221a00',
	'2': '#291f00',
	'3': '#3e2e00',
	'4': '#644800',
	'5': '#9d7100',
	'6': '#eda900',
	'7': '#ffc500',
	'8': '#ffde00',
	'9': '#fff2a8',
	'10': '#fffcd7',
	'11': '#ffffda',
};

// Success - Light Scale
const successLightScale: ColorScale = {
	'1': '#e4fff2',
	'2': '#e1ffef',
	'3': '#bcffda',
	'4': '#00ffaa',
	'5': '#00fe88',
	'6': '#00e36b',
	'7': '#009748',
	'8': '#00602f',
	'9': '#003c1e',
	'10': '#002814',
	'11': '#012111',
};

// Success - Dark Scale (reversed)
const successDarkScale: ColorScale = {
	'1': '#012111',
	'2': '#002814',
	'3': '#003c1e',
	'4': '#00602f',
	'5': '#009748',
	'6': '#00e36b',
	'7': '#00fe88',
	'8': '#00ffaa',
	'9': '#bcffda',
	'10': '#e1ffef',
	'11': '#e4fff2',
};

// Info - Light Scale
const infoLightScale: ColorScale = {
	'1': '#fbfbff',
	'2': '#f8f8ff',
	'3': '#edeaff',
	'4': '#dac9ff',
	'5': '#c6aaff',
	'6': '#ad8bff',
	'7': '#735ee1',
	'8': '#493d8e',
	'9': '#2d2758',
	'10': '#1e1a3a',
	'11': '#191630',
};

// Info - Dark Scale (reversed)
const infoDarkScale: ColorScale = {
	'1': '#191630',
	'2': '#1e1a3a',
	'3': '#2d2758',
	'4': '#493d8e',
	'5': '#735ee1',
	'6': '#ad8bff',
	'7': '#c6aaff',
	'8': '#dac9ff',
	'9': '#edeaff',
	'10': '#f8f8ff',
	'11': '#fbfbff',
};

// Error - Light Scale
const errorLightScale: ColorScale = {
	'1': '#fff1f1',
	'2': '#ffe7e7',
	'3': '#ffbcc1',
	'4': '#ff9ca3',
	'5': '#ff8087',
	'6': '#d25a64',
	'7': '#9d2b3a',
	'8': '#6d0017',
	'9': '#460001',
	'10': '#280000',
	'11': '#0f0000',
};

// Error - Dark Scale (reversed)
const errorDarkScale: ColorScale = {
	'1': '#0f0000',
	'2': '#280000',
	'3': '#460001',
	'4': '#6d0017',
	'5': '#9d2b3a',
	'6': '#d25a64',
	'7': '#ff8087',
	'8': '#ff9ca3',
	'9': '#ffbcc1',
	'10': '#ffe7e7',
	'11': '#fff1f1',
};

// Neutral - Light Scale
const neutralLightScale: ColorScale = {
	'1': 'hsl(0, 0%, 100%)',
	'2': 'hsl(0, 0%, 96%)',
	'3': 'hsl(0, 0%, 90%)',
	'4': 'hsl(0, 0%, 83%)',
	'5': 'hsl(0, 0%, 63%)',
	'6': 'hsl(0, 0%, 45%)',
	'7': 'hsl(0, 0%, 32%)',
	'8': 'hsl(0, 0%, 25%)',
	'9': 'hsl(0, 0%, 15%)',
	'10': 'hsl(0, 0%, 9%)',
	'11': 'hsl(0, 0%, 4%)',
};

// Neutral - Dark Scale (reversed)
const neutralDarkScale: ColorScale = {
	'11': 'hsla(0, 0%, 98%, 0.8)',
	'10': 'hsla(0, 0%, 96%, 0.8)',
	'9': 'hsla(0, 0%, 90%, 0.8)',
	'8': 'hsla(0, 0%, 83%, 0.8)',
	'7': 'hsla(0, 0%, 63%, 0.8)',
	'6': 'hsla(0, 0%, 54%, 1)',
	'5': 'hsla(0, 0%, 37%, 1)',
	'4': 'hsla(0, 0%, 17%, 1)',
	'3': 'hsla(0, 0%, 10%, 1)',
	'2': 'hsla(0, 0%, 6%, 1)',
	'1': 'hsla(0, 0%, 2%, 1)',
};

export const rawColors = {
	neutral: {
		light: neutralLightScale,
		dark: neutralDarkScale,
	},
	primary: {
		light: primaryLightScale,
		dark: primaryDarkScale,
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
	error: {
		light: errorLightScale,
		dark: errorDarkScale,
	},
	white: '#ffffff',
	black: '#000000',
	transparent: 'transparent',
} as const;

export type RawColors = typeof rawColors;
