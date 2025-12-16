import { memo, useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { OTPCaret } from './OTPCaret';
import type {
	OTPSlotProps,
} from './OTPInput.types';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';


// ============================================
// Animation Configs
// ============================================

const TYPING_ANIMATION_SCALE = 1.06;

const COLOR_ANIMATION_SPRING_CONFIG = {
	stiffness: 250,
	damping: 30,
	mass: 1,
}

const TYPING_ANIMATION_TRANSLATE_Y = 8;
const TYPING_ANIMATION_TIMING_CONFIG = {
	duration: 180,
	easing: Easing.bezier(0.25, 0.1, 0.08, 0.94),
}

const FOCUS_ANIMATION_TIMING_CONFIG = {
	duration: 200,
	easing: Easing.bezier(0.25, 0.1, 0.08, 0.94),
}

// ============================================
// Component
// ============================================

/**
 * OTP individual slot component
 * - Character display
 * - Focus state visualization
 * - Bounce animation when typing
 * - Caret display
 */
export const OTPSlot = memo<OTPSlotProps>(function OTPSlot({
	slot,
	colorScheme = 'neutral',
	variant = 'bordered',
	size = 'md',
	rounded = 'md',
	shadow = 'none',
	isDisabled = false,
	isInvalid = false,
	slotStyle,
	textStyle,
	caretStyle,
}) {
	const { theme } = useUnistyles();

	const { index, char, prevChar, placeholderChar, isActive, hasFakeCaret, isFocused} =
		slot;

	slotStyles.useVariants({
		colorScheme,
		variant,
		size,
		rounded: variant === 'underlined' ? 'none' : rounded,
		shadow,
		isInvalid,
		isDisabled,
		isActive,
	});


	const backgroundColor = useAnimatedVariantColor(slotStyles.container, 'backgroundColor');
	const borderColor = useAnimatedVariantColor(slotStyles.container, 'borderColor');
	const invalidColor: string = theme.colors.error.solid;

	const scale = useSharedValue(1);
	const borderWidth = useSharedValue(
		variant === 'bordered' || variant === 'faded' ? 1 : 0
	);
	const underlineScale = useSharedValue(0);
	const translateY = useSharedValue(0);

	// ============================================
	// Bounce Animation (when typing)
	// ============================================

	useEffect(() => {
		// When a new character is entered (null/undefined → value)
		const wasEmpty = !prevChar;
		const hasChar = !!char

		if (wasEmpty && hasChar) {
			// Execute bounce animation (on UI thread)
			scale.value = withSequence(
				withTiming(TYPING_ANIMATION_SCALE, TYPING_ANIMATION_TIMING_CONFIG),
				withDelay(10, withTiming(1, TYPING_ANIMATION_TIMING_CONFIG))
			);

			translateY.value = withSequence(
				withTiming(TYPING_ANIMATION_TRANSLATE_Y, TYPING_ANIMATION_TIMING_CONFIG),
				withDelay(50, withTiming(0, TYPING_ANIMATION_TIMING_CONFIG))
			);
		}
	}, [char, prevChar, scale]);

	// ============================================
	// Focus Animation
	// ============================================

	useEffect(() => {
		if(isFocused) {
			if (variant === 'bordered' || variant === 'faded') {
				borderWidth.value = withTiming(isActive ? 2 : 1, FOCUS_ANIMATION_TIMING_CONFIG);
			}

			if (variant === 'underlined') {
				underlineScale.value = withTiming(isActive ? 1 : 0, FOCUS_ANIMATION_TIMING_CONFIG);
			}
		}
	}, [isActive, variant, borderWidth, underlineScale, isFocused]);

	// ============================================
	// Animated Styles
	// ============================================

	const animatedContainerStyle = useAnimatedStyle(() => {
		const baseStyle = {
			transform: [{ scale: scale.value }, { translateY: translateY.value }],
			backgroundColor: withSpring(isInvalid ? invalidColor : backgroundColor.value, COLOR_ANIMATION_SPRING_CONFIG),
			borderColor: withSpring(isInvalid ? invalidColor : borderColor.value, COLOR_ANIMATION_SPRING_CONFIG),
			borderWidth: borderWidth.value,
		};

		return baseStyle;
	}, [backgroundColor, borderColor, isActive, isInvalid, variant]);

	const animatedUnderlineStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scaleX: underlineScale.value }],
			backgroundColor: withSpring(isInvalid ? invalidColor : borderColor.value, COLOR_ANIMATION_SPRING_CONFIG),
			height: 2,
		};
	}, [borderColor, underlineScale]);

	// ============================================
	// Render
	// ============================================

	return (
		<Animated.View
			style={[
				slotStyles.container,
				animatedContainerStyle,
				slotStyle,
			]}
		>
			{char ? (
				<Text style={[slotStyles.text, textStyle]}>{char}</Text>
			) : placeholderChar ? (
				<Text style={[slotStyles.placeholder, textStyle]}>
					{placeholderChar}
				</Text>
			) : null}


			{hasFakeCaret && (
				<OTPCaret colorScheme={colorScheme} size={size} style={caretStyle} />
			)}


			{variant === 'underlined' && (
				<Animated.View style={[slotStyles.underline, animatedUnderlineStyle]} />
			)}
		</Animated.View>
	);
});

