import type { ViewProps } from 'react-native';

export type SliderColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';
export type SliderTrackVariant = 'lined' | 'flat';
export type SliderThumbVariant = 'circle' | 'oval' | 'line';
export type SliderSize = 'sm' | 'md' | 'lg' | 'xl';
export type SliderRounded = 'none' | 'xs' | 'sm' | 'md';
export type SliderThumbShadow = 'md' | 'lg';
export type SliderTrackShadow = 'none' | 'base';
export type SliderThumbCount = 0 | 1 | 2;

export interface SliderProps extends Omit<ViewProps, 'children'> {
	/**
	 * @default 'neutral'
	 */
	colorScheme?: SliderColorScheme;

	/**
	 * Track variant
	 * - lined: skinny track design
	 * - flat: default thickness track design
	 * @default 'flat'
	 */
	trackVariant?: SliderTrackVariant;

	/**
	 * Thumb variant
	 * - circle: perfect circle
	 * - oval: oval shape (same as Switch's oval)
	 * - line: vertical line shape
	 * @default 'circle'
	 */
	thumbVariant?: SliderThumbVariant;

	/**
	 * track's roundness
	 * @default 'md'
	 */
	rounded?: SliderRounded;

	/**
	 * Slider size, applied to track height and thumb size
	 * @default 'md'
	 */
	size?: SliderSize;

	/**
	 * Thumb shadow
	 * @default 'md'
	 */
	thumbShadow?: SliderThumbShadow;

	/**
	 * track's shadow
	 * - base : track inner shadow
	 * - none : no shadow
	 * @default 'base'
	 */
	trackShadow?: SliderTrackShadow;

	/**
	 * Number of thumbs
	 * - 0: hidden (progress bar mode)
	 * - 1: single thumb
	 * - 2: dual thumb (range)
	 * @default 1
	 */
	thumbCount?: SliderThumbCount;

	/**
	 * Initial value (uncontrolled only)
	 * @default [0] for single thumb, [25, 75] for dual thumb
	 */
	defaultValue?: number[];

	/**
	 * Minimum value
	 * @default 0
	 */
	min?: number;

	/**
	 * Maximum value
	 * @default 100
	 */
	max?: number;

	/**
	 * Step increment
	 * @default 1
	 */
	step?: number;

	/**
	 * Minimum steps between thumbs (for dual thumb mode)
	 * @default 0
	 */
	minStepsBetweenThumbs?: number;

	/**
	 * Throttle time in milliseconds for value changes, to prevent excessive re-renders
	 * @default 200
	 */
	throttleMs?: number;

	/**
	 * Disabled state
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Callback when value changes (during drag and on release)
	 */
	onValueChange?: (value: number[]) => void;

	/**
	 * Track width
	 * If not provided, uses 100% of container
	 */
	trackLength?: number;

	/**
	 * Accessibility label for screen readers
	 */
	accessibilityLabel?: string;

	/**
	 * Optional test identifier
	 */
	testID?: string;
}

/**
 * Internal Thumb Props (for rendering individual thumbs)
 */
export interface SliderThumbProps {
	index: number;
	value: number;
	min: number;
	max: number;
	disabled: boolean;
	thumbVariant: SliderThumbVariant;
	size: SliderSize;
	thumbShadow: SliderThumbShadow;
	rounded: SliderRounded;
	isVisible: boolean;
}
