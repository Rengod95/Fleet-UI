import { ChevronDown } from 'lucide-react-native';
import { forwardRef, isValidElement, useCallback, useEffect, useMemo } from 'react';
import { type GestureResponderEvent, Pressable, Text, View } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import {
	useAccordionContext,
	useAccordionItemContext,
} from './Accordion.context';
import type { AccordionHeaderProps } from './Accordion.types';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const accordionHeaderStyles = StyleSheet.create((theme) => {
	return {
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',

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
					ghost: {
						backgroundColor: 'transparent',
					},
					outlined: {
						backgroundColor: 'transparent',
					},
					flat: {},
					faded: {},
				},
				size: {
					sm: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[4],
						minHeight: 36,
					},
					md: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[5],
						minHeight: 48,
					},
					lg: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[6],
						minHeight: 48,
					},
				},
				rounded: {
					none: {
						borderRadius: 0,
					},
					sm: {
						borderRadius: theme.spacing[2],
					},
					md: {
						borderRadius: theme.spacing[2],
					},
					lg: {
						borderRadius: theme.spacing[2],
					},
					full: {
						borderRadius: theme.spacing[2],
					},
				},
				shadow: {
					none: {
						shadowColor: 'transparent',
					},
					sm: {
						shadowColor: 'transparent',
					},
					md: {
						shadowColor: 'transparent',
					},
					lg: {
						shadowColor: 'transparent',
					},
					full: {
						shadowColor: 'transparent',
					},
				},
				expanded: {
					true: {},
					false: {},
				},
				disabled: {
					true: {
						opacity: 0.5,
					},
					false: {},
				},
			},
		},
		content: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing[2],
		},
		text: {
			color: theme.colors.neutral.text_2,
			flex: 1,
			variants: {
				size: {
					sm: {
						...theme.typography.body3,
						fontWeight: 500,
						lineHeight: theme.typography.caption1.lineHeight,
					},
					md: {
						...theme.typography.body1,
						fontWeight: 500,
						lineHeight: theme.typography.body2.lineHeight,
					},
					lg: {
						...theme.typography.h6,
						fontWeight: 500,
						lineHeight: theme.typography.body1.lineHeight,
					},
				},
			},
		},
		iconContainer: {
			justifyContent: 'center',
			alignItems: 'center',
		},
		leftIcon: {
			marginRight: theme.spacing[2],
		},
	};
});

// ============================================================================
// Animation Constants
// ============================================================================

const TIMING_CONFIG = {
	duration: 250,
	easing: Easing.out(Easing.cubic),
};

const SPRING_CONFIG = {
	stiffness: 1500,
	mass: 2,
	damping: 120,
};

// ============================================================================
// Component
// ============================================================================

export const AccordionHeader = forwardRef<View, AccordionHeaderProps>(
	(props, ref) => {
		const {
			leftIcon,
			rightIcon,
			children,
			style,
			onPress,
			onPressIn,
			onPressOut,
			hitSlop,
			accessibilityLabel,
			...viewProps
		} = props;

		const { toggleItem, variant, colorScheme, shadow, size, rounded } =
			useAccordionContext();
		const { value, isExpanded, isDisabled } = useAccordionItemContext();

		accordionHeaderStyles.useVariants({
			colorScheme,
			variant,
			size,
			rounded,
			shadow,
			expanded: isExpanded,
			disabled: isDisabled,
		});

		// Chevron rotation animation
		const rotation = useSharedValue(isExpanded ? 180 : 0);
		const scale = useSharedValue(1);
		const opacity = useSharedValue(1);

		const iconColor = useAnimatedVariantColor(accordionHeaderStyles.text, 'color');
		// Icon size based on accordion size
		const iconSize = useMemo(() => size === 'sm' ? 16 : size === 'lg' ? 24 : 20, [size]);

		const resolvedAccessibilityLabel =
			accessibilityLabel ??
			(typeof children === 'string' ? children : undefined);

		const chevronAnimatedStyle = useAnimatedStyle(() => ({
			transform: [{ rotate: `${rotation.value}deg` }],
		}));

		const containerAnimatedStyle = useAnimatedStyle(() => ({
			transform: [
				{
					scale: scale.value,
				},
			],
			opacity: opacity.value,
		}));

		const handlePress = useCallback(
			(event: GestureResponderEvent) => {
				if (isDisabled) {
					event?.preventDefault?.();
					return;
				}

				onPress?.(event);

				// respect defaultPrevented if provided
				if ((event as { defaultPrevented?: boolean })?.defaultPrevented) {
					return;
				}

				toggleItem(value);
			},
			[isDisabled, onPress, toggleItem, value]
		);

		const handlePressIn = useCallback(
			(event: GestureResponderEvent) => {
				if (!isDisabled) {
					scale.value = withSpring(0.92, SPRING_CONFIG)
					opacity.value = withSpring(0.84, SPRING_CONFIG)
				}
				onPressIn?.(event);
			},
			[isDisabled, onPressIn]
		);

		const handlePressOut = useCallback(
			(event: GestureResponderEvent) => {
				if (!isDisabled) {
					scale.value = withSpring(1, SPRING_CONFIG)
					opacity.value = withSpring(1, SPRING_CONFIG)
				}
				onPressOut?.(event);
			},
			[isDisabled, onPressOut]
		);

		// Render right icon (default: ChevronDown with rotation)
		const renderRightIcon = useCallback(() => {
			if (rightIcon === false) return null;

			if (rightIcon) {
				return (
					<Animated.View style={chevronAnimatedStyle}>
						{rightIcon}
					</Animated.View>
				);
			}

			return (
				<Animated.View
					style={[accordionHeaderStyles.iconContainer, chevronAnimatedStyle]}
				>
					<ChevronDown size={iconSize} color={iconColor.value} strokeWidth={2} />
				</Animated.View>
			);
		}, [rightIcon, iconSize, iconColor.value]);

		// Render children - wrap string in Text
		const renderContent = () => {
			const resolvedChildren = isValidElement(children) ? (
				children
			) : children != null ? (
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={accordionHeaderStyles.text}
				>
					{String(children)}
				</Text>
			) : null;

			return resolvedChildren;
		};

		// Chevron rotation animation
		useEffect(() => {
			rotation.value = withTiming(isExpanded ? 180 : 0, TIMING_CONFIG);
		}, [isExpanded]);

		return (
			<AnimatedPressable
				ref={ref}
				style={[
					accordionHeaderStyles.container,
					containerAnimatedStyle,
					style,
				]}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onPress={handlePress}
				disabled={isDisabled}
				hitSlop={hitSlop ?? { top: 8, bottom: 8, left: 8, right: 8 }}
				accessibilityRole="button"
				accessibilityLabel={resolvedAccessibilityLabel}
				accessibilityState={{
					expanded: isExpanded,
					disabled: isDisabled,
				}}
				{...viewProps}
			>
				<View style={accordionHeaderStyles.content}>
					{leftIcon && (
						<View style={accordionHeaderStyles.leftIcon}>{leftIcon}</View>
					)}
					{renderContent()}
				</View>
				{renderRightIcon()}
			</AnimatedPressable>
		);
	}
);

AccordionHeader.displayName = 'AccordionHeader';
