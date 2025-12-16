import type { ReactNode } from 'react';
import { forwardRef, isValidElement, useCallback, useEffect, useMemo } from 'react';
import {
	ActivityIndicator,
	type GestureResponderEvent,
	Pressable,
	Text,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';
import type { ButtonProps, ButtonSize } from './Button.types';

export const buttonStyles = StyleSheet.create((theme, _rt) => {
	const containerCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
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
						borderColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
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
					},
				},
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					styles: {
						backgroundColor: palette.content_3,
						borderColor: palette.border_subtle,
					},
				},
			];
		});

	const textCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					styles: {
						color: hasSolidColor ? palette.text_1 : palette.text_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					styles: {
						color: hasSolidColor ? palette.solid : palette.text_1,
					},
				},
				{
					colorScheme: scheme,
					variant: 'ghost' as const,
					styles: {
						color: hasSolidColor ? palette.solid : palette.text_1,
					},
				},
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					styles: {
						color: palette.border_default,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					styles: {
						color: hasSolidColor ? palette.text_4 : palette.text_1,
					},
				},
			];
		});

	return {
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.rounded.md,
			borderCurve: 'continuous',
			paddingHorizontal: theme.spacing[5],
			paddingVertical: theme.spacing[3],
			minHeight: 40,
			gap: theme.spacing[2],
			borderWidth: 0,
			margin: 0,
			backgroundColor: 'transparent',
			// _web: {
			// 	transitionProperty:
			// 		'background-color, box-shadow, transform, opacity, outline-color',
			// 	transitionDuration: '150ms',
			// 	transitionTimingFunction: 'ease-out',
			// 	_focusVisible: {
			// 		outlineStyle: 'solid',
			// 		outlineWidth: 2,
			// 		outlineColor: theme.colors.neutral.border_default,
			// 	},
			// },

			variants: {
				colorScheme: {
					primary: {
						_web: {
							_hover: {
								backgroundColor: theme.colors.primary.hover,
							},
						},
					},
					neutral: {
						_web: {
							_hover: {
								backgroundColor: theme.colors.neutral.hover,
							},
						},
					},
					error: {
						_web: {
							_hover: {
								backgroundColor: theme.colors.error.hover,
							},
						},
					},
					success: {
						_web: {
							_hover: {
								backgroundColor: theme.colors.success.hover,
							},
						},
					},
					warning: {
						_web: {
							_hover: {
								backgroundColor: theme.colors.warning.hover,
							},
						},
					},
					info: {
						_web: {
							_hover: {
								backgroundColor: theme.colors.info.hover,
							},
						},
					},
				},
				size: {
					sm: {
						paddingHorizontal: theme.spacing[6],
						paddingVertical: theme.spacing[3],
						minHeight: 38,
						gap: theme.spacing[1],
					},
					md: {
						paddingHorizontal: theme.spacing[6],
						paddingVertical: theme.spacing[3],
						minHeight: 44,
						gap: theme.spacing[2],
					},
					lg: {
						paddingHorizontal: theme.spacing[7],
						paddingVertical: theme.spacing[3],
						minHeight: 48,
						gap: theme.spacing[2],
					},
					xl: {
						paddingHorizontal: theme.spacing[8],
						paddingVertical: theme.spacing[3],
						minHeight: 56,
						gap: theme.spacing[3],
					},
				},
				variant: {
					filled: {},
					outlined: {
						backgroundColor: 'transparent',
						borderWidth: 1,
					},
					flat: {
						backgroundColor: theme.colors.neutral.content_2,
						borderWidth: 0,
					},
					ghost: {
						backgroundColor: 'transparent',
						borderColor: 'transparent',
					},
					faded: {
						backgroundColor: theme.colors.neutral.content_2,
						borderWidth: 1,
						borderColor: theme.colors.neutral.border_subtle,
					},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
					xl: { borderRadius: theme.rounded.xl },
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
					md: { boxShadow: theme.shadows.card },
					lg: { boxShadow: theme.shadows.lg },
				},
				disabled: {
					true: {
						opacity: 0.6,
					},
				},
				fullWidth: {
					true: {
						alignSelf: 'stretch',
						width: '100%',
					},
				},
				iconOnly: {
					true: {
						minWidth: undefined,
						paddingHorizontal: theme.spacing[3],
					},
				},
			},
			compoundVariants: containerCompoundVariants,
		},
		buttonText: {
			...theme.typography.body1,
			fontWeight: theme.text.fontWeight.semibold,
			letterSpacing: theme.text.letterSpacing.normal,

			color: theme.colors.neutral.text_inversed,
			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				size: {
					sm: {
						fontSize: theme.typography.caption1.fontSize,
						lineHeight: theme.typography.caption1.lineHeight,
					},
					md: {},
					lg: {},
					xl: {
						fontSize: theme.typography.body1.fontSize,
						lineHeight: theme.typography.body1.lineHeight,
					},
				},
				variant: {
					flat: {
						color: theme.colors.neutral.text_1,
					},
					faded: {
						color: theme.colors.neutral.text_1,
					},
					filled: {},
					outlined: {},
					ghost: {},
				},
				iconOnly: {
					true: {
						marginHorizontal: 0,
					},
				},
			},
			compoundVariants: textCompoundVariants,
		},
		leftIcon: (_size: ButtonSize) => ({
			marginRight: theme.spacing[2],
			variants: {
				size: {
					sm: {
						marginRight: theme.spacing[1],
					},
					md: {},
					lg: {
						marginRight: theme.spacing[2],
					},
					xl: {
						marginRight: theme.spacing[3],
					},
				},
				iconOnly: {
					true: {
						marginRight: 0,
					},
				},
			},
		}),
		rightIcon: (_size: ButtonSize) => ({
			marginLeft: theme.spacing[2],
			variants: {
				size: {
					sm: {
						marginLeft: theme.spacing[1],
					},
					md: {},
					lg: {
						marginLeft: theme.spacing[2],
					},
					xl: {
						marginLeft: theme.spacing[3],
					},
				},
				iconOnly: {
					true: {
						marginLeft: 0,
					},
				},
			},
		}),
		loader: {
			marginRight: theme.spacing[2],
		},
	};
});

