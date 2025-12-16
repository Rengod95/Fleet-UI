import { primitiveShadow, type ShadowLayer } from '../primitive/shadow';
import type { SemanticColors } from './colors';

const hexToRgb = (hex: string) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: { r: 0, g: 0, b: 0 };
};

const createShadowString = (
	layers: readonly ShadowLayer[],
	colorHex: string,
	opacityMultiplier = 1,
	inset = false
) => {
	const { r, g, b } = hexToRgb(colorHex);

	return layers
		.map((layer) => {
			const opacity = layer.opacity * opacityMultiplier;
			return `${inset ? 'inset ' : ''}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px rgba(${r}, ${g}, ${b}, ${opacity})`;
		})
		.join(', ');
};

export const createSemanticShadows = (
	colors: SemanticColors['light'] | SemanticColors['dark']
) => {
	const neutralShadowColor = colors.neutral.shadow;
	const primaryShadowColor = colors.primary.solid;

	return {
		// Base Shadows (Tailwind-like)
		xs: createShadowString(primitiveShadow.xs, neutralShadowColor),
		sm: createShadowString(primitiveShadow.sm, neutralShadowColor),
		md: createShadowString(primitiveShadow.md, neutralShadowColor),
		lg: createShadowString(primitiveShadow.lg, neutralShadowColor),
		xl: createShadowString(primitiveShadow.xl, neutralShadowColor),
		'2xl': createShadowString(primitiveShadow['2xl'], neutralShadowColor),

		// smooth shadow
		smooth_sm: createShadowString(primitiveShadow.sm, neutralShadowColor, 0.8),
		smooth_md: createShadowString(primitiveShadow.md, neutralShadowColor, 0.8),
		smooth_lg: createShadowString(primitiveShadow.lg, neutralShadowColor, 0.8),

		// Semantic Shadows
		card: createShadowString(primitiveShadow.card, neutralShadowColor), 
		button: createShadowString(primitiveShadow.sm, neutralShadowColor),
		button_primary: createShadowString(
			primitiveShadow.sm,
			primaryShadowColor,
			3.0 // Higher opacity/intensity for colored glow
		),
		overlay: createShadowString(primitiveShadow.lg, neutralShadowColor, 1.2), // Slightly stronger for overlay
		inner: createShadowString(primitiveShadow.inner, neutralShadowColor, 1, true), // Hardcoded as per spec, or derive from neutral?
		floating: createShadowString(primitiveShadow['2xl'],neutralShadowColor,0.8), // Softer floating
		banner: createShadowString(primitiveShadow.banner,neutralShadowColor),
		toast: createShadowString(primitiveShadow.toast, neutralShadowColor),
		thumb: createShadowString(primitiveShadow.sm, neutralShadowColor, 3),
	};
};

export type SemanticShadows = ReturnType<typeof createSemanticShadows>;
