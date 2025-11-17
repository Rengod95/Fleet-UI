import {
	atoms,
	primitiveAnimation,
	primitiveBorderRadius,
	primitiveShadow,
	primitiveSpacing,
	primitiveZIndex,
	semanticColors,
	semanticGradients,
	semanticTypography,
} from '../tokens';
import type { DarkTheme } from '../types';

export const darkTheme: DarkTheme = {
	colors: semanticColors.dark,
	gradients: semanticGradients,
	typography: semanticTypography,
	spacing: primitiveSpacing,
	rounded: primitiveBorderRadius,
	shadow: primitiveShadow,
	animation: primitiveAnimation,
	zIndex: primitiveZIndex,
	atoms: atoms,
};
