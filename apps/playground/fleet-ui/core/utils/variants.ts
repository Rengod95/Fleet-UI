import type {
	FleetBasePalette,
	FleetColorPalette,
	FleetTheme,
	FleetThemeColorSchemes,
} from '../types';

type ThemePalette = FleetColorPalette | FleetBasePalette;
type IconVariants = 'filled' | 'outlined' | 'flat' | 'ghost';

export const paletteHasSolid = (
	palette: ThemePalette
): palette is FleetColorPalette => {
	'worklet';
	if (typeof palette !== 'object') return false;
	return 'solid' in palette;
};

export const getPaletteForScheme = <T extends FleetThemeColorSchemes>(
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

/**
 * Default color schemes on Fleet UI, If you want to add a new color scheme, you need to add new scheme name here.
 * @see types.ts file for more details.
 */
const DEFAULT_COLOR_SCHEMES = [
	'neutral',
	'primary',
	'error',
	'success',
	'warning',
	'info',
];

export const getColorSchemePaletteEntries = (
	theme: FleetTheme
): [FleetThemeColorSchemes, ThemePalette][] => {
	'worklet';
	const onlyPaletteSchemeFromSemanticColors = DEFAULT_COLOR_SCHEMES.filter(
		(scheme) => scheme in theme.colors
	);

	return onlyPaletteSchemeFromSemanticColors.map((scheme) => [
		scheme as FleetThemeColorSchemes,
		getPaletteForScheme(theme, scheme as FleetThemeColorSchemes),
	]);
};

export const getIconColor = (
	theme: FleetTheme,
	colorScheme: FleetThemeColorSchemes,
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
