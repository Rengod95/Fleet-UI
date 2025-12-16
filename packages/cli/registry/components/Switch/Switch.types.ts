import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export type SwitchVariant = 'lined' | 'filled' | 'flat';

export type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

export type SwitchThumbShape = 'oval' | 'circle';

export type SwitchThumbShadow = 'none' | 'sm' | 'md' | 'lg';

export type SwitchRounded = 'none' | 'xs' | 'sm' | 'md';

export interface SwitchProps
	extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * @default 'primary'
	 */
	colorScheme?: SwitchColorScheme;

	/**
	 * Switch variant
	 * - lined: container is smaller than thumb
	 * - filled: basic design, inner shadow enabled
	 * - flat: filled variant with no inner shadow
	 * @default 'filled'
	 */
	variant?: SwitchVariant;

	/**
	 * Switch size
	 * @default 'md'
	 */
	size?: SwitchSize;

	/**
	 * Root border radius
	 * @default 'md'
	 */
	rounded?: SwitchRounded;

	/**
	 * Thumb shadow style
	 * @default 'md'
	 */
	thumbShadow?: SwitchThumbShadow;

	/**
	 * Thumb shape
	 * @default 'oval'
	 */
	thumbShape?: SwitchThumbShape;

	/**
	 * Root inner thumb padding (in pixels)
	 * 기본값: size에 따라 자동 설정
	 */
	thumbPadding?: number;
	/**
	 * Switch state (Controlled, value alias)
	 */
	checked?: boolean;
	/**
	 * 초기 Switch 상태 (Uncontrolled, defaultValue의 별칭)
	 * @default false
	 */
	defaultChecked?: boolean;

	/**
	 * Callback when value changes
	 */
	onCheckedChange?: (value: boolean) => void;

	/**
	 * 비활성화 상태
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

	/**
	 * Custom thumb style
	 */
	thumbStyle?: StyleProp<ViewStyle>;
}
