import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export type CardVariant = 'base' | 'fade' | 'outlined' | 'flat';

export type CardRounded =
	| 'none'
	| '_2xs'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| '_2xl'
	| 'full';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'warning'
	| 'success'
	| 'info';
export type CardShadow =
	| 'none'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| '2xl'
	| 'smooth_lg'
	| 'inner';

export interface CardProps extends Omit<ViewProps, 'children'> {
	/**
	 * @default 'base'
	 */
	variant?: CardVariant;

	/**
	 * @default 'md'
	 */
	rounded?: CardRounded;

	/**
	 * @default 'md'
	 */
	size?: CardSize;

	/**
	 * @default 'neutral'
	 */
	colorScheme?: CardColorScheme;

	/**
	 * @default true
	 */
	fullWidth?: boolean;

	/**
	 * @default 'none'
	 */
	shadow?: CardShadow;

	/**
	 * Card inner content
	 */
	children?: ReactNode;
}
