import { forwardRef, useCallback } from 'react';
import {
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
import type {
	ItemActionsProps,
	ItemContentProps,
	ItemDescriptionProps,
	ItemFooterProps,
	ItemHeaderProps,
	ItemMediaProps,
	ItemMediaVariant,
	ItemProps,
	ItemTitleProps,
} from './Item.types';

// ============================================================================
// Animation Constants
// ============================================================================

const SPRING_CONFIG = {
	stiffness: 1400,
	damping: 70,
	mass: 2,
};

// ============================================================================
// Item Main Component
// ============================================================================

export const Item = forwardRef<View, ItemProps>((props, ref) => {
	const {
		colorScheme = 'neutral',
		variant = 'flat',
		rounded = 'md',
		shadow = 'none',
		size = 'md',
		children,
		style,
		onPress,
		onPressIn: externalOnPressIn,
		onPressOut: externalOnPressOut,
		disabled = false,
		...restProps
	} = props;

	itemStyles.useVariants({ colorScheme, variant, rounded, shadow, size });

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

	const handlePressIn = useCallback(
		(event: any) => {
			scale.value = withSpring(0.96, SPRING_CONFIG);
			opacity.value = withSpring(0.7, SPRING_CONFIG);
			externalOnPressIn?.(event);
		},
		[scale, externalOnPressIn]
	);

	const handlePressOut = useCallback(
		(event: any) => {
			scale.value = withSpring(1, SPRING_CONFIG);
			opacity.value = withSpring(1, SPRING_CONFIG);
			externalOnPressOut?.(event);
		},
		[scale, externalOnPressOut]
	);

	return (
		<Pressable
			ref={ref}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			disabled={disabled}
			{...restProps}
		>
			<Animated.View style={[itemStyles.container, animatedStyle, style]}>
				{children}
			</Animated.View>
		</Pressable>
	);
});

Item.displayName = 'Item';

// ============================================================================
// ItemMedia Component
// ============================================================================

export const ItemMedia = forwardRef<View, ItemMediaProps>((props, ref) => {
	const {
		variant = 'filled',
		verticalAlign = 'center',
		mediaType = 'icon',
		size = 'md',
		children,
		style,
		...restProps
	} = props;

	itemStyles.useVariants({ variant, verticalAlign, size });

	return (
		<View ref={ref} style={[itemStyles.media(mediaType), style]} {...restProps}>
			{children}
		</View>
	);
});

ItemMedia.displayName = 'ItemMedia';

// ============================================================================
// ItemContent Component
// ============================================================================

export const ItemContent = forwardRef<View, ItemContentProps>(
	(props, ref) => {
		const { children, style, ...restProps } = props;

		return (
			<View ref={ref} style={[itemStyles.content, style]} {...restProps}>
				{children}
			</View>
		);
	}
);

ItemContent.displayName = 'ItemContent';

// ============================================================================
// ItemTitle Component
// ============================================================================

export const ItemTitle = forwardRef<Text, ItemTitleProps>((props, ref) => {
	const { children, style, size = 'md', ...restProps } = props;

	itemStyles.useVariants({ size });

	return (
		<Text ref={ref} style={[itemStyles.title, style]} {...restProps}>
			{children}
		</Text>
	);
});

ItemTitle.displayName = 'ItemTitle';

// ============================================================================
// ItemDescription Component
// ============================================================================

export const ItemDescription = forwardRef<Text, ItemDescriptionProps>(
	(props, ref) => {
		const { children, style, size = 'md', ...restProps } = props;

		itemStyles.useVariants({ size });

		return (
			<Text ref={ref} style={[itemStyles.description, style]} {...restProps}>
				{children}
			</Text>
		);
	}
);

ItemDescription.displayName = 'ItemDescription';

// ============================================================================
// ItemActions Component
// ============================================================================

export const ItemActions = forwardRef<View, ItemActionsProps>(
	(props, ref) => {
		const { children, style, ...restProps } = props;

		return (
			<View ref={ref} style={[itemStyles.actions, style]} {...restProps}>
				{children}
			</View>
		);
	}
);

ItemActions.displayName = 'ItemActions';

// ============================================================================
// ItemHeader Component
// ============================================================================

export const ItemHeader = forwardRef<View, ItemHeaderProps>((props, ref) => {
	const { children, style, ...restProps } = props;

	return (
		<View ref={ref} style={[itemStyles.header, style]} {...restProps}>
			{children}
		</View>
	);
});

ItemHeader.displayName = 'ItemHeader';

// ============================================================================
// ItemFooter Component
// ============================================================================

export const ItemFooter = forwardRef<View, ItemFooterProps>((props, ref) => {
	const { children, style, ...restProps } = props;

	return (
		<View ref={ref} style={[itemStyles.footer, style]} {...restProps}>
			{children}
		</View>
	);
});

ItemFooter.displayName = 'ItemFooter';

// ============================================================================
// Styles
// ============================================================================

export const itemStyles = StyleSheet.create((theme, _rt) => {
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
							? palette.content_2
							: palette.content_2,
					},
				},
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_1,
						borderColor: palette.border_subtle,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_1,
					},
				},
				{
					colorScheme: scheme,
					variant: 'fade' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.content_3
							: palette.content_2,
						borderColor: palette.border_subtle,
					},
				},
			];
		});

	return {
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: 'transparent',
			borderCurve: 'continuous',

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					warning: {},
					success: {},
					info: {},
				},
				size: {
					sm: {
						paddingHorizontal: theme.spacing[3],
						paddingVertical: theme.spacing[3],
						columnGap: theme.spacing[3],
					},
					md: {
						paddingHorizontal: theme.spacing[3] + 2,
						paddingVertical: theme.spacing[3] + 2,
						columnGap: theme.spacing[3],
					},
					lg: {
						paddingHorizontal: theme.spacing[3] + 2,
						paddingVertical: theme.spacing[3] + 2,
						columnGap: theme.spacing[3] + 2,
					},
				},
				variant: {
					filled: { borderWidth: 0 },
					outlined: {
						borderWidth: 1,
					},
					flat: { borderWidth: 0 },
					fade: {
						borderWidth: 1,
					},
				},
				rounded: {
					none: { borderRadius: theme.rounded.none },
					xs: { borderRadius: theme.rounded.xs * 1.1 },
					sm: { borderRadius: theme.rounded.sm * 1.1 },
					md: { borderRadius: theme.rounded.md * 1.25 },
					lg: { borderRadius: theme.rounded.lg * 1.3 },
					xl: { borderRadius: theme.rounded.xl * 1.1 },
				},
				shadow: {
					none: {},
					xs: { boxShadow: theme.shadows.xs },
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.md },
					lg: { boxShadow: theme.shadows.lg },
					xl: { boxShadow: theme.shadows.xl },
				},
			},

			compoundVariants: containerCompoundVariants,
		},

		media: (type: ItemMediaVariant) => ({
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.rounded.md,
			borderCurve: 'continuous',
			...(type === 'icon' ? { padding: theme.spacing[2] } : {}),

			variants: {
				variant: {
					filled: {
						backgroundColor:
							type === 'icon' ? 'transparent' : theme.colors.neutral.content_3,
					},
					outlined: {
						backgroundColor: 'transparent',
					},
					flat: {
						backgroundColor:
							type === 'icon' ? 'transparent' : theme.colors.neutral.content_2,
					},
					fade: {
						backgroundColor:
							type === 'icon' ? 'transparent' : theme.colors.neutral.content_3,
					},
				},

				rounded: {
					none: { borderRadius: theme.rounded.none },
					sm: { borderRadius: theme.rounded.sm * 1.1 },
					md: { borderRadius: theme.rounded.md * 1.1 },
					lg: { borderRadius: theme.rounded.lg * 1.1 },
				},
				verticalAlign: {
					top: {
						alignSelf: 'flex-start',
					},
					center: {
						alignSelf: 'center',
					},
					bottom: {
						alignSelf: 'flex-end',
					},
				},
				size: {
					sm: {
						...(type === 'icon' ? null : { width: 40, height: 40 }),
					},
					md: {
						...(type === 'icon' ? null : { width: 46, height: 46 }),
					},
					lg: {
						...(type === 'icon' ? null : { width: 52, height: 52 }),
					},
				},
			},
		}),

		content: {
			flex: 1,
			justifyContent: 'center',
			gap: theme.spacing[0],
		},

		title: {
			color: theme.colors.neutral.text_1,
			variants: {
				size: {
					sm: {
						...theme.typography.body3,
						lineHeight: theme.text.lineHeight.xs,
						fontWeight: theme.text.fontWeight.semibold,
					},
					md: {
						...theme.typography.body3Strong,
						fontWeight: theme.text.fontWeight.semibold,
					},
					lg: {
						...theme.typography.body2Strong,
						fontWeight: theme.text.fontWeight.semibold,
					},
				},
			},
		},

		description: {
			color: theme.colors.neutral.text_3,
			variants: {
				size: {
					sm: {
						...theme.typography.caption1,
						lineHeight: theme.text.lineHeight._2xs,
					},
					md: {
						...theme.typography.body3,
					},
					lg: {
						...theme.typography.body3,
					},
				},
			},
		},

		actions: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing[2],
			marginLeft: theme.spacing[2],
		},

		header: {
			paddingHorizontal: theme.spacing[4],
			paddingTop: theme.spacing[3],
			paddingBottom: theme.spacing[2],
		},

		footer: {
			paddingHorizontal: theme.spacing[4],
			paddingTop: theme.spacing[2],
			paddingBottom: theme.spacing[3],
		},
	};
});
