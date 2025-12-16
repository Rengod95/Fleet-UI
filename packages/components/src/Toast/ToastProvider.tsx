import type React from 'react';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Toast } from './Toast';
import type {
	ToastContextValue,
	ToastHandle,
	ToastInsets,
	ToastInternalState,
	ToastPosition,
	ToastProviderProps,
	ToastShowOptions,
} from './Toast.types';

type ToastHandler = {
	show: (options: ToastShowOptions) => ToastHandle;
	hide: (id?: string) => void;
};

let handler: ToastHandler | null = null;

export const ToastContext = createContext<ToastContextValue | null>(null);

const resolveInset = (
	insets: ToastInsets | undefined,
	key: 'top' | 'bottom'
) => {
	if (typeof insets === 'number') return insets;
	if (typeof insets === 'object' && insets !== null) {
		return insets[key] ?? 0;
	}
	return 0;
};

const resolveHorizontal = (insets: ToastInsets | undefined) => {
	if (typeof insets === 'number') return insets;
	if (typeof insets === 'object' && insets !== null) {
		return insets.horizontal ?? 0;
	}
	return 0;
};

const DEFAULT_DURATION = 4000;
const DEFAULT_THRESHOLD = 48;
const DEFAULT_HORIZONTAL_INSET = 16;
const DEFAULT_VERTICAL_INSET = 8;

export const ToastProvider: React.FC<ToastProviderProps> = ({
	children,
	defaultPosition = 'top',
	defaultDuration = DEFAULT_DURATION,
}) => {
	const { theme } = useUnistyles();
	const safeArea = useSafeAreaInsets?.();

	const [toast, setToast] = useState<ToastInternalState | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const clearTimer = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	};

	const hide = useCallback(
		(id?: string) => {
			if (!toast) return;
			if (id && toast._id !== id) return;
			clearTimer();
			setToast((prev) => (prev ? { ...prev, visible: false } : prev));
		},
		[toast]
	);

	const show = useCallback(
		(options: ToastShowOptions): ToastHandle => {
			const id = `toast-${Date.now()}`;
			clearTimer();

			const {
				duration = defaultDuration,
				position = defaultPosition,
				dragToDismiss = true,
				closeThreshold = DEFAULT_THRESHOLD,
				safeArea: useSafeArea = true,
				...rest
			} = options;

			setToast({
				_id: id,
				visible: true,
				position,
				duration,
				dragToDismiss,
				closeThreshold,
				safeArea: useSafeArea,
				...rest,
			});

			if (duration && duration > 0) {
				timerRef.current = setTimeout(() => hide(id), duration);
			}

			options.onShow?.();

			return {
				id,
				hide: () => hide(id),
			};
		},
		[defaultDuration, defaultPosition, hide]
	);

	useEffect(() => {
		handler = {
			show,
			hide,
		};

		return () => {
			handler = null;
			clearTimer();
		};
	}, [hide, show]);

	const handleExited = useCallback(() => {
		if (!toast) return;
		toast.onClose?.();
		setToast(null);
	}, [toast]);

	const contextValue = useMemo<ToastContextValue>(
		() => ({
			show,
			hide,
		}),
		[hide, show]
	);

	const position: ToastPosition = toast?.position ?? defaultPosition;
	const resolvedSafeArea = toast?.safeArea ?? true;
	const customInsets = toast?.insets ?? {
		horizontal: DEFAULT_HORIZONTAL_INSET,
		vertical: DEFAULT_VERTICAL_INSET,
	};

	const offsetTop =
		(resolvedSafeArea ? (safeArea?.top ?? 0) : 0) +
		resolveInset(customInsets, 'top');
	const offsetBottom =
		(resolvedSafeArea ? (safeArea?.bottom ?? 0) : 0) +
		resolveInset(customInsets, 'bottom');
	const horizontalInset = resolveHorizontal(customInsets);
	const horizontalSafe =
		resolvedSafeArea && safeArea ? Math.max(safeArea.left, safeArea.right) : 0;
	const paddingHorizontal = theme.spacing[4] + horizontalInset + horizontalSafe;

	return (
		<ToastContext.Provider value={contextValue}>
			{children}
			<View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
				<View
					style={[
						styles.container,
						position === 'top'
							? { paddingTop: offsetTop }
							: { paddingBottom: offsetBottom, justifyContent: 'flex-end' },
						{ paddingHorizontal },
					]}
					pointerEvents="box-none"
				>
					{toast ? (
						<Toast
							// @ts-expect-error
							visible={toast.visible}
							onRequestClose={() => hide(toast._id)}
							onExited={handleExited}
							{...toast}
							testID={toast.testID}
						/>
					) : null}
				</View>
			</View>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) {
		throw new Error('useToast must be used within ToastProvider');
	}
	return ctx;
};

export const ToastController = {
	show: (options: ToastShowOptions) => handler?.show(options),
	hide: (id?: string) => handler?.hide(id),
};

export const toast = ToastController;

export const showToast = (options: ToastShowOptions) =>
	ToastController.show(options);

export const hideToast = (id?: string) => ToastController.hide(id);

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: theme.spacing[4],
		zIndex: theme.zIndex.toast,
	},
}));
