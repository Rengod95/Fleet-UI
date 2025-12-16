import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export type SwiperRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SwiperSize = 'sm' | 'md' | 'lg';
export type SwiperVariant = 'filled' | 'outlined' | 'flat' | 'gradient';
export type SwiperColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'warning'
	| 'success'
	| 'info';
export type SwiperThumbShadow = 'none' | 'sm' | 'md' | 'lg';

/**
 * Swiper component props.
 *
 * An interactive component that confirms and triggers an action by swiping left-to-right.
 */
export interface SwiperProps extends Omit<ViewProps, 'children'> {
	/**
	 * Color scheme (semantic color group).
	 * @default 'neutral'
	 */
	colorScheme?: SwiperColorScheme;

	/**
	 * Visual variant.
	 * @default 'filled'
	 */
	variant?: SwiperVariant;

	/**
	 * Size.
	 * @default 'md'
	 */
	size?: SwiperSize;

	/**
	 * Border radius scale.
	 * @default 'md'
	 */
	rounded?: SwiperRounded;

	/**
	 * Thumb shadow.
	 * @default 'md'
	 */
	thumbShadow?: SwiperThumbShadow;

	/**
	 * Disabled state.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Placeholder text shown in the center.
	 */
	placeholder?: string;

	/**
	 * Text shown on the progress background when swiping.
	 * @default 'Action!'
	 */
	actionTitle?: string;

	/**
	 * Thumb content (drag handle).
	 */
	icon?: ReactNode;

	/**
	 * Completion threshold between 0 and 1.
	 * @default 0.7
	 */
	threshold?: number;

	/**
	 * Called when swipe completes.
	 */
	onSwipeSuccess?: () => void | Promise<void>;

	/**
	 * Called when swipe starts.
	 */
	onSwipeStart?: () => void;

	/**
	 * Called when swipe is cancelled/reverted.
	 */
	onSwipeCancel?: () => void;

	/**
	 * Custom gradient colors (only for `variant="gradient"`).
	 * it is leverage an array of colors and locations for expo-linear-gradient.
	 */
	customGradient?: {
		colors: [string, string, ...string[]];
		locations?: [number, number, ...number[]];
	}

	/**
	 * Accessibility label (primarily for web).
	 */
	'aria-label'?: string;

	/**
	 * Optional test identifier (web maps to data-testid).
	 */
	testID?: string;
}
