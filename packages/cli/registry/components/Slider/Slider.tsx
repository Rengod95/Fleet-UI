import {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	type LayoutChangeEvent,
	type View as RNView,
	View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import type { SliderProps, SliderSize, SliderThumbVariant } from './Slider.types';

// ========================================================================
// Constants
// ========================================================================

/**
 * Size configuration for Slider
 * - trackHeight: track background height
 * - thumbSize: circle/oval thumb default size
 * - linedTrackHeight: on lined track variant, override track height with this value
 * - lineThumbWidth: on line thumb variant, override thumb width with this value
 * - lineThumbHeight: on line thumb variant, override thumb height with this value (trackHeight + 6)
 * - ovalThumbWidth: on oval thumb variant, override thumb width with this value
 */
export const SIZE_CONFIG = {
	sm: {
		trackHeight: 16,
		linedTrackHeight: 4,
		thumbSize: 16,
		lineThumbWidth: 2,
		lineThumbHeight: 22,
		ovalThumbWidth: 24,
		thumbPadding: 2,
	},
	md: {
		trackHeight: 20,
		linedTrackHeight: 6,
		thumbSize: 26,
		lineThumbWidth: 3,
		lineThumbHeight: 26,
		ovalThumbWidth: 36,
		thumbPadding: 8,
	},
	lg: {
		trackHeight: 24,
		linedTrackHeight: 8,
		thumbSize: 32,
		lineThumbWidth: 4,
		lineThumbHeight: 30,
		ovalThumbWidth: 42,
		thumbPadding: 3,
	},
	xl: {
		trackHeight: 28,
		linedTrackHeight: 10,
		thumbSize: 38,
		lineThumbWidth: 6,
		lineThumbHeight: 34,
		ovalThumbWidth: 48,
		thumbPadding: 3,
	},
} as const;

// ========================================================================
// Animation Configuration
// ========================================================================

export const ANIMATION_CONFIG = {
	// When pan gesture starts, scale up the track and thumb
	trackScaleOnDrag: 1.3, 
	thumbScaleOnDrag: 1.7,

	// basic spring configuration
	spring: {
		stiffness: 1000,
		damping: 120,
		mass: 6,
	},

	trackScaleUp :{
		stiffness: 1500,
		damping: 80,
		mass: 7,
	},

	// basic timing
	timing: {
		duration: 200,
	},

	// inertia factor (velocity * factor)
	inertiaFactor: 0.15,
	maxInertiaOffset: 10,
} as const;

// ========================================================================
// Worklet Helper Functions
// ========================================================================

const valueToPositionWorklet = (
	val: number,
	trackLen: number,
	_thumbWidth: number, // kept for API compatibility, not used in center-based calc
	minVal: number,
	maxVal: number
): number => {
	'worklet';
	const range = maxVal - minVal;
	if (range === 0 || trackLen <= 0) return 0;
	const normalizedValue = (val - minVal) / range;
	// Position is directly proportional to track length (center-based)
	return normalizedValue * trackLen;
};

const positionToValueWorklet = (
	pos: number,
	trackLen: number,
	minVal: number,
	maxVal: number,
	stepVal: number
): number => {
	'worklet';
	const range = maxVal - minVal;
	if (trackLen <= 0) return minVal;
	const normalizedPos = pos / trackLen;
	const rawValue = normalizedPos * range + minVal;
	// Snap to step
	const steppedValue = Math.round(rawValue / stepVal) * stepVal;
	return Math.max(minVal, Math.min(maxVal, steppedValue));
};

/**
 * Get thumb dimensions based on variant and size
 */
export const getThumbDimensions = (
	thumbVariant: SliderThumbVariant,
	size: SliderSize
): { width: number; height: number } => {
	const config = SIZE_CONFIG[size];

	switch (thumbVariant) {
		case 'circle':
			return { width: config.thumbSize, height: config.thumbSize };
		case 'oval':
			return { width: config.ovalThumbWidth, height: config.thumbSize };
		case 'line':
			return { width: config.lineThumbWidth, height: config.lineThumbHeight };
	}
};

// ============================================================================
// Slider Component
// ============================================================================

export const Slider = forwardRef<RNView, SliderProps>((props, ref) => {
	const {
		colorScheme = 'neutral',
		trackVariant = 'flat',
		thumbVariant = 'circle',
		size = 'md',
		rounded = 'md',
		thumbShadow = 'md',
		trackShadow = 'base',
		thumbCount = 1,
		min = 0,
		max = 100,
		step = 1,
		minStepsBetweenThumbs = 0,
		throttleMs = 200,
		disabled = false,
		defaultValue: defaultValueProp,
		onValueChange,
		trackLength,
		accessibilityLabel = 'Slider',
		testID,
		style,
		...rest
	} = props;

	const showThumb0 = thumbCount >= 1;
	const showThumb1 = thumbCount === 2;
	const isThumbVisible = thumbCount > 0;

	// ========================================================================
	// State Management (Uncontrolled)
	// ========================================================================

	const getDefaultValue = useCallback(() => {
		if (defaultValueProp) return defaultValueProp;
		if (thumbCount === 2) return [0, 100];
		return [min];
	}, [defaultValueProp, thumbCount, min]);

	// React state for uncontrolled value (source of truth)
	const [internalValue, setInternalValue] = useState<number[]>(getDefaultValue);
	// Ref to track last update time for throttling
	const lastUpdateTimeRef = useRef(0);

	// ========================================================================
	// Layout & Dimensions (SharedValues for UI Thread access)
	// ========================================================================

	// Thumb dimensions as SharedValues (updated when props change)
	const thumbWidthSV = useSharedValue(getThumbDimensions(thumbVariant, size).width);
	// Track dimension (horizontal width) as SharedValue
	const trackDimensionSV = useSharedValue(0);

	// Thumb positions (UI state - drives all animations)
	const thumb0Position = useSharedValue(0);
	const thumb1Position = useSharedValue(0);

	// Drag start positions (fixed reference point during gesture)
	const dragStartPosition0 = useSharedValue(0);
	const dragStartPosition1 = useSharedValue(0);

	// Gesture state
	const isDragging = useSharedValue(false);
	const activeThumbIndex = useSharedValue(-1);
	const dragVelocity = useSharedValue(0);

	// Scale animations
	const trackScale = useSharedValue(1);
	const thumbScale = useSharedValue(1);

	// Inertia offset for track
	const inertiaOffset = useSharedValue(0);

	// ========================================================================
	// Handlers
	// ========================================================================

	// Handle track layout - update SharedValues and initialize thumb positions
	const handleTrackLayout = useCallback(
		(event: LayoutChangeEvent) => {
			const { width } = event.nativeEvent.layout;
			const trackDim = width;
			trackDimensionSV.value = trackDim;

			// Initialize thumb positions if not dragging
			if (!isDragging.value && trackDim > 0) {
				const pos0 = valueToPositionWorklet(
					internalValue[0] ?? min,
					trackDim,
					thumbWidthSV.value,
					min,
					max
				);
				thumb0Position.value = pos0;

				if (internalValue.length > 1) {
					const pos1 = valueToPositionWorklet(
						internalValue[1] ?? max,
						trackDim,
						thumbWidthSV.value,
						min,
						max
					);
					thumb1Position.value = pos1;
				}
			}
		},
		[internalValue, min, max]
	);

	const updateValue = useCallback(
		(newValue: number[]) => {
			const now = Date.now();
			// Throttle updates
			if (now - lastUpdateTimeRef.current < throttleMs) {
				return;
			}
			lastUpdateTimeRef.current = now;
			onValueChange?.(newValue);
		},
		[onValueChange, throttleMs]
	);

	const commitValue = useCallback(
		(newValue: number[]) => {
			setInternalValue(newValue);
			// Ensure consumers can rely on onValueChange to read the final value
			onValueChange?.(newValue);
		},
		[onValueChange]
	);

	// ========================================================================
	// Gesture Handlers
	// ========================================================================

	const createThumbGesture = useCallback(
		(thumbIndex: number) => {
		const positionValue = thumbIndex === 0 ? thumb0Position : thumb1Position;
		const otherPositionValue =
			thumbIndex === 0 ? thumb1Position : thumb0Position;
		const dragStartPosition =
			thumbIndex === 0 ? dragStartPosition0 : dragStartPosition1;

		return Gesture.Pan()
			.enabled(!disabled)
			.onBegin(() => {
				'worklet';
				isDragging.value = true;
				activeThumbIndex.value = thumbIndex;

				// Save the starting position (fixed reference for this gesture)
				// This is the current thumb position within the track
				dragStartPosition.value = positionValue.value;

				// Scale up animations
				trackScale.value = withSpring(
					ANIMATION_CONFIG.trackScaleOnDrag,
					ANIMATION_CONFIG.trackScaleUp
				);
				thumbScale.value = withSpring(
					ANIMATION_CONFIG.thumbScaleOnDrag,
					ANIMATION_CONFIG.trackScaleUp
				);
			})
			.onUpdate((event) => {
				'worklet';
				const delta = event.translationX;
				const velocity = event.velocityX;

				// Update velocity for inertia effect
				dragVelocity.value = velocity;

				// Calculate inertia offset (track follows thumb with lag)
				inertiaOffset.value = interpolate(
					velocity,
					[-2000, 0, 2000],
					[
						-ANIMATION_CONFIG.maxInertiaOffset,
						0,
						ANIMATION_CONFIG.maxInertiaOffset,
					],
					'clamp'
				);

				// Calculate new position from FIXED start position + delta
				// Position represents thumb CENTER, range is [0, trackDimension]
				let newPosition = dragStartPosition.value + delta;

				// Clamp to track bounds (center-based: 0 to trackDimension)
				const maxPosition = trackDimensionSV.value;
				newPosition = Math.max(0, Math.min(maxPosition, newPosition));

				// For dual thumb, ensure minimum distance
				if (thumbCount === 2 && maxPosition > 0) {
					const minDistance =
						minStepsBetweenThumbs * step * (maxPosition / (max - min));
					if (thumbIndex === 0) {
						const maxAllowed = otherPositionValue.value - minDistance;
						newPosition = Math.min(newPosition, maxAllowed);
					} else {
						const minAllowed = otherPositionValue.value + minDistance;
						newPosition = Math.max(newPosition, minAllowed);
					}
				}

				// Update SharedValue (UI immediately reflects this)
				positionValue.value = withSpring(
					newPosition,
					ANIMATION_CONFIG.spring
				);

				// Convert position to value and notify (throttled)
				const trackDim = trackDimensionSV.value;

				const newVal = positionToValueWorklet(
					newPosition,
					trackDim,
					min,
					max,
					step
				);

				// Build new values array
				const val0 =
					thumbIndex === 0
						? newVal
						: positionToValueWorklet(
								thumb0Position.value,
								trackDim,
								min,
								max,
								step
							);
				const val1 =
					thumbCount === 2
						? thumbIndex === 1
							? newVal
							: positionToValueWorklet(
									thumb1Position.value,
									trackDim,
									min,
									max,
									step
								)
						: undefined;

				const newValues = val1 !== undefined ? [val0, val1] : [val0];
				runOnJS(updateValue)(newValues);
			})
			.onEnd(() => {
				'worklet';
				// Calculate final values from current positions
				const trackDim = trackDimensionSV.value;

				const finalVal0 = positionToValueWorklet(
					thumb0Position.value,
					trackDim,
					min,
					max,
					step
				);
				const finalVal1 =
					thumbCount === 2
						? positionToValueWorklet(
								thumb1Position.value,
								trackDim,
								min,
								max,
								step
							)
						: undefined;

				const finalValues =
					finalVal1 !== undefined ? [finalVal0, finalVal1] : [finalVal0];

				// Commit final value (always fires, no throttle)
				runOnJS(commitValue)(finalValues);
			})
			.onFinalize(() => {
				// Scale back animations
				trackScale.value = withSpring(1, ANIMATION_CONFIG.spring);
				thumbScale.value = withDelay(
					100,
					withSpring(1, ANIMATION_CONFIG.spring)
				);

				// Reset inertia with spring
				inertiaOffset.value = withSpring(0, ANIMATION_CONFIG.spring);
				// Reset gesture state
				isDragging.value = false;
				activeThumbIndex.value = -1;
				dragVelocity.value = 0;
			});
		},
		[
			disabled,
			thumbCount,
			min,
			max,
			step,
			minStepsBetweenThumbs,
			updateValue,
			commitValue,
			thumb0Position,
			thumb1Position,
			dragStartPosition0,
			dragStartPosition1,
			trackDimensionSV,
			thumbWidthSV,
			isDragging,
			activeThumbIndex,
			trackScale,
			thumbScale,
			dragVelocity,
			inertiaOffset,
		]
	);

	const thumb0Gesture = useMemo(
		() => createThumbGesture(0),
		[createThumbGesture]
	);
	const thumb1Gesture = useMemo(
		() => createThumbGesture(1),
		[createThumbGesture]
	);

	// ========================================================================
	// Apply Variants
	// ========================================================================

	sliderStyles.useVariants({
		colorScheme,
		trackVariant,
		thumbVariant,
		rounded,
		size,
		thumbShadow,
		trackShadow,
		disabled,
	});

	// ========================================================================
	// Animated Styles
	// ========================================================================

	// Track animated style (scale + inertia)
	const trackAnimatedStyle = useAnimatedStyle(() => {
		const scaleY = Math.max(1, trackScale.value);
		const scaleX = Math.min(1.02, Math.max(1, trackScale.value));
		// const scaleX = 1;
		const translateX = withSpring(inertiaOffset.value, ANIMATION_CONFIG.spring);

		return {
			transform: [{ scaleX }, { scaleY }, { translateX }],
		};
	});

	// Range animated style
	// Position is center-based, so range starts/ends at thumb centers
	const rangeAnimatedStyle = useAnimatedStyle(() => {
		if (thumbCount === 2) {
			// Dual thumb: range between two thumb centers
			const start = Math.min(thumb0Position.value, thumb1Position.value);
			const end = Math.max(thumb0Position.value, thumb1Position.value);
			const length = end - start;

			return {
				left: start,
				width: Math.max(0, length),
			};
		}

		// Single thumb: range from start (0) to thumb center

		return {
			width: Math.max(0, thumb0Position.value),
		};
	});

	// Thumb 0 animated style
	// Position is center-based, so subtract half width to get left edge position
	const thumb0AnimatedStyle = useAnimatedStyle(() => {
		const scale = activeThumbIndex.value === 0 ? thumbScale.value : 1;
		const position = thumb0Position.value;
		const offset = thumbWidthSV.value / 2;

		return {
			transform: [
				{ translateX: Math.max(-offset, position - offset) },
				{ scale },
			],
			left: 0,
			// thumb position is started from the top of the container, so we need to adjust the top margin to center the thumb
			// the default lineThumbHeight is trackHeight + 6, so minus half of 6 to center the thumb
			...(thumbVariant === 'line' && { top: -3, marginRight: 8 }),
		};
	});

	// Thumb 1 animated style
	const thumb1AnimatedStyle = useAnimatedStyle(() => {
		const scale = activeThumbIndex.value === 1 ? thumbScale.value : 1;
		const position = thumb1Position.value;

		return {
			transform: [
				{
					translateX: Math.max(
						-thumbWidthSV.value / 2,
						position - thumbWidthSV.value / 2
					),
				},
				{ scale },
			],
			left: 0,
			// thumb position is started from the top of the container, so we need to adjust the top margin to center the thumb
			// the default lineThumbHeight is trackHeight + 6, so minus half of 6 to center the thumb
			...(thumbVariant === 'line' && { top: -3, marginRight: 8 }),
		};
	});

	// Update thumb dimensions SharedValues when props change
	useEffect(() => {
		thumbWidthSV.value = getThumbDimensions(thumbVariant, size).width;
	}, [thumbVariant, size]);

	// ========================================================================
	// Render
	// ========================================================================

	return (
		<View
			ref={ref}
			style={[sliderStyles.root, style]}
			accessibilityRole="adjustable"
			accessibilityLabel={accessibilityLabel}
			accessibilityValue={{
				min,
				max,
				now: internalValue[0],
			}}
			accessibilityState={{ disabled }}
			testID={testID}
			{...rest}
		>
			{/* Track */}
			<Animated.View
				key={'track'}
				style={[
					sliderStyles.track,
					trackAnimatedStyle,
					trackLength != null && { width: trackLength },
				]}
				onLayout={handleTrackLayout}
			>
				{/* Range */}
				<Animated.View style={[sliderStyles.range, rangeAnimatedStyle]} />
			</Animated.View>

			{/* Thumb 0 */}
			{showThumb0 && (
				<GestureDetector gesture={thumb0Gesture}>
					<Animated.View
						hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
						style={[
							sliderStyles.thumb,
							thumb0AnimatedStyle,
							!isThumbVisible && { opacity: 0 },
						]}
					/>
				</GestureDetector>
			)}

			{/* Thumb 1 (for range slider) */}
			{showThumb1 && (
				<GestureDetector gesture={thumb1Gesture}>
					<Animated.View
						hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
						style={[
							sliderStyles.thumb,
							thumb1AnimatedStyle,
							!isThumbVisible && { opacity: 0 },
						]}
					/>
				</GestureDetector>
			)}
		</View>
	);
});

Slider.displayName = 'Slider';


// ============================================================================
// Styles
// ============================================================================

export const sliderStyles = StyleSheet.create((theme) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	// Track compound variants for colorScheme
	const trackCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		return [
			{
				colorScheme: scheme,
				styles: {
					backgroundColor: theme.colors.neutral.content_3,
				},
			},
		];
	});

	// Range compound variants for colorScheme
	const rangeCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		const hasSolidColor = theme.utils.paletteHasSolid(palette);
		return [
			{
				colorScheme: scheme,
				styles: {
					backgroundColor: hasSolidColor
						? palette.solid
						: palette.content_inversed,
				},
			},
		];
	});

	// Thumb compound variants for colorScheme
	const thumbCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		const hasSolidColor = theme.utils.paletteHasSolid(palette);
		return [
			{
				thumbVariant: 'circle' as const,
				colorScheme: scheme,
				styles: {
					backgroundColor: palette.text_inversed,
				},
			},
			{
				thumbVariant: 'oval' as const,
				colorScheme: scheme,
				styles: {
					backgroundColor: palette.text_inversed,
				},
			},
			{
				thumbVariant: 'line' as const,
				colorScheme: scheme,
				styles: {
					backgroundColor: hasSolidColor
						? palette.solid
						: palette.text_inversed,
				},
			},
		];
	});

	return {
		// Root container
		root: {
			position: 'relative',
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',

			variants: {
				size: {
					sm: {
						height: SIZE_CONFIG.sm.trackHeight,
					},
					md: {
						height: SIZE_CONFIG.md.trackHeight,
					},
					lg: {
						height: SIZE_CONFIG.lg.trackHeight,
					},
					xl: {
						height: SIZE_CONFIG.xl.trackHeight,
					},
				},
				variant: {
					flat: {},
					lined: {},
				},
				disabled: {
					true: {
						opacity: 0.5,
					},
				},
			},
		},

		// Track (background bar)
		track: {
			position: 'relative',
			width: '100%',
			overflow: 'hidden',
			borderCurve: 'continuous',

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				trackVariant: {
					lined: {},
					flat: {},
				},
				trackShadow: {
					none: {},
					base: {
						boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.15)',
					},
				},
				size: {
					sm: {},
					md: {},
					lg: {},
					xl: {},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
				},
			},

			compoundVariants: [
				...trackCompoundVariants,
				{
					trackVariant: 'flat' as const,
					size: 'sm' as const,
					styles: { height: SIZE_CONFIG.sm.trackHeight },
				},
				{
					trackVariant: 'flat' as const,
					size: 'md' as const,
					styles: { height: SIZE_CONFIG.md.trackHeight },
				},
				{
					trackVariant: 'flat' as const,
					size: 'lg' as const,
					styles: { height: SIZE_CONFIG.lg.trackHeight },
				},
				{
					trackVariant: 'flat' as const,
					size: 'xl' as const,
					styles: { height: SIZE_CONFIG.xl.trackHeight },
				},
				{
					trackVariant: 'lined' as const,
					size: 'sm' as const,
					styles: { height: SIZE_CONFIG.sm.linedTrackHeight },
				},
				{
					trackVariant: 'lined' as const,
					size: 'md' as const,
					styles: { height: SIZE_CONFIG.md.linedTrackHeight },
				},
				{
					trackVariant: 'lined' as const,
					size: 'lg' as const,
					styles: { height: SIZE_CONFIG.lg.linedTrackHeight },
				},
				{
					trackVariant: 'lined' as const,
					size: 'xl' as const,
					styles: { height: SIZE_CONFIG.xl.linedTrackHeight },
				},
			],
		},

		// Range (filled portion)
		range: {
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			borderCurve: 'continuous',

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: {
						borderTopLeftRadius: theme.rounded.xs,
						borderBottomLeftRadius: theme.rounded.xs,
					},
					sm: {
						borderTopLeftRadius: theme.rounded.sm,
						borderBottomLeftRadius: theme.rounded.sm,
					},
					md: {
						borderTopLeftRadius: theme.rounded.md,
						borderBottomLeftRadius: theme.rounded.md,
					},
				},
				thumbVariant: {
					circle: {},
					line: {},
					oval: {},
				},
			},

			compoundVariants: rangeCompoundVariants,
		},

		// Thumb (draggable handle)
		thumb: {
			position: 'absolute',
			borderCurve: 'continuous',
			zIndex: 10,

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				thumbVariant: {
					circle: {},
					oval: {},
					line: {},
				},
				size: {
					sm: {},
					md: {},
					lg: {},
					xl: {},
				},
				thumbShadow: {
					md: { boxShadow: theme.shadows.thumb },
					lg: { boxShadow: theme.shadows['2xl'] },
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
				},
			},

			compoundVariants: [
				...thumbCompoundVariants,
				// Circle thumb sizes
				{
					thumbVariant: 'circle' as const,
					size: 'sm' as const,
					styles: {
						width: SIZE_CONFIG.sm.thumbSize,
						height: SIZE_CONFIG.sm.thumbSize,
						borderRadius: SIZE_CONFIG.sm.thumbSize / 2,
					},
				},
				{
					thumbVariant: 'circle' as const,
					size: 'md' as const,
					styles: {
						width: SIZE_CONFIG.md.thumbSize,
						height: SIZE_CONFIG.md.thumbSize,
						borderRadius: SIZE_CONFIG.md.thumbSize / 2,
					},
				},
				{
					thumbVariant: 'circle' as const,
					size: 'lg' as const,
					styles: {
						width: SIZE_CONFIG.lg.thumbSize,
						height: SIZE_CONFIG.lg.thumbSize,
						borderRadius: SIZE_CONFIG.lg.thumbSize / 2,
					},
				},
				{
					thumbVariant: 'circle' as const,
					size: 'xl' as const,
					styles: {
						width: SIZE_CONFIG.xl.thumbSize,
						height: SIZE_CONFIG.xl.thumbSize,
						borderRadius: SIZE_CONFIG.xl.thumbSize / 2,
					},
				},
				// Oval thumb sizes
				{
					thumbVariant: 'oval' as const,
					size: 'sm' as const,
					styles: {
						width: SIZE_CONFIG.sm.ovalThumbWidth,
						height: SIZE_CONFIG.sm.thumbSize,
						borderRadius: SIZE_CONFIG.sm.thumbSize / 2,
					},
				},
				{
					thumbVariant: 'oval' as const,
					size: 'md' as const,
					styles: {
						width: SIZE_CONFIG.md.ovalThumbWidth,
						height: SIZE_CONFIG.md.thumbSize,
						borderRadius: SIZE_CONFIG.md.thumbSize / 2,
					},
				},
				{
					thumbVariant: 'oval' as const,
					size: 'lg' as const,
					styles: {
						width: SIZE_CONFIG.lg.ovalThumbWidth,
						height: SIZE_CONFIG.lg.thumbSize,
						borderRadius: SIZE_CONFIG.lg.thumbSize / 2,
					},
				},
				{
					thumbVariant: 'oval' as const,
					size: 'xl' as const,
					styles: {
						width: SIZE_CONFIG.xl.ovalThumbWidth,
						height: SIZE_CONFIG.xl.thumbSize,
						borderRadius: SIZE_CONFIG.xl.thumbSize / 2,
					},
				},
				// Line thumb sizes
				{
					thumbVariant: 'line' as const,
					size: 'sm' as const,
					styles: {
						width: SIZE_CONFIG.sm.lineThumbWidth,
						height: SIZE_CONFIG.sm.lineThumbHeight,
						borderRadius: SIZE_CONFIG.sm.lineThumbWidth / 2,
					},
				},
				{
					thumbVariant: 'line' as const,
					size: 'md' as const,
					styles: {
						width: SIZE_CONFIG.md.lineThumbWidth,
						height: SIZE_CONFIG.md.lineThumbHeight,
						borderRadius: SIZE_CONFIG.md.lineThumbWidth / 2,
					},
				},
				{
					thumbVariant: 'line' as const,
					size: 'lg' as const,
					styles: {
						width: SIZE_CONFIG.lg.lineThumbWidth,
						height: SIZE_CONFIG.lg.lineThumbHeight,
						borderRadius: SIZE_CONFIG.lg.lineThumbWidth / 2,
					},
				},
				{
					thumbVariant: 'line' as const,
					size: 'xl' as const,
					styles: {
						width: SIZE_CONFIG.xl.lineThumbWidth,
						height: SIZE_CONFIG.xl.lineThumbHeight,
						borderRadius: SIZE_CONFIG.xl.lineThumbWidth / 2,
					},
				},
			],
		},
	};
});