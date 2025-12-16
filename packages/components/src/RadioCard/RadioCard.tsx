import { forwardRef, useCallback, useState } from 'react';
import {
	type GestureResponderEvent,
	Pressable,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { ScopedTheme, StyleSheet } from 'react-native-unistyles';
import { Radio } from '../Radio';
import { useRadioCardGroupContext } from './RadioCard.context';
import type { RadioCardProps } from './RadioCard.types';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';

// ============================================================================
// Animation Config
// ============================================================================

const SPRING_CONFIG = {
	stiffness: 1400,
	damping: 70,
	mass: 2,
};

const COLOR_TRANSITION_SPRING_CONFIG = {
	stiffness: 1300,
	damping: 80,
	mass: 1,
};

// ============================================================================
// RadioCard Component
// ============================================================================

export const RadioCard = forwardRef<View, RadioCardProps>((props, ref) => {
	const {
		// Content props
		title,
		description,
		header,
		footer,
		media,
		left,
		right,

		// Radio props
		value,
		selected: selectedProp,
		defaultSelected = false,
		onSelect,

		// Card style props
		colorScheme = 'neutral',
		variant = 'outlined',
		size = 'md',
		rounded = 'md',
		shadow = 'none',

		// Indicator props
		indicatorPosition = 'end',
		indicatorVariant = 'filled',

		// Selection style props
		selectedColorScheme,
		selectedVariant,

		// Common props
		disabled = false,
		style,
		accessibilityLabel,
		testID,
		onPressIn,
		onPressOut,
		onPress,
		...rest
	} = props;

	const groupContext = useRadioCardGroupContext();

	// Hybrid Control Pattern: Group > Controlled > Uncontrolled
	const [internalSelected, setInternalSelected] = useState(defaultSelected);

	const isInGroup = groupContext !== null;
	const isControlled = selectedProp !== undefined;

	const selected = isInGroup
		? groupContext.isSelected(value)
		: isControlled
			? selectedProp
			: internalSelected;

	const isDisabled = disabled || (groupContext?.disabled ?? false);

	const activeColorScheme =
		selected && selectedColorScheme ? selectedColorScheme : colorScheme;
	const activeVariant =
		selected && selectedVariant ? selectedVariant : variant;

	radioCardStyles.useVariants({
		colorScheme: activeColorScheme,
		variant: activeVariant,
		size,
		rounded,
		shadow,
		selected,
	});

	const backgroundColor = useAnimatedVariantColor(
		radioCardStyles.container,
		'backgroundColor'
	);

	const borderColor = useAnimatedVariantColor(
		radioCardStyles.container,
		'borderColor'
	);

	const titleColor = useAnimatedVariantColor(
		radioCardStyles.title,
		'color'
	);

	const descriptionColor = useAnimatedVariantColor(
		radioCardStyles.description,
		'color'
	);
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: scale.value,
			},
		],
		opacity: opacity.value,
		backgroundColor: withSpring(backgroundColor.value, COLOR_TRANSITION_SPRING_CONFIG),
		borderColor: withSpring(borderColor.value, COLOR_TRANSITION_SPRING_CONFIG),
	}));

	const titleAnimatedStyle = useAnimatedStyle(() => ({
		color: titleColor.value,
	}));

	const descriptionAnimatedStyle = useAnimatedStyle(() => ({
		color: descriptionColor.value,
	}));

	const handlePressIn = useCallback((event: GestureResponderEvent) => {
		if (isDisabled) return;
		scale.value = withSpring(0.98, SPRING_CONFIG);
		opacity.value = withSpring(0.8, SPRING_CONFIG);
		onPressIn?.(event);
	}, [isDisabled, scale, opacity, onPressIn]);

	const handlePressOut = useCallback((event: GestureResponderEvent) => {
		scale.value = withSpring(1, SPRING_CONFIG);
		opacity.value = withSpring(1, SPRING_CONFIG);
		onPressOut?.(event);
	}, [scale, opacity, onPressOut]);

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
			if (isDisabled) {
				event.preventDefault();
				return;
			}

			if (isInGroup) {
				groupContext.selectValue(value);
			} else {
				const newSelected = !selected;
				if (!isControlled) {
					setInternalSelected(newSelected);
				}
				onSelect?.(newSelected);
			}
			onPress?.(event);
		},
		[
			isDisabled,
			isInGroup,
			groupContext,
			value,
			selected,
			isControlled,
			onSelect,
			onPress,
		]
	);

	const renderRadio = () => (
		<Radio
			selected={selected}
			onSelect={() => {}}
			colorScheme={activeColorScheme}
			variant={indicatorVariant}
			size={size}
			disabled={isDisabled}
			onPress={handlePress}
			accessible={false}
			focusable={false}
			pointerEvents="none"
			accessibilityElementsHidden
			importantForAccessibility="no-hide-descendants"
		/>
	);
	
	const renderMedia = () => (
		<ScopedTheme invertedAdaptive={activeVariant === 'filled' && selected}>
			<View style={radioCardStyles.media}>{media}</View>
		</ScopedTheme>
	);

	return (
		<Pressable
			ref={ref}
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			disabled={isDisabled}
			accessibilityRole="radio"
			accessibilityLabel={accessibilityLabel || title}
			accessibilityState={{
				checked: selected,
				disabled: isDisabled,
			}}
			testID={testID}
			{...rest}
		>
			<Animated.View
				style={[
					radioCardStyles.container,
					containerAnimatedStyle,
					isDisabled && { opacity: 0.5 },
					style,
				]}
			>
				{/* Header */}
				{header && <View style={radioCardStyles.header}>{header}</View>}

				{/* Body - Horizontal layout (radio + media + left + content + right + radio) */}
				<View style={radioCardStyles.body}>
					{/* Start Position Radio */}
					{indicatorPosition === 'start' && renderRadio()}

					{/* Media */}
					{media && renderMedia()}

					{/* Left slot - content left */}
					{left && <View style={radioCardStyles.left}>{left}</View>}

					{/* Content */}
					<View style={radioCardStyles.content}>
						<Animated.Text style={[radioCardStyles.title, titleAnimatedStyle]}>{title}</Animated.Text>
						{description && (
							<Animated.Text style={[radioCardStyles.description, descriptionAnimatedStyle]}>{description}</Animated.Text>
						)}
					</View>

					{/* Right slot - content right */}
					{right && <View style={radioCardStyles.right}>{right}</View>}

					{/* End Position Radio */}
					{indicatorPosition === 'end' && renderRadio()}
				</View>

				{/* Footer */}
				{footer && <View style={radioCardStyles.footer}>{footer}</View>}
			</Animated.View>
		</Pressable>
	);
});

