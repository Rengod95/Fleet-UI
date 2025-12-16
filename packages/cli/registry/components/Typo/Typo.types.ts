import type { SemanticTypography } from '@fleet-ui/local/core';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';

export type TypoVariant = keyof SemanticTypography;

export type TypoColorScheme = 'neutral' | 'primary' | 'error' | 'success' | 'warning' | 'info';


export type TypoColorWeight = 1 | 2 | 3 | 4;

export interface TypoProps extends TextProps {
	/**
	 * Semantic typography variant
	 * @default 'body2'
	 */
	variant?: TypoVariant;

	/**
	 * Extend width to fill parent container horizontally
	 * @default false
	 */
	extend?: boolean;

	/**
	 * Color scheme
	 * @default 'neutral'
	 */
	colorScheme?: TypoColorScheme;

	/**
	 * Color weight
	 * It is derived from the semantic color's text color weight.
	 * @default 1
	 */
	colorWeight?: TypoColorWeight;

	children: ReactNode;
}
