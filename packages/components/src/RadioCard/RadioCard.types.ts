import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewProps, ViewStyle } from 'react-native';
import type {
	ItemColorScheme,
	ItemRounded,
	ItemShadow,
	ItemSize,
	ItemVariant,
} from '../Item/Item.types';
import type { RadioVariant } from '../Radio/Radio.types';

// ============================================================================
// RadioCard Types
// ============================================================================

/**
 * Indicator position
 * - start: Display radio on the left
 * - end: Display radio on the right
 */
export type RadioCardIndicatorPosition = 'start' | 'end';

/**
 * RadioCard Props
 */
export interface RadioCardProps extends PressableProps {
	// ========== Content Props ==========
	/**
	 * Card title (required)
	 */
	title: string;

	/**
	 * Card description (optional)
	 */
	description?: string;

	/**
	 * Custom content in the header area (optional)
	 */
	header?: ReactNode;

	/**
	 * Custom content in the footer area (optional)
	 */
	footer?: ReactNode;

	/**
	 * Media/icon to display left to the title (optional)
	 */
	media?: ReactNode;

	/**
	 * Custom content to display left to the content (optional)
	 */
	left?: ReactNode;

	/**
	 * Custom content to display right to the content (optional)
	 */
	right?: ReactNode;

	// ========== Radio 기능 Props ==========
	/**
	 * Identifier for the group (required)
	 */
	value: string;

	/**
	 * Selected state (Controlled, when used alone)
	 */
	selected?: boolean;

	/**
	 * Initial selected state (Uncontrolled, when used alone)
	 * @default false
	 */
	defaultSelected?: boolean;

	/**
	 * Selected state change handler (when used alone)
	 */
	onSelect?: (selected: boolean) => void;

	/**
	 * Color scheme
	 * @default 'neutral'
	 */
	colorScheme?: ItemColorScheme;

	/**
	 * Card variant
	 * @default 'outlined'
	 */
	variant?: ItemVariant;

	/**
	 * Card size
	 * @default 'md'
	 */
	size?: ItemSize;

	/**
	 * Border radius
	 * @default 'md'
	 */
	rounded?: ItemRounded;

	/**
	 * Shadow
	 * @default 'none'
	 */
	shadow?: ItemShadow;

	/**
	 * Radio indicator position
	 * @default 'end'
	 */
	indicatorPosition?: RadioCardIndicatorPosition;

	/**
	 * Radio indicator variant
	 * @default 'filled'
	 */
	indicatorVariant?: RadioVariant;

	/**
	 * Color scheme to apply when selected (if not specified, the default colorScheme is used)
	 */
	selectedColorScheme?: ItemColorScheme;

	/**
	 * Variant to apply when selected (if not specified, the default variant is used)
	 * Example: default flat → selected variant is outlined
	 */
	selectedVariant?: ItemVariant;

	/**
	 * Disabled state
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Custom style
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Accessibility label
	 */
	accessibilityLabel?: string;

	/**
	 * Test ID
	 */
	testID?: string;
}

// ============================================================================
// RadioCardGroup Types
// ============================================================================

export interface RadioCardGroupProps
	extends Omit<ViewProps, 'children' | 'style'> {
	/**
	 * Current selected value (Controlled)
	 */
	value?: string;

	/**
	 * Default selected value (Uncontrolled)
	 */
	defaultValue?: string;

	/**
	 * Selected change handler
	 */
	onValueChange?: (value: string) => void;

	/**
	 * Group name (accessibility)
	 */
	name?: string;

	/**
	 * Disable all children
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Children RadioCard components
	 */
	children?: ReactNode;

	/**
	 * Container style
	 */
	style?: ViewProps['style'];

	/**
	 * Gap between cards
	 * @default 'md'
	 */
	gap?: 'none' | 'sm' | 'md' | 'lg';
}

// ============================================================================
// Context Types
// ============================================================================

export interface RadioCardGroupContextValue {
	/**
	 * Current selected value
	 */
	value: string | undefined;

	/**
	 * Selected value change handler
	 */
	selectValue: (value: string) => void;

	/**
	 * Check if a specific value is selected
	 */
	isSelected: (value: string) => boolean;

	/**
	 * Group disabled state
	 */
	disabled: boolean;

	/**
	 * Group name (accessibility)
	 */
	name?: string;
}
