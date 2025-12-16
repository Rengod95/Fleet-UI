import { X } from 'lucide-react-native';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import {
	type GestureResponderEvent,
	Pressable,
	Text,
	View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import type { ToastProps } from './Toast.types';

const DEFAULT_THRESHOLD = 48;
const SPRING_CONFIG = { stiffness: 1200, damping: 70, mass: 3 };
const INITIAL_TRANSLATE_Y = 144;

const AnimatedView = Animated.createAnimatedComponent(View);

export const Toast: React.FC<ToastProps> = ({
	visible,
	title,
	description = null,
	icon,
	colorScheme = 'neutral',
	variant = 'filled',
	size = 'md',
	rounded = 'md',
	position = 'bottom',
	closable = true,
	dragToDismiss = true,
	closeThreshold = DEFAULT_THRESHOLD,
	action,
	onRequestClose,
	onPress,
	onExited,
	testID,
	...rest
}) => {
	const { theme } = useUnistyles();

	// variant hooks
	styles.useVariants({
		colorScheme,
		variant,
		size,
		rounded,
		position,
	});

	const direction = position === 'top' ? -1 : 1;

	const translateY = useSharedValue(direction * INITIAL_TRANSLATE_Y);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0);

	useEffect(() => {
		if (visible) {
			opacity.value = 1;
			translateY.value = 0;
			scale.value = 1;
		} else {
			translateY.value = direction * INITIAL_TRANSLATE_Y;
			opacity.value = 0;
			scale.value = 0;
		}
	}, [visible, direction, onExited]);

	const handleBodyPress = (event: GestureResponderEvent) => {
		if (!visible) return;
		onPress?.();
		event.stopPropagation();
	};

	const handleClose = () => {
		if (!visible) return;

		translateY.value = direction * INITIAL_TRANSLATE_Y;
		opacity.value = 0;
		scale.value = 0;

		setTimeout(() => {
			onRequestClose();
		}, 300);
	};

	const panGesture = useMemo(
		() =>
			Gesture.Pan()
				.enabled(dragToDismiss)
				.activeOffsetY(position === 'top' ? [-2, 2] : [-2, 2])
				.onUpdate((event) => {
					const displacement = event.translationY * direction;
					const clamped = Math.max(0, displacement);
					translateY.value = clamped * direction;
					const progress = Math.min(1, clamped / closeThreshold);
					opacity.value = interpolate(
						progress,
						[0, 1],
						[1, 0.2],
						Extrapolation.CLAMP
					);
					scale.value = interpolate(
						progress,
						[0, 1],
						[1, 0],
						Extrapolation.CLAMP
					);
				})
				.onEnd((event) => {
					const displacement = event.translationY * direction;
					const velocity = event.velocityY * direction;
					const shouldClose = displacement > closeThreshold || velocity > 500;

					if (shouldClose) {
						translateY.value = withSpring(direction * 80, SPRING_CONFIG, () => {
							runOnJS(handleClose)();
						});
						opacity.value = withSpring(0, SPRING_CONFIG);
					} else {
						translateY.value = withSpring(0, SPRING_CONFIG);
						opacity.value = withSpring(1, SPRING_CONFIG);
					}
				})
				.onFinalize(() => {
					translateY.value = withSpring(0, SPRING_CONFIG);
					opacity.value = withSpring(1, SPRING_CONFIG);
				}),
		[
			closeThreshold,
			direction,
			dragToDismiss,
			handleClose,
			opacity,
			position,
			translateY,
		]
	);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: withDelay(30, withSpring(opacity.value, SPRING_CONFIG)),
		transform: [
			{ translateY: withSpring(translateY.value, SPRING_CONFIG) },
			{ scale: withSpring(scale.value, SPRING_CONFIG) },
		],
	}));

	const hasText = title || description;

	if (!visible) return null;

	return (
		<GestureDetector gesture={panGesture}>
			<AnimatedView
				style={[styles.card, animatedStyle]}
				accessibilityRole="alert"
				testID={testID}
				{...rest}
			>
				<Pressable
					style={styles.pressable}
					onPress={handleBodyPress}
					hitSlop={8}
					testID={testID ? `${testID}-body` : undefined}
				>
					{icon ? <View style={styles.icon}>{icon}</View> : null}
					{hasText ? (
						<View style={styles.texts}>
							{title ? <Text style={styles.title}>{title}</Text> : null}
							{description ? (
								<Text style={styles.description}>{description}</Text>
							) : null}
						</View>
					) : null}
					{action ? (
						<Pressable
							style={styles.action}
							onPress={action.onPress}
							hitSlop={8}
							testID={testID ? `${testID}-action` : undefined}
						>
							<Text style={styles.actionLabel}>{action.label}</Text>
						</Pressable>
					) : null}
					{closable ? (
						<View style={styles.close}>
							<IconButton
								variant="ghost"
								size="md"
								colorScheme="neutral"
								onPress={handleClose}
								aria-label="close toast"
								testID={testID ? `${testID}-close` : undefined}
								icon={
									<Icon
										icon={X}
										size={size}
										colorScheme="neutral"
										strokeWidth={2}
									/>
								}
							/>
						</View>
					) : null}
				</Pressable>
			</AnimatedView>
		</GestureDetector>
	);
};

