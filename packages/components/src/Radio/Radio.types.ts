import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export type RadioVariant = 'filled' | 'flat' | 'outlined';
export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';
export type RadioShadow = 'none' | 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * @default 'primary'
	 */
	colorScheme?: RadioColorScheme;

	/**
	 * Radio variant
	 * @default 'filled'
	 */
	variant?: RadioVariant;

	/**
	 * Radio size
	 * @default 'md'
	 */
	size?: RadioSize;

	/**
	 * Shadow style
	 * @default 'none'
	 */
	shadow?: RadioShadow;

	/**
	 * Selected state (Controlled)
	 * if both selected and defaultSelected are not provided, it will behave as uncontrolled
	 */
	selected?: boolean;

	/**
	 * Initial selected state (Uncontrolled)
	 * @default false
	 */
	defaultSelected?: boolean;

	/**
	 * Selected state change handler
	 * - NOTE: Called only when transitioning from false -> true. The argument is always true.
	 */
	onSelect?: (selected: boolean) => void;

	/**
	 * Disabled state
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Accessibility label for screen readers
	 */
	accessibilityLabel?: string;

	/**
	 * Optional test identifier
	 */
	testID?: string;

	/**
	 * Custom style
	 */
	style?: StyleProp<ViewStyle>;
}
