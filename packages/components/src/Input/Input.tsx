import { X } from 'lucide-react-native';
import { forwardRef, useCallback, useState } from 'react';
import {
	BlurEvent,
	FocusEvent,
	Pressable,
	Text,
	TextInput,
	View,
} from 'react-native';
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { InputProps } from './Input.types';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';

const inputStyles = StyleSheet.create((theme) => {
	const plaetteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	const inputWrapperCompoundVariants = theme.utils.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);
			return [
				{
					colorScheme: scheme,
					isFocused: false,
					variant: 'filled' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_3,
						borderColor: 'transparent',
					},
				},
				{
					colorScheme: scheme,
					isFocused: false,
					variant: 'flat' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						// The Below are needed to avoid Unistyles Compound Variants bug
						paddingHorizontal: 0,
						borderWidth: 0,
					},
				},
				{
					colorScheme: scheme,
					isFocused: false,
					variant: 'bordered' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: theme.colors.neutral.border_subtle,
					},
				},
				{
					colorScheme: scheme,
					isFocused: false,
					variant: 'underlined' as const,
					styles: {
						borderRadius: 0,
						borderWidth: 0,
						paddingHorizontal: 0,
						
						// The above are needed to avoid Unistyles Compound Variants bug
						backgroundColor: 'transparent',
						borderBottomWidth: StyleSheet.hairlineWidth,
						borderColor: theme.colors.neutral.border_default,
						
					},
				},
				{
					colorScheme: scheme,
					isFocused: false,
					variant: 'faded' as const,
					styles: {
						backgroundColor: theme.colors.neutral.content_3,
						borderColor: theme.colors.neutral.border_subtle,
					},
				},
				// isFocused: true
				{
					colorScheme: scheme,
					isFocused: true,
					variant: 'flat' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						// The Below are needed to avoid Unistyles Compound Variants bug
						paddingHorizontal: 0,
						borderWidth: 0,
					},
				},
				{
					colorScheme: scheme,
					isFocused: true,
					variant: 'bordered' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: hasSolidColor ? palette.border_subtle : palette.border_strong,
					},
				},
				{
					colorScheme: scheme,
					isFocused: true,
					variant: 'underlined' as const,
					styles: {
						backgroundColor: 'transparent',
						borderColor: theme.colors.neutral.border_default,
						borderBottomWidth: StyleSheet.hairlineWidth,
						// The Below are needed to avoid Unistyles Compound Variants bug
						borderRadius: 0,
						paddingHorizontal: 0,
						borderWidth: 0,
					},
				},
				{
					colorScheme: scheme,
					isFocused: true,
					variant: 'faded' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.content_2
							: palette.content_4,
						borderColor: hasSolidColor
							? palette.border_subtle
							: palette.border_default,
					},
				},
				{
					colorScheme: scheme,
					isFocused: true,
					variant: 'filled' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.content_2
							: palette.content_4,
						borderColor: 'transparent',
					},
				},
			];
		});

	const labelCompoundVariants = plaetteEntries.flatMap(([scheme, palette]) => {
		const hasSolidColor = theme.utils.paletteHasSolid(palette);
		return [
			{
				colorScheme: scheme,
				isFocused: false,
				styles: {
					color: theme.colors.neutral.text_2,
				},
			},
			{
				colorScheme: scheme,
				isFocused: true,
				styles: {
					color: hasSolidColor ? palette.border_default : theme.colors.neutral.text_1,
				},
			},
		];
	});

	return {
		base: {
			flexDirection: 'column',
			borderCurve: 'continuous',
			width: '100%',
			variants: {
				fullWidth: {
					true: { width: '100%' },
					false: { width: 'auto' },
				},
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
			},
		},
		label: {
			
			variants: {
				variant: {
					filled: {
						marginBottom: theme.spacing[2],
						paddingLeft: theme.spacing[1],
					},
					flat: {},
					bordered: {
						marginBottom: theme.spacing[2],
						paddingLeft: theme.spacing[1],
					},
					underlined: {},
					faded: {
						marginBottom: theme.spacing[2],
						paddingLeft: theme.spacing[1],
					},
				},
				size: {
					sm: { ...theme.typography.body3 },
					md: { ...theme.typography.body3 },
					lg: { ...theme.typography.body3 },
					xl: { ...theme.typography.body2 },
				},
				isFocused: {
					true: {},
					false: {},
				},
			},
			compoundVariants: labelCompoundVariants,
		},
		inputWrapper: {
			flexDirection: 'row',
			alignItems: 'center',
			borderCurve: 'continuous',
			borderRadius: theme.rounded.md,
			paddingHorizontal: theme.spacing[4],
			gap: theme.spacing[3],
			boxSizing: 'border-box',
			borderWidth: 1,
			borderColor: 'transparent',

			variants: {
				variant: {
					filled: {
						backgroundColor:theme.colors.neutral.content_3,
						borderColor: 'transparent',
					},
					flat: {
						backgroundColor:theme.colors.neutral.content_3,
						borderColor: 'transparent',
					},
					bordered: {
						backgroundColor:theme.colors.neutral.content_3,
						borderColor: 'transparent',
					},
					underlined: {
						backgroundColor:theme.colors.neutral.content_3,
						borderColor: 'transparent',
						
					},
					faded: {
						backgroundColor:theme.colors.neutral.content_3,
						borderColor: 'transparent',
					},
				},
				color: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				size: {
					sm: {
						minHeight: 42,
					},
					md: {
						minHeight: 44,
					},
					lg: {
						minHeight: 56,
					},
					xl: {
						minHeight: 64,
					},
				},
				radius: {
					none: { borderRadius: 0 },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
					full: { borderRadius: theme.rounded.full },
				},
				isInvalid: {
					true: {
						borderColor: theme.colors.error.solid,
					},
				},
				shadow: {
					none: {
						boxShadow: 'none',
					},
					sm: {
						boxShadow: theme.shadows.md,
					},
					md: {
						boxShadow: theme.shadows.lg,
					},
					lg: {
						boxShadow: theme.shadows.xl,
					},
					xl: {
						boxShadow: theme.shadows['2xl'],
					},
					inner: {
						boxShadow: theme.shadows.inner,
					},
				},
				isFocused: {
					true: {},
					false: {},
				},
			},
			compoundVariants: inputWrapperCompoundVariants,
		},
		innerWrapper: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			height: '100%',
			borderCurve: 'continuous',
		},
		input: {
			flex: 1,
			height: '100%',
			borderCurve: 'continuous',
			color: theme.colors.neutral.text_1,
			outlineWidth: 0,
			padding: 0, // Remove default padding
			variants: {
				size: {
					sm: {
						...theme.typography.body3,
						fontWeight: 400,
						lineHeight: theme.typography.caption1.lineHeight,
					},
					md: {
						...theme.typography.body2,
						fontWeight: 400,
						lineHeight: theme.typography.body3.lineHeight,
					},
					lg: {
						...theme.typography.h5,
						fontWeight: 400,
					},
					xl: {
						...theme.typography.h3,
						fontWeight: 400,
						lineHeight: theme.typography.h3.lineHeight,
					},
				},
			},
		},
		helperWrapper: {
			paddingLeft: theme.spacing[1],
			marginTop: theme.spacing[2],
			flexDirection: 'column',
			gap: theme.spacing[1],
		},
		description: {
			...theme.typography.body3,
			color: theme.colors.neutral.text_3,
		},
		errorMessage: {
			...theme.typography.body3,
			color: theme.colors.error.solid,
		},
		clearButton: {
			padding: theme.spacing[2],
			borderRadius: theme.rounded.full,
			backgroundColor: theme.colors.neutral.content_3,
			variants: {
				size: {
					sm: {
						padding: theme.spacing[1],
					},
					md: {
						padding: theme.spacing[2],
					},
					lg: {
						padding: theme.spacing[2],
					},
					xl: {
						padding: theme.spacing[2],
					},
				},
			},
		},
		underlinedDivider: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: 2,
			variants: {
				colorScheme: {
					primary: {
						backgroundColor: theme.colors.primary.solid,
					},
					neutral: {
						backgroundColor: theme.colors.neutral.content_inversed,
					},
					error: {
						backgroundColor: theme.colors.error.solid,
					},
					success: {
						backgroundColor: theme.colors.success.solid,
					},
					warning: {
						backgroundColor: theme.colors.warning.solid,
					},
					info: {
						backgroundColor: theme.colors.info.solid,
					},
				},
			},
		},
	};
});

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
	const {
		variant = 'bordered',
		colorScheme = 'neutral',
		size = 'md',
		radius = 'md',
		label,
		description,
		errorMessage,
		startContent,
		endContent,
		isClearable = true,
		isInvalid = false,
		isDisabled = false,
		isReadOnly = false,
		fullWidth = true,
		shadow = 'none',
		onClear,
		value: controlledValue,
		defaultValue,
		onChangeText,
		onFocus,
		onBlur,
		placeholder,
		...rest
	} = props;

	const { theme } = useUnistyles();

	const [internalValue, setInternalValue] = useState(defaultValue || '');
	const [focusState, setFocusState] = useState(false);

	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : internalValue;
	const hasValue = value.length > 0;

	// Reanimated Shared Values
	const labelPosition = useSharedValue(0); // 0: initial, 1: floated
	const underlineScale = useSharedValue(0);

	const evaluatedColorScheme = isInvalid ? 'error' : colorScheme;

	// Apply Unistyles variants
	inputStyles.useVariants({
		variant,
		colorScheme:evaluatedColorScheme,
		size,
		radius,
		fullWidth,
		isInvalid,
		shadow,
		isFocused: focusState,
	});

	const wrapperBackgroundColor = useAnimatedVariantColor(inputStyles.inputWrapper, 'backgroundColor')
	const wrapperBorderColor = useAnimatedVariantColor(inputStyles.inputWrapper, 'borderColor')
	const labelColor = useAnimatedVariantColor(inputStyles.label, 'color')
	
	// Animated Styles
	const animatedLabelStyle = useAnimatedStyle(() => {
		const translateY = interpolate(labelPosition.value, [0, 1], [0, -12]);
		const scale = interpolate(labelPosition.value, [0, 1], [1, 0.85]);
		const translateX = interpolate(labelPosition.value, [0, 1], [0, -10]);

		return {
			color: withTiming(labelColor.value, { duration: 200, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
			transform: [{ translateY }, { translateX }, { scale }],
		};
	});

	const animatedUnderlinedDividerStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scaleX: withTiming(underlineScale.value, { duration: 200, easing: Easing.bezier(0.4, 0, 0.2, 1) }) }],
			height: 2,
		};
	});

	const animatedInputStyle = useAnimatedStyle(() => {
		return {
			...(isInvalid && { transform:[{translateX: withRepeat(withSequence(
				withTiming(5, { duration: 80, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
				withTiming(-3, { duration: 80, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
				withTiming(0, { duration: 80, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
			), 2, true) }] }),
			backgroundColor: withTiming(wrapperBackgroundColor.value, { duration: 200, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
			borderColor: withTiming(wrapperBorderColor.value, { duration: 200, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
		};
	});

	const handleFocus = useCallback((e: FocusEvent) => {
		underlineScale.value = 1;
		setFocusState(true);
		onFocus?.(e);
	}, [onFocus]);

	const handleBlur = useCallback((e: BlurEvent) => {
		setFocusState(false);
		underlineScale.value = 0;
		onBlur?.(e);
	}, [onBlur]);

	const handleChangeText = useCallback(
		(text: string) => {
			if (!isControlled) {
				setInternalValue(text);
			}
			onChangeText?.(text);
		},
		[isControlled, onChangeText]
	);

	const handleClear = useCallback(() => {
		handleChangeText('');
		onClear?.();
	}, [handleChangeText, onClear]);

	return (
		<View style={inputStyles.base}>
			{label && (
				<Animated.Text style={[inputStyles.label, animatedLabelStyle]}>
					{label}
				</Animated.Text>
			)}
			<Animated.View style={[inputStyles.inputWrapper, animatedInputStyle]}>
				{startContent}

				<View style={inputStyles.innerWrapper}>
					<TextInput
						ref={ref}
						style={[inputStyles.input]}
						value={value}
						onChangeText={handleChangeText}
						onFocus={handleFocus}
						onBlur={handleBlur}
						editable={!isDisabled && !isReadOnly}
						placeholder={placeholder}
						placeholderTextColor={theme.colors.neutral.border_default}
						{...rest}
					/>

					{isClearable && hasValue && !isDisabled && !isReadOnly && (
						<Pressable onPress={handleClear} style={inputStyles.clearButton}>
							<X size={14} color={theme.colors.neutral.text_2} />
						</Pressable>
					)}
				</View>

				{endContent}

				{variant === 'underlined' && (
				<Animated.View
					style={[
						inputStyles.underlinedDivider,
						animatedUnderlinedDividerStyle,
					]}
				/>
			)}
			</Animated.View>

			{(description || errorMessage) && (
				<View style={inputStyles.helperWrapper}>
					{errorMessage && (
						<Text style={inputStyles.errorMessage}>{errorMessage}</Text>
					)}
					{description && !errorMessage && (
						<Text style={inputStyles.description}>{description}</Text>
					)}
				</View>
			)}
			
		</View>
	);
});

Input.displayName = 'Input';
