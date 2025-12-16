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

export type FleetPlatform = 'ios' | 'android' | 'web';
export type Platform = FleetPlatform;

export type FleetStyle = ViewStyle | TextStyle | ImageStyle;
export type Style = FleetStyle;

export type FleetStyleInput =
	| FleetStyle
	| FleetStyle[]
	| null
	| undefined
	| false;

export type FleetThemeMode = keyof SemanticColors;
export type FleetThemeColors = SemanticColors[FleetThemeMode];

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

export type FleetThemeVariant<
	TColors extends FleetThemeColors = FleetThemeColors,
> = FleetThemeBase & {
	colors: TColors;
};

export type LightTheme = FleetThemeVariant<SemanticColors['light']>;
export type DarkTheme = FleetThemeVariant<SemanticColors['dark']>;
export type FleetTheme = FleetThemeVariant;

export type FleetThemes = {
	light: LightTheme;
	dark: DarkTheme;
};

export type FleetThemeName = keyof FleetThemes;

export type FleetBreakpoints = PrimitiveBreakpoints;

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
