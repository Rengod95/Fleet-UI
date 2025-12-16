import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export type ToastPosition = 'top' | 'bottom';
export type ToastVariant = 'filled' | 'flat' | 'faded';
export type ToastColorScheme =
	| 'neutral'
	| 'primary'
	| 'success'
	| 'warning'
	| 'error'
	| 'info';
export type ToastSize = 'sm' | 'md' | 'lg';
export type ToastRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full';
export type ToastShadow = 'none' | 'sm' | 'md' | 'lg';

export type ToastInsets =
	| number
	| {
			top?: number;
			bottom?: number;
			horizontal?: number;
	  };

export interface ToastAction {
	label: string;
	onPress: () => void;
}

export interface ToastContentProps extends Omit<ViewProps, 'style'> {
	title?: string;
	description?: string;
	icon?: ReactNode;
	colorScheme?: ToastColorScheme;
	variant?: ToastVariant;
	size?: ToastSize;
	rounded?: ToastRounded;
	position?: ToastPosition;
	insets?: ToastInsets;
	safeArea?: boolean;
	duration?: number;
	closable?: boolean;
	dragToDismiss?: boolean;
	closeThreshold?: number;
	onClose?: () => void;
	onShow?: () => void;
	onPress?: () => void;
	action?: ToastAction;
	testID?: string;
}

export interface ToastInternalState extends ToastContentProps {
	_id: string;
	visible: boolean;
}

export type ToastShowOptions = Omit<
	ToastContentProps,
	| 'visible'
	| 'onShow'
	| 'onClose'
	| 'safeArea'
	| 'dragToDismiss'
	| 'closeThreshold'
	| 'testID'
> & {
	/**
	 * 안전 영역 사용 여부
	 * @default true
	 */
	safeArea?: boolean;
	/**
	 * 드래그로 닫기 허용 여부
	 * @default true
	 */
	dragToDismiss?: boolean;
	/**
	 * 드래그 임계값 (px)
	 * @default 48
	 */
	closeThreshold?: number;
	/**
	 * 테스트 ID
	 */
	testID?: string;
	/**
	 * 표시 콜백
	 */
	onShow?: () => void;
	/**
	 * 닫기 콜백
	 */
	onClose?: () => void;
};

export interface ToastProviderProps {
	children: ReactNode;
	defaultPosition?: ToastPosition;
	defaultDuration?: number;
}

export interface ToastProps extends ToastContentProps {
	visible: boolean;
	onRequestClose: () => void;
	onExited: () => void;
}

export interface ToastHandle {
	id: string;
	hide: () => void;
}

export interface ToastContextValue {
	show: (options: ToastShowOptions) => ToastHandle;
	hide: (id?: string) => void;
}
