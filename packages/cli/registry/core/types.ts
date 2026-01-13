import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { PrimitiveBreakpoints } from './tokens/primitive/breakpoints';
import type { PrimitiveTypography } from './tokens';
import type { PrimitiveBorderRadius } from './tokens/primitive/borderRadius';
import type { PrimitiveSpacing } from './tokens/primitive/spacing';
import type { PrimitiveZIndex } from './tokens/primitive/zIndex';
import type {
	SemanticColors,
	SemanticGradients,
} from './tokens/semantic/colors';
import type { SemanticShadows } from './tokens/semantic/shadow';
import type { SemanticTypography } from './tokens/semantic/typography';
import type {
	getColorSchemePaletteEntries,
	getIconColor,
	getPaletteForScheme,
	paletteHasSolid,
} from './utils';

/* base palette includes shadow (neutral color's basic palette) */
export type FleetBasePalette = {
	content_1: string;
	content_2: string;
	content_3: string;
	content_4: string;
	content_inversed: string;
	hover: string;
	pressed: string;
	border_subtle: string;
	border_default: string;
	border_strong: string;
	text_4: string;
	text_3: string;
	text_2: string;
	text_1: string;
	text_inversed: string;
	shadow: string;
}

/* color palette does not include shadow (palette for accent colors like primary, error, success, warning, info) */
export type FleetColorPalette = Omit<FleetBasePalette, 'shadow'> & {
	solid: string;
}

/* Basic color schemes on Fleet UI, If you want to add a new color scheme, you need to add new scheme name here. */
/* NOTICE : If you want to add a new color scheme, Folllowing
/* 1. Add new scheme name to the 'FleetThemeColorSchemes' type.
/* 2. Adjust 'getPaletteForScheme' function to add new scheme name on @/utils/variants.ts file.
*/
export type FleetThemeColorSchemes = 'neutral' | 'primary' | 'error' | 'success' | 'warning' | 'info';

/* FleetThemeMode is the general color scheme of the device.(ex. mobile lightmode, darkmode) */
export type FleetThemeMode = keyof SemanticColors;
/* FleetThemeColors is based on 'SemanticColors' object. */
export type FleetThemeColors = SemanticColors[FleetThemeMode];

/* FleetThemeBase is the base interface for the every theme. */
export interface FleetThemeBase {
	typography: SemanticTypography;
	text: PrimitiveTypography;
	spacing: PrimitiveSpacing;
	rounded: PrimitiveBorderRadius;
	zIndex: PrimitiveZIndex;
	shadows: SemanticShadows;
	gradients: SemanticGradients;
	utils: {
		paletteHasSolid: typeof paletteHasSolid;
		getPaletteForScheme: typeof getPaletteForScheme;
		getColorSchemePaletteEntries: typeof getColorSchemePaletteEntries;
		getIconColor: typeof getIconColor;
	};
}

// Theme variant is the variant of the theme. If you want to add a new theme, you need to add new theme variant type with below.
export type FleetThemeVariant<
	TColors extends FleetThemeColors = FleetThemeColors,
> = FleetThemeBase & {
	colors: TColors;
};


/* LightTheme is the light theme of the Fleet UI. */
export type LightTheme = FleetThemeVariant<SemanticColors['light']>;
/* DarkTheme is the dark theme of the Fleet UI. */
export type DarkTheme = FleetThemeVariant<SemanticColors['dark']>;
/* FleetTheme is the theme of the Fleet UI. */
export type FleetTheme = FleetThemeVariant;

/**
 * // NOTICE : If you want to add a new theme, you need to initialize new theme object in unistyles.
 * Example :
 * 1. Add new theme object in unistyles.ts
 * 2. Add new theme's type to the top of this.
 * 3. add the theme the below 'FleetThemes' object interface.
 * 
 * @example const CUSTOM_THEME = { ... } // unistyles.ts file
 * @example export type CustomTheme = FleetThemeVariant<typeof CUSTOM_THEME>; // types.ts
 * @example export type FleetThemes = { // types.ts
 *     light: LightTheme;
 *     dark: DarkTheme;
 *     custom: CustomTheme;
 * };
 */
export type FleetThemes = {
	light: LightTheme;
	dark: DarkTheme;
};

export type FleetBreakpoints = PrimitiveBreakpoints;

/**
 * FleetThemingConfig is the total configuration for the Fleet UI. it used for type declaration of the unistyles to overrride UnistylesThemes interfaces.
 * @see https://www.unistyl.es/v3/guides/theming
 */
export interface FleetThemingConfig {
	themes: FleetThemes;
	breakpoints: PrimitiveBreakpoints;
}

declare module 'react-native-unistyles' {
	interface UnistylesThemes extends FleetThemes {}
	interface UnistylesBreakpoints extends FleetBreakpoints {}
}

export type { PrimitiveBreakpoints } from './tokens/primitive/breakpoints';
export type { PrimitiveBorderRadius } from './tokens/primitive/borderRadius';
export type { PrimitiveShadow } from './tokens/primitive/shadow';
export type { PrimitiveSpacing } from './tokens/primitive/spacing';
export type { PrimitiveTypography } from './tokens/primitive/typography';
export type { PrimitiveZIndex } from './tokens/primitive/zIndex';
export type {
	SemanticColors,
	SemanticGradients,
} from './tokens/semantic/colors';
export type { SemanticShadows } from './tokens/semantic/shadow';
export type { SemanticTypography } from './tokens/semantic/typography';