RadioCard.displayName = 'RadioCard';



// ============================================================================
// Styles
// ============================================================================

export const radioCardStyles = StyleSheet.create((theme, _rt) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);
	const containerCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					selected:true,
					variant: 'filled' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.content_2
							: palette.content_inversed,
					},
				},
				{
					colorScheme: scheme,
					selected:true,
					variant: 'outlined' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_1,
						borderColor: hasSolidColor ? palette.solid : palette.text_1,
					},
				},
				{
					colorScheme: scheme,
					selected:true,
					variant: 'flat' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_1,
					},
				},
				{
					colorScheme: scheme,
					selected:true,
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

	const textCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
			return [
				{
					colorScheme: scheme,
					selected:true,
					variant: 'filled' as const,
					styles: {
						color: palette.text_inversed,
					},
				},
			];
	});

	return {
		container: {
			flexDirection: 'column',
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
						padding: theme.spacing[4],
						paddingVertical: theme.spacing[5],
						columnGap: theme.spacing[4],
					},
					md: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[6],
						columnGap: theme.spacing[5],
					},
					lg: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[7],
						columnGap: theme.spacing[5],
					},
				},
				variant: {
					filled: { 
						borderWidth: 0,
						backgroundColor: theme.colors.neutral.content_2,
						borderColor:'transparent',
					 },
					outlined: { 
						borderWidth: 1,
						backgroundColor: theme.colors.neutral.content_1,
						borderColor: theme.colors.neutral.border_subtle,
					 },
					flat: { borderWidth: 0,
						backgroundColor: theme.colors.neutral.content_1,
						borderColor:'transparent',
					 },
					fade: { borderWidth: 1,
						backgroundColor: theme.colors.neutral.content_2,
						borderColor: theme.colors.neutral.border_subtle,
					 },
				},
				rounded: {
					none: { borderRadius: theme.rounded.none },
					xs: { borderRadius: theme.rounded.xs * 1.1 },
					sm: { borderRadius: theme.rounded.sm * 1.1 },
					md: { borderRadius: theme.rounded.md * 1.1 },
					lg: { borderRadius: theme.rounded.lg * 1.1 },
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
				selected: {
					true: {},
					false: {},
				},
			},

			compoundVariants: containerCompoundVariants,
		},

		header: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			width: '100%',
			paddingBottom: theme.spacing[3],
			paddingHorizontal: theme.spacing[1],
		},

		body: {
			flexDirection: 'row',
			alignItems: 'center',
			width: '100%',
			variants: {
				size: {
					sm: {
						gap: theme.spacing[4],
					},
					md: {
						gap: theme.spacing[4],
					},
					lg: {
						gap: theme.spacing[5],
					},
				},
			}
		},

		media: {
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: theme.spacing[1],
		},

		left: {
			alignItems: 'center',
			justifyContent: 'center',
		},

		right: {
			alignItems: 'center',
			justifyContent: 'center',
		},

		content: {
			flex: 1,
			justifyContent: 'center',
			gap: theme.spacing[1],
		},

		title: {
			color: theme.colors.neutral.text_1,
			variants: {
				size: {
					sm: {
						...theme.typography.body2,
						fontWeight: theme.text.fontWeight.medium,
					},
					md: {
						...theme.typography.body2,
						fontWeight: theme.text.fontWeight.medium,
					},
					lg: {
						...theme.typography.body1,
						fontWeight: theme.text.fontWeight.medium,
					},
				},
				selected: {
					true: {
					},
					false: {
					},
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
			compoundVariants: textCompoundVariants,
		},

		description: {
			color: theme.colors.neutral.text_3,
			variants: {
				size: {
					sm: {
						...theme.typography.caption1,
					},
					md: {
						...theme.typography.body3,
					},
					lg: {
						fontSize: theme.typography.body3.fontSize,
					},
				},
				selected: {
					true: {
					},
					false: {
					},
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
			compoundVariants: textCompoundVariants,
		},

		footer: {
			width: '100%',
			paddingTop: theme.spacing[2],
			paddingHorizontal: theme.spacing[3],
		},
	};
});