// ============================================================================
// Helper Functions
// ============================================================================

const getContentLabel = (
	children: ReactNode,
	ariaLabel?: string,
	accessibilityLabel?: string
) => {
	if (ariaLabel) {
		return ariaLabel;
	}

	if (accessibilityLabel) {
		return accessibilityLabel;
	}

	if (typeof children === 'string') {
		return children;
	}

	return undefined;
};

// ============================================================================
// Animation Constants
// ============================================================================
const SPRING_CONFIG = {
	stiffness: 1600,
	damping: 65,
	mass: 2.5,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ============================================================================
// Component
// ============================================================================
export const Button = forwardRef<View, ButtonProps>((props, ref) => {
	const {
		colorScheme = 'primary',
		variant = 'filled',
		size = 'md',
		shadow = 'none',
		rounded = 'md',
		fullWidth = false,
		loading = false,
		leftIcon,
		rightIcon,
		children,
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

	const isDisabled = Boolean(disabled || loading);
	const label = getContentLabel(children, ariaLabel, accessibilityLabel);

	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	buttonStyles.useVariants({
		colorScheme,
		size,
		variant,
		rounded,
		shadow,
		fullWidth,
		disabled: isDisabled,
	});

	const textColor = useAnimatedVariantColor(buttonStyles.buttonText, 'color');

	const accessibilityState = useMemo(() => ({
		disabled: isDisabled,
		busy: loading,
	}), [isDisabled, loading]);

	const animatedStyle = useAnimatedStyle(() => ({
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
			scale.value = withSpring(0.94, SPRING_CONFIG);
			opacity.value = withSpring(0.86, SPRING_CONFIG);
			onPressIn?.(event);
		},
		[isDisabled, onPressIn, opacity, scale]
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
			scale.value = withSpring(1, SPRING_CONFIG);
			opacity.value = withSpring(1, SPRING_CONFIG);
			onPressOut?.(event);
		},
		[onPressOut, opacity, scale]
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

	const renderLeftIcon = useCallback(() => {
		if (loading) {
			return (
				<ActivityIndicator
					style={buttonStyles.loader}
					size="small"
					// animatedProps={indicatorAnimatedProps}
					testID={testID ? `${testID}-loader` : undefined}
					color={textColor.value}
				/>
			);
		}

		if (!leftIcon) {
			return null;
		}

		return (
			<View style={buttonStyles.leftIcon(size)}>{leftIcon}</View>
		);
	}, [loading, leftIcon, size]);

	const renderRightIcon = useCallback(() => {
		if (loading || !rightIcon) {
			return null;
		}

		return (
			<View style={buttonStyles.rightIcon(size)}>{rightIcon}</View>
		);
	}, [loading, rightIcon, size]);

	const resolvedChildren = isValidElement(children) ? (
		children
	) : children != null ? (
		<Text
			numberOfLines={1}
			ellipsizeMode="tail"
			style={[buttonStyles.buttonText]}
		>
			{String(children)}
		</Text>
	) : null;

	// Reanimated's Animated Style is overriding all included style attributes, so the opacity attribute is not working as expected.
	// So we need to set the opacity manually.
	useEffect(() => {
		if (isDisabled) {
			opacity.value = 0.4
		}
	}, [isDisabled]);

	return (
		<AnimatedPressable
			ref={ref}
			accessibilityRole="button"
			accessibilityLabel={label}
			accessibilityState={accessibilityState}
			testID={testID}
			disabled={isDisabled}
			style={[
				buttonStyles.container,
				animatedStyle,
				style,
			]}
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...rest}
		>
			{renderLeftIcon()}
			{resolvedChildren}
			{renderRightIcon()}
		</AnimatedPressable>
	);
});

Button.displayName = 'Button';
