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
import type { LightTheme } from '../types';

export const lightTheme: LightTheme = {
	colors: semanticColors.light,
	gradients: semanticGradients,
	typography: semanticTypography,
	spacing: primitiveSpacing,
	rounded: primitiveBorderRadius,
	shadow: primitiveShadow,
	animation: primitiveAnimation,
	zIndex: primitiveZIndex,
	atoms: atoms,
};
