import type { ImageContentFit, ImageProps as ExpoImageProps, ImageSource } from 'expo-image';
import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

/**
 * ImageCard variant - determines layout direction
 */
export type ImageCardVariant = 'vertical' | 'horizontal';

/**
 * ImageCard shadow options - maps to semantic shadow tokens
 */
export type ImageCardShadow =
	| 'none'
	| 'sm'
	| 'md'
	| 'lg'

/**
 * ImageCard rounded options - maps to primitive border radius tokens
 */
export type ImageCardRounded =
	| 'none'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| 'full';

/**
 * ImageCard size options - determines typography scale
 * - 'sm': Compact card with smaller typography
 * - 'md': Default card size (h6 title, caption1 description)
 * - 'lg': Large card with bigger typography
 */
export type ImageCardSize = 'sm' | 'md' | 'lg';

/**
 * AspectRatio can be a number (e.g., 0.75) or a string ratio (e.g., '4:3', '16:9')
 */
export type AspectRatioValue = number | `${number}:${number}`;

/**
 * Content ratio - determines the ratio of the content area from 0 to 1 (ex: 0.42 => 42% of the container)
 * @default 0.42 for vertical variant
 * @default 0.5 for horizontal variant
 */
export type ContentRatioValue = number;

export interface ImageCardProps extends Omit<ViewProps, 'children'> {
	// ============================================
	// Image Props
	// ============================================

	/**
	 * Image source - supports expo-image ImageSource format
	 * Can be a URL string, require(), or ImageSource object
	 */
	source: ImageSource;

	/**
	 * How the image should be resized to fit its container
	 * @default 'cover'
	 */
	contentFit?: ImageContentFit;

	/**
	 * Expo-image ImageProps
	 * @default undefined
	 */
	imageProps?: Omit<ExpoImageProps, 'source' | 'contentFit'>;

	// ============================================
	// Layout Props
	// ============================================

	/**
	 * Layout variant
	 * - 'vertical': Content at bottom 40%
	 * - 'horizontal': Content at right 50%
	 * @default 'vertical'
	 */
	variant?: ImageCardVariant;

	/**
	 * Aspect ratio of the card
	 * Can be a number (e.g., 0.75 for 3:4) or string (e.g., '4:3', '16:9')
	 */
	aspectRatio?: AspectRatioValue;
	/**
	 * Content ratio of the card
	 * Can be a number from 0 to 1 (ex: 0.42 => 42% of the container)
	 * @default 0.42 for vertical variant
	 * @default 0.5 for horizontal variant
	 */
	contentRatio?: ContentRatioValue;

	/**
	 * Width of the card
	 * Can be a number (px) or percentage string (e.g., '100%')
	 */
	width?: number | `${number}%`;

	/**
	 * Height of the card (optional, typically use aspectRatio instead)
	 */
	height?: number;

	// ============================================
	// Style Props
	// ============================================

	/**
	 * Shadow style - uses semantic shadow tokens
	 * @default 'none'
	 */
	shadow?: ImageCardShadow;

	/**
	 * Border radius style - uses primitive border radius tokens
	 * @default 'md'
	 */
	rounded?: ImageCardRounded;

	/**
	 * Typography size variant
	 * - 'sm': Compact typography (body3 title, caption2 description)
	 * - 'md': Default typography (h6 title, caption1 description)
	 * - 'lg': Large typography (h5 title, body3 description)
	 * @default 'md'
	 */
	size?: ImageCardSize;

	// ============================================
	// Content Slots
	// ============================================

	/**
	 * Content displayed at the top of the card (e.g., badges, tags)
	 * Positioned absolutely at the top of the image area
	 */
	topContent?: ReactNode;

	/**
	 * Title content (e.g., heading text)
	 */
	title?: string;

	/**
	 * Description content (e.g., body text)
	 */
	description?: string;

	/**
	 * Action content (e.g., buttons, icons)
	 */
	action?: ReactNode;

	/**
	 * Footer content (e.g., stats, additional actions)
	 */
	footer?: ReactNode;

	// ============================================
	// Accessibility & Testing
	// ============================================

	/**
	 * Accessibility label for screen readers
	 */
	accessibilityLabel?: string;

	/**
	 * Test identifier
	 */
	testID?: string;

	/**
	 * Whether the text color should be inverted
	 * @default false
	 */
	textColorInverted?: boolean;
}
