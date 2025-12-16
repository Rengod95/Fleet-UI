import type { FleetTheme } from '@fleet-ui/local/core';
import { Image } from 'expo-image';
import {
	cloneElement,
	forwardRef,
	isValidElement,
	useCallback,
	useMemo,
} from 'react';
import {
	ActivityIndicator,
	type GestureResponderEvent,
	Pressable,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type {
	IconButtonProps,
	IconButtonSize,
} from './IconButton.types';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';

// ============================================================================
// Styles
// ============================================================================

export const iconButtonStyles = StyleSheet.create((theme, _rt) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	const containerCompoundVariants = paletteEntries.flatMap(
		([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
						borderColor: 'transparent',
						_web: {
							_hover: {
								backgroundColor: palette.hover,
							},
						},
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: palette.border_subtle,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					styles: {
						backgroundColor: palette.content_3,
					},
				},
				{
					colorScheme: scheme,
					variant: 'ghost' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: 'transparent',
					},
				},
			];
		}
	);

	const iconCompoundVariants = paletteEntries.flatMap(
		([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					styles: {
						color: hasSolidColor ? palette.text_4 : palette.text_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					styles: {
						color: hasSolidColor ? palette.border_default : palette.border_default,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					styles: {
						color: palette.border_strong,
					},
				},
				{
					colorScheme: scheme,
					variant: 'ghost' as const,
					styles: {
						color: hasSolidColor ? palette.border_default : palette.text_1,
					},
				},
			];
		}
	);

	return {
		container: {
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.rounded.full,
			borderCurve: 'continuous',
			borderWidth: 0,
			borderColor: 'transparent',
			backgroundColor: 'transparent',

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
					outlined: {
						backgroundColor: 'transparent',
						borderWidth: 2,
					},
					flat: {
						backgroundColor: theme.colors.neutral.content_2,
						borderWidth: 0,
					},
					ghost: {
						backgroundColor: 'transparent',
						borderColor: 'transparent',
					},
				},
				size: {
					xs: {
						width: theme.spacing[10],
						height: theme.spacing[10],
					},
					sm: {
						width: theme.spacing[12],
						height: theme.spacing[12],
					},
					md: {
						width: theme.spacing[13],
						height: theme.spacing[13],
					},
					lg: {
						width: theme.spacing[15],
						height: theme.spacing[15],
					},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
					xl: { borderRadius: theme.rounded.xl * 0.9 },
					full: { borderRadius: theme.rounded.full },
				},
				disabled: {
					true: {
						opacity: 0.6,
					},
				},
			},

			compoundVariants: containerCompoundVariants,
		},

		icon: {
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
					outlined: {},
					flat: {},
					ghost: {},
				},
				size: {
					xs: {},
					sm: {},
					md: {},
					lg: {},
				},
			},

			compoundVariants: iconCompoundVariants,
		},
	};
});

// ============================================================================
// Helper Functions
// ============================================================================

const getContentLabel = (ariaLabel?: string, accessibilityLabel?: string) => {
	if (ariaLabel) return ariaLabel;
	if (accessibilityLabel) return accessibilityLabel;
	return undefined;
};

const getSizeTokens = (theme: FleetTheme, size: IconButtonSize) => {
	switch (size) {
		case 'xs':
			return { side: theme.spacing[9], icon: theme.spacing[5] };
		case 'sm':
			return { side: theme.spacing[11], icon: theme.spacing[6] };
		case 'md':
			return { side: theme.spacing[12], icon: theme.spacing[7] };
		case 'lg':
		default:
			return { side: theme.spacing[13], icon: theme.spacing[8] };
	}
};

const normalizeImageSource = (src: NonNullable<IconButtonProps['src']>) =>
	typeof src === 'string' ? { uri: src } : src;

// ============================================================================
// Animation Constants
// ============================================================================

const SPRING_CONFIG = {
	stiffness: 1400,
	damping: 60,
	mass: 3,
};

