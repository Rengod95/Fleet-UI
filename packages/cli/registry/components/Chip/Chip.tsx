
import type { ReactNode } from 'react';
import { forwardRef, isValidElement, useCallback, useEffect, useMemo } from 'react';
import {
	type GestureResponderEvent,
	Pressable,
	type StyleProp,
	Text,
	View,
	type ViewStyle,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import type {
	ChipProps,
	ChipSize,
} from './Chip.types';

import {XIcon} from 'lucide-react-native';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';

export const chipStyles = StyleSheet.create((theme, _rt) => {
    const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);
	
	const containerCompoundVariants = paletteEntries
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				// Normal (inverted: false)
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					inverted: false,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					inverted: false,
					styles: {
						backgroundColor: 'transparent',
						borderColor: hasSolidColor
							? palette.border_default
							: palette.content_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					inverted: false,
					styles: {
						backgroundColor: palette.content_3,
					},
				},
				{
					colorScheme: scheme,
					variant: 'ghost' as const,
					inverted: false,
					styles: {
						backgroundColor: 'transparent',
					},
				},
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					inverted: false,
					styles: {
						backgroundColor: palette.content_2,
						borderColor: palette.border_subtle,
					},
				},
				// Inverted (inverted: true) - swap styles
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					inverted: true,
					styles: {
						backgroundColor: palette.content_2,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					inverted: true,
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
					inverted: true,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'ghost' as const,
					inverted: true,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					inverted: true,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
						borderColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
					},
				},
			];
		});

	// Text compound variants
	const textCompoundVariants = paletteEntries
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				// Normal (inverted: false)
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					inverted: false,
					styles: {
						color: hasSolidColor ? palette.text_1 : palette.text_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					inverted: false,
					styles: {
						color: hasSolidColor ? palette.border_default : palette.text_1,
					},
				},
				{
					colorScheme: scheme,
					variant: 'ghost' as const,
					inverted: false,
					styles: {
						color: hasSolidColor ? palette.solid : palette.text_1,
					},
				},
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					inverted: false,
					styles: {
						color: palette.border_default,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					inverted: false,
					styles: {
						color: hasSolidColor ? palette.text_4 : palette.text_1,
					},
				},
				// Inverted (inverted: true) - swap text colors
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					inverted: true,
					styles: {
						color: hasSolidColor ? palette.border_strong : palette.text_1,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					inverted: true,
					styles: {
						color: hasSolidColor ? palette.text_1 : palette.text_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'ghost' as const,
					inverted: true,
					styles: {
						color: hasSolidColor ? palette.text_1 : palette.text_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					inverted: true,
					styles: {
						color: hasSolidColor ? palette.text_1 : palette.text_inversed,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					inverted: true,
					styles: {
						color: hasSolidColor ? palette.text_1 : palette.text_inversed,
					},
				},
			];
		});

	return {
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.rounded.full,
			borderCurve: 'continuous',
			paddingHorizontal: theme.spacing[3],
			paddingVertical: theme.spacing[1],
			minHeight: 28,
			gap: theme.spacing[1],
			borderWidth: 0,
			margin: 0,
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
				size: {
					sm: {
						paddingHorizontal: theme.spacing[3],
						paddingVertical: theme.spacing[1],
						minHeight: 24,
						gap: theme.spacing[1],
					},
					md: {
						paddingHorizontal: theme.spacing[4],
						paddingVertical: theme.spacing[1],
						minHeight: 28,
					},
					lg: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[2],
						minHeight: 32,
						gap: theme.spacing[2],
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
					xs: { boxShadow: theme.shadows.xs },
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.card },
					lg: { boxShadow: theme.shadows.lg },
					xl: { boxShadow: theme.shadows.xl },
					'2xl': { boxShadow: theme.shadows['2xl'] },
					smooth_sm: { boxShadow: theme.shadows.smooth_sm },
					smooth_md: { boxShadow: theme.shadows.smooth_md },
					smooth_lg: { boxShadow: theme.shadows.smooth_lg },
					floating: { boxShadow: theme.shadows.floating },
					banner: { boxShadow: theme.shadows.banner },
					inner: { boxShadow: theme.shadows.inner },
					card: { boxShadow: theme.shadows.card },
					button: { boxShadow: theme.shadows.button },
					button_primary: { boxShadow: theme.shadows.button_primary },
					overlay: { boxShadow: theme.shadows.overlay },
				},
				inverted: {
					true: {},
					false: {},
				},
				disabled: {
					true: {
						opacity: 0.6,
					},
				},
				iconOnly: {
					true: {
						minWidth: undefined,
						paddingHorizontal: theme.spacing[2],
					},
				},
			},
			compoundVariants: containerCompoundVariants,
		},
		chipText: {
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
						lineHeight: theme.typography.caption2.lineHeight,
						fontWeight: theme.text.fontWeight.medium,
					},
					md: {
						fontSize: theme.typography.caption1.fontSize,
						lineHeight: theme.typography.caption2.lineHeight,
						fontWeight: theme.text.fontWeight.medium,
					},
					lg: {
						fontSize: theme.typography.body3.fontSize,
						lineHeight: theme.typography.caption1.lineHeight,
						fontWeight: theme.text.fontWeight.medium,
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
				inverted: {
					true: {},
					false: {},
				},
				iconOnly: {
					true: {
						marginHorizontal: 0,
					},
				},
			},
			compoundVariants: textCompoundVariants,
		},
		leftIcon: {
			marginRight: theme.spacing[1],
			variants: {
				size: {
					sm: {
						marginRight: theme.spacing[1],
					},
					md: {},
					lg: {
						marginRight: theme.spacing[1],
					},
				},
				iconOnly: {
					true: {
						marginRight: 0,
					},
				},
			},
		},
		rightIcon: {
			marginLeft: theme.spacing[1],
			variants: {
				size: {
					sm: {
						marginLeft: theme.spacing[1],
					},
					md: {},
					lg: {
						marginLeft: theme.spacing[1],
					},
				},
				iconOnly: {
					true: {
						marginLeft: 0,
					},
				},
			},
		},
		closeButton: {
			marginLeft: theme.spacing[1],
			padding: theme.spacing[1],
			borderRadius: theme.rounded.full,
			alignItems: 'center',
			justifyContent: 'center',
		},
		loader: {
			marginRight: theme.spacing[1],
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

const getCloseIconSize = (size: ChipSize): number => {
	switch (size) {
		case 'sm':
			return 12;
		case 'md':
			return 14;
		case 'lg':
			return 16;
		default:
			return 14;
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

// ============================================================================
// Component
// ============================================================================

export const Chip = forwardRef<View, ChipProps>((props, ref) => {
	const {
		colorScheme = 'neutral',
		variant = 'filled',
		size = 'md',
		shadow = 'none',
		rounded = 'full',
		loading = false,
		iconOnly = false,
		inverted = false,
		leftIcon,
		rightIcon,
		children,
		accessibilityLabel,
		'aria-label': ariaLabel,
		testID,
		style,
		disabled,
		onPress,
		onClose,
		onPressIn,
		onPressOut,
		...rest
	} = props;

	const label = getContentLabel(children, ariaLabel, accessibilityLabel);
	const isDisabled = useMemo(() => Boolean(disabled || loading), [disabled, loading]);
	// Determine if chip is interactive
	const isInteractive = useMemo(() => Boolean(onPress), [onPress]);

	// Press animation (only when onPress is provided)
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: scale.value,
			},
		],
		opacity: opacity.value,
	}));

	chipStyles.useVariants({
		colorScheme,
		size,
		variant,
		iconOnly,
		rounded,
		shadow,
		inverted,
		disabled: isDisabled,
	});

	const textColor = useAnimatedVariantColor(chipStyles.chipText, 'color');

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
			if (isDisabled) return;
			// Only animate if onPress is provided
			if (isInteractive) {
				scale.value = withSpring(0.95, SPRING_CONFIG);
				opacity.value = withSpring(0.6, SPRING_CONFIG);
			}
			onPressIn?.(event);
		},
		[isDisabled, isInteractive, onPressIn, scale, opacity]
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
			scale.value = withSpring(1, SPRING_CONFIG);
			opacity.value = withSpring(1, SPRING_CONFIG);
			onPressOut?.(event);
		},
		[onPressOut, scale, opacity]
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

	const handleClose = useCallback(
		(event: GestureResponderEvent) => {
			// Stop propagation to prevent triggering onPress
			event.stopPropagation();
			onClose?.();
		},
		[onClose]
	);

	const resolvedChildren = isValidElement(children) ? (
		children
	) : children != null ? (
		<Text numberOfLines={1} ellipsizeMode="tail" style={chipStyles.chipText}>
			{String(children)}
		</Text>
	) : null;	

	const renderLeftIcon = () => {
		if (iconOnly || !leftIcon) {
			return null;
		}

		return <View style={chipStyles.leftIcon}>{leftIcon}</View>;
	};

	const renderRightIcon = () => {
		// If onClose is provided, show close button instead of rightIcon
		if (onClose && !iconOnly && !loading) {
			return (
				<Pressable
					style={chipStyles.closeButton}
					onPress={handleClose}
					hitSlop={8}
					accessibilityRole="button"
					accessibilityLabel="Close"
					testID={testID ? `${testID}-close` : undefined}
				>
					<XIcon size={getCloseIconSize(size)} strokeWidth={2.5} color={textColor.value} />
				</Pressable>
			);
		}

		if (iconOnly || loading || !rightIcon) {
			return null;
		}

		return <View style={chipStyles.rightIcon}>{rightIcon}</View>;
	};

	const accessibilityState = useMemo(() => ({
		disabled: isDisabled,
		busy: loading,
	}), [isDisabled, loading]);

	// Reanimated's Animated Style is overriding all included style attributes, so the opacity attribute is not working as expected.
	// So we need to set the opacity manually.
	useEffect(() => {
		if (isDisabled) {
			opacity.value = 0.4
		}
	}, [isDisabled]);


	if (__DEV__ && iconOnly && typeof children === 'string') {
		// biome-ignore lint/suspicious/noConsole: Development-time UI guidance
		console.warn('Chip: iconOnly chips should render an icon element.');
	}

	if (__DEV__ && iconOnly && !label) {
		// biome-ignore lint/suspicious/noConsole: Development-time accessibility guidance
		console.warn(
			'Chip: `accessibilityLabel` or `aria-label` is required when `iconOnly` is true.'
		);
	}

	return (
		<Pressable
			ref={ref}
			accessibilityRole="button"
			accessibilityLabel={label}
			accessibilityState={accessibilityState}
			testID={testID}
			disabled={isDisabled || !isInteractive}
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...rest}
		>
			<Animated.View
				style={[
					chipStyles.container,
					animatedStyle,
					style as StyleProp<ViewStyle>,
				]}
			>
				{renderLeftIcon()}
				{iconOnly ? children : resolvedChildren}
				{renderRightIcon()}
			</Animated.View>
		</Pressable>
	);
});

Chip.displayName = 'Chip';
