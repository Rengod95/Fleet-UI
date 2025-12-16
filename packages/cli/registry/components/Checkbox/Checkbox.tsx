import { CheckIcon } from 'lucide-react-native';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import {
	type GestureResponderEvent,
	type View,
	Pressable,
} from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';
import type {
	CheckboxColorScheme,
	CheckboxProps,
	CheckboxSize,
	CheckboxVariant,
} from './Checkbox.types';

export const checkboxStyles = StyleSheet.create((theme, _rt) => {
	const containerCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				// filled + unchecked
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					checked: false,
					styles: {
						backgroundColor: theme.colors.neutral.content_3,
						borderColor: theme.colors.neutral.content_3,
					},
				},
				// filled + checked
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					checked: true,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
						borderColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
					},
				},
				// flat + unchecked
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					checked: false,
					styles: {
						backgroundColor: theme.colors.neutral.content_3,
						borderColor: theme.colors.neutral.content_3,
					},
				},
				// flat + checked
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					checked: true,
					styles: {
						backgroundColor: 'transparent',
						borderColor: 'transparent',
					},
				},
				// outlined + unchecked
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					checked: false,
					styles: {
						backgroundColor: 'transparent',
						borderColor: theme.colors.neutral.border_default,
					},
				},
				// outlined + checked
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					checked: true,
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
						width: 24,
						height: 24,
					},
					md: {
						width: 27,
						height: 27,
					},
					lg: {
						width: 32,
						height: 32,
					},
				},
				rounded: {
					none: { borderRadius: 0 },
					sm: { borderRadius: theme.rounded.sm * 0.35 },
					md: { borderRadius: theme.rounded.md * 0.45 },
					lg: { borderRadius: theme.rounded.lg * 0.45 },
					full: { borderRadius: theme.rounded.full },
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
				checked: {
					true: {},
					false: {},
				},
				disabled: {
					true: {
						opacity: 0.4,
					},
				},
			},

			compoundVariants: containerCompoundVariants,
		},
	};
});

// ============================================================================
// Helper Functions
// ============================================================================

const getIconColor = (
	theme: ReturnType<typeof useUnistyles>['theme'],
	variant: CheckboxVariant,
	colorScheme: CheckboxColorScheme
): string => {
	const palette = theme.utils.getPaletteForScheme(theme, colorScheme);
	const hasSolidColor = theme.utils.paletteHasSolid(palette);

	switch (variant) {
		case 'filled':
			return hasSolidColor ? palette.text_1 : palette.text_inversed;
		case 'flat':
			return hasSolidColor ? palette.border_subtle : palette.text_1;
		case 'outlined':
			return hasSolidColor ? palette.solid : palette.text_1;
		default:
			return palette.text_1;
	}
};

const getIconSize = (size: CheckboxSize): number => {
	switch (size) {
		case 'sm':
			return 20;
		case 'md':
			return 22;
		case 'lg':
			return 24;
		default:
			return 22;
	}
};

// ============================================================================
// Animation Constants
// ============================================================================
const SPRING_CONFIG = {
	stiffness: 1300,
	damping: 60,
	mass: 2,
};

const COLOR_TRANSITION_SPRING_CONFIG = {
	stiffness: 1300,
	damping: 80,
	mass: 1,
};

const TIMING_CONFIG = {
	duration: 200,
	easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
};
// ============================================================================
// Component
// ============================================================================
const AnimatedCheckIcon = Animated.createAnimatedComponent(CheckIcon);

export const Checkbox = forwardRef<View, CheckboxProps>((props, ref) => {
	const {
		colorScheme = 'primary',
		variant = 'filled',
		size = 'md',
		shadow = 'none',
		rounded = 'md',
		checked: checkedProp,
		defaultChecked = false,
		onCheckedChange,
		disabled = false,
		accessibilityLabel,
		testID,
		style,
		onPress,
		onPressIn,
		onPressOut,
		...rest
	} = props;

	const { theme } = useUnistyles();

	const [internalChecked, setInternalChecked] = useState(defaultChecked);
	const isControlled = checkedProp !== undefined;
	const checked = isControlled ? checkedProp : internalChecked;

	checkboxStyles.useVariants({
		colorScheme,
		variant,
		size,
		rounded,
		shadow,
		checked,
		disabled,
	});

	const scale = useSharedValue(1);
	const progress = useDerivedValue(() => {
		return withTiming(checked ? 1 : 0, TIMING_CONFIG);
	});

	/**
	 *  @link https://www.unistyl.es/v3/guides/reanimated
	 */	
	const backgroundColor = useAnimatedVariantColor(
		checkboxStyles.container,
		'backgroundColor'
	);
	const borderColor = useAnimatedVariantColor(
		checkboxStyles.container,
		'borderColor'
	);
	const iconColor = useMemo(
		() => getIconColor(theme, variant, colorScheme),
		[theme, variant, colorScheme]
	);
	const iconSize = useMemo(() => getIconSize(size), [size]);

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: withSpring(backgroundColor.value, COLOR_TRANSITION_SPRING_CONFIG),
		borderColor: withSpring(borderColor.value, COLOR_TRANSITION_SPRING_CONFIG),
		transform: [
			{
				scale: scale.value,
			},
		],
	}));

	const iconContainerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: progress.value }],
		opacity: progress.value,
	}));

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
			if (disabled) {
				event.preventDefault();
				return;
			}
			const newChecked = !checked;

			// Uncontrolled 모드일 때만 내부 state 업데이트
			if (!isControlled) {
				setInternalChecked(newChecked);
			}

			onPress?.(event);
			onCheckedChange?.(newChecked);
		},
		[disabled, checked, isControlled, onPress, onCheckedChange]
	);

	const handlePressIn = useCallback((event: GestureResponderEvent) => {
		scale.value = withSpring(0.7, SPRING_CONFIG);
		onPressIn?.(event);
	}, [onPressIn]);

	const handlePressOut = useCallback((event: GestureResponderEvent) => {
		scale.value = withSpring(1, SPRING_CONFIG);
		onPressOut?.(event);
	}, [onPressOut]);

	return (
		<Pressable
			ref={ref}
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			disabled={disabled}
			accessibilityRole="checkbox"
			accessibilityLabel={accessibilityLabel}
			accessibilityState={{
				checked,
				disabled,
			}}
			focusable={!disabled}
			testID={testID}
			{...rest}
			hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
		>
			<Animated.View
				style={[
					checkboxStyles.container,
					containerAnimatedStyle,
					style,
				]}
			>
				<Animated.View style={iconContainerAnimatedStyle}>
					<AnimatedCheckIcon
						size={iconSize}
						strokeWidth={3}
						color={iconColor}
					/>
				</Animated.View>
			</Animated.View>
		</Pressable>
	);
});

Checkbox.displayName = 'Checkbox';
