import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

export type ButtonVariant = 'filled' | 'outlined' | 'flat' | 'ghost' | 'faded';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonColorScheme =
	| 'primary'
	| 'secondary'
	| 'neutral'
	| 'danger'
	| 'success'
	| 'warning'
	| 'info';

export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg';

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
	iconOnly?: boolean;
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
	style?: PressableProps['style'];
}
