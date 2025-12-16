import { forwardRef, useCallback, useMemo, useState } from 'react';
import {
	type GestureResponderEvent,
	Pressable,
	type View,
} from 'react-native';
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';
import type { SwitchProps } from './Switch.types';

// ========================================================================
// Constants
// ========================================================================

const DEFAULT_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 } as const;

// Size configuration for Switch
const SIZE_CONFIG = {
	sm: {
		rootWidth: 52,
		rootHeight: 24,
		thumbSize: 20,
		thumbPadding: 2,
		linedRootHeight: 9.5,
	},
	md: {
		rootWidth: 64,
		rootHeight: 28,
		thumbSize: 24,
		thumbPadding: 2,
		linedRootHeight: 12.5,
	},
	lg: {
		rootWidth: 68,
		rootHeight: 32,
		thumbSize: 28,
		thumbPadding: 2,
		linedRootHeight: 17,
	},
} as const;

// ========================================================================
// Component
// ========================================================================

export const Switch = forwardRef<View, SwitchProps>((props, ref) => {
	const {
		colorScheme = 'success',
		variant = 'filled',
		size = 'md',
		thumbShape = 'oval',
		rounded = 'md',
		thumbShadow = 'md',
		thumbPadding: customThumbPadding,
		checked: checkedProp,
		defaultChecked: defaultCheckedProp,
		onCheckedChange,
		disabled = false,
		accessibilityLabel,
		testID,
		style,
		thumbStyle,
		onPress,
		hitSlop,
		...rest
	} = props;

	const [internalValue, setInternalValue] = useState(defaultCheckedProp ?? false);
	const isControlled = checkedProp !== undefined;
	const checked = isControlled ? checkedProp : internalValue;

	// default thumbPadding
	const thumbPadding = customThumbPadding ?? SIZE_CONFIG[size].thumbPadding;

	// Calculate translate distance (considering actual thumb width after scaleX)
	const translateDistance = useMemo(() => {
		const config = SIZE_CONFIG[size];
		const thumbWidth =
			thumbShape === 'circle' ? config.thumbSize : config.thumbSize * 1.5;
		return config.rootWidth - thumbWidth - thumbPadding * 2;
	}, [size, thumbShape, thumbPadding]);

	styles.useVariants({
		colorScheme,
		variant,
		size,
		rounded,
		checked,
		disabled,
		thumbShape,
	});

	const progress = useDerivedValue(() => {
		return withTiming(checked ? 1 : 0, {
			duration: 330,
			easing: Easing.bezier(0.55, 0.03, 0, 0.99),
		});
	});

	// Unistyles variant의 backgroundColor를 자동 추출
	const backgroundColor = useAnimatedVariantColor(
		styles.root,
		'backgroundColor'
	);

	const backgroundColorForBackground = useAnimatedVariantColor(
		styles.background,
		'backgroundColor'
	);

	const rootAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: withTiming(backgroundColor.value, { duration: 200 }),
	}));

	const backgroundAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: withTiming(backgroundColorForBackground.value, {
			duration: 200,
		}),
	}));

	// Thumb 위치 및 shape 애니메이션
	const thumbAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ scale: interpolate(progress.value, [0, 0.3, 1], [1, 1.5, 1], 'clamp') },
			{
				translateX: interpolate(
					progress.value,
					[0, 1],
					[
						thumbPadding,
						variant === 'lined'
							? translateDistance + 2 * thumbPadding
							: thumbPadding + translateDistance,
					]
				),
			},
		],
	}));

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
			if (disabled) {
				event.preventDefault();
				return;
			}

			const newValue = !checked;

			// Uncontrolled mode only updates internal state
			if (!isControlled) {
				setInternalValue(newValue);
			}

			onPress?.(event);
			onCheckedChange?.(newValue);
		},
		[disabled, checked, isControlled, onPress, onCheckedChange]
	);

	return (
		<Pressable
			ref={ref}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="switch"
			accessibilityLabel={accessibilityLabel}
			accessibilityState={{
				checked,
				disabled,
			}}
			focusable={!disabled}
			testID={testID}
			hitSlop={hitSlop ?? DEFAULT_HIT_SLOP}
			{...rest}
		>
			<Animated.View
				style={[
					styles.root,
					rootAnimatedStyle,
					style,
				]}
			>
				{/* Background (for lined variant) */}
				{variant === 'lined' && (
					<Animated.View
						style={[styles.background, backgroundAnimatedStyle]}
					/>
				)}

				{/* Thumb */}
				<Animated.View style={[styles.thumb, thumbAnimatedStyle, thumbStyle]} />
			</Animated.View>
		</Pressable>
	);
});

Switch.displayName = 'Switch';

// ========================================================================
// Styles
// ========================================================================

