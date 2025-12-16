import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
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
	StepIndicatorColorScheme,
	StepIndicatorProps,
	StepIndicatorSize,
} from './StepIndicator.types';

// ============================================================================
// Constants
// ============================================================================
/**
 * Size Configuration
 */
export const SIZE_CONFIG = {
	sm: {
		dotSize: 8,
		gap: 4,
	},
	md: {
		dotSize: 12,
		gap: 6,	
	},
	lg: {
		dotSize: 14,
		gap: 6,
	},
} as const;

/**
 * Animation Configuration
 */
export const ANIMATION_CONFIG = {
	timing: {
		duration: 300,
		easing: Easing.bezier(0.14, 1.13, 0.65, 0.96),
	},
	activeWidthScale: 3.3,
	activeHeightScale: 1,
} as const;


// ============================================================================
// Animated Dot Component
// ============================================================================

interface AnimatedDotProps {
	index: number;
	activeStepSV: SharedValue<number>;
	size: StepIndicatorSize;
	colorScheme: StepIndicatorColorScheme;
	animated: boolean;
}

const AnimatedDot = memo(
	({
		index,
		activeStepSV,
		size,
		colorScheme,
		animated,
	}: AnimatedDotProps) => {
		
		styles.useVariants({ colorScheme, size });

		const dotSize = SIZE_CONFIG[size].dotSize;
		
		// Derived values for active/completed states
		const isActive = useDerivedValue(() => {
			return index === Math.floor(activeStepSV.value);
		});

		const isCompleted = useDerivedValue(() => {
			return index < activeStepSV.value;
		});

		// Animated width (activeWidthScale when active)
		const animatedWidth = useDerivedValue(() => {
			const active = isActive.value;
			const targetWidth = active
				? dotSize * ANIMATION_CONFIG.activeWidthScale
				: dotSize;

			return animated
				? withTiming(targetWidth, ANIMATION_CONFIG.timing)
				: targetWidth;
		});

		// Animated height (activeHeightScale when active)
		const animatedHeight = useDerivedValue(() => {
			const active = isActive.value;
			const targetHeight = active
				? dotSize * ANIMATION_CONFIG.activeHeightScale
				: dotSize;

			return animated
				? withTiming(targetHeight, ANIMATION_CONFIG.timing)
				: targetHeight;
		});

		// Animated opacity for fill
		const fillOpacity = useDerivedValue(() => {
			const shouldShow = isCompleted.value || isActive.value;
			const targetOpacity = shouldShow ? 1 : 0;

			return animated
				? withTiming(targetOpacity, ANIMATION_CONFIG.timing)
				: targetOpacity;
		});

		// Container animated style (width, height, borderRadius)
		const containerAnimatedStyle = useAnimatedStyle(() => ({
			width: animatedWidth.value,
			height: animatedHeight.value,
			borderRadius: animatedHeight.value / 2,
		}));

		// Fill animated style (opacity)
		const fillAnimatedStyle = useAnimatedStyle(() => ({
			opacity: fillOpacity.value,
		}));

		return (
			<Animated.View style={[styles.dotContainer, containerAnimatedStyle]}>
				<View style={styles.dotLayerBase} />
				<Animated.View style={[styles.dotLayerFill, fillAnimatedStyle]} />
			</Animated.View>
		);
	}
);

AnimatedDot.displayName = 'AnimatedDot';

// ============================================================================
// StepIndicator Component
// ============================================================================

