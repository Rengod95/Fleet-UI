import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export type ButtonVariant = 'filled' | 'outlined' | 'flat' | 'ghost' | 'faded';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

export type ButtonShadow =
	| 'none'
	| 'sm'
	| 'md'
	| 'lg'

export type ButtonRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps
	extends Omit<PressableProps, 'children' | 'style'> {
	colorScheme?: ButtonColorScheme;
	variant?: ButtonVariant;
	size?: ButtonSize;
	shadow?: ButtonShadow;
	rounded?: ButtonRounded;
	fullWidth?: boolean;
	loading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	children?: ReactNode;
	/**
	 * Icon-only buttons must provide an aria-label for web.
	 */
	'aria-label'?: string;
	/**
	 * Optional test identifier (web maps to data-testid).
	 */
	testID?: string;
	style?: StyleProp<ViewStyle>;
}
