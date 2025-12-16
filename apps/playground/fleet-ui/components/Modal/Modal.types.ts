import type {
	ComponentType,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from 'react';
import type {
	ModalProps as RNModalProps,
	View,
	ViewProps,
} from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Modal size
 * - sm: Small size (maxWidth: 80%, padding: 16px, gap: 16px)
 * - md: Medium size (maxWidth: 85%, padding: 20px, gap: 20px)
 * - lg: Large size (maxWidth: 95%, padding: 24px, gap: 24px)
 */
export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalColorScheme = 'base' | 'inverted';
export type ModalRounded = 'none' | '_2xs' | 'xs' | 'sm' | 'md' | 'lg';

// ============================================
// Root Props
// ============================================

export interface ModalRootProps extends Omit<ViewProps, 'children'> {
	/**
	 * Modal visible
	 */
	visible: boolean;

	/**
	 * Modal close callback
	 */
	onClose: () => void;

	/**
	 * Modal size (maxWidth determined by center position)
	 * @default 'md'
	 */
	size?: ModalSize;

	/**
	 * Color theme
	 * @default 'base'
	 */
	colorScheme?: ModalColorScheme;

	/**
	 * Modal rounding
	 * @default 'md'
	 */
	rounded?: ModalRounded;

	/**
	 * Closeable via backdrop click or swipe down.
	 * @default true
	 */
	closable?: boolean;

	/**
	 * Swipe to dismiss
	 * @default true
	 */
	swipeToDismiss?: boolean;

	/**
	 * Swipe dismiss threshold (px)
	 * @default 100
	 */
	swipeThreshold?: number;

	/**
	 * Backdrop opacity (0-1)
	 * @default 0.5
	 */
	backdropOpacity?: number;

	/**
	 * Use backdrop blur
	 * @default true
	 */
	useBackdropBlur?: boolean;

	/**
	 * Backdrop blur intensity (0-100)
	 * @default 50
	 */
	backdropBlurIntensity?: number;

	/**
	 * Backdrop blur tint
	 * @default 'light'
	 */
	backdropBlurTint?: 'light' | 'dark';

	/**
	 * Modal content
	 */
	children: ReactNode;

	/**
	 * RN Modal props override
	 *
	 * Note: `visible`, `transparent`, `animationType` are controlled internally.
	 */
	modalProps?: Omit<RNModalProps, 'visible' | 'children' | 'transparent' | 'animationType'>;

	/**
	 * Content area style override
	 */
	contentStyle?: StyleProp<ViewStyle>;

	/**
	 * Backdrop style override
	 */
	backdropStyle?: StyleProp<ViewStyle>;

	/**
	 * Called when modal is shown
	 */
	onShow?: () => void;

	/**
	 * Called when modal is dismissed
	 */
	onDismiss?: () => void;
}

// ============================================
// Sub-Component Props
// ============================================

export interface ModalHeaderProps extends Omit<ViewProps, 'children'> {
	/**
	 * Header title
	 */
	title?: string;

	/**
	 * Show close button
	 * @default true
	 */
	showCloseButton?: boolean;

	/**
	 * Custom header content (title, subtitle instead of rendering)
	 */
	children?: ReactNode;

	/**
	 * Title style
	 */
	titleStyle?: StyleProp<TextStyle>;
}

export interface ModalBodyProps extends Omit<ViewProps, 'children'> {
	/**
	 * Body content
	 */
	children: ReactNode;
}

export interface ModalDescriptionProps extends Omit<ViewProps, 'children'> {
	/**
	 * Description content
	 */
	content: string;

	/**
	 * Description text style
	 */
	contentStyle?: StyleProp<TextStyle>;

	/**
	 * Description container style
	 */
	containerStyle?: StyleProp<ViewStyle>;
}

export interface ModalFooterProps extends Omit<ViewProps, 'children'> {
	/**
	 * Footer content
	 */
	children: ReactNode;
}

// ============================================
// Context Types
// ============================================

export interface ModalContextValue {
	/**
	 * Modal close function
	 */
	close: () => void;

	/**
	 * Current modal size
	 */
	size: ModalSize;

	/**
	 * Current color theme
	 */
	colorScheme: ModalColorScheme;

	/**
	 * Current modal rounding
	 */
	rounded: ModalRounded;
}

// ============================================
// Compound Component Types
// ============================================

export type ModalRootComponent = ForwardRefExoticComponent<
	ModalRootProps & RefAttributes<View>
>;

export type ModalComponent = ModalRootComponent & {
	Header: ComponentType<ModalHeaderProps>;
	Body: ComponentType<ModalBodyProps>;
	Footer: ComponentType<ModalFooterProps>;
	Description: ComponentType<ModalDescriptionProps>;
};
