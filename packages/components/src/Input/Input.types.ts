import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';

export type InputVariant =
	| 'filled'
	| 'flat'
	| 'bordered'
	| 'underlined'
	| 'faded';
export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
export type InputColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';
export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type InputLabelPlacement = 'inside' | 'outside' | 'outside-left';
export type InputShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'inner';

export interface InputProps extends Omit<TextInputProps, 'style'> {
	/**
	 * The visual variant of the input.
	 * @default 'bordered'
	 */
	variant?: InputVariant;
	/**
	 * The color scheme of the input.
	 * @default 'neutral'
	 */
	colorScheme?: InputColorScheme;
	/**
	 * The size of the input.
	 * @default 'md'
	 */
	size?: InputSize;
	/**
	 * The shadow of the input.
	 * @default 'none'
	 */
	shadow?: InputShadow;
	/**
	 * The border radius of the input.
	 * @default 'md'
	 */
	radius?: InputRadius;
	/**
	 * The label of the input.
	 */
	label?: string;
	/**
	 * The placement of the label.
	 * @default 'inside'
	 */
	labelPlacement?: InputLabelPlacement;
	/**
	 * The description text displayed below the input.
	 */
	description?: string;
	/**
	 * The error message displayed below the input.
	 * If provided, the input will be in an invalid state.
	 */
	errorMessage?: string;
	/**
	 * Element to be rendered at the start of the input.
	 */
	startContent?: ReactNode;
	/**
	 * Element to be rendered at the end of the input.
	 */
	endContent?: ReactNode;
	/**
	 * Whether the input is clearable.
	 * @default false
	 */
	isClearable?: boolean;
	/**
	 * Whether the input is invalid.
	 * @default false
	 */
	isInvalid?: boolean;
	/**
	 * Whether the input is disabled.
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * Whether the input is read-only.
	 * @default false
	 */
	isReadOnly?: boolean;
	/**
	 * Whether the input should take up 100% width.
	 * @default true
	 */
	fullWidth?: boolean;
	/**
	 * Callback fired when the clear button is pressed.
	 */
	onClear?: () => void;
}
