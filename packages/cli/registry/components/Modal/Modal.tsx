import { BlurView } from 'expo-blur';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from 'react';
import {
	BackHandler,
	Pressable,
	Modal as RNModal,
	useWindowDimensions,
	View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { ModalContext } from './Modal.context';
import type { ModalRootProps } from './Modal.types';

// ============================================
// Constants
// ============================================

const DEFAULT_SWIPE_THRESHOLD = 100;
const DEFAULT_BACKDROP_OPACITY = 0.3;
const SPRING_CONFIG = {
	damping: 120,
	stiffness: 1800,
	mass: 2,
};

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

// ============================================
// Animation Presets
// ============================================

const TIMING_CONFIG_CONTENT = {
	easing: Easing.bezier(0.2, 1, 0.43, 0.97),
	duration: 300,
}

const INITIAL_CONTENT_TRANSLATE_Y = 300;

// ============================================
// Modal Root Component
// ============================================

/**
 * Modal Root Component
 *
 * ## Props
 *
 * - `visible`: Single State for Modal Visibility
 * - `onClose`: Call to close the modal (external control required)
 * - `onShow`: Called when visible is true
 * - `onDismiss`: Called when visible is false
 * - `closable`: If true, modal can be closed via backdrop/swipe, if false, only via button
 */
export const ModalRoot = forwardRef<View, ModalRootProps>(
	(
		{
			visible,
			onClose,
			size = 'md',
			colorScheme = 'base',
			closable = true,
			swipeToDismiss = true,
			swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
			backdropOpacity = DEFAULT_BACKDROP_OPACITY,
			useBackdropBlur = true,
			backdropBlurIntensity = 50,
			backdropBlurTint = 'light',
			rounded = 'md',
			children,
			contentStyle,
			backdropStyle,
			onShow,
			onDismiss,
			modalProps,
			...overlayViewProps
		},
		forwardedRef
	) => {
	const { height: SCREEN_HEIGHT } = useWindowDimensions();
	const overlayRef = useRef<View>(null);
	const { style: overlayStyle, ...restOverlayViewProps } = overlayViewProps;

	useImperativeHandle(forwardedRef, () => overlayRef.current!);

	styles.useVariants({ size, colorScheme, rounded });

	// ============================================
	// Shared Values (for animations)
	// ============================================

	const contentOpacityValue = useSharedValue(0);
	const contentScaleValue = useSharedValue(0.5);
	const translateY = useSharedValue(INITIAL_CONTENT_TRANSLATE_Y);

	const backdropOpacityValue = useSharedValue(0);
	const swipeThresholdValue = useSharedValue(swipeThreshold);
	const backdropOpacityTargetValue = useSharedValue(backdropOpacity);

	// ============================================
	// Computed Values
	// ============================================

	const contextValue = useMemo(
		() => ({
			close: onClose,
			size,
			colorScheme,
			rounded,
		}),
		[onClose, size, colorScheme, rounded]
	);

	// ============================================
	// Effects
	// ============================================

	// visible change - backdrop animation and callback call
	useEffect(() => {
		swipeThresholdValue.value = swipeThreshold;
	}, [swipeThreshold, swipeThresholdValue]);

	useEffect(() => {
		backdropOpacityTargetValue.value = backdropOpacity;
	}, [backdropOpacity, backdropOpacityTargetValue]);

	// visible change - backdrop animation and callback call
	useEffect(() => {
		if (visible) {
			backdropOpacityValue.value = withTiming(backdropOpacity, TIMING_CONFIG_CONTENT);
			contentOpacityValue.value = withTiming(1, TIMING_CONFIG_CONTENT);
			contentScaleValue.value = withTiming(1, TIMING_CONFIG_CONTENT);
			translateY.value = withTiming(0, TIMING_CONFIG_CONTENT);
			onShow?.();
		}

		return () => {
			contentOpacityValue.value = withTiming(0, TIMING_CONFIG_CONTENT);
			contentScaleValue.value = withTiming(0.5, TIMING_CONFIG_CONTENT);
			translateY.value = withTiming(INITIAL_CONTENT_TRANSLATE_Y, TIMING_CONFIG_CONTENT);
		};
	}, [
		visible,
		onShow,
	]);

	// Android back button handling
	useEffect(() => {
		if (!closable || !visible) return;

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				if (visible) {
					onClose();
					return true;
				}
				return false;
			}
		);

		return () => backHandler.remove();
	}, [visible, closable, onClose]);

	// ============================================
	// Handlers
	// ============================================

	const handleBackdropPress = useCallback(() => {
		if (closable) {
			onClose();
		}
	}, [closable, onClose]);

	const handleSwipeDismiss = useCallback(() => {
		onClose();
	}, [onClose]);

	// ============================================
	// Gestures
	// ============================================

	const panGesture = Gesture.Pan()
		.enabled(swipeToDismiss && closable)
		.activeOffsetY([-10, 10])
		.failOffsetX([-10, 10])
		.onUpdate((event) => {
			const { translationY } = event;

			translateY.value = Math.max(0, translationY);

			// backdrop opacity sync
			const progress = Math.abs(translateY.value) / swipeThresholdValue.value;
			backdropOpacityValue.value = interpolate(
				progress,
				[0, 1],
				[backdropOpacityTargetValue.value, 0],
				Extrapolation.CLAMP
			);
		})
		.onEnd((event) => {
			const { translationY, velocityY } = event;
			const absTranslation = Math.abs(translationY);
			const shouldDismiss =
				absTranslation > swipeThresholdValue.value || velocityY > 500;

			if (shouldDismiss) {
				// Dismiss via swipe (swipe to bottom)
				const finalY = SCREEN_HEIGHT;
				translateY.value = withTiming(finalY, { duration: 200 }, () => {
					runOnJS(handleSwipeDismiss)();
				});
			} else {
				// Bounce back to initial position
				translateY.value = withSpring(0, SPRING_CONFIG);
				backdropOpacityValue.value = withSpring(
					backdropOpacityTargetValue.value,
					SPRING_CONFIG
				);
			}
		});

	// ============================================
	// Animated Styles
	// ============================================

	const animatedBackdropStyle = useAnimatedStyle(() => ({
		opacity: backdropOpacityValue.value,
	}));

	const animatedContentStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
		opacity: contentOpacityValue.value,
		
	}));

	// ============================================
	// Render
	// ============================================

	if (!visible) {
		return null;
	}

	return (
		<RNModal
			visible={visible}
			transparent
			animationType="none"
			statusBarTranslucent
			onRequestClose={closable ? onClose : undefined}
			{...modalProps}
		>
			<View
				ref={overlayRef}
				style={[styles.overlay, overlayStyle]}
				accessibilityViewIsModal
				importantForAccessibility="yes"
				onAccessibilityEscape={closable ? onClose : undefined}
				{...restOverlayViewProps}
			>
				{/* Backdrop */}
				<Pressable
					style={StyleSheet.absoluteFill}
					onPress={handleBackdropPress}
					accessible={false}
				>
					<Animated.View
						style={[styles.backdrop, animatedBackdropStyle, backdropStyle]}
					/>
					{useBackdropBlur && (
						<AnimatedBlurView
							intensity={backdropBlurIntensity}
							tint={backdropBlurTint}
							style={[StyleSheet.absoluteFill]}
						/>
					)}
				</Pressable>

				{/* Content */}
				<GestureDetector gesture={panGesture}>
					<Animated.View
						style={[
							styles.contentContainer,
							animatedContentStyle,
							contentStyle,
						]}
					>
						<ModalContext.Provider value={contextValue}>
							{children}
						</ModalContext.Provider>
					</Animated.View>
				</GestureDetector>
			</View>
		</RNModal>
	);
	}
);

