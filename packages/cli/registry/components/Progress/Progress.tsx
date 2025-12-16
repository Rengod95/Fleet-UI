import {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Pressable, type View as RNView, Text, View } from 'react-native';
import Animated, {
	Easing,
	type SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import type {
	ProgressColorScheme,
	ProgressProps,
	ProgressRounded,
	ProgressShadow,
	ProgressSize,
	ProgressThumbGap,
	ProgressThumbVariant,
	ProgressTrackVariant,
} from './Progress.types';

// ============================================================================
// Internal constants (merged from Progress.constants.ts)
// ============================================================================

const ANIMATION_CONFIG = {
	timing: {
		duration: 300,
		easing: Easing.bezier(0.14, 1.13, 0.65, 0.96),
	},
	// 활성 트랙의 flexGrow 확장 비율
	activeTrackScale: 1,
} as const;

const SIZE_CONFIG = {
	sm: {
		trackHeight: 6,
		linedTrackHeight: 2,
		thumbSize: 18,
		labelFontSize: 10,
		numberFontSize: 10,
	},
	md: {
		trackHeight: 10,
		linedTrackHeight: 3,
		thumbSize: 24,
		labelFontSize: 12,
		numberFontSize: 12,
	},
	lg: {
		trackHeight: 14,
		linedTrackHeight: 4,
		thumbSize: 32,
		labelFontSize: 14,
		numberFontSize: 14,
	},
} as const;

const THUMB_GAP_CONFIG: Record<ProgressThumbGap, number> = {
	none: 0,
	sm: 2,
	md: 4,
	lg: 8,
};

// ============================================================================
// Animated Track Item Component
// ============================================================================

interface AnimatedTrackItemProps {
	index: number;
	activeStepSV: SharedValue<number>;
	trackVariant: ProgressTrackVariant;
	colorScheme: ProgressColorScheme;
	size: ProgressSize;
	rounded: ProgressRounded;
	animated: boolean;
	animationDuration: number;
	/** thumbVariant='none'일 때 true - Track이 직접 단계를 나타냄 */
	isTrackOnlyMode?: boolean;
	isFirstItem: boolean;
	isLastItem: boolean;
	thumbGap: ProgressThumbGap;
}

const AnimatedTrackItem = memo(
	({
		index,
		activeStepSV,
		trackVariant,
		colorScheme,
		size,
		rounded,
		animated,
		animationDuration,
		isTrackOnlyMode = false,
		isFirstItem,
		isLastItem,
		thumbGap,
	}: AnimatedTrackItemProps) => {
		styles.useVariants({ colorScheme, size, trackVariant, thumbGap, rounded });

		// 활성화 로직 (activeStep은 1-based):
		//
		// 예시: step=5, activeStep=2
		// [Thumb0] ━━━ [Thumb1] ─── [Thumb2] ─── [Thumb3] ─── [Thumb4]
		//    ●    Track0   ●    Track1   ○    Track2   ○    Track3   ○
		//
		// 1. isTrackOnlyMode=true (thumbVariant='none'):
		//    - Track[i]가 직접 단계를 나타냄
		//    - 완료: index < activeStep
		//    - 활성화(진행 중): index === activeStep - 1
		//
		// 2. isTrackOnlyMode=false (일반 모드):
		//    - Track[i]는 Thumb[i]와 Thumb[i+1]을 연결
		//    - Track[i] 완료: Thumb[i+1]까지 완료 → index + 1 < activeStep
		//    - 활성화(진행 중): index + 1 === activeStep - 1
		const isActive = useDerivedValue(() => {
			if (isTrackOnlyMode) {
				return Math.floor(activeStepSV.value) === index + 1;
			}
			// Track[i]는 activeStep이 i+2일 때 활성화 (Thumb[i+1]에 도달 중)
			return Math.floor(activeStepSV.value) === index + 2;
		});

		const isCompleted = useDerivedValue(() => {
			if (isTrackOnlyMode) {
				// Track[i]가 직접 단계 → index < activeStep
				return index < activeStepSV.value;
			}
			// Track[i]는 Thumb[i+1]까지 완료되어야 함 → index + 1 < activeStep
			return index + 1 < activeStepSV.value;
		});

		// Container animated style with flexGrow for width animation
		const containerAnimatedStyle = useAnimatedStyle(() => {
			const active = isActive.value;
			const baseGrow = 1;
			const activeGrow = ANIMATION_CONFIG.activeTrackScale;

			const targetGrow = active ? activeGrow : baseGrow;

			return {
				flexGrow: animated
					? withTiming(targetGrow, {
							duration: animationDuration,
							easing: ANIMATION_CONFIG.timing.easing,
						})
					: targetGrow,
			};
		});

		// Fill animated style (opacity only)
		const fillOpacity = useDerivedValue(() => {
			const shouldShow = isCompleted.value || isActive.value;
			const targetOpacity = shouldShow ? 1 : 0;

			return animated
				? withTiming(targetOpacity, {
						duration: animationDuration,
						easing: Easing.out(Easing.cubic),
					})
				: targetOpacity;
		});

		const fillAnimatedStyle = useAnimatedStyle(() => ({
			opacity: fillOpacity.value,
		}));

		return (
			<Animated.View
				style={[styles.trackItemContainer, containerAnimatedStyle]}
			>
				<View
					style={[
						styles.track,
						isTrackOnlyMode &&
							thumbGap === 'none' &&
							isFirstItem &&
							styles.trackEdgeFirst,
						isTrackOnlyMode &&
							thumbGap === 'none' &&
							isLastItem &&
							styles.trackEdgeLast,
					]}
				>
					<View style={styles.trackLayerBase} />
					<Animated.View style={[styles.trackLayerFill, fillAnimatedStyle]} />
				</View>
			</Animated.View>
		);
	}
);

AnimatedTrackItem.displayName = 'AnimatedTrackItem';

// ============================================================================
// Thumb Container Component (동일한 크기의 컨테이너)
// ============================================================================

interface ThumbContainerProps {
	index: number;
	activeStepSV: SharedValue<number>;
	thumbVariant: ProgressThumbVariant;
	thumbGap: ProgressThumbGap;
	colorScheme: ProgressColorScheme;
	size: ProgressSize;
	shadow: ProgressShadow;
	animated: boolean;
	animationDuration: number;
	isFirst: boolean;
	isLast: boolean;
}

const ThumbContainer = memo(
	({
		index,
		activeStepSV,
		thumbVariant,
		thumbGap,
		colorScheme,
		size,
		shadow,
		animated,
		animationDuration,
		isFirst,
		isLast,
	}: ThumbContainerProps) => {
		styles.useVariants({ colorScheme, size, thumbGap, shadow });

		const wrapperStyle = isFirst
			? styles.thumbWrapperFirst
			: isLast
				? styles.thumbWrapperLast
				: styles.thumbWrapperMiddle;

		// Thumb 활성화 상태 (activeStep은 1-based)
		// activeStep=2 → Thumb 0, 1 활성화 (index < activeStep)
		const isCompleted = useDerivedValue(() => {
			return index < activeStepSV.value;
		});

		// Derived values for animations
		const thumbOpacity = useDerivedValue(() => {
			const completed = isCompleted.value;
			const targetOpacity = completed ? 1 : 0.4;

			return animated
				? withTiming(targetOpacity, { duration: animationDuration })
				: targetOpacity;
		});

		const thumbScale = useDerivedValue(() => {
			const completed = isCompleted.value;
			const targetScale = completed ? 1 : 0.9;

			return animated
				? withTiming(targetScale, {
						duration: animationDuration,
						easing: ANIMATION_CONFIG.timing.easing,
					})
				: targetScale;
		});

		const thumbAnimatedStyle = useAnimatedStyle(() => ({
			opacity: thumbOpacity.value,
			transform: [{ scale: thumbScale.value }],
		}));

		// Circle thumb
		if (thumbVariant === 'circle') {
			return (
				<View style={wrapperStyle}>
					<Animated.View style={[styles.thumbContainer, thumbAnimatedStyle]}>
						<View style={styles.thumbCircle} />
					</Animated.View>
				</View>
			);
		}

		// Number thumb
		return (
			<View style={wrapperStyle}>
				<Animated.View style={[styles.thumbContainer, thumbAnimatedStyle]}>
					<View style={styles.thumbCircle}>
						<Text style={styles.thumbNumber}>{index + 1}</Text>
					</View>
				</Animated.View>
			</View>
		);
	}
);

ThumbContainer.displayName = 'ThumbContainer';

// ============================================================================
// Progress Component
// ============================================================================

export const Progress = forwardRef<RNView, ProgressProps>((props, ref) => {
	const {
		step,
		activeStep: activeStepProp,
		defaultActiveStep = 1,
		onStepChange,
		trackVariant = 'flat',
		thumbVariant = 'none',
		thumbGap = 'md',
		colorScheme = 'primary',
		size = 'md',
		rounded = 'md',
		shadow = 'none',
		interactive = false,
		onStepPress,
		animated = true,
		animationDuration = 300,
		labels,
		showLabels = false,
		accessibilityLabel,
		testID,
		style,
		...rest
	} = props;

	// Validate step
	const validStep = Math.max(1, Math.min(100, Math.floor(step)));

	styles.useVariants({
		colorScheme,
		size,
		trackVariant,
		thumbVariant,
		thumbGap,
		rounded,
		shadow,
	});

	const clampActiveStep = useCallback(
		(value: number) => {
			return Math.max(0, Math.min(validStep, Math.floor(value)));
		},
		[validStep]
	);

	// State management (controlled/uncontrolled)
	const [internalActiveStep, setInternalActiveStep] = useState(() =>
		clampActiveStep(defaultActiveStep)
	);
	const isControlled = activeStepProp !== undefined;
	const currentActiveStep = clampActiveStep(
		isControlled ? (activeStepProp ?? 0) : internalActiveStep
	);

	// SharedValue for animations
	const activeStepSV = useSharedValue(currentActiveStep);

	// Clamp uncontrolled state when step changes
	useEffect(() => {
		if (isControlled) return;
		setInternalActiveStep((prev) => clampActiveStep(prev));
	}, [clampActiveStep, isControlled]);

	// Sync SharedValue with prop/state changes
	useEffect(() => {
		activeStepSV.value = animated
			? withTiming(currentActiveStep, {
					duration: animationDuration,
					easing: ANIMATION_CONFIG.timing.easing,
				})
			: currentActiveStep;
	}, [activeStepSV, animated, animationDuration, currentActiveStep]);

	// Handle step press (interactive mode)
	// stepIndex는 내부 0-based index, 외부 콜백에는 1-based로 변환
	const handleStepPress = useCallback(
		(stepIndex: number) => {
			if (!interactive) return;

			// 1-based step value (외부 API)
			const stepValue = stepIndex + 1;

			if (!isControlled) {
				setInternalActiveStep(stepValue);
			}
			onStepChange?.(stepValue);
			onStepPress?.(stepValue);
		},
		[interactive, isControlled, onStepChange, onStepPress]
	);

	// Get label for a specific step
	const getLabelForStep = useCallback(
		(stepIndex: number): string | undefined => {
			if (!labels) return undefined;
			const labelItem = labels.find((l) => l.stepIndex === stepIndex);
			return labelItem?.label;
		},
		[labels]
	);

	// Calculate progress percentage (activeStep은 1-based, validStep은 총 단계 수)
	const progressPercentage = useMemo(
		() => Math.round((currentActiveStep / validStep) * 100) || 0,
		[currentActiveStep, validStep]
	);

	// Generate progress elements
	// thumbVariant !== 'none': [Thumb0] - [Track] - [Thumb1] - ... - [ThumbN-1] (N개 Thumb + N-1개 Track)
	// thumbVariant === 'none': [Track0] - [Track1] - ... - [TrackN-1] (N개 Track만)
	const progressElements = useMemo(() => {
		const elements: React.ReactNode[] = [];

		// thumbVariant가 'none'일 때는 Track만 step개 생성
		if (thumbVariant === 'none') {
			for (let i = 0; i < validStep; i++) {
				const label = getLabelForStep(i);

				const trackItem = (
					<AnimatedTrackItem
						key={`track-${i}`}
						index={i}
						activeStepSV={activeStepSV}
						trackVariant={trackVariant}
						colorScheme={colorScheme}
						size={size}
						rounded={rounded}
						animated={animated}
						animationDuration={animationDuration}
						isTrackOnlyMode={true}
						isFirstItem={i === 0}
						isLastItem={i === validStep - 1}
						thumbGap={thumbGap}
					/>
				);

				// Wrap in Pressable if interactive
				if (interactive) {
					elements.push(
						<Pressable
							key={`pressable-track-${i}`}
							onPress={() => handleStepPress(i)}
							style={styles.pressableTrack}
							accessibilityRole="button"
							accessibilityLabel={`Step ${i + 1}${label ? `: ${label}` : ''}`}
							hitSlop={styles.hitSlop}
						>
							{trackItem}
						</Pressable>
					);
				} else {
					elements.push(trackItem);
				}

				// Track 사이에 간격 추가 (thumbGap이 none이 아닐 때)
				if (i < validStep - 1 && thumbGap !== 'none') {
					elements.push(<View key={`gap-${i}`} style={styles.trackOnlyGap} />);
				}
			}
			return elements;
		}

		// thumbVariant가 'none'이 아닐 때: Thumb step개 + Track (step-1)개
		for (let i = 0; i < validStep; i++) {
			const isFirst = i === 0;
			const isLast = i === validStep - 1;
			const label = getLabelForStep(i);

			// 1. Thumb (마커) - 각 단계를 나타냄
			const thumbElement = (
				<ThumbContainer
					key={`thumb-${i}`}
					index={i}
					activeStepSV={activeStepSV}
					thumbVariant={thumbVariant}
					thumbGap={thumbGap}
					colorScheme={colorScheme}
					size={size}
					shadow={shadow}
					animated={animated}
					animationDuration={animationDuration}
					isFirst={isFirst}
					isLast={isLast}
				/>
			);

			// Wrap thumb in Pressable if interactive
			if (interactive) {
				elements.push(
					<Pressable
						key={`pressable-thumb-${i}`}
						onPress={() => handleStepPress(i)}
						accessibilityRole="button"
						accessibilityLabel={`Step ${i + 1}${label ? `: ${label}` : ''}`}
						hitSlop={styles.hitSlop}
					>
						{thumbElement}
					</Pressable>
				);
			} else {
				elements.push(thumbElement);
			}

			// 2. Track (연결선) - 단계 사이를 연결 (마지막 단계 뒤에는 없음)
			if (!isLast) {
				const trackItem = (
					<AnimatedTrackItem
						key={`track-${i}`}
						index={i}
						activeStepSV={activeStepSV}
						trackVariant={trackVariant}
						colorScheme={colorScheme}
						size={size}
						rounded={rounded}
						animated={animated}
						animationDuration={animationDuration}
						isFirstItem={i === 0}
						isLastItem={i === validStep - 2}
						thumbGap={thumbGap}
					/>
				);

				elements.push(trackItem);
			}
		}

		return elements;
	}, [
		activeStepSV,
		validStep,
		trackVariant,
		thumbVariant,
		thumbGap,
		colorScheme,
		size,
		rounded,
		shadow,
		animated,
		animationDuration,
		interactive,
		handleStepPress,
		getLabelForStep,
	]);

	const labelElements =
		showLabels && labels ? (
			<View style={styles.labelContainer}>
				{Array.from({ length: validStep }, (_, stepIndex) => stepIndex).map(
					(stepIndex) => {
						const label = getLabelForStep(stepIndex);
						return (
							<View key={`label-${stepIndex}`} style={styles.labelItem}>
								{label && <Text style={styles.labelText}>{label}</Text>}
							</View>
						);
					}
				)}
			</View>
		) : null;

	return (
		<View
			ref={ref}
			style={[styles.container, style]}
			accessibilityRole="progressbar"
			accessibilityLabel={
				accessibilityLabel ?? `Progress: ${progressPercentage}%`
			}
			accessibilityValue={{
				min: 0,
				max: validStep,
				now: currentActiveStep,
			}}
			testID={testID}
			{...rest}
		>
			<View style={styles.trackContainer}>{progressElements}</View>
			{labelElements}
		</View>
	);
});

Progress.displayName = 'Progress';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	// Root container
	container: {
		flex: 1,
	},

	// Track container row
	trackContainer: {
		flexDirection: 'row' as const,
		alignItems: 'center' as const,
		variants: {
			size: {
				sm: {},
				md: {},
				lg: {},
			},
			trackVariant: {
				flat: {},
				lined: {},
			},
			thumbVariant: {
				circle: {},
				number: {},
				none: {},
			},
		},
		compoundVariants: [
			// Thumb variants (circle/number) - thumbSize dominates height
			{
				thumbVariant: 'circle' as const,
				size: 'sm' as const,
				styles: { minHeight: SIZE_CONFIG.sm.thumbSize + 8 },
			},
			{
				thumbVariant: 'circle' as const,
				size: 'md' as const,
				styles: { minHeight: SIZE_CONFIG.md.thumbSize + 8 },
			},
			{
				thumbVariant: 'circle' as const,
				size: 'lg' as const,
				styles: { minHeight: SIZE_CONFIG.lg.thumbSize + 8 },
			},
			{
				thumbVariant: 'number' as const,
				size: 'sm' as const,
				styles: { minHeight: SIZE_CONFIG.sm.thumbSize + 8 },
			},
			{
				thumbVariant: 'number' as const,
				size: 'md' as const,
				styles: { minHeight: SIZE_CONFIG.md.thumbSize + 8 },
			},
			{
				thumbVariant: 'number' as const,
				size: 'lg' as const,
				styles: { minHeight: SIZE_CONFIG.lg.thumbSize + 8 },
			},

			// Track-only mode (thumbVariant='none')
			{
				thumbVariant: 'none' as const,
				trackVariant: 'flat' as const,
				size: 'sm' as const,
				styles: { minHeight: SIZE_CONFIG.sm.trackHeight + 8 },
			},
			{
				thumbVariant: 'none' as const,
				trackVariant: 'lined' as const,
				size: 'sm' as const,
				styles: { minHeight: SIZE_CONFIG.sm.linedTrackHeight + 8 },
			},
			{
				thumbVariant: 'none' as const,
				trackVariant: 'flat' as const,
				size: 'md' as const,
				styles: { minHeight: SIZE_CONFIG.md.trackHeight + 8 },
			},
			{
				thumbVariant: 'none' as const,
				trackVariant: 'lined' as const,
				size: 'md' as const,
				styles: { minHeight: SIZE_CONFIG.md.linedTrackHeight + 8 },
			},
			{
				thumbVariant: 'none' as const,
				trackVariant: 'flat' as const,
				size: 'lg' as const,
				styles: { minHeight: SIZE_CONFIG.lg.trackHeight + 8 },
			},
			{
				thumbVariant: 'none' as const,
				trackVariant: 'lined' as const,
				size: 'lg' as const,
				styles: { minHeight: SIZE_CONFIG.lg.linedTrackHeight + 8 },
			},
		],
	},

	// Track item container (animated)
	trackItemContainer: {
		flexShrink: 1,
		flexBasis: 0,
	},

	// Track wrapper
	track: {
		overflow: 'hidden',
		position: 'relative',
		borderCurve: 'continuous',
		variants: {
			size: {
				sm: {},
				md: {},
				lg: {},
			},
			trackVariant: {
				flat: {},
				lined: {},
			},
			thumbGap: {
				none: {},
				sm: {},
				md: {},
				lg: {},
			},
			rounded: {
				none: { borderRadius: 0 },
				sm: { borderRadius: theme.rounded.sm },
				md: { borderRadius: theme.rounded.md },
				lg: { borderRadius: theme.rounded.lg },
			},
		},
		compoundVariants: [
			// Track height by size × trackVariant
			{
				size: 'sm' as const,
				trackVariant: 'flat' as const,
				styles: { height: SIZE_CONFIG.sm.trackHeight },
			},
			{
				size: 'sm' as const,
				trackVariant: 'lined' as const,
				styles: { height: SIZE_CONFIG.sm.linedTrackHeight },
			},
			{
				size: 'md' as const,
				trackVariant: 'flat' as const,
				styles: { height: SIZE_CONFIG.md.trackHeight },
			},
			{
				size: 'md' as const,
				trackVariant: 'lined' as const,
				styles: { height: SIZE_CONFIG.md.linedTrackHeight },
			},
			{
				size: 'lg' as const,
				trackVariant: 'flat' as const,
				styles: { height: SIZE_CONFIG.lg.trackHeight },
			},
			{
				size: 'lg' as const,
				trackVariant: 'lined' as const,
				styles: { height: SIZE_CONFIG.lg.linedTrackHeight },
			},
			// When thumbGap is none, default to squared segments (outer edges handled separately)
			{
				thumbGap: 'none' as const,
				styles: { borderRadius: 0 },
			},
		],
	},

	// Track edges for track-only continuous mode (thumbGap='none')
	trackEdgeFirst: {
		variants: {
			rounded: {
				none: {},
				sm: {
					borderTopLeftRadius: theme.rounded.sm,
					borderBottomLeftRadius: theme.rounded.sm,
				},
				md: {
					borderTopLeftRadius: theme.rounded.md,
					borderBottomLeftRadius: theme.rounded.md,
				},
				lg: {
					borderTopLeftRadius: theme.rounded.lg,
					borderBottomLeftRadius: theme.rounded.lg,
				},
			},
		},
	},
	trackEdgeLast: {
		variants: {
			rounded: {
				none: {},
				sm: {
					borderTopRightRadius: theme.rounded.sm,
					borderBottomRightRadius: theme.rounded.sm,
				},
				md: {
					borderTopRightRadius: theme.rounded.md,
					borderBottomRightRadius: theme.rounded.md,
				},
				lg: {
					borderTopRightRadius: theme.rounded.lg,
					borderBottomRightRadius: theme.rounded.lg,
				},
			},
		},
	},

	// Track layer base (inactive)
	trackLayerBase: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: theme.colors.neutral.content_2,
	},

	// Track layer fill (active) - uses colorScheme variant
	trackLayerFill: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		variants: {
			colorScheme: {
				primary: {
					backgroundColor: theme.colors.primary.solid,
				},
				neutral: {
					backgroundColor: theme.colors.neutral.content_inversed,
				},
				error: {
					backgroundColor: theme.colors.error.solid,
				},
				success: {
					backgroundColor: theme.colors.success.solid,
				},
				warning: {
					backgroundColor: theme.colors.warning.solid,
				},
				info: {
					backgroundColor: theme.colors.info.solid,
				},
			},
		},
	},

	// Pressable track wrapper
	pressableTrack: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},

	// Track-only gaps (thumbVariant='none')
	trackOnlyGap: {
		variants: {
			thumbGap: {
				none: { width: 0 },
				sm: { width: THUMB_GAP_CONFIG.sm * 2 },
				md: { width: THUMB_GAP_CONFIG.md * 2 },
				lg: { width: THUMB_GAP_CONFIG.lg * 2 },
			},
		},
	},

	// Thumb wrappers (gaps between thumb and track)
	thumbWrapperFirst: {
		variants: {
			thumbGap: {
				none: { marginRight: 0 },
				sm: { marginRight: THUMB_GAP_CONFIG.sm },
				md: { marginRight: THUMB_GAP_CONFIG.md },
				lg: { marginRight: THUMB_GAP_CONFIG.lg },
			},
		},
	},
	thumbWrapperMiddle: {
		variants: {
			thumbGap: {
				none: { marginLeft: 0, marginRight: 0 },
				sm: {
					marginLeft: THUMB_GAP_CONFIG.sm,
					marginRight: THUMB_GAP_CONFIG.sm,
				},
				md: {
					marginLeft: THUMB_GAP_CONFIG.md,
					marginRight: THUMB_GAP_CONFIG.md,
				},
				lg: {
					marginLeft: THUMB_GAP_CONFIG.lg,
					marginRight: THUMB_GAP_CONFIG.lg,
				},
			},
		},
	},
	thumbWrapperLast: {
		variants: {
			thumbGap: {
				none: { marginLeft: 0 },
				sm: { marginLeft: THUMB_GAP_CONFIG.sm },
				md: { marginLeft: THUMB_GAP_CONFIG.md },
				lg: { marginLeft: THUMB_GAP_CONFIG.lg },
			},
		},
	},

	// Thumb container (모든 variant에서 동일한 크기)
	thumbContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 9999,
		borderCurve: 'continuous',
		variants: {
			size: {
				sm: {
					width: SIZE_CONFIG.sm.thumbSize,
					height: SIZE_CONFIG.sm.thumbSize,
				},
				md: {
					width: SIZE_CONFIG.md.thumbSize,
					height: SIZE_CONFIG.md.thumbSize,
				},
				lg: {
					width: SIZE_CONFIG.lg.thumbSize,
					height: SIZE_CONFIG.lg.thumbSize,
				},
			},
			shadow: {
				none: {
					boxShadow: 'none',
					shadowColor: 'transparent',
					shadowOpacity: 0,
					shadowRadius: 0,
					shadowOffset: { width: 0, height: 0 },
					elevation: 0,
				},
				sm: { boxShadow: theme.shadows.sm },
				md: { boxShadow: theme.shadows.thumb },
				lg: { boxShadow: theme.shadows['2xl'] },
			},
		},
	},

	// Thumb circle - uses colorScheme variant
	thumbCircle: {
		width: '100%',
		height: '100%',
		borderRadius: 9999,
		justifyContent: 'center',
		alignItems: 'center',
		borderCurve: 'continuous',

		variants: {
			colorScheme: {
				primary: {
					backgroundColor: theme.colors.primary.solid,
				},
				neutral: {
					backgroundColor: theme.colors.neutral.content_inversed,
				},
				error: {
					backgroundColor: theme.colors.error.solid,
				},
				success: {
					backgroundColor: theme.colors.success.solid,
				},
				warning: {
					backgroundColor: theme.colors.warning.solid,
				},
				info: {
					backgroundColor: theme.colors.info.solid,
				},
			},
		},
	},

	// Thumb number text
	thumbNumber: {
		fontWeight: theme.text.fontWeight.semibold,
		zIndex: 1,
		variants: {
			size: {
				sm: { fontSize: SIZE_CONFIG.sm.numberFontSize },
				md: { fontSize: SIZE_CONFIG.md.numberFontSize },
				lg: { fontSize: SIZE_CONFIG.lg.numberFontSize },
			},
			colorScheme: {
				primary: { color: theme.colors.primary.text_inversed },
				neutral: { color: theme.colors.neutral.text_inversed },
				error: { color: theme.colors.error.text_inversed },
				success: { color: theme.colors.success.text_inversed },
				warning: { color: theme.colors.warning.text_inversed },
				info: { color: theme.colors.info.text_inversed },
			},
		},
	},

	// Label container
	labelContainer: {
		flexDirection: 'row',
		marginTop: theme.spacing[2],
	},

	// Label item
	labelItem: {
		flex: 1,
		alignItems: 'center',
	},

	// Label text
	labelText: {
		...theme.typography.body2,
		fontWeight: 500,
		color: theme.colors.neutral.text_2,
		textAlign: 'center' as const,
		variants: {
			size: {
				sm: { fontSize: SIZE_CONFIG.sm.labelFontSize },
				md: { fontSize: SIZE_CONFIG.md.labelFontSize },
				lg: { fontSize: SIZE_CONFIG.lg.labelFontSize },
			},
		},
	},

	// Hit slop for interactive mode
	hitSlop: {
		top: 10,
		bottom: 10,
		left: 5,
		right: 5,
	},
}));
