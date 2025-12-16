import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

export type ChipVariant = 'filled' | 'outlined' | 'flat' | 'ghost' | 'faded';

export type ChipSize = 'sm' | 'md' | 'lg';

export type ChipColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

export type ChipShadow =
	| 'none'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| '2xl'
	| 'smooth_sm'
	| 'smooth_md'
	| 'smooth_lg'
	| 'floating'
	| 'banner'
	| 'inner'
	| 'card'
	| 'button'
	| 'button_primary'
	| 'overlay';

export type ChipRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ChipProps extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * Color scheme for the chip
	 * @default 'neutral'
	 */
	colorScheme?: ChipColorScheme;

	/**
	 * Visual variant of the chip
	 * @default 'filled'
	 */
	variant?: ChipVariant;

	/**
	 * Size of the chip
	 * @default 'md'
	 */
	size?: ChipSize;

	/**
	 * Shadow style
	 * @default 'none'
	 */
	shadow?: ChipShadow;

	/**
	 * Border radius style
	 * @default 'full'
	 */
	rounded?: ChipRounded;

	/**
	 * Inverts the colorScheme + variant style (useful for selected state)
	 * @default false
	 */
	inverted?: boolean;

	/**
	 * Shows loading indicator
	 * @default false
	 */
	loading?: boolean;

	/**
	 * Renders only an icon without text
	 * @default false
	 */
	iconOnly?: boolean;

	/**
	 * Icon to display on the left side
	 */
	leftIcon?: ReactNode;

	/**
	 * Icon to display on the right side (ignored if onClose is provided)
	 */
	rightIcon?: ReactNode;

	/**
	 * Chip content (text or element)
	 */
	children?: ReactNode;

	/**
	 * Callback when close button is pressed
	 * When provided, displays a close icon on the right side
	 */
	onClose?: () => void;

	/**
	 * Accessibility label for screen readers
	 * Required for iconOnly chips
	 */
	'aria-label'?: string;

	/**
	 * Test identifier
	 */
	testID?: string;

	/**
	 * Custom style
	 */
	style?: PressableProps['style'];
}
