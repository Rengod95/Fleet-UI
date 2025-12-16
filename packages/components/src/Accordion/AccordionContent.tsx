import { forwardRef, isValidElement, useCallback } from 'react';
import { type LayoutChangeEvent, Text, View } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import {
	useAccordionContext,
	useAccordionItemContext,
} from './Accordion.context';
import type { AccordionContentProps } from './Accordion.types';

export const accordionContentStyles = StyleSheet.create((theme) => {
	return {
		wrapper: {
			width: '100%',
			overflow: 'hidden',
		},
		container: {
			width: '100%',
			position: 'absolute',
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
						paddingTop: theme.spacing[2],
						paddingBottom: theme.spacing[6],
					},
					md: {
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[2],
						paddingBottom: theme.spacing[6],
					},
					lg: {
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[2],
						paddingBottom: theme.spacing[6],
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
				},
			},
		},
		text: {
			color: theme.colors.neutral.text_4,

			variants: {
				size: {
					sm: {
						...theme.typography.caption1,
						color: theme.colors.neutral.text_4,
					},
					md: {
						...theme.typography.body3,
						color: theme.colors.neutral.text_4,
					},
					lg: {
						...theme.typography.body2,
						color: theme.colors.neutral.text_4,
					},
				},
			},
		},
		// Hidden content for measuring height
		measureContainer: {
			position: 'absolute',
			opacity: 0,
			pointerEvents: 'none',
		},
	};
});

// ============================================================================
// Animation Constants
// ============================================================================

const TIMING_CONFIG = {
	duration: 330,
	easing: Easing.bezier(0.24, 0.91, 0.42, 0.93),
};
// ============================================================================
// Component
// ============================================================================

export const AccordionContent = forwardRef<View, AccordionContentProps>(
	(props, ref) => {
		const { children, style, ...viewProps } = props;

		const { variant, colorScheme, shadow, size, rounded } =
			useAccordionContext();

		const { isExpanded } = useAccordionItemContext();

		const animatedHeight = useSharedValue(0);
		// derived value for performance optimization to serializing large object(isExpanded) on every frame.
		const derivedHeight = useDerivedValue(() =>
			withTiming(animatedHeight.value * (isExpanded ? 1 : 0), TIMING_CONFIG)
		);
		const derivedOpacity = useDerivedValue(() =>
			withTiming(isExpanded ? 1 : 0, TIMING_CONFIG)
		);

		accordionContentStyles.useVariants({
			colorScheme,
			variant,
			size,
			rounded,
			shadow,
		});

		const animatedStyle = useAnimatedStyle(() => {
			return {
				height: derivedHeight.value,
				opacity: derivedOpacity.value,
			};
		});

		const handleLayout = useCallback(
			(event: LayoutChangeEvent) => {
				const { height } = event.nativeEvent.layout;
				animatedHeight.value = height;
			},
			[animatedHeight]
		);

		// Render children - wrap string in Text
		const renderContent = () => {
			const resolvedChildren = isValidElement(children) ? (
				children
			) : children !== null ? (
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={accordionContentStyles.text}
				>
					{String(children)}
				</Text>
			) : null;

			return resolvedChildren;
		};

		return (
			<Animated.View
				ref={ref}
				style={[accordionContentStyles.wrapper, animatedStyle]}
			>
				{/* Actual visible content */}
				<View
					onLayout={handleLayout}
					style={[accordionContentStyles.container, style]}
					{...viewProps}
				>
					{renderContent()}
				</View>
			</Animated.View>
		);
	}
);

AccordionContent.displayName = 'AccordionContent';
