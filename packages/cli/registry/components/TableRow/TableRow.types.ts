import type { ComponentType, ForwardRefExoticComponent, ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

/**
 * Color scheme for TableRow
 */
export type TableRowColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'warning'
	| 'success'
	| 'info';

/**
 * Size variant for TableRow
 */
export type TableRowSize = 'sm' | 'md' | 'lg';

/**
 * Alignment mode for TableRow
 * - 'left': Both left and right content are aligned to the left
 * - 'space-between': Left and right content are placed at opposite ends
 */
export type TableRowAlign = 'left' | 'space-between';

/**
 * Container variant for left/right sections
 * - 'outlined': Border with transparent background
 * - 'flat': Solid subtle background
 * - 'ghost': Completely transparent (default)
 */
export type TableRowContainerVariant = 'outlined' | 'flat' | 'ghost';

/**
 * Main TableRow component props
 * @description A component that displays data in a key-value format with left and right aligned content
 */
export interface TableRowProps extends Omit<ViewProps, 'style'> {
	/**
	 * Left side content (label/title)
	 * Can be a string, number, or React component
	 */
	left: ReactNode;

	/**
	 * Right side content (value/data)
	 * Can be a string, number, or React component
	 */
	right: ReactNode;

	/**
	 * Alignment mode
	 * - 'left': Both elements aligned to the left
	 * - 'space-between': Elements at opposite ends
	 * @default 'space-between'
	 */
	align?: TableRowAlign;

	/**
	 * Left area width ratio (0-100)
	 * Only applicable when align='left'
	 * @example leftRatio={30} // Left takes 30% of width
	 */
	leftRatio?: number;

	/**
	 * Color scheme for the row
	 * @default 'neutral'
	 */
	colorScheme?: TableRowColorScheme;

	/**
	 * Size variant
	 * @default 'md'
	 */
	size?: TableRowSize;

	/**
	 * Left container visual variant
	 * @default 'ghost'
	 */
	leftVariant?: TableRowContainerVariant;

	/**
	 * Right container visual variant
	 * @default 'ghost'
	 */
	rightVariant?: TableRowContainerVariant;

	/**
	 * Whether to highlight the fontWeight bolder than the default of the left container
	 * @default false
	 */
	highlightLeft?: boolean;

	/**
	 * Whether to highlight the fontWeight bolder than the default of the right container
	 * @default false
	 */
	highlightRight?: boolean;

	/**
	 * Custom style for the root container
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Custom style for the left container
	 */
	leftStyle?: StyleProp<ViewStyle>;

	/**
	 * Custom style for the right container
	 */
	rightStyle?: StyleProp<ViewStyle>;

	/**
	 * Custom style for left text (when left is string/number)
	 */
	leftTextStyle?: StyleProp<TextStyle>;

	/**
	 * Custom style for right text (when right is string/number)
	 */
	rightTextStyle?: StyleProp<TextStyle>;

	/**
	 * Whether to disable default text styling for left content
	 * Set to true when passing custom components
	 * @default false
	 */
	disableLeftTextStyle?: boolean;

	/**
	 * Whether to disable default text styling for right content
	 * Set to true when passing custom components
	 * @default false
	 */
	disableRightTextStyle?: boolean;
}

/**
 * TableRowLabel component props (for custom left content)
 */
export interface TableRowLabelProps extends Omit<ViewProps, 'style'> {
	/**
	 * Label content
	 */
	children?: ReactNode;

	/**
	 * Color scheme
	 * @default 'neutral'
	 */
	colorScheme?: TableRowColorScheme;

	/**
	 * Size variant (affects typography)
	 * @default 'md'
	 */
	size?: TableRowSize;

	/**
	 * Container visual variant
	 * @default 'ghost'
	 */
	variant?: TableRowContainerVariant;

	/**
	 * Whether to highlight the label text (bolder fontWeight)
	 * @default false
	 */
	highlight?: boolean;

	/**
	 * Custom style for the container
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Custom style for label text (when children is string/number)
	 */
	textStyle?: StyleProp<TextStyle>;

	/**
	 * Whether to disable default text styling (when children is string/number)
	 * @default false
	 */
	disableTextStyle?: boolean;
}

/**
 * TableRowValue component props (for custom right content)
 */
export interface TableRowValueProps extends Omit<ViewProps, 'style'> {
	/**
	 * Value content
	 */
	children?: ReactNode;

	/**
	 * Color scheme
	 * @default 'neutral'
	 */
	colorScheme?: TableRowColorScheme;

	/**
	 * Size variant (affects typography)
	 * @default 'md'
	 */
	size?: TableRowSize;

	/**
	 * Container visual variant
	 * @default 'ghost'
	 */
	variant?: TableRowContainerVariant;

	/**
	 * Alignment mode (affects flex behavior when used standalone)
	 * @default 'space-between'
	 */
	align?: TableRowAlign;

	/**
	 * Whether to highlight the value text (bolder fontWeight)
	 * @default false
	 */
	highlight?: boolean;

	/**
	 * Custom style for the container
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Custom style for value text (when children is string/number)
	 */
	textStyle?: StyleProp<TextStyle>;

	/**
	 * Whether to disable default text styling (when children is string/number)
	 * @default false
	 */
	disableTextStyle?: boolean;
}


export type TableRowComponent = ForwardRefExoticComponent<TableRowProps> & {
	Label: ComponentType<TableRowLabelProps>;
	Value: ComponentType<TableRowValueProps>;
}