ModalRoot.displayName = 'Modal.Root';

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create((theme) => ({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: theme.zIndex.modal,
	},

	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: theme.colors.neutral.content_inversed,
	},

	contentContainer: {
		backgroundColor: theme.colors.neutral.content_1,
		boxShadow: theme.shadows.overlay,
		borderRadius: theme.rounded.xl,
		borderCurve: 'continuous',
		overflow: 'hidden',

		variants: {
			size: {
				sm: {
					maxWidth: '80%',
					padding: theme.spacing[5],
					gap: theme.spacing[4],
				},
				md: {
					maxWidth: '85%',
					padding: theme.spacing[5],
					gap: theme.spacing[5],
				},
				lg: {
					maxWidth: '95%',
					padding: theme.spacing[6],
					gap: theme.spacing[6],
				},
			},

			rounded: {
				none: {
					borderRadius: theme.rounded.none,
				},
				_2xs: {
					borderRadius: theme.rounded._2xs,
				},
				xs: {
					borderRadius: theme.rounded.xs,
				},
				sm: {
					borderRadius: theme.rounded.md,
				},
				md: {
					borderRadius: theme.rounded.xl,
				},
				lg: {
					borderRadius: theme.rounded._2xl,
				},
			},
			colorScheme: {
				base: {
					backgroundColor: theme.colors.neutral.content_1,
				},
				inverted: {
					backgroundColor: theme.colors.neutral.content_inversed,
				},
			},
		},
	},
}));
