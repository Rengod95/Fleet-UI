import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * ContextHeader size variants
 * - sm: 44px height, smaller typography
 * - md: 52px height, default
 * - lg: 56px height, larger typography
 * - xl: 64px height, largest typography
 */
export type ContextHeaderSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * ContextHeader shadow variants
 */
export type ContextHeaderShadow = 'none' | 'sm' | 'md' | 'lg';

/**
 * ContextHeader title alignment options
 * - left: Title aligned to left (default when no left content)
 * - center: Title centered between left and right content
 */
export type ContextHeaderTitleAlign = 'left' | 'center';

/**
 * ContextHeader padding horizontal variants
 */
export type ContextHeaderPaddingHorizontal = 'none' | 'sm' | 'md' | 'lg';

/**
 * ContextHeader component props
 *
 * A custom header component for mobile screens that can replace
 * the native navigation stack header.
 */
export interface ContextHeaderProps {
	/**
	 * Header title text
	 */
	title?: string;

	/**
	 * Custom left area content
	 * If provided, replaces the default BackButton
	 */
	left?: ReactNode;

	/**
	 * Custom right area content
	 * Typically used for action icons or buttons
	 */
	right?: ReactNode;

	/**
	 * Whether to show the default BackButton in the left area
	 * Only applicable when `left` prop is not provided
	 * @default true
	 */
	showBackButton?: boolean;

	/**
	 * Callback when the default BackButton is pressed
	 * Only applicable when using the default BackButton
	 */
	onBackPress?: () => void;

		/**
	 * Whether to include the safe area insets of the device top in the component
	 * @default false
	 */
	includeSafeAreaTop?: boolean;

	/**
	 * Whether to use fixed position for the component
	 * @default false
	 */
	fixed?: boolean;

	/**
	 * Size variant affecting height and typography
	 * @default 'md'
	 */
	size?: ContextHeaderSize;

	/**
	 * Padding horizontal variant
	 * @default 'none'
	 */
	paddingHorizontal?: ContextHeaderPaddingHorizontal;

	/**
	 * Shadow variant
	 * @default 'none'
	 */
	shadow?: ContextHeaderShadow;

	/**
	 * Title text alignment
	 * When 'center', title is absolutely positioned to center
	 * When 'left', title flows naturally after left content
	 * Auto-defaults to 'left' when no left content exists
	 * @default 'center'
	 */
	titleAlign?: ContextHeaderTitleAlign;

	/**
	 * Custom container style
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Custom title text style
	 */
	titleStyle?: StyleProp<TextStyle>;

	/**
	 * Test identifier
	 */
	testID?: string;
}
