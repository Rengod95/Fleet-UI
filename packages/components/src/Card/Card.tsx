import { forwardRef } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { CardProps } from './Card.types';

const cardStyles = StyleSheet.create((theme) => {
	// colorScheme + variant 조합을 위한 compoundVariants 생성
	const containerCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => [
			{
				colorScheme: scheme,
				variant: 'base' as const,
				styles: {
					backgroundColor: palette.content_1,
				},
			},
			{
				colorScheme: scheme,
				variant: 'fade' as const,
				styles: {
					backgroundColor: palette.content_2,
					borderWidth: 1,
					borderColor: palette.border_subtle,
				},
			},
			{
				colorScheme: scheme,
				variant: 'outlined' as const,
				styles: {
					backgroundColor: 'transparent',
					borderWidth: 1,
					borderColor: palette.border_default,
				},
			},
			{
				colorScheme: scheme,
				variant: 'flat' as const,
				styles: {
					backgroundColor: palette.content_2,
				},
			},
		]);

	return {
		container: {
			borderCurve: 'continuous',
			overflow: 'hidden',
			variants: {
				variant: {
					base: {},
					fade: {},
					outlined: {},
					flat: {},
				},
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				rounded: {
					none: { borderRadius: theme.rounded.none },
					_2xs: { borderRadius: theme.rounded._2xs },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
					xl: { borderRadius: theme.rounded.xl },
					_2xl: { borderRadius: theme.rounded._2xl },
					full: { borderRadius: theme.rounded.full },
				},
				size: {
					xs: {
						paddingVertical: theme.spacing[2],
						paddingHorizontal: theme.spacing[3],
						minHeight: 40,
					},
					sm: {
						paddingVertical: theme.spacing[3],
						paddingHorizontal: theme.spacing[4],
						minHeight: 56,
					},
					md: {
						paddingVertical: theme.spacing[4],
						paddingHorizontal: theme.spacing[5],
						minHeight: 72,
					},
					lg: {
						paddingVertical: theme.spacing[5],
						paddingHorizontal: theme.spacing[6],
						minHeight: 96,
					},
					xl: {
						paddingVertical: theme.spacing[6],
						paddingHorizontal: theme.spacing[7],
						minHeight: 120,
					},
				},
				fullWidth: {
					true: { width: '100%' },
					false: { alignSelf: 'flex-start' },
				},
				shadow: {
					none: {},
					xs: { boxShadow: theme.shadows.xs },
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.md },
					lg: { boxShadow: theme.shadows.lg },
					xl: { boxShadow: theme.shadows.xl },
					'2xl': { boxShadow: theme.shadows['2xl'] },
					smooth_lg: { boxShadow: theme.shadows.smooth_lg },
					inner: { boxShadow: theme.shadows.inner },
				},
			},
			compoundVariants: containerCompoundVariants,
		},
	};
});

export const Card = forwardRef<View, CardProps>((props, ref) => {
	const {
		variant = 'base',
		rounded = 'md',
		size = 'md',
		colorScheme = 'neutral',
		fullWidth = true,
		shadow = 'none',
		children,
		style,
		...restProps
	} = props;

	cardStyles.useVariants({
		variant,
		colorScheme,
		rounded,
		size,
		fullWidth,
		shadow,
	});

	return (
		<View
			ref={ref}
			style={[cardStyles.container, style]}
			accessibilityRole="none"
			{...restProps}
		>
			{children}
		</View>
	);
});

Card.displayName = 'Card';
