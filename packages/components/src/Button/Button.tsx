import type { FleetTheme } from '@fleet-ui/core';
import type { ReactNode } from 'react';
import { forwardRef, useCallback, useMemo } from 'react';
import {
	ActivityIndicator,
	type GestureResponderEvent,
	Pressable,
	type View as RNView,
	Text,
	View,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type {
	ButtonColorScheme,
	ButtonProps,
	ButtonSize,
	ButtonVariant,
} from './Button.types';

export const buttonStyles = StyleSheet.create((theme, rt) => ({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: theme.rounded.md,
		paddingHorizontal: theme.spacing[5],
		paddingVertical: theme.spacing[3],
		minHeight: 40,
		gap: theme.spacing[2],
		borderWidth: 0,
		backgroundColor: 'transparent',
		variants: {
			colorScheme: {
				primary: {},
				secondary: {},
				neutral: {},
				danger: {},
				success: {},
				warning: {},
				info: {},
			},
			size: {
				sm: {
					paddingHorizontal: theme.spacing[3],
					paddingVertical: theme.spacing[2],
					minHeight: 32,
					gap: theme.spacing[1],
				},
				md: {
					paddingHorizontal: theme.spacing[5],
					paddingVertical: theme.spacing[3],
					minHeight: 40,
				},
				lg: {
					paddingHorizontal: theme.spacing[6],
					paddingVertical: theme.spacing[4],
					minHeight: 48,
					gap: theme.spacing[2],
				},
			},
			variant: {
				filled: {},
				outlined: {
					backgroundColor: 'transparent',
					borderWidth: 1,
				},
				flat: {
					backgroundColor: theme.colors.bg[2],
					borderWidth: 0,
				},
				ghost: {
					backgroundColor: 'transparent',
				},
				faded: {
					backgroundColor: theme.colors.bg[2],
					borderWidth: 1,
					borderColor: theme.colors.bd[1],
				},
			},
			rounded: {
				none: { borderRadius: 0 },
				xs: { borderRadius: theme.rounded.xs },
				sm: { borderRadius: theme.rounded.sm },
				md: { borderRadius: theme.rounded.md },
				lg: { borderRadius: theme.rounded.lg },
				full: { borderRadius: theme.rounded.full },
			},
			shadow: {
				none: {
					boxShadow: 'none',
					shadowColor: 'transparent',
					shadowOpacity: 0,
					shadowRadius: 0,
					shadowOffset: { width: 0, height: 0 },
					elevation: 0,
				},
				sm: {
					boxShadow: theme.shadow.sm,
				},
				md: {
					boxShadow: theme.shadow.md,
				},
				lg: {
					boxShadow: theme.shadow.lg,
				},
			},
			disabled: {
				true: {
					opacity: 0.6,
				},
			},
			pressed: {
				true: {
					transform: [{ scale: 0.98 }],
				},
			},
			fullWidth: {
				true: {
					alignSelf: 'stretch',
					width: '100%',
				},
			},
			iconOnly: {
				true: {
					minWidth: undefined,
					paddingHorizontal: theme.spacing[3],
				},
			},
		},
		compoundVariants: [
			{
				colorScheme: 'primary',
				variant: 'filled',
				styles: {
					backgroundColor: theme.colors.action.primary.default,
					borderColor: theme.colors.action.primary.default,
				},
			},
			{
				colorScheme: 'primary',
				variant: 'outlined',
				styles: {
					borderColor: theme.colors.action.primary.border,
				},
			},
			{
				colorScheme: 'primary',
				variant: 'ghost',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				colorScheme: 'secondary',
				variant: 'filled',
				styles: {
					backgroundColor: theme.colors.action.secondary.default,
					borderColor: theme.colors.action.secondary.default,
				},
			},
			{
				colorScheme: 'secondary',
				variant: 'outlined',
				styles: {
					borderColor: theme.colors.action.secondary.border,
				},
			},
			{
				colorScheme: 'secondary',
				variant: 'ghost',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				colorScheme: 'neutral',
				variant: 'filled',
				styles: {
					backgroundColor: theme.colors.action.secondary.default,
					borderColor: theme.colors.action.secondary.default,
				},
			},
			{
				colorScheme: 'neutral',
				variant: 'outlined',
				styles: {
					borderColor: theme.colors.action.secondary.border,
				},
			},
			{
				colorScheme: 'neutral',
				variant: 'ghost',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				colorScheme: 'danger',
				variant: 'filled',
				styles: {
					backgroundColor: theme.colors.action.danger.default,
					borderColor: theme.colors.action.danger.default,
				},
			},
			{
				colorScheme: 'danger',
				variant: 'outlined',
				styles: {
					borderColor: theme.colors.action.danger.border,
				},
			},
			{
				colorScheme: 'danger',
				variant: 'ghost',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				colorScheme: 'success',
				variant: 'filled',
				styles: {
					backgroundColor: theme.colors.status.success.bg,
					borderColor: theme.colors.status.success.bg,
				},
			},
			{
				colorScheme: 'success',
				variant: 'outlined',
				styles: {
					borderColor: theme.colors.status.success.border,
				},
			},
			{
				colorScheme: 'success',
				variant: 'ghost',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				colorScheme: 'warning',
				variant: 'filled',
				styles: {
					backgroundColor: theme.colors.status.warning.bg,
					borderColor: theme.colors.status.warning.bg,
				},
			},
			{
				colorScheme: 'warning',
				variant: 'outlined',
				styles: {
					borderColor: theme.colors.status.warning.border,
				},
			},
			{
				colorScheme: 'warning',
				variant: 'ghost',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				colorScheme: 'info',
				variant: 'filled',
				styles: {
					backgroundColor: theme.colors.status.info.bg,
					borderColor: theme.colors.status.info.bg,
				},
			},
			{
				colorScheme: 'info',
				variant: 'outlined',
				styles: {
					borderColor: theme.colors.status.info.border,
				},
			},
			{
				colorScheme: 'info',
				variant: 'ghost',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				variant: 'flat',
				styles: {
					borderColor: 'transparent',
				},
			},
			{
				variant: 'ghost',
				styles: {
					borderWidth: 0,
				},
			},
			{
				variant: 'faded',
				styles: {
					borderColor: theme.colors.bd[1],
				},
			},
		],
	},
	buttonText: {
		fontSize: theme.typography.button.fontSize,
		fontWeight: theme.typography.button.fontWeight,
		lineHeight: theme.typography.button.lineHeight,
		letterSpacing: theme.typography.button.letterSpacing,
		color: theme.colors.text.inversed,
		variants: {
			colorScheme: {
				primary: {},
				secondary: {},
				neutral: {},
				danger: {},
				success: {},
				warning: {},
				info: {},
			},
			size: {
				sm: {
					fontSize: theme.typography.body3.fontSize,
					lineHeight: theme.typography.body3.lineHeight,
				},
				md: {},
				lg: {
					fontSize: theme.typography.body1.fontSize,
					lineHeight: theme.typography.body1.lineHeight,
				},
			},
			variant: {
				flat: {
					color: theme.colors.text[1],
				},
				faded: {
					color: theme.colors.text[1],
				},
				filled: {},
				outlined: {},
				ghost: {},
			},
			iconOnly: {
				true: {
					marginHorizontal: 0,
				},
			},
		},
		compoundVariants: [
			{
				colorScheme: 'primary',
				variant: 'filled',
				styles: {
					color: theme.colors.action.primary.foreground,
				},
			},
			{
				colorScheme: 'primary',
				variant: 'outlined',
				styles: {
					color: theme.colors.action.primary.default,
				},
			},
			{
				colorScheme: 'primary',
				variant: 'ghost',
				styles: {
					color: theme.colors.action.primary.default,
				},
			},
			{
				colorScheme: 'secondary',
				variant: 'filled',
				styles: {
					color: theme.colors.action.secondary.foreground,
				},
			},
			{
				colorScheme: 'secondary',
				variant: 'outlined',
				styles: {
					color: theme.colors.action.secondary.default,
				},
			},
			{
				colorScheme: 'secondary',
				variant: 'ghost',
				styles: {
					color: theme.colors.action.secondary.default,
				},
			},
			{
				colorScheme: 'neutral',
				variant: 'filled',
				styles: {
					color: theme.colors.action.secondary.foreground,
				},
			},
			{
				colorScheme: 'neutral',
				variant: 'outlined',
				styles: {
					color: theme.colors.action.secondary.default,
				},
			},
			{
				colorScheme: 'neutral',
				variant: 'ghost',
				styles: {
					color: theme.colors.action.secondary.default,
				},
			},
			{
				colorScheme: 'danger',
				variant: 'filled',
				styles: {
					color: theme.colors.action.danger.foreground,
				},
			},
			{
				colorScheme: 'danger',
				variant: 'outlined',
				styles: {
					color: theme.colors.action.danger.default,
				},
			},
			{
				colorScheme: 'danger',
				variant: 'ghost',
				styles: {
					color: theme.colors.action.danger.default,
				},
			},
			{
				colorScheme: 'success',
				variant: 'filled',
				styles: {
					color: theme.colors.status.success.fg,
				},
			},
			{
				colorScheme: 'success',
				variant: 'outlined',
				styles: {
					color: theme.colors.status.success.fg,
				},
			},
			{
				colorScheme: 'success',
				variant: 'ghost',
				styles: {
					color: theme.colors.status.success.fg,
				},
			},
			{
				colorScheme: 'warning',
				variant: 'filled',
				styles: {
					color: theme.colors.status.warning.fg,
				},
			},
			{
				colorScheme: 'warning',
				variant: 'outlined',
				styles: {
					color: theme.colors.status.warning.fg,
				},
			},
			{
				colorScheme: 'warning',
				variant: 'ghost',
				styles: {
					color: theme.colors.status.warning.fg,
				},
			},
			{
				colorScheme: 'info',
				variant: 'filled',
				styles: {
					color: theme.colors.status.info.fg,
				},
			},
			{
				colorScheme: 'info',
				variant: 'outlined',
				styles: {
					color: theme.colors.status.info.fg,
				},
			},
			{
				colorScheme: 'info',
				variant: 'ghost',
				styles: {
					color: theme.colors.status.info.fg,
				},
			},
		],
	},
	leftIcon: (size: ButtonSize, iconOnly: boolean) => ({
		marginRight: theme.spacing[2],
		variants: {
			size: {
				sm: {
					marginRight: theme.spacing[1],
				},
				md: {},
				lg: {
					marginRight: theme.spacing[2],
				},
			},
			iconOnly: {
				true: {
					marginRight: 0,
				},
			},
		},
	}),
	rightIcon: (size: ButtonSize, iconOnly: boolean) => ({
		marginLeft: theme.spacing[2],
		variants: {
			size: {
				sm: {
					marginLeft: theme.spacing[1],
				},
				md: {},
				lg: {
					marginLeft: theme.spacing[2],
				},
			},
			iconOnly: {
				true: {
					marginLeft: 0,
				},
			},
		},
	}),
	loader: (iconOnly: boolean) => ({
		marginRight: iconOnly ? 0 : theme.spacing[2],
	}),
}));

