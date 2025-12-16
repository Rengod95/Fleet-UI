import { forwardRef, useCallback, useMemo } from 'react';
import {
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
import type { ActionButtonProps } from './ActionButton.types';

export const actionButtonStyles = StyleSheet.create((theme, _rt) => {

	const contentCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					styles: {
						backgroundColor: hasSolidColor ? palette.solid : palette.content_1,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: hasSolidColor ? palette.solid : palette.border_subtle,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					styles: {
						backgroundColor: palette.content_2,
					},
				},
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					styles: {
						backgroundColor: palette.content_2,
						borderColor: palette.content_4,
					},
				},
			];
		});

	return {
		rootContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.rounded.md,
			borderCurve: 'continuous',
			backgroundColor: 'transparent',

			variants: {
				extend: {
					true: {
						flex: 1,
						gap: theme.spacing[3],
					},
					false: {},
				},
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
					},
					flat: {
						backgroundColor: 'transparent',
					},
					faded: {
						backgroundColor: 'transparent',
					},
				},
				size: {
					xs: {
						gap: theme.spacing[1],
					},
					sm: {
						gap: theme.spacing[2],
					},
					md: {
						gap: theme.spacing[3],
					},
					lg: {
						gap: theme.spacing[4],
					},
					xl: {
						gap: theme.spacing[4],
					},
				},
				containerRounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
					xl: { borderRadius: theme.rounded.xl },
					full: { borderRadius: theme.rounded.full },
				},
				disabled: {
					true: {
						opacity: 0.6,
					},
				},
			},
		},
		contentContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.rounded.md,
			borderCurve: 'continuous',
			borderWidth: 0,
			backgroundColor: 'transparent',
			padding: theme.spacing[3],

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
						borderWidth: 1,
					},
					flat: {},
					faded: {
						borderWidth: 1,
					},
				},
				size: {
					xs: {
						minHeight: 40,
						minWidth: 40,
					},
					sm: {
						minHeight: 48,
						minWidth: 48,
					},
					md: {
						minHeight: 56,
						minWidth: 56,
					},
					lg: {
						minHeight: 64,
						minWidth: 64,
					},
					xl: {
						minHeight: 72,
						minWidth: 72,
					},
				},
				contentRounded: {
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
					md: { boxShadow: theme.shadows.md },
					lg: { boxShadow: theme.shadows.lg },
				},
			},
			compoundVariants: contentCompoundVariants,
		},
		titleText: {
			fontWeight: theme.text.fontWeight.medium,
			color: theme.colors.neutral.text_1,
			textAlign: 'center',

			variants: {
				size: {
					xs: {
						fontSize: theme.typography.caption1.fontSize,
						lineHeight: theme.typography.body3.lineHeight,
					},
					sm: {
						fontSize: theme.typography.body3.fontSize,
						lineHeight: theme.typography.body2.lineHeight,
					},
					md: {
						fontSize: theme.typography.body3.fontSize,
						lineHeight: theme.typography.body2.lineHeight,
					},
					lg: {
						fontSize: theme.typography.body3.fontSize,
						lineHeight: theme.typography.body3.lineHeight,
					},
					xl: {
						fontSize: theme.typography.body2.fontSize,
						lineHeight: theme.typography.body2.lineHeight,
					},
					extend: {
						fontSize: theme.typography.caption1.fontSize,
						lineHeight: theme.typography.caption1.lineHeight,
					},
				},
			},
		},
	};
});

// ============================================================================
// Animation Constants
// ============================================================================
const PRESS_IN_SPRING_CONFIG = {
	stiffness: 1500,
	damping: 60,
	mass: 3,
};

const PRESS_OUT_SPRING_CONFIG = {
	stiffness: 1500,
	damping: 60,
	mass: 3,
};

// ============================================================================
// Component
// ============================================================================
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ActionButton = forwardRef<View, ActionButtonProps>(
	(props, ref) => {
		const {
			colorScheme = 'neutral',
			variant = 'flat',
			size = 'md',
			extend = false,
			shadow = 'none',
			containerRounded = 'md',
			contentRounded = 'md',
			title,
			children,
			rootStyle,
			contentStyle,
			textStyle,
			accessibilityLabel,
			testID,
			disabled,
			onPress,
			onPressIn,
			onPressOut,
			...rest
		} = props;

		const isDisabled = Boolean(disabled);
		const scale = useSharedValue(1);

		actionButtonStyles.useVariants({
			colorScheme,
			size,
			extend,
			variant,
			containerRounded,
			contentRounded,
			shadow,
			disabled: isDisabled,
		});

		const accessibilityState = useMemo(() => ({
			disabled: isDisabled,
		}), [isDisabled]);

		const animatedStyle = useAnimatedStyle(() => ({
			transform: [
				{
					scale: scale.value,
				},
			],
		}));

		const handlePressIn = useCallback(
			(event: GestureResponderEvent) => {
				if (isDisabled) return;
				scale.value = withSpring(0.86, PRESS_IN_SPRING_CONFIG);
				onPressIn?.(event);
			},
			[isDisabled, onPressIn]
		);

		const handlePressOut = useCallback(
			(event: GestureResponderEvent) => {
				scale.value = withSpring(1, PRESS_OUT_SPRING_CONFIG);
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

		if (__DEV__ && !title && !accessibilityLabel) {
			// biome-ignore lint/suspicious/noConsole: Development-time accessibility guidance
			console.warn(
				'ActionButton: `accessibilityLabel` is required when `title` is not provided.'
			);
		}

		return (
			<AnimatedPressable
				ref={ref}
				accessibilityRole="button"
				accessibilityLabel={accessibilityLabel || title}
				accessibilityState={accessibilityState}
				testID={testID}
				disabled={isDisabled}
				style={[actionButtonStyles.rootContainer, animatedStyle, rootStyle]}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				{...rest}
			>
				<View style={[actionButtonStyles.contentContainer, contentStyle]}>
					{children}
				</View>
				{title && (
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={[actionButtonStyles.titleText, textStyle]}
					>
						{title}
					</Text>
				)}
			</AnimatedPressable>
		);
	}
);

ActionButton.displayName = 'ActionButton';
