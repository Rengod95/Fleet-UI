import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { Breakpoints } from './theme/breakpoints';
import type { atoms } from './tokens/atoms';
import type { PrimitiveAnimation } from './tokens/primitive/animation';
import type { PrimitiveBorderRadius } from './tokens/primitive/borderRadius';
import type { PrimitiveShadow } from './tokens/primitive/shadow';
import type { PrimitiveSpacing } from './tokens/primitive/spacing';
import type { PrimitiveZIndex } from './tokens/primitive/zIndex';
import type {
	SemanticColors,
	SemanticGradients,
} from './tokens/semantic/colors';
import type { SemanticTypography } from './tokens/semantic/typography';

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
	spacing: PrimitiveSpacing;
	rounded: PrimitiveBorderRadius;
	shadow: PrimitiveShadow;
	animation: PrimitiveAnimation;
	zIndex: PrimitiveZIndex;
	gradients: SemanticGradients;
	atoms: typeof atoms;
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

export type FleetBreakpoints = Breakpoints;

export interface FleetThemingConfig {
	themes: FleetThemes;
	breakpoints: Breakpoints;
}

declare module 'react-native-unistyles' {
	interface UnistylesThemes extends FleetThemes {}
	interface UnistylesBreakpoints extends FleetBreakpoints {}
}

export type { Breakpoints } from './theme/breakpoints';
export type { PrimitiveAnimation } from './tokens/primitive/animation';
export type { PrimitiveBorderRadius } from './tokens/primitive/borderRadius';
export type { PrimitiveShadow } from './tokens/primitive/shadow';
export type { PrimitiveSpacing } from './tokens/primitive/spacing';
export type { PrimitiveTypography } from './tokens/primitive/typography';
export type { PrimitiveZIndex } from './tokens/primitive/zIndex';
export type {
	SemanticColors,
	SemanticGradients,
} from './tokens/semantic/colors';
export type { SemanticTypography } from './tokens/semantic/typography';
