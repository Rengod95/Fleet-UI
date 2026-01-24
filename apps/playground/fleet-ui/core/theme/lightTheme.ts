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
import type { LightTheme } from '../types';
import {
	getColorSchemePaletteEntries,
	getIconColor,
	getPaletteForScheme,
	paletteHasSolid,
} from '../utils';

export const lightTheme: LightTheme = {
	colors: semanticColors.light,
	gradients: semanticGradients,
	typography: semanticTypography,
	text: primitiveTypography,
	spacing: primitiveSpacing,
	rounded: primitiveBorderRadius,
	shadows: createSemanticShadows(semanticColors.light),
	zIndex: primitiveZIndex,
	utils: {
		paletteHasSolid,
		getColorSchemePaletteEntries,
		getPaletteForScheme,
		getIconColor,
	},
};