// ============================================================================
// Component
// ============================================================================

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const IconButton = forwardRef<View, IconButtonProps>((props, ref) => {
	const {
		colorScheme = 'neutral',
		variant = 'filled',
		size = 'md',
		rounded = 'full',
		icon,
		src,
		iconSize,
		// iconColor,
		loading = false,
		accessibilityLabel,
		'aria-label': ariaLabel,
		testID,
		style,
		disabled,
		onPress,
		onPressIn,
		onPressOut,
		...rest
	} = props;

	const { theme } = useUnistyles();
	const isDisabled = Boolean(disabled || loading);
	const label = getContentLabel(ariaLabel, accessibilityLabel);

	const accessibilityState = useMemo(() => ({
		disabled: isDisabled,
		busy: loading,
	}), [isDisabled, loading]);


	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	iconButtonStyles.useVariants({
		colorScheme,
		variant,
		size,
		rounded,
		disabled: isDisabled,
	});

	const sizeTokens = useMemo(() => getSizeTokens(theme, size), [theme, size]);
	const finalIconSize = iconSize ?? sizeTokens.icon;

	const iconColor = useAnimatedVariantColor(iconButtonStyles.icon, 'color');

	const animatedContainerStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: scale.value,
			},
		],
		opacity: opacity.value,
	}));

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
			if (isDisabled) return;
			scale.value = withSpring(1.2, SPRING_CONFIG);
			opacity.value = withSpring(0.6, SPRING_CONFIG);
			onPressIn?.(event);
		},
		[isDisabled, onPressIn]
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
			scale.value = withSpring(1, SPRING_CONFIG);
			opacity.value = withSpring(1, SPRING_CONFIG);
			onPressOut?.(event);
		},
		[onPressOut]
	);

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
			if (isDisabled) {
				event.preventDefault();
				return;
			}
			onPress?.(event);
		},
		[isDisabled, onPress]
	);

	const renderContent = () => {
		if (loading) {
			return (
				<ActivityIndicator
					size="small"
					color={iconColor.value}
					testID={testID ? `${testID}-loader` : undefined}
				/>
			);
		}

		if (src) {
			return (
				<Image
					source={normalizeImageSource(src)}
					style={{ width: finalIconSize, height: finalIconSize }}
					contentFit="contain"
					accessibilityRole="image"
					testID={testID ? `${testID}-image` : undefined}
				/>
			);
		}

		if (icon) {
			if (isValidElement(icon)) {
				return cloneElement(icon, {
					// TODO: Add type safety
					// @ts-expect-error
					color: iconColor.value,
					// @ts-expect-error
					size: icon.props?.size ?? finalIconSize,
					// @ts-expect-error
					strokeWidth: icon.props?.strokeWidth ?? 2.5,
				});
			}
			return icon;
		}

		return null;
	};

	if (__DEV__) {
		if (!icon && !src) {
			// biome-ignore lint/suspicious/noConsole: Development-time guidance
			console.warn('IconButton: either `icon` or `src` should be provided.');
		}
		if (!label) {
			// biome-ignore lint/suspicious/noConsole: Development-time accessibility guidance
			console.warn(
				'IconButton: `aria-label` or `accessibilityLabel` is required for accessibility.'
			);
		}
		if (icon && src) {
			// biome-ignore lint/suspicious/noConsole: Development-time guidance
			console.warn(
				'IconButton: `icon` takes precedence when both `icon` and `src` are provided.'
			);
		}
	}

	return (
		<AnimatedPressable
			ref={ref}
			accessibilityRole="button"
			accessibilityLabel={label}
			accessibilityState={accessibilityState}
			testID={testID}
			disabled={isDisabled}
			style={[iconButtonStyles.container, animatedContainerStyle, style]}
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...rest}
		>
			{renderContent()}
		</AnimatedPressable>
	);
});

IconButton.displayName = 'IconButton';
