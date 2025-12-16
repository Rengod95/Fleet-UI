import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, TextStyle, ViewProps } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type TabBarColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'warning'
	| 'success'
	| 'info';

export type TabBarVariant = 'underlined' | 'filled' | 'faded' | 'flat' | 'ghost';

export type TabBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TabBarRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full';

export type TabBarShadow = 'none' | 'sm' | 'md' | 'lg';

export type TabBarIndicatorShadow = 'none' | 'sm' | 'md' | 'lg';

export type TabBarIndicatorPadding = 'none' | 'sm' | 'md' | 'lg';

/** TabBar item type: string or custom ReactNode */
export type TabBarItem = string | ReactNode;

export interface TabBarProps extends Omit<ViewProps, 'children'> {
	/** Controllable value for the current selected page(item index)
	 * the component will be controlled by this value's changes and the internal handling by user interaction.
	 */
	selectedPage: number;
	/** TabBar items array. If string, render with default text, if ReactNode, render with custom component */
	items: TabBarItem[];
	/** 
	 * Callback function to handle the selection of the tab item
	 * @param index - the index of the selected tab item
	 * @returns void
	 */
	onSelect?: (index: number) => void;

	/** Color scheme for the tab bar
	 * @default 'primary'
	 */
	colorScheme?: TabBarColorScheme;
	/** Variant of the tab bar
	 * @default 'filled'
	 */
	variant?: TabBarVariant;
	/** Size of the tab bar
	 * @default 'md'
	 */
	size?: TabBarSize;
	/** Rounded corners of the tab bar
	 * @default 'md'
	 */
	rounded?: TabBarRounded;
	/** Shadow of the tab bar
	 * @default 'none'
	 */
	shadow?: TabBarShadow;
	/** Shadow of the indicator 
	 * @default 'none'
	*/
	indicatorShadow?: TabBarIndicatorShadow;
	/** Visual padding between indicator and container
	 * @default 'md'
	 */
	indicatorPadding?: TabBarIndicatorPadding;

	/**
	 * Calculate the accessibility label for the tab item
	 * @default 'string' item: use the string as the accessibility label, 'ReactNode' item: use the user provided accessibility label
	 */
	getItemAccessibilityLabel?: (item: TabBarItem, index: number) => string | undefined;
	/** Array of accessibility labels for the tab items (highest priority) */
	accessibilityLabels?: Array<string | undefined>;

	/**
	 * Set the default hitSlop for the tab item
	 * if not provided, use the default value inside the component
	 */
	hitSlop?: PressableProps['hitSlop'];

	/** List of indices to disable the tab items */
	disabledIndices?: number[];
	/** Function to calculate the disabled state of the tab item (can be used with disabledIndices) */
	isItemDisabled?: (item: TabBarItem, index: number) => boolean;
}

export interface TabBarItemProps {
	/** Index of the tab item */
	index: number;
	/** Shared value to track the progress of the drag gesture */
	dragProgress: SharedValue<number>;
	/** Item to render */
	item: TabBarItem;
	/** Size of the tab item */
	size: TabBarSize;
	/** Variant of the tab item */
	variant: TabBarVariant;
	/** Color scheme of the tab item */
	colorScheme: TabBarColorScheme;
	/** Text style of the tab item */
	textStyle?: StyleProp<TextStyle>;
	/** Whether the tab item is selected */
	isSelected: boolean;
	/** Accessibility label of the tab item */
	accessibilityLabel?: string;
	/** Whether the tab item is disabled */
	disabled?: boolean;
	/** Hit slop of the tab item */
	hitSlop?: PressableProps['hitSlop'];
	/** Callback function to handle the press of the tab item */
	onPressItem: (index: number) => void;
	/** Callback function to handle the layout of the tab item */
	onItemLayout: (index: number, layout: { x: number; width: number }) => void;
	/** Callback function to handle the text layout of the tab item */
	onTextLayout: (index: number, layout: { width: number }) => void;
}