const styles = StyleSheet.create((theme) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	const cardCompound = paletteEntries.flatMap(([scheme, palette]) => {
		const hasSolid = theme.utils.paletteHasSolid(palette);

		return [
			{
				colorScheme: scheme,
				variant: 'filled' as const,
				styles: {
					backgroundColor: hasSolid ? palette.solid : palette.content_inversed,
					borderColor: 'transparent',
				},
			},
			{
				colorScheme: scheme,
				variant: 'flat' as const,
				styles: {
					backgroundColor: hasSolid ? palette.content_3 : palette.content_1,
					borderColor: palette.border_subtle,
				},
			},
			{
				colorScheme: scheme,
				variant: 'faded' as const,
				styles: {
					backgroundColor: hasSolid ? palette.content_3 : palette.content_1,
					borderWidth: 1,
					borderColor: hasSolid
						? palette.border_default
						: palette.border_subtle,
				},
			},
		];
	});

	const titleCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		const hasSolid = theme.utils.paletteHasSolid(palette);

		return [
			{
				colorScheme: scheme,
				variant: 'filled' as const,
				styles: { color: hasSolid ? palette.text_1 : palette.text_inversed },
			},
		];
	});

	const descCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		const hasSolid = theme.utils.paletteHasSolid(palette);

		return [
			{
				colorScheme: scheme,
				variant: 'filled' as const,
				styles: { color: hasSolid ? palette.text_2 : palette.text_inversed },
			},
		];
	});

	const actionCompound = paletteEntries.flatMap(([scheme, palette]) => {
		return [
			{
				colorScheme: scheme,
				variant: 'filled' as const,
				styles: { color: palette.text_1 },
			},
		];
	});

	return {
		card: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: theme.colors.neutral.content_2,
			borderRadius: theme.rounded.lg,
			borderCurve: 'continuous',
			paddingHorizontal: theme.spacing[5],
			paddingVertical: theme.spacing[4],
			maxWidth: '100%',
			width: '100%',
			minWidth: '70%',
			boxShadow: theme.shadows.toast,

			variants: {
				colorScheme: {
					neutral: {},
					primary: {},
					success: {},
					warning: {},
					error: {},
					info: {},
				},
				variant: {
					filled: {},
					flat: {},
					faded: {},
				},
				size: {
					sm: {
						paddingHorizontal: theme.spacing[4],
						paddingVertical: theme.spacing[3],
						gap: theme.spacing[3],
					},
					md: {
						gap: theme.spacing[4],
					},
					lg: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[8],
						gap: theme.spacing[4],
					},
				},
				rounded: {
					none: { borderRadius: theme.rounded.none },
					xs: { borderRadius: theme.rounded.md },
					sm: { borderRadius: theme.rounded.lg },
					md: { borderRadius: theme.rounded.xl },
					lg: { borderRadius: theme.rounded._2xl },
					full: { borderRadius: theme.rounded.full },
				},

				position: {
					top: {},
					bottom: {},
				},
			},
			compoundVariants: cardCompound,
		},

		pressable: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing[4],
		},

		icon: {
			width: theme.spacing[8],
			height: theme.spacing[8],
			alignItems: 'center',
			justifyContent: 'center',
		},

		texts: {
			flex: 1,
			gap: theme.spacing[1],
		},

		title: {
			...theme.typography.h6Strong,
			color: theme.colors.neutral.text_1,
			variants: {
				size: {
					sm: {
						...theme.typography.body1Strong,
					},
					md: {
						...theme.typography.h6Strong,
					},
					lg: {
						...theme.typography.h6Strong,
					},
				},
				colorScheme: {
					neutral: {},
					primary: {},
					success: {},
					warning: {},
					error: {},
					info: {},
				},
				variant: {
					filled: {
						color: theme.colors.neutral.text_1,
					},
					flat: {
						color: theme.colors.neutral.text_2,
					},
					faded: {
						color: theme.colors.neutral.text_2,
					},
				},
			},
			compoundVariants: titleCompoundVariants,
		},

		description: {
			color: theme.colors.neutral.text_2,
			variants: {
				colorScheme: {
					neutral: {},
					primary: {},
					success: {},
					warning: {},
					error: {},
					info: {},
				},
				size: {
					sm: {
						...theme.typography.body3,
					},
					md: {
						...theme.typography.body2,
					},
					lg: {
						...theme.typography.body2,
					},
				},
				variant: {
					filled: {
						color: theme.colors.neutral.text_2,
					},
					flat: {
						color: theme.colors.neutral.text_2,
					},
					faded: {
						color: theme.colors.neutral.text_2,
					},
				},
			},
			compoundVariants: descCompoundVariants,
		},

		action: {},

		actionLabel: {
			...theme.typography.body2Strong,
			color: theme.colors.primary.text_1,
			variants: {
				colorScheme: {
					neutral: {},
					primary: {},
					success: {},
					warning: {},
					error: {},
					info: {},
				},
				variant: {
					filled: {},
					flat: {},
					faded: {},
				},
			},
			compoundVariants: actionCompound,
		},

		close: {
			marginLeft: theme.spacing[2],
		},
	};
});
