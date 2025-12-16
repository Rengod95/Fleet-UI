import type { FleetTheme } from '@fleet-ui/core';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import {
	type GestureResponderEvent,
	type View,
	Pressable,
} from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';
import type {
	RadioColorScheme,
	RadioProps,
	RadioVariant,
} from './Radio.types';

export const radioStyles = StyleSheet.create((theme, _rt) => {
	const containerCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					selected: false,
					styles: {
						backgroundColor: theme.colors.neutral.content_3,
						borderColor: theme.colors.neutral.content_3,
					},
				},
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					selected: true,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
						borderColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					selected: false,
					styles: {
						backgroundColor: theme.colors.neutral.content_3,
						borderColor: theme.colors.neutral.content_3,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					selected: true,
					styles: {
						backgroundColor:
							scheme === 'neutral' ? palette.text_3 : palette.content_3,
						borderColor:
							scheme === 'neutral' ? palette.text_3 : palette.content_3,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					selected: false,
					styles: {
						backgroundColor: 'transparent',
						borderColor: theme.colors.neutral.border_default,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					selected: true,
					styles: {
						backgroundColor: 'transparent',
						borderColor: hasSolidColor ? palette.solid : palette.text_1,
					},
				},
			];
		});

	return {
		container: {
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 1,
			borderCurve: 'continuous',
			borderRadius: theme.rounded.full,

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				variant: {
					filled: {},
					flat: {},
					outlined: {
						backgroundColor: 'transparent',
					},
				},
				size: {
					sm: {
						width: 22,
						height: 22,
					},
					md: {
						width: 24,
						height: 24,
					},
					lg: {
						width: 30,
						height: 30,
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
					md: { boxShadow: theme.shadows.lg },
					lg: { boxShadow: theme.shadows.lg },
				},
				selected: {
					true: {},
					false: {},
				},
				disabled: {
					true: {
						opacity: 0.5,
					},
				},
			},

			compoundVariants: containerCompoundVariants,
		},
		innerCircle: {
			borderRadius: 9999,
			variants: {
				size: {
					sm: {
						width: 8,
						height: 8,
					},
					md: {
						width: 10,
						height: 10,
					},
					lg: {
						width: 12,
						height: 12,
					},
				},
			},
		},
	};
});

const getInnerCircleColor = (
	theme: FleetTheme,
	variant: RadioVariant,
	colorScheme: RadioColorScheme
): string => {
	const palette = theme.utils.getPaletteForScheme(theme, colorScheme);
	const hasSolidColor = theme.utils.paletteHasSolid(palette);

	switch (variant) {
		case 'filled':
			return palette.text_inversed;
		case 'flat':
			return hasSolidColor ? palette.border_subtle : palette.text_1;
		case 'outlined':
			return hasSolidColor ? palette.solid : palette.text_1;
		default:
			return palette.text_1;
	}
};

export const Radio = forwardRef<View, RadioProps>((props, ref) => {
	const {
		colorScheme = 'primary',
		variant = 'filled',
		size = 'md',
		shadow = 'none',
		selected: selectedProp,
		defaultSelected = false,
		onSelect,
		disabled = false,
		accessibilityLabel,
		testID,
		style,
		onPress,
		...rest
	} = props;

	const { theme } = useUnistyles();

	const [internalSelected, setInternalSelected] = useState(defaultSelected);
	const isControlled = selectedProp !== undefined;
	const selected = isControlled ? selectedProp : internalSelected;

	radioStyles.useVariants({
		colorScheme,
		variant,
		size,
		shadow,
		selected,
		disabled,
	});

	// convert selected state to SharedValue
	const progress = useDerivedValue(() => {
		return withTiming(selected ? 1 : 0, {
			duration: 200,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
		});
	});

	const backgroundColor = useAnimatedVariantColor(
		radioStyles.container,
		'backgroundColor'
	);
	const borderColor = useAnimatedVariantColor(
		radioStyles.container,
		'borderColor'
	);

	// Container animation (backgroundColor, borderColor)
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: withTiming(backgroundColor.value, { duration: 200 }),
		borderColor: withTiming(borderColor.value, { duration: 200 }),
	}));

	// Inner circle scale animation
	const innerCircleAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: progress.value }],
		opacity: progress.value,
	}));

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
			if (disabled) {
				event.preventDefault?.();
				return;
			}

			onPress?.(event);

			// strict_radio: already selected, no state change (radio semantics)
			if (selected) {
				return;
			}

			// Uncontrolled mode only update internal state
			if (!isControlled) {
				setInternalSelected(true);
			}

			onSelect?.(true);
		},
		[disabled, onPress, selected, isControlled, onSelect]
	);

	const innerCircleColor = useMemo(
		() => getInnerCircleColor(theme, variant, colorScheme),
		[theme, variant, colorScheme]
	);

	return (
		<Pressable
			ref={ref}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="radio"
			accessibilityLabel={accessibilityLabel}
			accessibilityState={{
				checked: selected,
				disabled,
			}}
			focusable={!disabled}
			testID={testID}
			{...rest}
			hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
		>
			<Animated.View
				style={[
					radioStyles.container,
					containerAnimatedStyle,
					style,
				]}
			>
				<Animated.View
					style={[
						radioStyles.innerCircle,
						{ backgroundColor: innerCircleColor },
						innerCircleAnimatedStyle,
					]}
				/>
			</Animated.View>
		</Pressable>
	);
});

Radio.displayName = 'Radio';