const getButtonIndicatorColor = (
	theme: FleetTheme,
	variant: ButtonVariant,
	colorScheme: ButtonColorScheme
) => {
	if (variant === 'flat' || variant === 'faded') {
		return theme.colors.text[1];
	}

	const isFilled = variant === 'filled';

	switch (colorScheme) {
		case 'primary':
			return isFilled
				? theme.colors.action.primary.foreground
				: theme.colors.action.primary.default;
		case 'secondary':
		case 'neutral':
			return isFilled
				? theme.colors.action.secondary.foreground
				: theme.colors.action.secondary.default;
		case 'danger':
			return isFilled
				? theme.colors.action.danger.foreground
				: theme.colors.action.danger.default;
		case 'success':
			return theme.colors.status.success.fg;
		case 'warning':
			return theme.colors.status.warning.fg;
		case 'info':
			return theme.colors.status.info.fg;
		default:
			return theme.colors.action.primary.default;
	}
};

const getContentLabel = (
	children: ReactNode,
	ariaLabel?: string,
	accessibilityLabel?: string
) => {
	if (ariaLabel) {
		return ariaLabel;
	}

	if (accessibilityLabel) {
		return accessibilityLabel;
	}

	if (typeof children === 'string') {
		return children;
	}

	return undefined;
};

