export const primitiveFontFamily = {
	primary: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
	secondary: ['Roboto', 'system-ui', 'sans-serif'],
	mono: ['Fira Code', 'Consolas', 'monospace'],
} as const;

export const primitiveFontSize = {
	_2xs: 10,
	xs: 12,
	sm: 14,
	md: 16,
	lg: 18,
	xl: 20,
	_2xl: 22,
	_3xl: 26,
	_4xl: 32,
	_5xl: 40,
} as const;

export const primitiveLineHeight = {
	_5xs: 10,
	_4xs: 12,
	_3xs: 14,
	_2xs: 16,
	xs: 18,
	sm: 20,
	md: 22,
	lg: 24,
	xl: 26,
	_2xl: 28,
	_3xl: 32,
	_4xl: 38,
	_5xl: 46,
} as const;

export const primitiveFontWeight = {
	lighter: '200',
	light: '300',
	regular: '400',
	medium: '500',
	semibold: '600',
	bold: '700',
	extrabold: '800',
} as const;

export const primitiveLetterSpacing = {
	tighter: -0.4,
	tight: -0.25,
	normal: -0.15,
	wide: 0.2,
	wider: 0.3,
} as const;

export const primitiveTypography = {
	fontFamily: primitiveFontFamily,
	fontSize: primitiveFontSize,
	lineHeight: primitiveLineHeight,
	fontWeight: primitiveFontWeight,
	letterSpacing: primitiveLetterSpacing,
} as const;

export type PrimitiveTypography = typeof primitiveTypography;
