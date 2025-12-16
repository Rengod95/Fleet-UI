import type { FleetTheme } from '../types';

type ThemePalette = FleetTheme['colors'][keyof FleetTheme['colors']];
type ColoredPalette = Extract<ThemePalette, { solid: string }>;
type ColorSchemes = keyof FleetTheme['colors'];
type IconVariants = 'filled' | 'outlined' | 'flat' | 'ghost';

export const paletteHasSolid = (
	palette: ThemePalette
): palette is ColoredPalette => {
	'worklet';
	return 'solid' in palette;
};

export const getPaletteForScheme = <T extends ColorSchemes>(
	theme: FleetTheme,
	scheme: T
): ThemePalette => {
	'worklet';
	switch (scheme) {
		case 'primary':
			return theme.colors.primary;
		case 'neutral':
			return theme.colors.neutral;
		case 'error':
			return theme.colors.error;
		case 'success':
			return theme.colors.success;
		case 'warning':
			return theme.colors.warning;
		case 'info':
			return theme.colors.info;
		default:
			return theme.colors.neutral;
	}
};

export const getColorSchemePaletteEntries = (
	theme: FleetTheme
): [ColorSchemes, ThemePalette][] => {
	'worklet';
	return (Object.keys(theme.colors) as ColorSchemes[]).map((scheme) => [
		scheme,
		getPaletteForScheme(theme, scheme),
	]);
};

export const getIconColor = (
	theme: FleetTheme,
	colorScheme: ColorSchemes,
	variant: IconVariants
) => {
	'worklet';
	const palette = getPaletteForScheme(theme, colorScheme);
	const hasSolidColor = paletteHasSolid(palette);

	switch (variant) {
		case 'filled':
			return hasSolidColor ? palette.text_inversed : palette.text_inversed;
		case 'outlined':
			return hasSolidColor ? palette.text_4 : palette.border_strong;
		case 'flat':
			return hasSolidColor ? palette.text_4 : palette.text_3;
		case 'ghost':
			return hasSolidColor ? palette.solid : palette.text_1;
	}
};
