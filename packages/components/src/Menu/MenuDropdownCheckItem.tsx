import { useCallback, useEffect, useState } from 'react';
import { type GestureResponderEvent, Pressable, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { Checkbox } from '../Checkbox';
import { useMenuContext } from './Menu.context';
import type { MenuDropdownCheckItemProps } from './Menu.types';

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

const styles = StyleSheet.create((theme) => {
	return {
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: theme.spacing[4],
			paddingVertical: theme.spacing[4],
			gap: theme.spacing[4],
			borderCurve: 'continuous',
			borderRadius: theme.rounded.md,

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				checked: {
					true: {},
					false: {},
				},
				pressed: {
					true: {
						backgroundColor: theme.colors.neutral.content_2,
					},
					false: {},
				},
				// reanimated opacity is only applied to the container by default because of the reanimated shared value's limitation, so we don't need to set it here
				disabled: {
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

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				checked: {
					true: {},
					false: {},
				},
			},
		},
		left: {
			flexShrink: 0,
		},
		right: {
			flexShrink: 0,
		},
	};
});

// ============================================================================
// MenuDropdownCheckItem Component
// ============================================================================

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MenuDropdownCheckItem = ({
	checked = false,
	onCheckedChange,
	colorScheme = 'primary',
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
}: MenuDropdownCheckItemProps) => {
	const context = useMenuContext();
	const [pressed, setPressed] = useState(false);
	const isDisabled = disabled ?? false;

	// Animation values
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	styles.useVariants({
		colorScheme,
		checked,
		pressed,
		disabled: isDisabled,
	});


	const isString = typeof children === 'string';

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	const handlePressIn = useCallback(
		(
			event: GestureResponderEvent
		) => {
		if (!isDisabled) {
			scale.value = withSpring(0.96, PRESS_SPRING_CONFIG);
			opacity.value = withSpring(0.7, PRESS_SPRING_CONFIG);
			setPressed(true);
		}
		onPressIn?.(event);
	},
	[isDisabled, onPressIn, scale, opacity]
	);

	const handlePressOut = useCallback(
		(
			event: GestureResponderEvent
		) => {
		scale.value = withSpring(1, PRESS_SPRING_CONFIG);
		opacity.value = withSpring(1, PRESS_SPRING_CONFIG);
		setPressed(false);
		onPressOut?.(event);
	},
	[onPressOut, scale, opacity]
	);

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
		if (isDisabled) {
			event.preventDefault?.();
			return;
		}

		const nextChecked = !checked;
		onCheckedChange?.(nextChecked);
		onPress?.(event);

		if (context?.closeOnSelect) {
			context.close();
		}
	},
	[isDisabled, checked, onCheckedChange, onPress, context]
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
			accessibilityState={{ ...accessibilityState, checked, disabled: isDisabled }}
		>
			{/* Checkbox (flat variant for ghost-like appearance) */}
			<Checkbox
				checked={checked}
				colorScheme={colorScheme}
				variant="flat"
				size="sm"
				rounded="md"
				disabled={true}
				accessibilityRole="checkbox"
				accessibilityState={{ checked, disabled: isDisabled }}
				onPress={handlePress}
			/>

			{left && <View style={styles.left}>{left}</View>}

			{/* Content */}
			<View style={styles.content}>
				{isString ? <Text style={styles.text}>{children}</Text> : children}
			</View>

			{right && <View style={styles.right}>{right}</View>}
		</AnimatedPressable>
	);
};

MenuDropdownCheckItem.displayName = 'Menu.DropdownCheckItem';
