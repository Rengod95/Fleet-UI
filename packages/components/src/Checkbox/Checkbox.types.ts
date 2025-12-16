import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export type CheckboxVariant = 'filled' | 'flat' | 'outlined';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export type CheckboxColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

export type CheckboxShadow = 'none' | 'sm' | 'md' | 'lg';

export type CheckboxRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface CheckboxProps
	extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * Color scheme (토큰 시스템의 primitive 컬러 그룹)
	 * @default 'primary'
	 */
	colorScheme?: CheckboxColorScheme;

	/**
	 * Checkbox variant
	 * @default 'filled'
	 */
	variant?: CheckboxVariant;

	/**
	 * Checkbox 크기
	 * @default 'md'
	 */
	size?: CheckboxSize;

	/**
	 * Shadow 스타일
	 * @default 'none'
	 */
	shadow?: CheckboxShadow;

	/**
	 * Border radius
	 * @default 'sm'
	 */
	rounded?: CheckboxRounded;

	/**
	 * Checked 상태 (Controlled) - 제공하면 controlled 모드로 동작
	 */
	checked?: boolean;

	/**
	 * 기본 checked 상태 (Uncontrolled) - controlled가 아닐 때만 사용
	 * @default false
	 */
	defaultChecked?: boolean;

	/**
	 * Checked 상태 변경 핸들러
	 */
	onCheckedChange?: (checked: boolean) => void;

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
}