export const Button = forwardRef<RNView, ButtonProps>((props, ref) => {
	const {
		colorScheme = 'primary',
		variant = 'filled',
		size = 'md',
		shadow = 'none',
		rounded = 'md',
		fullWidth = false,
		loading = false,
		iconOnly = false,
		leftIcon,
		rightIcon,
		children,
		accessibilityLabel,
		'aria-label': ariaLabel,
		testID,
		style,
		disabled,
		onPress,
		onPressIn,
		onPressOut,
		...rest
	} = props;

	const { theme } = useUnistyles();
	const isDisabled = Boolean(disabled || loading);
	const label = getContentLabel(children, ariaLabel, accessibilityLabel);

	buttonStyles.useVariants({
		colorScheme,
		size,
		variant,
		iconOnly,
		rounded,
		shadow,
		fullWidth,
		disabled: isDisabled,
	});

	if (__DEV__ && iconOnly && !label) {
		// biome-ignore lint/suspicious/noConsole: Development-time accessibility guidance
		console.warn(
			'Button: `accessibilityLabel` or `aria-label` is required when `iconOnly` is true.'
		);
	}

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
			if (isDisabled) return;
			onPressIn?.(event);
		},
		[isDisabled, onPressIn]
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
			onPressOut?.(event);
		},
		[onPressOut]
	);

	const handlePress = useCallback(
		(event: GestureResponderEvent) => {
			if (isDisabled) {
				event.preventDefault();
				return;
			}
			onPress?.(event);
		},
		[isDisabled, onPress]
	);

	const indicatorColor = useMemo(
		() => getButtonIndicatorColor(theme, variant, colorScheme),
		[theme, variant, colorScheme]
	);

	const resolvedChildren =
		typeof children === 'string' ? (
			<Text
				numberOfLines={1}
				ellipsizeMode="tail"
				style={buttonStyles.buttonText}
			>
				{children}
			</Text>
		) : (
			children
		);

	if (__DEV__ && iconOnly && typeof children === 'string') {
		// biome-ignore lint/suspicious/noConsole: Development-time UI guidance
		console.warn('Button: iconOnly buttons should render an icon element.');
	}

	const renderLeftIcon = () => {
		if (loading) {
			return (
				<ActivityIndicator
					style={buttonStyles.loader(iconOnly)}
					size="small"
					color={indicatorColor}
					testID={testID ? `${testID}-loader` : undefined}
				/>
			);
		}

		if (iconOnly || !leftIcon) {
			return null;
		}

		return (
			<View style={buttonStyles.leftIcon(size, iconOnly)}>{leftIcon}</View>
		);
	};

	const renderRightIcon = () => {
		if (iconOnly || loading || !rightIcon) {
			return null;
		}

		return (
			<View style={buttonStyles.rightIcon(size, iconOnly)}>{rightIcon}</View>
		);
	};

	const accessibilityState = {
		disabled: isDisabled,
		busy: loading,
	};

	return (
		<Pressable
			ref={ref}
			accessibilityRole="button"
			accessibilityLabel={label}
			accessibilityState={accessibilityState}
			testID={testID}
			disabled={isDisabled}
			style={[buttonStyles.container, style]}
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...rest}
		>
			{renderLeftIcon()}
			{iconOnly ? children : resolvedChildren}
			{renderRightIcon()}
		</Pressable>
	);
});

Button.displayName = 'Button';