export const styles = StyleSheet.create((theme, _rt) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	const rootCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		const hasSolidColor = theme.utils.paletteHasSolid(palette);

		return [
			// filled + unchecked
			{
				colorScheme: scheme,
				variant: 'filled' as const,
				checked: false,
				styles: {
					backgroundColor: theme.colors.neutral.content_3,
				},
			},
			// filled + checked
			{
				colorScheme: scheme,
				variant: 'filled' as const,
				checked: true,
				styles: {
					backgroundColor:
						scheme === 'neutral'
							? hasSolidColor
								? palette.solid
								: palette.content_inversed
							: hasSolidColor
								? palette.solid
								: palette.content_inversed,
				},
			},
			// flat + unchecked
			{
				colorScheme: scheme,
				variant: 'flat' as const,
				checked: false,
				styles: {
					backgroundColor: theme.colors.neutral.content_3,
				},
			},
			// flat + checked
			{
				colorScheme: scheme,
				variant: 'flat' as const,
				checked: true,
				styles: {
					backgroundColor: hasSolidColor
						? palette.content_4
						: palette.content_inversed,
				},
			},
			// lined + unchecked
			{
				colorScheme: scheme,
				variant: 'lined' as const,
				checked: false,
				styles: {
					backgroundColor: 'transparent',
				},
			},
			// lined + checked
			{
				colorScheme: scheme,
				variant: 'lined' as const,
				checked: true,
				styles: {
					backgroundColor: 'transparent',
				},
			},
		];
	});

	const backgroundCompoundVariants = paletteEntries.flatMap(
		([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				// lined + unchecked
				{
					colorScheme: scheme,
					checked: false,
					styles: {
						backgroundColor: theme.colors.neutral.content_3,
					},
				},
				// lined + checked
				{
					colorScheme: scheme,
					checked: true,
					styles: {
						backgroundColor:
							scheme === 'neutral'
								? hasSolidColor
									? palette.solid
									: palette.content_inversed
								: hasSolidColor
									? palette.solid
									: palette.content_inversed,
					},
				},
			];
		}
	);

	return {
		root: {
			flexDirection: 'row',
			alignItems: 'center',
			position: 'relative',
			borderCurve: 'continuous',
			overflow: 'visible',
			// paddingVertical:4,

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
					lined: {},
					filled: {
						// Inner shadow for filled variant
						boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)',
					},
					flat: {},
				},
				size: {
					sm: {
						width: SIZE_CONFIG.sm.rootWidth,
						height: SIZE_CONFIG.sm.rootHeight,
					},
					md: {
						width: SIZE_CONFIG.md.rootWidth,
						height: SIZE_CONFIG.md.rootHeight,
					},
					lg: {
						width: SIZE_CONFIG.lg.rootWidth,
						height: SIZE_CONFIG.lg.rootHeight,
					},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
				},
				checked: {
					true: {},
					false: {},
				},
				disabled: {
					true: {
						opacity: 0.5,
					},
				},
				thumbShape: {
					circle: {},
					oval: {},
				},
				thumbShadow: {},
			},

			compoundVariants: [
				...rootCompoundVariants,
				// lined variant의 height 조정
				{
					variant: 'lined' as const,
					size: 'sm' as const,
					styles: {
						height: SIZE_CONFIG.sm.linedRootHeight,
						borderRadius: theme.rounded.sm,
					},
				},
				{
					variant: 'lined' as const,
					size: 'md' as const,
					styles: {
						height: SIZE_CONFIG.md.linedRootHeight,
						borderRadius: theme.rounded.md,
					},
				},
				{
					variant: 'lined' as const,
					size: 'lg' as const,
					styles: {
						height: SIZE_CONFIG.lg.linedRootHeight,
						borderRadius: theme.rounded.lg,
					},
				},
			],
		},

		// Background (lined variant용)
		background: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			borderCurve: 'continuous',

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
				},
				checked: {
					true: {},
					false: {},
				},
			},

			compoundVariants: backgroundCompoundVariants,
		},

		// Thumb 스타일 (circle 기준, oval은 scaleX로 처리)
		thumb: {
			position: 'absolute',
			backgroundColor: theme.colors.neutral.text_inversed,
			borderCurve: 'continuous',
			borderRadius: theme.rounded.md,
			boxShadow: theme.shadows.md,
			zIndex: 999,

			variants: {
				size: {
					sm: {},
					md: {},
					lg: {},
				},
				thumbShape: {
					circle: {},
					oval: {},
				},
				thumbShadow: {
					none: {},
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.card },
					lg: { boxShadow: theme.shadows.lg },
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm * 0.8 },
					md: { borderRadius: theme.rounded.md * 0.8 },
				},
			},
			compoundVariants: [
				{
					size: 'sm' as const,
					thumbShape: 'circle' as const,
					styles: {
						width: SIZE_CONFIG.sm.thumbSize,
						height: SIZE_CONFIG.sm.thumbSize,
					},
				},
				{
					size: 'md' as const,
					thumbShape: 'circle' as const,
					styles: {
						width: SIZE_CONFIG.md.thumbSize,
						height: SIZE_CONFIG.md.thumbSize,
					},
				},
				{
					size: 'lg' as const,
					thumbShape: 'circle' as const,
					styles: {
						width: SIZE_CONFIG.lg.thumbSize,
						height: SIZE_CONFIG.lg.thumbSize,
					},
				},
				{
					size: 'sm' as const,
					thumbShape: 'oval' as const,
					styles: {
						width: SIZE_CONFIG.sm.thumbSize * 1.5,
						height: SIZE_CONFIG.sm.thumbSize,
					},
				},
				{
					size: 'md' as const,
					thumbShape: 'oval' as const,
					styles: {
						width: SIZE_CONFIG.md.thumbSize * 1.5,
						height: SIZE_CONFIG.md.thumbSize,
					},
				},
				{
					size: 'lg' as const,
					thumbShape: 'oval' as const,
					styles: {
						width: SIZE_CONFIG.lg.thumbSize * 1.5,
						height: SIZE_CONFIG.lg.thumbSize,
					},
				},
			],
		},
	};
});