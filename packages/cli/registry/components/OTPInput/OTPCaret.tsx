import { memo, useEffect } from 'react';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import type { OTPCaretProps } from './OTPInput.types';

// ============================================
// Animation Configs
// ============================================

const CARET_ANIMATION_TIMING_CONFIG = {
	duration: 700,
	easing: Easing.inOut(Easing.ease),
}

// ============================================
// Component
// ============================================

/**
 * OTP slot's blinking caret
 * Visual representation of the current input position
 */
export const OTPCaret = memo<OTPCaretProps>(function OTPCaret({
	colorScheme = 'primary',
	size = 'md',
	style,
}) {
	const opacity = useSharedValue(1);

	styles.useVariants({
		colorScheme,
		size,
	});

	// Blinking animation
	useEffect(() => {
		opacity.value = withRepeat(
			withTiming(0, CARET_ANIMATION_TIMING_CONFIG),
			-1, // Infinite repetition
			true // Reverse playback (fade out → fade in)
		);
	}, [opacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View
			style={[
				styles.caret,
				animatedStyle,
				style,
			]}
		/>
	);
});

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create((theme) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	const caretCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		const hasSolidColor = theme.utils.paletteHasSolid(palette);
		return [
			{
				colorScheme: scheme,
				styles: {
					backgroundColor: hasSolidColor ? palette.text_1 : palette.border_default,
				},
			},
		];
	});

	return {
		caret: {
			borderRadius: 1,
			variants: {
				size: {
					sm: {
						width: 2,
						height: 18,
					},
					md: {
						width: 2,
						height: 20,
					},
					lg: {
						width: 2,
						height: 22,
					},
					xl: {
						width: 2,
						height: 24,
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
			},

			compoundVariants: caretCompoundVariants,
		},
	};
});