export const StepIndicator = forwardRef<View, StepIndicatorProps>(
	(props, ref) => {
		const {
			step,
			activeStep: activeStepProp,
			defaultActiveStep = 0,
			onStepChange,
			colorScheme = 'neutral',
			size = 'md',
			interactive = false,
			onStepPress,
			animated = true,
			gap: customGap,
			accessibilityLabel,
			testID,
			style,
			...rest
		} = props;

		styles.useVariants({ colorScheme, size });

		/**
		 * Validate step
		 * 
		 * In general cases, the step should be a number between 1 and 100.
		 * So, we need to clamp the step value to be between 1 and 100.
		 * if you need, you can change the max and min value.
		 */
		const validStep = useMemo(() => {
			if (!Number.isFinite(step)) return 1;
			return Math.max(1, Math.min(100, Math.floor(step)));
		}, [step]);

		const clampActiveStep = useCallback(
			(value: number) => {
				if (!Number.isFinite(value)) return 0;
				return Math.max(0, Math.min(validStep - 1, Math.floor(value)));
			},
			[validStep]
		);

		// State management for interactive mode and controlled state pattern boths
		const [internalActiveStep, setInternalActiveStep] = useState(() =>
			clampActiveStep(defaultActiveStep)
		);
		const isControlled = activeStepProp !== undefined;
		const currentActiveStep = clampActiveStep(
			isControlled ? (activeStepProp ?? 0) : internalActiveStep
		);
		// SharedValue for animations
		const activeStepSV = useSharedValue(currentActiveStep);

		// Gap between dots
		const gapSize = customGap ?? SIZE_CONFIG[size].gap;

		const stepHitSlop = useMemo(() => {
			if (!interactive) return undefined;
			const minTouchSize = Platform.OS === 'android' ? 48 : 44;
			const dotHeight =
				SIZE_CONFIG[size].dotSize * ANIMATION_CONFIG.activeHeightScale;
			const slotWidth =  SIZE_CONFIG[size].dotSize;

			const vertical = Math.max(0, Math.ceil((minTouchSize - dotHeight) / 2));
			const horizontal = Math.max(0, Math.ceil((minTouchSize - slotWidth) / 2));

			return { top: vertical, bottom: vertical, left: horizontal, right: horizontal };
		}, [interactive, size]);

		
		// Handle step press (interactive mode)
		const handleStepPress = useCallback(
			(stepIndex: number) => {
				if (!interactive) return;
				const nextStep = clampActiveStep(stepIndex);

				if (!isControlled) {
					setInternalActiveStep(nextStep);
				}
				onStepChange?.(nextStep);
				onStepPress?.(nextStep);
			},
			[clampActiveStep, interactive, isControlled, onStepChange, onStepPress]
		);

		// Generate dot elements
		const dotElements = useMemo(() => {
			const elements: React.ReactNode[] = [];

			for (let i = 0; i < validStep; i++) {
				const dotElement = (
					<AnimatedDot
						key={`dot-${i}`}
						index={i}
						activeStepSV={activeStepSV}
						size={size}
						colorScheme={colorScheme}
						animated={animated}
					/>
				);

				
				const isSelected = i === currentActiveStep;

				const marginRight = i < validStep - 1 ? gapSize : 0;


				// Wrap in Pressable if interactive
				if (interactive) {
					elements.push(
						<Pressable
							key={`pressable-${i}`}
							onPress={() => handleStepPress(i)}
							style={styles.stepItem(marginRight)}
							accessibilityRole="button"
							accessibilityLabel={`switch to step ${i + 1} of ${validStep}`}
							accessibilityState={{ selected: isSelected }}
							hitSlop={stepHitSlop}
							testID={testID ? `${testID}-step-${i}` : undefined}
						>
							{dotElement}
						</Pressable>	
					);
				} else {
					elements.push(
						<View key={`step-${i}`} style={styles.stepItem(marginRight)}>
							{dotElement}
						</View>
					);
				}
			}

			return elements;
		}, [
			colorScheme,
			currentActiveStep,
			gapSize,
			handleStepPress,
			interactive,
			validStep,
			size,
			animated,
			stepHitSlop,
			testID,
		]);

		// ============================================================================
		// Effects
		// ============================================================================

		// Clamp uncontrolled state when step changes
		useEffect(() => {
			if (isControlled) return;
			setInternalActiveStep((prev) => clampActiveStep(prev));
		}, [clampActiveStep, isControlled]);

		

		// Sync SharedValue with prop/state changes
		useEffect(() => {
			activeStepSV.value = animated
				? withTiming(currentActiveStep, ANIMATION_CONFIG.timing)
				: currentActiveStep;
		}, [activeStepSV, animated, currentActiveStep]);


		// ============================================================================
		// Render
		// ============================================================================

		return (
			<View
				ref={ref}
				style={[styles.container, style]}
				accessibilityRole="progressbar"
				accessibilityLabel={accessibilityLabel ?? `Step ${currentActiveStep + 1} of ${validStep}`}
				accessibilityValue={{
					min: 0,
					max: validStep - 1,
					now: currentActiveStep,
				}}
				testID={testID}
				{...rest}
			>
				<View style={styles.innerContainer}>
					{dotElements}
				</View>
			</View>
		);
	}
);

StepIndicator.displayName = 'StepIndicator';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	// Root container
	container: {
		alignItems: 'center',
	},

	// Inner container for dots row
	innerContainer: {
		flexDirection: 'row' as const,
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
	},

	// Step item wrapper (interactive/non-interactive)
	stepItem: (marginRight: number) => ({
		marginRight,
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
	}),

	// Fixed slot for dots (prevents layout shift when dot expands)
	stepSlot: (width: number) => ({
		width,
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
	}),

	// Animated dot container
	dotContainer: {
		overflow: 'hidden',
		position: 'relative',
	},

	// Dot layer base (inactive state) - uses neutral color
	dotLayerBase: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 9999,
		backgroundColor: theme.colors.neutral.content_3,
	},

	// Dot layer fill (active state) - uses colorScheme variant
	dotLayerFill: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 9999,

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

	// Label container
	labelContainer: {
		flexDirection: 'row' as const,
		marginTop: theme.spacing[2],
	},

	// Label item (aligned to step slot width)
	labelItem: (marginRight: number, width?: number) => ({
		marginRight,
		width,
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
	}),

	// Label text
	labelText: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		textAlign: 'center' as const,
		variants: {
			size: {
				sm: { ...theme.typography.caption2 },
				md: { ...theme.typography.caption1 },
				lg: { ...theme.typography.body3 },
			},
		},
	},
}));
