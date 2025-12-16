import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ActionButtonVariant = 'filled' | 'outlined' | 'flat' | 'faded';

export type ActionButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ActionButtonColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

export type ActionButtonShadow = 'none' | 'sm' | 'md' | 'lg';

export type ActionButtonRounded =
	| 'none'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| 'full';

export interface ActionButtonProps
	extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * Color scheme for the button
	 * @default 'neutral'
	 */
	colorScheme?: ActionButtonColorScheme;

	/**
	 * Visual variant
	 * @default 'flat'
	 */
	variant?: ActionButtonVariant;

	/**
	 * Size variant
	 * @default 'md'
	 */
	size?: ActionButtonSize;

	/**
	 * Full width variant
	 * @default false
	 */
	extend?: boolean;

	/**
	 * Shadow preset for root container
	 * @default 'none'
	 */
	shadow?: ActionButtonShadow;

	/**
	 * Border radius for root container
	 * @default 'md'
	 */
	containerRounded?: ActionButtonRounded;

	/**
	 * Border radius for content container
	 * @default 'md'
	 */
	contentRounded?: ActionButtonRounded;

	/**
	 * Optional title text displayed below content
	 */
	title?: string;

	/**
	 * Content to render in the content container (icon, image, etc.)
	 */
	children?: ReactNode;

	/**
	 * Style override for root container (array supported)
	 */
	rootStyle?: StyleProp<ViewStyle>;

	/**
	 * Style override for content container (array supported)
	 */
	contentStyle?: StyleProp<ViewStyle>;

	/**
	 * Style override for title text (array supported)
	 */
	textStyle?: StyleProp<TextStyle>;

	/**
	 * Accessibility label (required for icon/image only buttons)
	 */
	accessibilityLabel?: string;

	/**
	 * Test identifier
	 */
	testID?: string;
}
