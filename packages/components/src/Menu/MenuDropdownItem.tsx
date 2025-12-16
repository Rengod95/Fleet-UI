import { useCallback, useEffect, useState } from 'react';
import { type GestureResponderEvent, Pressable, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useMenuContext } from './Menu.context';
import type { MenuDropdownItemProps } from './Menu.types';

// ============================================================================
// Animation Config
// ============================================================================

const PRESS_SPRING_CONFIG = {
	stiffness: 1300,
	mass: 2,
	damping: 60,
} as const;

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: theme.spacing[4],
		paddingVertical: theme.spacing[4],
		gap: theme.spacing[4],
		borderCurve: 'continuous',
		borderRadius: theme.rounded.md,

		variants: {
			pressed: {
				true: {
					backgroundColor: theme.colors.neutral.content_2,
				},
				false: {},
			},
			disabled: {
				// reanimated opacity is only applied to the container by default because of the reanimated shared value's limitation, so we don't need to set it here
				true: {},
				false: {},
			},
		},
	},
	content: {
		flex: 1,
	},
	text: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_1,
	},
	left: {
		flexShrink: 0,
	},
	right: {
		flexShrink: 0,
	},
}));

// ============================================================================
// MenuDropdownItem Component
// ============================================================================

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MenuDropdownItem = ({
	left,
	right,
	children,
	disabled,
	onPress,
	onPressIn,
	onPressOut,
	accessibilityLabel,
	accessibilityState,
	style,
	...pressableProps
}: MenuDropdownItemProps) => {
	const context = useMenuContext();
	const [pressed, setPressed] = useState(false);
	const isDisabled = disabled ?? false;

	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	styles.useVariants({
		pressed,
		disabled: isDisabled,
	});

	const isString = typeof children === 'string';

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
		if (!isDisabled) {
			scale.value = withSpring(0.96, PRESS_SPRING_CONFIG);
			opacity.value = withSpring(0.7, PRESS_SPRING_CONFIG);
			setPressed(true);
		}
		onPressIn?.(event);
	},
	[isDisabled, onPressIn]
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
		scale.value = withSpring(1, PRESS_SPRING_CONFIG);
		opacity.value = withSpring(1, PRESS_SPRING_CONFIG);
		setPressed(false);
		onPressOut?.(event);
	},
	[onPressOut]
	);

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
		if (isDisabled) {
			event.preventDefault?.();
			return;
		}

		onPress?.(event);

		if (context?.closeOnSelect) {
			context.close();
		}
	},
	[isDisabled, onPress, context]
	);

	// Reanimated's Animated Style is overriding all included style attributes, so the opacity attribute is not working as expected.
	useEffect(() => {
		if(isDisabled) {
			opacity.value = 0.4;
		}
	}, [isDisabled]);

	return (
		<AnimatedPressable
			{...pressableProps}
			style={[styles.container, animatedStyle, style]}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
			disabled={isDisabled}
			accessibilityRole="menuitem"
			accessibilityLabel={
				accessibilityLabel || (isString ? children : undefined)
			}
			accessibilityState={{ ...accessibilityState, disabled: isDisabled }}
		>
			{left && <View style={styles.left}>{left}</View>}

			<View style={styles.content}>
				{isString ? <Text style={styles.text}>{children}</Text> : children}
			</View>

			{right && <View style={styles.right}>{right}</View>}
		</AnimatedPressable>
	);
};

MenuDropdownItem.displayName = 'Menu.DropdownItem';
