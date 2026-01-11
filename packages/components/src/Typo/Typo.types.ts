import type { SemanticTypography } from '@fleet-ui/core';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';

export type TypoVariant = keyof SemanticTypography;
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

	children: ReactNode;
}
