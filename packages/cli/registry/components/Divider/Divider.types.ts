import type { ViewProps } from 'react-native';

export type DividerVariant = 'line' | 'thick';
export type DividerSize = 'sm' | 'md' | 'lg';
export type DividerHorizontalMargin = 'none' | 'sm' | 'md' | 'lg';
export type DividerColorScheme = 'base' | 'inverted';
export type DividerVerticalMargin = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface DividerProps extends ViewProps {
	/**
	 * Divider variant - divider style
	 * - line: normal thin divider (default)
	 * - thick: thick divider for section separation
	 * @default 'line'
	 */
	variant?: DividerVariant;

	/**
	 * Divider size - divider thickness
	 * - line variant: sm(hairlineWidth), md(1-2px), lg(4px)
	 * - thick variant: sm(4px), md(16px), lg(24px)
	 * @default 'md'
	 */
	size?: DividerSize;

	/**
	 * Divider padded - left and right padding
	 * @default 'none'
	 */
	horizontalMargin?: DividerHorizontalMargin;

	/**
	 * Divider colorScheme
	 * - base: base neutral color
	 * - inverted: current theme inversion (light ↔ dark)
	 * @default 'base'
	 */
	colorScheme?: DividerColorScheme;

	/**
	 * Divider vertical margin
	 * @default 'none'
	 */
	verticalMargin?: DividerVerticalMargin;

	/**
	 * Test identifier
	 */
	testID?: string;
}
