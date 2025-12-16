import { LinearGradient } from 'expo-linear-gradient';
import { ChevronsRight } from 'lucide-react-native';
import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Icon } from '../Icon';
import type { SwiperProps, SwiperSize } from './Swiper.types';


// ============================================================================
// Constants
// ============================================================================

const getThumbSize = (size: SwiperSize) => {
	switch (size) {
		case 'sm':
			return 32;
		case 'lg':
			return 48;
		case 'md':
		default:
			return 40;
	}
};

/**
 * Keep in sync with `styles.button.left`
 */
const DEFAULT_THUMB_INSET = 4;

// ============================================================================
// Swiper Component
// ============================================================================

/**
 * 
 * An interactive component that confirms and triggers an action by swiping left-to-right.
 * @example
 * ```tsx
 * <Swiper
 *   variant="filled"
 *   colorScheme="primary"
 *   onSwipeSuccess={() => console.log('Completed!')}
 * >
 *   Slide to confirm
 * </Swiper>
 * ```
 */
export const Swiper = forwardRef<View, SwiperProps>((props, ref) => {
	const {
		colorScheme = 'neutral',
		variant = 'filled',
		size = 'md',
		rounded = 'md',
		thumbShadow = 'md',
		disabled = false,
		icon,
		placeholder,
		actionTitle = 'Action!',
		threshold = 0.7,
		onSwipeSuccess,
		onSwipeStart,
		onSwipeCancel,
		customGradient,
		accessibilityLabel: accessibilityLabelProp,
		accessibilityHint: accessibilityHintProp,
		accessibilityState: accessibilityStateProp,
		onAccessibilityAction: onAccessibilityActionProp,
		onLayout: onLayoutProp,
		'aria-label': ariaLabel,
		testID,
		style,
		...restProps
	} = props;

	styles.useVariants({
		variant,
		size,
		rounded,
		disabled,
		colorScheme,
		thumbShadow,
	});

	const { theme } = useUnistyles();

	// Keep in sync with `styles.button.left`

	const hitSlopPx = Math.max(0, (44 - getThumbSize(size)) / 2);
	const hitSlop = useMemo(
		() => ({
			top: hitSlopPx,
			bottom: hitSlopPx,
			left: hitSlopPx,
			right: hitSlopPx,
		}),
		[hitSlopPx]
	);

	const iconColor = useMemo(() => {
		// Mirror `styles.buttonIcon` compoundVariants (neutral + filled/outlined)
		if (colorScheme === 'neutral' && (variant === 'filled' || variant === 'outlined')) {
			return theme.colors.neutral.text_inversed;
		}
		return theme.colors[colorScheme].text_1;
	}, [colorScheme, theme.colors, variant]);

	// Shared Values
	const containerWidth = useSharedValue(0);
	const translateX = useSharedValue(0);
	const isCompleting = useSharedValue(false);
	const isDragging = useSharedValue<0 | 1>(0);

	const containerWidthRef = useRef(0);
	const thumbSize = useSharedValue(getThumbSize(size));
	const thumbInset = useSharedValue(DEFAULT_THUMB_INSET);
	const thresholdValue = useSharedValue(Math.min(1, Math.max(0, threshold)));


	// 버튼 애니메이션 스타일
	const thumbScale = useDerivedValue(() => {
		return withTiming(isDragging.value ? 1.3 : 1, {
			duration: 200,
			easing: Easing.bezier(0.04, 1.07, 0.82, 0.86),
		});
	});

	const buttonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	
	// Progress Background 애니메이션 스타일
	const progressBackgroundAnimatedStyle = useAnimatedStyle(() => {
		const maxTranslate = Math.max(
			0,
			containerWidth.value - thumbSize.value - thumbInset.value * 2
		);
		const progress = maxTranslate > 0 ? translateX.value / maxTranslate : 0;
		const offset = thumbInset.value * 2 + thumbSize.value;

		return {
			width: interpolate(
				progress,
				[0, 0.01, 0.1, 1],
				[0, offset, offset + 0.1 * maxTranslate, offset + maxTranslate],
				Extrapolation.CLAMP
			),
		};
	});

	const actionTitleAnimatedStyle = useAnimatedStyle(() => {
		const maxTranslate = Math.max(
			0,
			containerWidth.value - thumbSize.value - thumbInset.value * 2
		);
		if (maxTranslate <= 0) {
			return { opacity: 0 };
		}
		return {
			opacity: interpolate(
				translateX.value,
				[0, maxTranslate / 2],
				[0, 1],
				Extrapolation.CLAMP
			),
		};
	});

	const placeHolderAnimatedStyle = useAnimatedStyle(() => {
		const maxTranslate = Math.max(
			0,
			containerWidth.value - thumbSize.value - thumbInset.value * 2
		);
		if (maxTranslate <= 0) {
			return { opacity: 1 };
		}
		return {
			opacity: interpolate(
				translateX.value,
				[0, maxTranslate / 3],
				[1, 0],
				Extrapolation.CLAMP
			),
		};
	});

	const notifySwipeStart = useCallback(() => {
		onSwipeStart?.();
	}, [onSwipeStart]);

	const notifySwipeSuccess = useCallback(() => {
		onSwipeSuccess?.();
	}, [onSwipeSuccess]);

	const notifySwipeCancel = useCallback(() => {
		onSwipeCancel?.();
	}, [onSwipeCancel]);

	const handleLayout = useCallback((event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;
		containerWidth.value = width;
		containerWidthRef.current = width;
		onLayoutProp?.(event);
	}, [containerWidth, onLayoutProp]);

	const completeFromA11y = useCallback(() => {
		if (disabled) return;

		const width = containerWidthRef.current;
		const maxTranslate = Math.max(0, width - thumbSize.value - thumbInset.value * 2);
		if (maxTranslate <= 0) {
			notifySwipeSuccess();
			translateX.value = 0;
			isCompleting.value = false;
			return;
		}

		// Best-effort guard (JS read may be slightly stale)
		if (isCompleting.value) return;

		isCompleting.value = true;
		translateX.value = withTiming(
			maxTranslate,
			{
				duration: 330,
				easing: Easing.bezier(0.04, 1.07, 0.82, 0.86),
			},
			(finished) => {
				'worklet';
				if (!finished) return;
				runOnJS(notifySwipeSuccess)();

				translateX.value = withDelay(
					300,
					withTiming(0, { duration: 200 }, (finishedReset) => {
						'worklet';
						if (finishedReset) {
							isCompleting.value = false;
						}
					})
				);
			}
		);
	}, [
		disabled,
		isCompleting,
		notifySwipeSuccess,
	]);

	type OnAccessibilityAction = NonNullable<SwiperProps['onAccessibilityAction']>;
	const handleAccessibilityAction = useCallback<OnAccessibilityAction>(
		(event) => {
			if (event?.nativeEvent?.actionName === 'activate') {
				completeFromA11y();
			}
			onAccessibilityActionProp?.(event);
		},
		[completeFromA11y, onAccessibilityActionProp]
	);

	// Pan Gesture
	const panGesture = Gesture.Pan()
		.enabled(!disabled)
		.hitSlop(hitSlop)
		.activeOffsetX([10, 999999]) // 좌→우 방향만
		.failOffsetY([-50, 50]) // 수직 이동 시 실패
		.onBegin(() => {
			'worklet';
			if (isCompleting.value) return;

			isDragging.value = 1;

			if (onSwipeStart) {
				runOnJS(notifySwipeStart)();
			}
		})
		.onUpdate((event) => {
			'worklet';
			if (isCompleting.value) return;

			isDragging.value = 1;

			// 0 <= translateX <= maxTranslate 범위 제한
			const maxTranslate = Math.max(
				0,
				containerWidth.value - thumbSize.value - thumbInset.value * 2
			);
			translateX.value = Math.max(
				0,
				Math.min(event.translationX, maxTranslate)
			);
		})
		.onEnd((event) => {
			'worklet';
			if (isCompleting.value) return;

			isDragging.value = 0;

			const maxTranslate = Math.max(
				0,
				containerWidth.value - thumbSize.value - thumbInset.value * 2
			);
			const progress = maxTranslate > 0 ? translateX.value / maxTranslate : 0;
			const velocity = event.velocityX;

			// 빠른 플링 제스처 고려
			const shouldComplete =
				progress >= thresholdValue.value || (velocity > 500 && progress > 0.7);

			if (shouldComplete) {
				// 완료
				isCompleting.value = true;
				translateX.value = withTiming(
					maxTranslate,
					{
						duration: 330,
						easing: Easing.bezier(0.04, 1.07, 0.82, 0.86),
					},
					(finished) => {
						'worklet';
						if (!finished) return;

						runOnJS(notifySwipeSuccess)();

						translateX.value = withDelay(
							300,
							withTiming(0, { duration: 200 }, (finishedReset) => {
								'worklet';
								if (finishedReset) {
									isCompleting.value = false;
								}
							})
						);
					}
				);
			} else {
				// 취소 - 원위치
				translateX.value = withTiming(
					0,
					{
						duration: 220,
						easing: Easing.bezier(0.27, 0.04, 0.28, 0.93),
					},
					(finished) => {
						'worklet';
						if (!finished) return;
						runOnJS(notifySwipeCancel)();
					}
				);
			}
		})
		.onFinalize((_event, success) => {
			'worklet';
			if (success) return;

			// Gesture cancelled/failed: restore state safely
			isDragging.value = 0;

			// If completing animation is in progress, do not override it.
			if (isCompleting.value) return;

			const didMove = translateX.value > 0;
			translateX.value = withTiming(
				0,
				{
					duration: 220,
					easing: Easing.bezier(0.27, 0.04, 0.28, 0.93),
				},
				(finished) => {
					'worklet';
					if (!finished) return;
					if (didMove) {
						runOnJS(notifySwipeCancel)();
					}
				}
			);
		});


	const gradientsInfo = useMemo((): { colors: string[]; locations?: number[] } | null => {
		if (variant !== 'gradient') return null;

		// Custom gradient is provided and is valid
		if (customGradient && customGradient?.colors?.length >= 2 && customGradient?.locations?.length === customGradient?.colors?.length) {
			return customGradient;
		}

		const stops = Object.entries(theme.gradients[colorScheme].values)
			.map(([location, color]) => ({
				location: Number(location),
				color: color as string,
			}))
			.filter((stop) => Number.isFinite(stop.location))
			.sort((a, b) => a.location - b.location);

		return {
			colors: stops.map((s) => s.color),
			locations: stops.map((s) => s.location),
		};
	}, [colorScheme, customGradient, theme.gradients, variant]);

	const shouldRenderGradient = useMemo(() => {
		const isValidGradient = gradientsInfo?.colors && gradientsInfo?.locations && gradientsInfo?.colors?.length === gradientsInfo?.locations?.length;
		return variant === 'gradient' && isValidGradient;
	}, [variant, customGradient, gradientsInfo]);


	useEffect(() => {
		thumbSize.value = getThumbSize(size);
	}, [size]);

	useEffect(() => {
		thresholdValue.value = Math.min(1, Math.max(0, threshold));
	}, [threshold, thresholdValue]);



	// Progress Background 렌더링
	const renderProgressBackground = () => {
		if (shouldRenderGradient) {
			const gradient = gradientsInfo;
			if (!gradient) return null;

			return (
				<Animated.View
					style={[styles.progressBackground, progressBackgroundAnimatedStyle]}
				>
					<LinearGradient
						locations={gradient.locations as [number, number, ...number[]]}
						colors={gradient.colors as [string, string, ...string[]]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={[
							styles.progressBackground,
							{ width: '100%', height: '100%', overflow: 'hidden' },
						]}
					/>
					{actionTitle && (
						<Animated.Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={[styles.actionTitle, actionTitleAnimatedStyle]}
						>
							{actionTitle}
						</Animated.Text>
					)}
				</Animated.View>
			);
		}

		return (
			<Animated.View
				style={[styles.progressBackground, progressBackgroundAnimatedStyle]}
			>
				{actionTitle && (
					<View style={styles.textContainer}>
						<Animated.Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={[styles.actionTitle, actionTitleAnimatedStyle]}
						>
							{actionTitle}
						</Animated.Text>
					</View>
				)}
			</Animated.View>
		);
	};

	return (
		<View
			{...restProps}
			ref={ref}
			style={[styles.container, style]}
			onLayout={handleLayout}
			accessibilityRole="button"
			accessibilityLabel={
				ariaLabel ||
				accessibilityLabelProp ||
				(typeof placeholder === 'string' ? placeholder : undefined)
			}
			accessibilityHint={accessibilityHintProp ?? 'Swipe right to confirm'}
			accessibilityState={{ ...accessibilityStateProp, disabled }}
			accessibilityActions={[{ name: 'activate' }]}
			onAccessibilityAction={handleAccessibilityAction}
			testID={testID}
		>
			{/* Progress Background */}
			{renderProgressBackground()}

			{/* Text Content */}
			<View style={styles.textContainer}>
				<Animated.Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={[styles.text, placeHolderAnimatedStyle]}
				>
					{placeholder || 'Slide to confirm'}
				</Animated.Text>
			</View>

			{/* Swipeable Button */}
			<GestureDetector gesture={panGesture}>
				<Animated.View style={[styles.button, buttonAnimatedStyle]}>
					{icon || (
						<Icon icon={ChevronsRight} size="md" color={iconColor} />
					)}
				</Animated.View>
			</GestureDetector>
		</View>
	);
});

Swiper.displayName = 'Swiper';

const styles = StyleSheet.create((theme) => ({
	container: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		borderCurve: 'continuous',
		paddingVertical: theme.spacing[2],

		variants: {
			variant: {
				filled: {
					backgroundColor: theme.colors.neutral.content_2,
					boxShadow: theme.shadows.inner,
				},
				outlined: {
					backgroundColor: 'transparent',
					borderWidth: 1,
					borderColor: theme.colors.neutral.text_1,
				},
				flat: {
					backgroundColor: theme.colors.neutral.content_3,
				},
				gradient: {
					backgroundColor: theme.colors.neutral.content_3,
				},
			},
			size: {
				sm: {
					height: 40,
					borderRadius: theme.rounded.md,
				},
				md: {
					height: 48,
					borderRadius: theme.rounded.lg,
				},
				lg: {
					height: 56,
					borderRadius: theme.rounded.xl,
				},
			},
			rounded: {
				none: { borderRadius: 0 },
				xs: {
					borderRadius: theme.rounded.xs,
				},
				sm: {
					borderRadius: theme.rounded.sm,
				},
				md: {
					borderRadius: theme.rounded.md,
				},
				lg: {
					borderRadius: theme.rounded.lg,
				},
				xl: {
					borderRadius: theme.rounded.xl,
				},
				full: {
					borderRadius: theme.rounded.full,
				},
			},
			disabled: {
				true: {
					opacity: 0.5,
				},
			},
			colorScheme: {
				primary: {},
				neutral: {},
				error: {},
				warning: {},
				success: {},
				info: {},
			},
			thumbShadow: {
				none: {},
				sm: {},
				md: {},
				lg: {},
			},
		},
	},

	progressBackground: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		borderCurve: 'continuous',

		variants: {
			variant: {
				filled: {},
				outlined: {},
				flat: {},
				gradient: {},
			},
			size: {
				sm: {},
				md: {},
				lg: {},
			},
			colorScheme: {
				primary: {},
				neutral: {},
				error: {},
				warning: {},
				success: {},
				info: {},
			},
			rounded: {
				none: { borderRadius: 0 },
				xs: {
					borderRadius: theme.rounded.xs * 0.86,
				},
				sm: {
					borderRadius: theme.rounded.sm * 0.86,
				},
				md: {
					borderRadius: theme.rounded.md * 0.86,
				},
				lg: {
					borderRadius: theme.rounded.lg * 0.86,
				},
				xl: {
					borderRadius: theme.rounded.xl * 0.86,
				},
				full: {
					borderRadius: theme.rounded.full * 0.86,
				},
			},
		},

		compoundVariants: [
			// filled + colored
			{
				variant: 'filled',
				colorScheme: 'neutral',
				styles: {
					backgroundColor: theme.colors.neutral.content_inversed,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'primary',
				styles: {
					backgroundColor: theme.colors.primary.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'error',
				styles: {
					backgroundColor: theme.colors.error.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'warning',
				styles: {
					backgroundColor: theme.colors.warning.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'success',
				styles: {
					backgroundColor: theme.colors.success.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'info',
				styles: {
					backgroundColor: theme.colors.info.solid,
				},
			},
			// outlined + colored
			{
				variant: 'outlined',
				colorScheme: 'neutral',
				styles: {
					backgroundColor: theme.colors.neutral.text_3,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'primary',
				styles: {
					backgroundColor: theme.colors.primary.content_4,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'error',
				styles: {
					backgroundColor: theme.colors.error.content_4,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'warning',
				styles: {
					backgroundColor: theme.colors.warning.content_4,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'success',
				styles: {
					backgroundColor: theme.colors.success.content_4,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'info',
				styles: {
					backgroundColor: theme.colors.info.content_4,
				},
			},
			// flat
			{
				variant: 'flat',
				colorScheme: 'neutral',
				styles: {
					backgroundColor: theme.colors.neutral.text_3,
				},
			},
			{
				variant: 'flat',
				colorScheme: 'primary',
				styles: {
					backgroundColor: theme.colors.primary.solid,
				},
			},
			{
				variant: 'flat',
				colorScheme: 'error',
				styles: {
					backgroundColor: theme.colors.error.solid,
				},
			},
			{
				variant: 'flat',
				colorScheme: 'warning',
				styles: {
					backgroundColor: theme.colors.warning.solid,
				},
			},
			{
				variant: 'flat',
				colorScheme: 'success',
				styles: {
					backgroundColor: theme.colors.success.solid,
				},
			},
			{
				variant: 'flat',
				colorScheme: 'info',
				styles: {
					backgroundColor: theme.colors.info.solid,
				},
			},
		],
	},

	textContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		pointerEvents: 'none',
	},

	text: {
		textAlign: 'center',
		color: theme.colors.neutral.text_4,

		variants: {
			variant: {
				filled: {},
				outlined: {},
				flat: {},
				gradient: {},
			},
			size: {
				sm: {
					...theme.typography.caption1,
					fontWeight: theme.text.fontWeight.medium,
				},
				md: {
					...theme.typography.body3,
					fontWeight: theme.text.fontWeight.medium,
				},
				lg: {
					...theme.typography.body2,
					fontWeight: theme.text.fontWeight.medium,
				},
			},
			colorScheme: {
				primary: {},
				neutral: {},
				error: {},
				warning: {},
				success: {},
				info: {},
			},
		},
	},

	actionTitle: {
		fontWeight: theme.text.fontWeight.semibold,

		variants: {
			variant: {
				filled: {
					color: theme.colors.neutral.content_inversed,
				},
				outlined: {
					color: theme.colors.neutral.text_1,
				},
				flat: {
					color: theme.colors.neutral.content_inversed,
				},
				gradient: {},
			},
			size: {
				sm: {},
				md: {},
				lg: {},
			},
			colorScheme: {
				primary: {},
				neutral: {},
				error: {},
				warning: {},
				success: {},
				info: {},
			},
		},
		compoundVariants: [
			{
				variant: 'filled',
				colorScheme: 'neutral',
				styles: {
					color: theme.colors.neutral.text_inversed,
				},
			},
			{
				variant: 'flat',
				colorScheme: 'neutral',
				styles: {
					color: theme.colors.neutral.text_inversed,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'neutral',
				styles: {
					color: theme.colors.neutral.text_inversed,
				},
			},
		],
	},

	button: {
		position: 'absolute',
		left: theme.spacing[2],
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.neutral.content_1,
		borderCurve: 'continuous',

		variants: {
			variant: {
				filled: {},
				outlined: {},
				flat: {},
				gradient: {},
			},
			size: {
				sm: {
					width: 32,
					height: 32,
					borderRadius: theme.rounded.md,
				},
				md: {
					width: 40,
					height: 40,
					borderRadius: theme.rounded.lg,
				},
				lg: {
					width: 48,
					height: 48,
					borderRadius: theme.rounded.xl,
				},
			},
			rounded: {
				none: { borderRadius: 0 },
				xs: {
					borderRadius: theme.rounded.xs * 0.85,
				},
				sm: {
					borderRadius: theme.rounded.sm * 0.85,
				},
				md: {
					borderRadius: theme.rounded.md * 0.85,
				},
				lg: {
					borderRadius: theme.rounded.lg * 0.85,
				},
				xl: {
					borderRadius: theme.rounded.xl * 0.85,
				},
				full: {
					borderRadius: theme.rounded.full,
				},
			},
			thumbShadow: {
				none: {},
				sm: {
					boxShadow: theme.shadows.sm,
				},
				md: {
					boxShadow: theme.shadows.lg,
				},
				lg: {
					boxShadow: theme.shadows.lg,
				},
			},
			colorScheme: {
				primary: {},
				neutral: {},
				error: {},
				warning: {},
				success: {},
				info: {},
			},
		},

		compoundVariants: [
			// filled + colored
			{
				variant: 'filled',
				colorScheme: 'neutral',
				styles: {
					backgroundColor: theme.colors.neutral.content_inversed,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'primary',
				styles: {
					backgroundColor: theme.colors.primary.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'error',
				styles: {
					backgroundColor: theme.colors.error.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'warning',
				styles: {
					backgroundColor: theme.colors.warning.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'success',
				styles: {
					backgroundColor: theme.colors.success.solid,
				},
			},
			{
				variant: 'filled',
				colorScheme: 'info',
				styles: {
					backgroundColor: theme.colors.info.solid,
				},
			},
			// outlined + colored
			{
				variant: 'outlined',
				colorScheme: 'neutral',
				styles: {
					backgroundColor: theme.colors.neutral.content_inversed,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'primary',
				styles: {
					backgroundColor: theme.colors.primary.solid,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'error',
				styles: {
					backgroundColor: theme.colors.error.solid,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'warning',
				styles: {
					backgroundColor: theme.colors.warning.solid,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'success',
				styles: {
					backgroundColor: theme.colors.success.solid,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'info',
				styles: {
					backgroundColor: theme.colors.info.solid,
				},
			},
		],
	},

	buttonIcon: {
		color: theme.colors.neutral.text_1,
		variants: {
			colorScheme: {
				primary: {
					color: theme.colors.primary.text_1,
				},
				neutral: {
					color: theme.colors.neutral.text_1,
				},
				error: {
					color: theme.colors.error.text_1,
				},
				warning: {
					color: theme.colors.warning.text_1,
				},
				success: {
					color: theme.colors.success.text_1,
				},
				info: {
					color: theme.colors.info.text_1,
				},
			},
			variant: {
				filled: {},
				outlined: {},
				flat: {},
				gradient: {},
			},
		},

		compoundVariants: [
			{
				variant: 'filled',
				colorScheme: 'neutral',
				styles: {
					color: theme.colors.neutral.text_inversed,
				},
			},
			{
				variant: 'outlined',
				colorScheme: 'neutral',
				styles: {
					color: theme.colors.neutral.text_inversed,
				},
			},
		],
	},
}));
