import {
	createSemanticShadows,
	primitiveBorderRadius,
	primitiveSpacing,
	primitiveTypography,
	primitiveZIndex,
	semanticColors,
	semanticGradients,
	semanticTypography,
} from '../tokens';
import type { DarkTheme } from '../types';
import {
	getColorSchemePaletteEntries,
	getIconColor,
	getPaletteForScheme,
	paletteHasSolid,
} from '../utils';

export const darkTheme: DarkTheme = {
	colors: semanticColors.dark,
	gradients: semanticGradients,
	typography: semanticTypography,
	text: primitiveTypography,
	spacing: primitiveSpacing,
	rounded: primitiveBorderRadius,
	shadows: createSemanticShadows(semanticColors.dark),
	zIndex: primitiveZIndex,
	utils: {
		paletteHasSolid,
		getPaletteForScheme,
		getColorSchemePaletteEntries,
		getIconColor,
	},
};
