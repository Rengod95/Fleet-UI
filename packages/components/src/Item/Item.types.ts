import type { ReactNode } from 'react';
import type {
	PressableProps,
	StyleProp,
	TextProps,
	TextStyle,
	ViewProps,
	ViewStyle,
} from 'react-native';

export type ItemColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'warning'
	| 'success'
	| 'info';

export type ItemVariant = 'filled' | 'outlined' | 'flat' | 'fade';

export type ItemRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ItemShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ItemMediaVariant = 'icon' | 'image';

export type ItemMediaVerticalAlign = 'top' | 'center' | 'bottom';

export type ItemSize = 'sm' | 'md' | 'lg';

/**
 * Main Item component props
 */
export interface ItemProps extends Omit<PressableProps, 'style'> {
	/**
	 * Color scheme for the item
	 * @default 'neutral'
	 */
	colorScheme?: ItemColorScheme;

	/**
	 * Visual variant
	 * - filled: shadcn muted style with background
	 * - outlined: border only, transparent background
	 * - flat: shadcn default style, transparent background
	 * - fade: outlined + muted background
	 * @default 'flat'
	 */
	variant?: ItemVariant;

	/**
	 * Size variant
	 * @default 'md'
	 */
	size?: ItemSize;

	/**
	 * Border radius size
	 * @default 'md'
	 */
	rounded?: ItemRounded;

	/**
	 * Shadow elevation
	 * @default 'none'
	 */
	shadow?: ItemShadow;

	/**
	 * Item content
	 */
	children?: ReactNode;

	/**
	 * Custom style override
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * ItemMedia component props
 */
export interface ItemMediaProps extends Omit<ViewProps, 'style'> {
	/**
	 * Media variant
	 * - base: auto width, flexible
	 * - icon: 24x24 fixed size for icons
	 * - image: 48x48 rounded for images
	 * @default 'base'
	 */
	variant?: ItemVariant;
	/**
	 * Size variant
	 * @default 'md'
	 */
	size?: ItemSize;
	/**
	 * Media type
	 * @default 'icon'
	 */
	mediaType?: ItemMediaVariant;

	/**
	 * Vertical alignment of media relative to content
	 * @default 'center'
	 */
	verticalAlign?: ItemMediaVerticalAlign;

	/**
	 * Media content (icon, image, etc)
	 */
	children?: ReactNode;

	/**
	 * Custom style override
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * ItemContent component props (wrapper for title and description)
 */
export interface ItemContentProps extends Omit<ViewProps, 'style'> {
	/**
	 * Content (typically ItemTitle and ItemDescription)
	 */
	children?: ReactNode;

	/**
	 * Custom style override
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * ItemTitle component props
 */
export interface ItemTitleProps extends Omit<TextProps, 'style'> {
	/**
	 * Title text
	 */
	children?: ReactNode;

	/**
	 * Size variant
	 * @default 'md'
	 */
	size?: ItemSize;
	/**
	 * Custom style override
	 */
	style?: StyleProp<TextStyle>;
}

/**
 * ItemDescription component props
 */
export interface ItemDescriptionProps extends Omit<TextProps, 'style'> {
	/**
	 * Description text
	 */
	children?: ReactNode;

	/**
	 * Custom style override
	 */
	style?: StyleProp<TextStyle>;

	/**
	 * Size variant
	 * @default 'md'
	 */
	size?: ItemSize;
}

/**
 * ItemActions component props (for action buttons)
 */
export interface ItemActionsProps extends Omit<ViewProps, 'style'> {
	/**
	 * Action buttons or elements
	 */
	children?: ReactNode;

	/**
	 * Custom style override
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * ItemHeader component props
 */
export interface ItemHeaderProps extends Omit<ViewProps, 'style'> {
	/**
	 * Header content
	 */
	children?: ReactNode;

	/**
	 * Custom style override
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * ItemFooter component props
 */
export interface ItemFooterProps extends Omit<ViewProps, 'style'> {
	/**
	 * Footer content
	 */
	children?: ReactNode;

	/**
	 * Custom style override
	 */
	style?: StyleProp<ViewStyle>;
}
