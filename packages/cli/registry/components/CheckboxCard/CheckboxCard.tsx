
import { forwardRef, useCallback, useEffect, useState } from 'react';
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

import { Checkbox } from '../Checkbox';
import { useCheckboxCardGroup } from './CheckboxCard.context';
import type { CheckboxCardProps } from './CheckboxCard.types';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';

// ============================================================================
// Styles
// ============================================================================

export const checkboxCardStyles = StyleSheet.create((theme, _rt) => {

	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);
	// Container compound variants (colorScheme + variant)
	const containerCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				// filled variant
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
				// outlined variant
				{
					colorScheme: scheme,
					selected:true,
					variant: 'outlined' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_1,
						borderColor: hasSolidColor ? palette.solid : palette.text_1,
					},
				},
				// flat variant
				{
					colorScheme: scheme,
					selected:true,
					variant: 'flat' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_1,
					},
				},
				// fade variant
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
		// 메인 컨테이너 (Item의 container 대체)
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
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[5],
						columnGap: theme.spacing[3],
					},
					md: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[6],
						columnGap: theme.spacing[4],
					},
					lg: {
						paddingHorizontal: theme.spacing[5],
						paddingVertical: theme.spacing[7],
						columnGap: theme.spacing[4],
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

		// header 영역 스타일
		header: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			width: '100%',
			paddingBottom: theme.spacing[3],
			paddingHorizontal: theme.spacing[1],
		},

		// body 영역 (media + left + content + right + radio 가로 배치)
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

		// media 영역 스타일
		media: {
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: theme.spacing[1],
		},

		// left 슬롯 영역 스타일
		left: {
			alignItems: 'center',
			justifyContent: 'center',
		},

		// right 슬롯 영역 스타일
		right: {
			alignItems: 'center',
			justifyContent: 'center',
		},

		// content 영역 (ItemContent 대체)
		content: {
			flex: 1,
			justifyContent: 'center',
			gap: theme.spacing[1],
		},

		// title 스타일 (ItemTitle 대체)
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

		// description 스타일 (ItemDescription 대체)
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

		// footer 영역 스타일
		footer: {
			width: '100%',
			paddingTop: theme.spacing[2],
			paddingHorizontal: theme.spacing[3],
		},
	};
});

// ============================================================================
// Animation Config
// ============================================================================

const SPRING_CONFIG = {
	stiffness: 1400,
	damping: 70,
    mass: 2,
};

const COLOR_TRANSITION_SPRING_CONFIG = {
	stiffness: 1600,
	damping: 80,
	mass: 1,
};
// ============================================================================
// CheckboxCard Component
// ============================================================================

