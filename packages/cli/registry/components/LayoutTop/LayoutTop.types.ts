import type { ForwardRefExoticComponent, ReactNode } from 'react';
import type { ViewProps, TextProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

// ============================================
// Padding Types
// ============================================

/**
 * 
 * - 'none': 0
 * - 'sm': theme.spacing[3] (8px)
 * - 'md': theme.spacing[5] (16px)
 * - 'lg': theme.spacing[7] (24px)
 * - number: custom px value
 */
export type LayoutTopPadding = 'none' | 'sm' | 'md' | 'lg' | number;
export type LayoutTopSize = 'sm' | 'md' | 'lg';

// ============================================
// Title Typo Props
// ============================================

export interface LayoutTopTitleTypoProps extends Omit<TextProps, 'style'> {
	/**
	 * Size variant override
	 * Override the size variant of the typography
	 * 
	 * Size variant For Typography
	 * - 'sm': h3
	 * - 'md': h2
	 * - 'lg': h1
	 * @default - The size variant of the typography is determined by the size prop of the LayoutTop component (default: 'md')
	 */
	size?: LayoutTopSize;
	children: ReactNode;
	style?: StyleProp<TextStyle>;
}

// ============================================
// Subtitle Typo Props
// ============================================

export interface LayoutTopSubtitleTypoProps extends Omit<TextProps, 'style'> {
	/**
	 * Size variant override
	 * Override the size variant of the typography
	 * 
	 * Size variant For Typography
	 * - 'sm': body3
	 * - 'md': body2
	 * - 'lg': body1
	 * @default - The size variant of the typography is determined by the size prop of the LayoutTop component (default: 'md')
	 */
	size?: LayoutTopSize;
	children: ReactNode;
	style?: StyleProp<TextStyle>;
}

// ============================================
// Asset Props
// ============================================

export interface LayoutTopAssetProps {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

// ============================================
// Main LayoutTop Props
// ============================================

export interface LayoutTopProps extends ViewProps {
	/**
	 * Asset area (top image/icon, etc)
	 */
	asset?: ReactNode;

	/**
	 * Subtitle at the top of the title
	 */
	subtitleTop?: ReactNode;

	/**
	 * Main title
	 */
	title?: ReactNode;

	/**
	 * Subtitle at the bottom of the title
	 */
	subtitleBottom?: ReactNode;

	/**
	 * Right area content
	 */
	right?: ReactNode;

	/**
	 * Right area content alignment
	 * - 'start': top align
	 * - 'center': center align
	 * - 'end': bottom align
	 * @default 'end'
	 */
	rightAlignment?: 'start'| 'center' | 'end';

	/**
	 * The Whole Group's padding top
	 * @default 'none'
	 */
	paddingTop?: LayoutTopPadding;

	/**
	 * The Whole Group's padding bottom
	 * @default 'md'
	 */
	paddingBottom?: LayoutTopPadding;

	/**
	 * Component size (affects typography)
	 * - 'sm': h3/body3
	 * - 'md': h2/body2 (default)
	 * - 'lg': h1/body1
	 * @default 'md'
	 */
	size?: LayoutTopSize;
	style?: StyleProp<ViewStyle>;
}

// ============================================
// Compound Component Type
// ============================================

export interface LayoutTopComponent
	extends ForwardRefExoticComponent<LayoutTopProps> {
	/**
	 * Asset container component
	 */
	Asset: React.ComponentType<LayoutTopAssetProps>;

	/**
	 * Title Typography component
	 */
	TitleTypo: React.ComponentType<LayoutTopTitleTypoProps>;

	/**
	 * Subtitle Typography component
	 */
	SubtitleTypo: React.ComponentType<LayoutTopSubtitleTypoProps>;
}