// ============================================
// Styles
// ============================================

const slotStyles = StyleSheet.create((theme) => {

	const plaletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	const containerCompoundVariants = plaletteEntries.flatMap(([scheme, palette]) => {
		const hasSolidColor = theme.utils.paletteHasSolid(palette);
		return [
			// focused: true
			{
				colorScheme: scheme,
				variant: 'bordered' as const,
			    isActive: true,
				styles: {
					backgroundColor: 'transparent',
					borderColor: hasSolidColor ? palette.border_default : palette.text_1,
					borderWidth: 2,
				},
			},
			{
				colorScheme: scheme,
				variant: 'faded' as const,
			    isActive: true,
				styles: {
					backgroundColor: hasSolidColor ? palette.content_2 : palette.content_4,
					borderColor: palette.border_default,
					borderWidth: 2,
				},
			},
			{
				colorScheme: scheme,
				variant: 'underlined' as const,
			    isActive: true,
				styles: {
					backgroundColor: 'transparent',
					borderColor: hasSolidColor ? palette.border_default : palette.text_1,
					borderWidth: 2,
				},
			},
			{
				colorScheme: scheme,
				variant: 'flat' as const,
			    isActive: true,
				styles: {
					backgroundColor: palette.content_4,
					borderColor: 'transparent',
					borderWidth: 0,
				},
			},
			// focused: false
			{
				colorScheme: scheme,
				variant: 'bordered' as const,
			    isActive: false,
				styles: {
					backgroundColor: 'transparent',
					borderWidth: 2,
					borderColor: theme.colors.neutral.border_subtle,
				},
			},
			{
				colorScheme: scheme,
				variant: 'faded' as const,
			    isActive: false,
				styles: {
					backgroundColor: theme.colors.neutral.content_2,
					borderColor: theme.colors.neutral.border_subtle,
					borderWidth: 2,
				},
			},
			{
				colorScheme: scheme,
				variant: 'underlined' as const,
			    isActive: false,
				styles: {
					backgroundColor: 'transparent',
					borderColor: theme.colors.neutral.border_subtle,
					borderWidth: 2,
				},
			},
			{
				colorScheme: scheme,
				variant: 'flat' as const,
			    isActive: false,
				styles: {
					backgroundColor: theme.colors.neutral.content_2,
					borderColor: 'transparent',
					borderWidth: 0,
				},
			},
		];
	});


	return {
		container: {
			alignItems: 'center',
			justifyContent: 'center',
			borderCurve: 'continuous',

			variants: {
				variant: {
					flat: {
						backgroundColor: theme.colors.neutral.content_3,
						borderColor: 'transparent',
						borderWidth: 0,
					},
					bordered: {
						backgroundColor: 'transparent',
						borderWidth: 2,
						borderColor: theme.colors.neutral.border_subtle,
					},
					underlined: {
						backgroundColor: 'transparent',
						borderColor: theme.colors.neutral.border_default,
						borderWidth: 0,
						borderBottomWidth: StyleSheet.hairlineWidth,
						borderRadius: 0,
					},
					faded: {
						backgroundColor: theme.colors.neutral.content_2,
						borderWidth: 2,
						borderColor: theme.colors.neutral.border_subtle,
					},
				},
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				size: {
					sm: { padding: theme.spacing[2], width:48, height:48 },
					md: { padding: theme.spacing[3], width:56, height:56 },
					lg: { padding: theme.spacing[4], width:64, height:64 },
					xl: { padding: theme.spacing[5], width:72, height:72 },
				},
				rounded: {
					none: { borderRadius: 0 },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
					full: { borderRadius: theme.rounded.full },
				},
				shadow: {
					none: { boxShadow: 'none' },
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.md },
					lg: { boxShadow: theme.shadows.lg },
				},
				isInvalid: {
					true: {
						borderColor: theme.colors.error.solid,
						borderWidth: 2,
					},
				},
				isDisabled: {
					true: {
						opacity: 0.5,
					},
				},
				isActive: {
					true: {},
					false: {},
				}
			},

			compoundVariants: containerCompoundVariants,
		},
		text: {
			color: theme.colors.neutral.text_1,

			variants: {
				size: {
					sm: { ...theme.typography.h5, fontWeight: '600' },
					md: { ...theme.typography.h4, fontWeight: '600' },
					lg: { ...theme.typography.h3, fontWeight: '600' },
					xl: { ...theme.typography.h3, fontWeight: '600' },
				},
			},
		},
		placeholder: {
			color: theme.colors.neutral.text_3,
			...theme.typography.body2,

			variants: {
				size: {
					sm: { ...theme.typography.body3 },
					md: { ...theme.typography.body2 },
					lg: { ...theme.typography.body1 },
					xl: { ...theme.typography.h5 },
				},
			},
		},
		underline: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: 2,
			transformOrigin: 'center',
		},
	};
});