export const CheckboxCard = forwardRef<View, CheckboxCardProps>(
	(props, ref) => {
		const {
			// Content props
			title,
			description,
			header,
			footer,
			media,
			left,
			right,

			// Checkbox props
			checked: checkedProp,
			defaultChecked = false,
			onCheckedChange,
			value,

			// Card style props
			colorScheme = 'neutral',
			variant = 'outlined',
			size = 'md',
			rounded = 'md',
			shadow = 'none',

			// Indicator props
			indicatorPosition = 'end',
			indicatorVariant = 'filled',
			indicatorRounded = 'sm',

			// Selection style props
			selectedColorScheme,
			selectedVariant,
			indicatorSelectedVariant = 'flat',

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

		// Hybrid Control Pattern: Group > Controlled > Uncontrolled
		const groupContext = useCheckboxCardGroup();
		const [internalChecked, setInternalChecked] = useState(defaultChecked);

		const isInGroup = groupContext !== null && value !== undefined;
		const isControlled = checkedProp !== undefined;

		const checked = isInGroup
			? groupContext.isSelected(value)
			: isControlled
				? checkedProp
				: internalChecked;

		const isDisabled =
			disabled ||
			(groupContext?.disabled ?? false) ||
			(isInGroup && !checked && groupContext?.isMaxReached);

		// 선택 상태에 따른 colorScheme 결정
		const activeColorScheme =
			checked && selectedColorScheme ? selectedColorScheme : colorScheme;
		const activeIndicatorVariant =
			checked && indicatorSelectedVariant ? indicatorSelectedVariant : indicatorVariant;
		const activeVariant =
			checked && selectedVariant ? selectedVariant : variant;


		// Item variants도 적용
		checkboxCardStyles.useVariants({
			colorScheme: activeColorScheme,
			variant: activeVariant,
			size,
			rounded,
			shadow,
			selected: checked,
		});

		const backgroundColor = useAnimatedVariantColor(
			checkboxCardStyles.container,
			'backgroundColor'
		);

		const borderColor = useAnimatedVariantColor(
			checkboxCardStyles.container,
			'borderColor'
		);

		const titleColor = useAnimatedVariantColor(
			checkboxCardStyles.title,
			'color'
		);

		const descriptionColor = useAnimatedVariantColor(
			checkboxCardStyles.description,
			'color'
		);
		// Press animation
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

		// Event Handlers
		const handlePressIn = useCallback((event: GestureResponderEvent) => {
			if (isDisabled) return;
			scale.value = withSpring(0.96, SPRING_CONFIG);
			opacity.value = withSpring(0.7, SPRING_CONFIG);

			onPressIn?.(event);
		}, [isDisabled, scale, opacity]);

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
					groupContext.toggleValue(value);
				} else {
					const newChecked = !checked;
					if (!isControlled) {
						setInternalChecked(newChecked);
					}
					onCheckedChange?.(newChecked);
				}

				onPress?.(event);
			},
			[
				isDisabled,
				isInGroup,
				groupContext,
				value,
				checked,
				isControlled,
				onCheckedChange,
				onPress,
			]
		);

		// Checkbox 인디케이터 렌더링
		const renderCheckbox = () => (
			<ScopedTheme invertedAdaptive={activeVariant === 'filled' && checked}>
			<Checkbox
				checked={checked}
				colorScheme={activeColorScheme}
				variant={activeIndicatorVariant}
				rounded={indicatorRounded}
				size={size}
				disabled={isDisabled}
				onPress={handlePress}
			/>
			</ScopedTheme>
		);

		const renderMedia = () => (
			<ScopedTheme invertedAdaptive={activeVariant === 'filled' && checked}>
				<View style={checkboxCardStyles.media}>{media}</View>
			</ScopedTheme>
		);

	// Reanimated's Animated Style is overriding all included style attributes, so the opacity attribute is not working as expected.
	// So we need to set the opacity manually.
	useEffect(() => {
		if (isDisabled) {
			opacity.value = 0.4
		}
	}, [isDisabled]);

		return (
				<Pressable
					ref={ref}
					onPress={handlePress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					disabled={isDisabled}
					accessibilityRole="checkbox"
					accessibilityLabel={accessibilityLabel || title}
					accessibilityState={{
						checked,
						disabled: isDisabled,
					}}
					testID={testID}
					{...rest}
				>
					<Animated.View
						style={[
							checkboxCardStyles.container,
							containerAnimatedStyle,
							isDisabled && { opacity: 0.5 },
							style,
						]}
					>
						{/* Header (선택적) */}
						{header && <View style={checkboxCardStyles.header}>{header}</View>}

						<View style={checkboxCardStyles.body}>
							{/* Start Position Radio */}
							{indicatorPosition === 'start' && renderCheckbox()}

							{/* Media (선택적) */}
							{media && renderMedia()}

							{/* Left slot (선택적) - content 왼쪽 */}
							{left && <View style={checkboxCardStyles.left}>{left}</View>}

							{/* Content */}
							<View style={checkboxCardStyles.content}>
								<Animated.Text style={[checkboxCardStyles.title, titleAnimatedStyle]}>{title}</Animated.Text>
								{description && (
									<Animated.Text style={[checkboxCardStyles.description, descriptionAnimatedStyle]}>{description}</Animated.Text>
								)}
							</View>

							{/* Right slot (선택적) - content 오른쪽 */}
							{right && <View style={checkboxCardStyles.right}>{right}</View>}

							{/* End Position Radio */}
							{indicatorPosition === 'end' && renderCheckbox()}
						</View>

						{/* Footer (선택적) */}
						{footer && <View style={checkboxCardStyles.footer}>{footer}</View>}

					</Animated.View>
				</Pressable>
		);
	}
);

CheckboxCard.displayName = 'CheckboxCard';
