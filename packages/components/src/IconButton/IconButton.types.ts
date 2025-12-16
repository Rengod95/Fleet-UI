import type { ImageSource } from 'expo-image';
import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

export type IconButtonVariant = 'filled' | 'outlined' | 'flat' | 'ghost';

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export type IconButtonColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

export type IconButtonRounded =
	| 'none'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| 'full';

export interface IconButtonProps
	extends Omit<PressableProps, 'style' | 'children'> {
	/**
	 * Visual variant
	 * @default 'filled'
	 */
	variant?: IconButtonVariant;
	/**
	 * Color scheme
	 * @default 'neutral'
	 */
	colorScheme?: IconButtonColorScheme;
	/**
	 * Size variant
	 * @default 'md'
	 */
	size?: IconButtonSize;
	/**
	 * Border radius
	 * @default 'full'
	 */
	rounded?: IconButtonRounded;
	/**
	 * The First order Source to render
	 * If the `src` is provided, the `icon` will be ignored.
	 * @default undefined
	 */
	src?: string | ImageSource;
	/**
	 * The Second order Source to render
	 * If the `src` is provided, the `icon` will be ignored.
	 * @default undefined
	 */
	icon?: ReactNode;
	/**
	 * Size of the icon (SVG Icon Size)
	 * @default undefined
	 */
	iconSize?: number;
	/**
	 * Color of the icon
	 * @default undefined
	 */
	iconColor?: string;
	/**
	 * Shows loading indicator
	 * @default false
	 */
	loading?: boolean;
	/**
	 * Icon-only buttons must provide an accessible label.
	 */
	'aria-label'?: string;
	/**
	 * Optional test identifier (web maps to data-testid).
	 */
	testID?: string;
	style?: PressableProps['style'];
}
