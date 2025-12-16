import type { LucideIcon } from 'lucide-react-native';
import type { ComponentType, ForwardRefExoticComponent, ReactNode } from 'react';
import type { StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

/**
 * State Component variant
 * - error: Error state
 * - warning: Warning state
 * - info: Info state
 * - success: Success state
 * - neutral: Neutral state
 * - ghost: Minimal state (no icon frame)
 */
export type StateVariant =
	| 'error'
	| 'warning'
	| 'info'
	| 'success'
	| 'neutral'
	| 'ghost';

export interface StateProps extends ViewProps {
	/**
	 * State Component variant
	 * - error: Error state
	 * - warning: Warning state
	 * - info: Info state
	 * - success: Success state
	 * - neutral: Neutral state
	 * - ghost: Minimal state (no icon frame) recommend with custom icon, assets
	 * @default 'neutral'
	 */
	variant?: StateVariant;

	/**
	 * Visual elements (icons, images, etc.)
	 * If not provided, the default icon based on the variant will be displayed
	 */
	asset?: ReactNode;

	/**
	 * Title of the result State
	 */
	title?: ReactNode;

	/**
	 * Additional description below the title
	 */
	description?: ReactNode;

	/**
	 * Button to display below the description (State.Button recommended)
	 */
	button?: ReactNode;

	/**
	 * Container style
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Title style override
	 */
	titleStyle?: StyleProp<TextStyle>;

	/**
	 * Description style override
	 */
	descriptionStyle?: StyleProp<TextStyle>;
}

export interface StateButtonProps {
	/**
	 * Button content
	 */
	children: ReactNode;

	/**
	 * Click handler
	 */
	onPress?: () => void;

	/**
	 * Disabled state
	 */
	disabled?: boolean;

	/**
	 * Loading state
	 */
	loading?: boolean;

	/**
	 * Button style override
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Test ID
	 */
	testID?: string;
}

/**
 * Mapping type for default icons based on the variant
 */
export interface VariantIconConfig {
	icon: LucideIcon;
	colorScheme: 'error' | 'warning' | 'info' | 'success' | 'neutral';
}


export interface StateComponent extends ForwardRefExoticComponent<
	StateProps & React.RefAttributes<View>
> {
	Button: ComponentType<StateButtonProps>;
}