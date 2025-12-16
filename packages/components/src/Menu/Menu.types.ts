import type {
	ComponentType,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from 'react';
import type { PressableProps, View, ViewProps } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

// ============================================================================
// Common Types
// ============================================================================

/**
 * Dropdown size
 */
export type MenuSize = 'sm' | 'md' | 'lg';

/**
 * Dropdown rounded
 */
export type MenuRounded = 'none' | 'sm' | 'md' | 'lg';

/**
 * Dropdown shadow
 */
export type MenuShadow = 'none' | 'sm' | 'md' | 'lg';

/**
 * CheckItem color scheme (only applied when checked)
 */
export type MenuColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

/**
 * Dropdown placement (based on Trigger)
 */
export type MenuPlacement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end'
	| 'right'
	| 'right-start'
	| 'right-end';

// ============================================================================
// Menu.Dropdown Types
// ============================================================================

export interface MenuDropdownProps extends Omit<ViewProps, 'children'> {
	/**
	 * Dropdown header (Menu.Header is recommended)
	 */
	header?: ReactNode;

	/**
	 * Dropdown size
	 * @default 'md'
	 */
	size?: MenuSize;

	/**
	 * Dropdown rounded
	 * @default 'md'
	 */
	rounded?: MenuRounded;

	/**
	 * Dropdown shadow
	 * @default 'md'
	 */
	shadow?: MenuShadow;

	/**
	 * Dropdown Items (Menu.DropdownItem, Menu.DropdownCheckItem)
	 */
	children: ReactNode;
}

// ============================================================================
// Menu.Header Types
// ============================================================================

export interface MenuHeaderProps extends Omit<ViewProps, 'children' | 'style'> {
	/**
	 * Header string text or custom component
	 */
	children: ReactNode;

	/**
	 * Custom text style
	 */
	style?: StyleProp<TextStyle>;
}

// ============================================================================
// Menu.DropdownItem Types
// ============================================================================

export interface MenuDropdownItemProps extends Omit<PressableProps, 'children'> {
	/**
	 * Component to display on the left (icon, etc)
	 */
	left?: ReactNode;

	/**
	 * Component to display on the right (Menu.DropdownIcon is recommended)
	 */
	right?: ReactNode;

	/**
	 * Item text or content
	 */
	children: ReactNode;
}

// ============================================================================
// Menu.DropdownCheckItem Types
// ============================================================================

export interface MenuDropdownCheckItemProps
	extends Omit<PressableProps, 'children'> {
	/**
	 * Component to display on the left (icon, etc)
	 */
	left?: ReactNode;

	/**
	 * Component to display on the right (Menu.DropdownIcon is recommended)
	 */
	right?: ReactNode;

	/**
	 * Checked state
	 * @default false
	 */
	checked?: boolean;

	/**
	 * Checked state change handler
	 */
	onCheckedChange?: (checked: boolean) => void;

	/**
	 * Color scheme applied when checked
	 * @default 'primary'
	 */
	colorScheme?: MenuColorScheme;

	/**
	 * Item text or content
	 */
	children: ReactNode;
}

// ============================================================================
// Menu.DropdownIcon Types
// ============================================================================

export interface MenuDropdownIconProps {
	/**
	 * Icon component (lucide-react-native, etc)
	 */
	icon: ComponentType<{
		size?: number;
		color?: string;
		strokeWidth?: number;
	}>;

	/**
	 * Icon size (override)
	 */
	size?: number;

	/**
	 * Icon color (override)
	 */
	color?: string;

	/**
	 * strokeWidth (for lucide icons)
	 * @default 2
	 */
	strokeWidth?: number;
}

// ============================================================================
// Menu.Trigger Types
// ============================================================================

export interface MenuTriggerProps extends Omit<ViewProps, 'children'> {
	/**
	 * Menu open state (Controlled)
	 */
	open?: boolean;

	/**
	 * Initial open state (Uncontrolled)
	 * @default false
	 */
	defaultOpen?: boolean;

	/**
	 * Called when the menu is opened
	 */
	onOpen?: () => void;

	/**
	 * Called when the menu is closed
	 */
	onClose?: () => void;

	/**
	 * Trigger component (button, etc)
	 */
	children: ReactNode;

	/**
	 * Dropdown component (Menu.Dropdown)
	 */
	dropdown: ReactNode;

	/**
	 * Dropdown placement
	 * @default 'bottom-start'
	 */
	placement?: MenuPlacement;

	/**
	 * Close on outside press
	 * @default true
	 */
	closeOnOutsidePress?: boolean;

	/**
	 * Close on select
	 * @default true
	 */
	closeOnSelect?: boolean;
}

// ============================================================================
// Context Types
// ============================================================================

export interface MenuContextValue {
	/**
	 * Dropdown size
	 */
	size: MenuSize;

	/**
	 * Menu close function
	 */
	close: () => void;

	/**
	 * Close on select
	 */
	closeOnSelect: boolean;
}

// ============================================================================
// Compound Component Types
// ============================================================================

export type MenuTriggerComponent = ForwardRefExoticComponent<
	MenuTriggerProps & RefAttributes<View>
>;

export type MenuComponent = {
	Trigger: MenuTriggerComponent;
	Dropdown: ComponentType<MenuDropdownProps>;
	Header: ComponentType<MenuHeaderProps>;
	DropdownItem: ComponentType<MenuDropdownItemProps>;
	DropdownCheckItem: ComponentType<MenuDropdownCheckItemProps>;
	DropdownIcon: ComponentType<MenuDropdownIconProps>;
};
