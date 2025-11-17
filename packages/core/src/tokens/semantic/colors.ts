import { primitiveColors } from '../primitive/colors';

type ColorScale = Record<
	'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10',
	string
>;

const actionVariant = (
	palette: ColorScale,
	options: { inverted?: boolean; disabled: string }
) => {
	const foreground = options.inverted
		? primitiveColors.black
		: primitiveColors.white;

	return {
		default: palette['6'],
		hover: palette['7'],
		pressed: palette['8'],
		foreground,
		border: palette['6'],
		disabled: options.disabled,
	};
};

const lightNeutral = primitiveColors.neutral.light;
const darkNeutral = primitiveColors.neutral.dark;

export const semanticColors = {
	light: {
		bg: {
			1: lightNeutral['1'],
			2: lightNeutral['2'],
			3: lightNeutral['3'],
			4: lightNeutral['4'],
			inversed: lightNeutral['10'],
		},
		bd: {
			1: lightNeutral['5'],
			2: lightNeutral['6'],
		},
		text: {
			1: lightNeutral['10'],
			2: lightNeutral['9'],
			3: lightNeutral['8'],
			inversed: lightNeutral['1'],
			disabled: lightNeutral['5'],
		},
		action: {
			primary: actionVariant(primitiveColors.accent.light, {
				disabled: lightNeutral['4'],
			}),
			secondary: actionVariant(lightNeutral, {
				disabled: lightNeutral['3'],
			}),
			danger: actionVariant(primitiveColors.error.light, {
				disabled: lightNeutral['3'],
			}),
		},
		status: {
			success: {
				bg: primitiveColors.success.light['2'],
				fg: primitiveColors.success.light['10'],
				border: primitiveColors.success.light['5'],
			},
			warning: {
				bg: primitiveColors.warning.light['2'],
				fg: primitiveColors.warning.light['9'],
				border: primitiveColors.warning.light['5'],
			},
			error: {
				bg: primitiveColors.error.light['2'],
				fg: primitiveColors.error.light['9'],
				border: primitiveColors.error.light['5'],
			},
			info: {
				bg: primitiveColors.info.light['2'],
				fg: primitiveColors.info.light['9'],
				border: primitiveColors.info.light['5'],
			},
		},
	},
	dark: {
		bg: {
			1: darkNeutral['1'],
			2: darkNeutral['2'],
			3: darkNeutral['3'],
			4: darkNeutral['4'],
			inversed: darkNeutral['10'],
		},
		bd: {
			1: darkNeutral['5'],
			2: darkNeutral['6'],
		},
		text: {
			1: darkNeutral['10'],
			2: darkNeutral['9'],
			3: darkNeutral['8'],
			inversed: darkNeutral['1'],
			disabled: darkNeutral['4'],
		},
		action: {
			primary: actionVariant(primitiveColors.accent.dark, {
				disabled: darkNeutral['4'],
				inverted: true,
			}),
			secondary: actionVariant(darkNeutral, {
				disabled: darkNeutral['3'],
				inverted: true,
			}),
			danger: actionVariant(primitiveColors.error.dark, {
				disabled: darkNeutral['3'],
				inverted: true,
			}),
		},
		status: {
			success: {
				bg: primitiveColors.success.dark['2'],
				fg: primitiveColors.success.dark['10'],
				border: primitiveColors.success.dark['5'],
			},
			warning: {
				bg: primitiveColors.warning.dark['2'],
				fg: primitiveColors.warning.dark['9'],
				border: primitiveColors.warning.dark['5'],
			},
			error: {
				bg: primitiveColors.error.dark['2'],
				fg: primitiveColors.error.dark['9'],
				border: primitiveColors.error.dark['5'],
			},
			info: {
				bg: primitiveColors.info.dark['2'],
				fg: primitiveColors.info.dark['9'],
				border: primitiveColors.info.dark['5'],
			},
		},
	},
} as const;

export const semanticGradients = {
	base: {
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
