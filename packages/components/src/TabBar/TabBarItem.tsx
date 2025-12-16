import { useCallback } from 'react';
import {
	type LayoutChangeEvent,
	Pressable,
	type PressableProps,
} from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { runOnUI } from 'react-native-worklets';
import type { TabBarItemProps } from './TabBar.types';

// ========================================================================
// Constants
// ========================================================================

const DEFAULT_HIT_SLOP: NonNullable<PressableProps['hitSlop']> = {
	top: 8,
	right: 8,
	bottom: 8,
	left: 8,
};

// ========================================================================
// Component
// ========================================================================

export function TabBarItem({
	index,
	dragProgress,
	item,
	size,
	variant,
	textStyle,
	colorScheme,
	isSelected,
	accessibilityLabel,
	disabled = false,
	hitSlop,
	onPressItem,
	onItemLayout,
	onTextLayout,
}: TabBarItemProps) {
	const theme = useAnimatedTheme();
	styles.useVariants({ size, colorScheme });

	const activeProgress = useDerivedValue(() => {
		return interpolate(
			dragProgress.value,
			[index - 1, index, index + 1],
			[0, 1, 0],
			'clamp'
		);
	}, [index]);

	// Calculate the exact active state
	const isActive = useDerivedValue(() => {
		return Math.round(dragProgress.value) === index;
	}, [index]);

	// Apply the text style
	const textStyleAnimated = useAnimatedStyle(() => {
		let result: any = {};

		// filled variant: use the solid color of the colorScheme for the active tab
		if (variant === 'filled') {
			if (colorScheme === 'neutral') {
				result = {
					color: isActive.value ? theme.value.colors.neutral.text_inversed : theme.value.colors.neutral.text_2,
					opacity: 0.5 + activeProgress.value * 0.5,
				};
			} else {
				result = {
					color: isActive.value
						? theme.value.colors[colorScheme]?.text_1 ||
							theme.value.colors.neutral.text_1
						: theme.value.colors.neutral.text_2,
					opacity: interpolate(
						activeProgress.value,
						[0, 1, 0],
						[0.8, 1, 0.8],
						'clamp'
					),
				};
			}
		} else if (colorScheme === 'neutral') {
			result = {
				color: theme.value.colors.neutral.text_1,
				opacity: 0.5 + activeProgress.value * 0.5,
			};
		} else {
			result = {
				color: isActive.value
					? theme.value.colors[colorScheme]?.text_1 ||
						theme.value.colors.neutral.text_1
					: theme.value.colors.neutral.text_2,
				opacity: interpolate(
					activeProgress.value,
					[0, 1, 0],
					[0.8, 1, 0.8],
					'clamp'
				),
			};
		}

		return result;
	});

	const animatedItemStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				dragProgress.value,
				[index - 1, index, index + 1],
				[0.7, 1, 0.7],
				'clamp'
			),
		};
	});

	const handleLayout = useCallback(
		(e: LayoutChangeEvent) => {
			runOnUI(onItemLayout)(index, e.nativeEvent.layout);
		},
		[index, onItemLayout]
	);

	const handleTextLayout = useCallback(
		(e: LayoutChangeEvent) => {
			runOnUI(onTextLayout)(index, e.nativeEvent.layout);
		},
		[index, onTextLayout]
	);

	const isStringItem = typeof item === 'string';

	return (
		<Animated.View style={{ flexGrow: 1 }} onLayout={handleLayout}>
			<Pressable
				testID={`selector-${index}`}
				style={styles.item}
				onPress={() => onPressItem(index)}
				accessibilityRole="tab"
				accessibilityState={{ selected: isSelected, disabled }}
				accessibilityLabel={accessibilityLabel}
				disabled={disabled}
				hitSlop={hitSlop ?? DEFAULT_HIT_SLOP}
			>
				<Animated.View style={[styles.itemInner, animatedItemStyle]}>
					{isStringItem ? (
						<Animated.Text
							testID={`${item}`}
							style={[styles.itemText, textStyleAnimated, textStyle]}
							onLayout={handleTextLayout}
						>
							{item}
						</Animated.Text>
					) : (
						<Animated.View
							onLayout={handleTextLayout}
							style={[styles.itemText, textStyleAnimated]}
						>
							{item}
						</Animated.View>
					)}
				</Animated.View>
			</Pressable>
		</Animated.View>
	);
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => {
	return {
		item: {
			flexGrow: 1,
			flexShrink: 0,
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center',

			variants: {
				size: {
					xs: {
						paddingHorizontal: theme.spacing[3],
					},
					sm: {
						paddingHorizontal: theme.spacing[4],
					},
					md: {
						paddingHorizontal: theme.spacing[4],
					},
					lg: {
						paddingHorizontal: theme.spacing[5],
					},
					xl: {
						paddingHorizontal: theme.spacing[5],
					},
				},
			},
		},

		itemInner: {
			alignItems: 'center',
			justifyContent: 'center',
			flexGrow: 1,
			flexShrink: 0,
		},

		itemText: {
			textAlign: 'center',
			fontWeight: 'bold',
			color: theme.colors.neutral.text_2,
			zIndex: 10,

			variants: {
				size: {	
					xs: { ...theme.typography.caption1, fontWeight: theme.text.fontWeight.semibold },
					sm: { ...theme.typography.caption1, fontWeight: theme.text.fontWeight.semibold },
					md: { ...theme.typography.body3, fontWeight: theme.text.fontWeight.semibold },
					lg: { ...theme.typography.body3, fontWeight: theme.text.fontWeight.semibold },
					xl: { ...theme.typography.body2, fontWeight: theme.text.fontWeight.semibold },
				},
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					warning: {},
					success: {},
					info: {},
				},
			},
		},
	};
});
