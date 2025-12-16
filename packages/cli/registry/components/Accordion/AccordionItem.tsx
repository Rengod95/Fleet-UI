import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import {
	AccordionItemProvider,
	useAccordionContext,
} from './Accordion.context';
import type {
	AccordionItemContextValue,
	AccordionItemProps,
} from './Accordion.types';

// ============================================================================
// Styles
// ============================================================================

export const accordionItemStyles = StyleSheet.create((theme) => {
	// Generate compound variants for colorScheme + variant + expanded
	const containerCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolid = theme.utils.paletteHasSolid(palette);

			return [
				// flat variant - expanded state
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					expanded: true,
					styles: {
						backgroundColor: hasSolid ? palette.content_2 : palette.content_2,
					},
				},
				// faded variant - expanded state
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					expanded: true,
					styles: {
						backgroundColor: palette.content_2,
						borderWidth: 1,
						borderColor: palette.border_subtle,
					},
				},
				// outlined variant - expanded state
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					expanded: true,
					styles: {
						borderWidth: 1,
						borderColor: palette.border_default,
					},
				},
				{
					colorScheme: scheme,
					variant: 'flat' as const,
					expanded: false,
					styles: {
						backgroundColor: theme.colors.neutral.content_2,
					},
				},
				// faded variant - expanded state
				{
					colorScheme: scheme,
					variant: 'faded' as const,
					expanded: false,
					styles: {
						backgroundColor: theme.colors.neutral.content_2,
						borderWidth: 1,
						borderColor: theme.colors.neutral.border_subtle,
					},
				},
				// outlined variant - expanded state
				{
					colorScheme: scheme,
					variant: 'outlined' as const,
					expanded: false,
					styles: {
						borderWidth: 1,
						borderColor: theme.colors.neutral.border_default,
					},
				},
			];
		});

	return {
		container: {
			overflow: 'hidden',
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
				variant: {
					ghost: {
						backgroundColor: 'transparent',
					},
					outlined: {
						backgroundColor: 'transparent',
						borderWidth: 1,
						borderColor: theme.colors.neutral.border_default,
					},
					flat: {
						backgroundColor: theme.colors.neutral.content_2,
					},
					faded: {
						backgroundColor: theme.colors.neutral.content_2,
						borderWidth: 1,
						borderColor: theme.colors.neutral.border_subtle,
					},
				},
				// headerContentGap이 none일 때만 root에 rounded 적용
				headerContentGap: {
					none: {},
					sm: {
						borderRadius: 0,
						borderWidth: 0,
						backgroundColor: 'transparent',
					},
					md: {
						borderRadius: 0,
						borderWidth: 0,
						backgroundColor: 'transparent',
					},
					lg: {
						borderRadius: 0,
						borderWidth: 0,
						backgroundColor: 'transparent',
					},
				},
				rounded: {
					none: { borderRadius: 0 },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
				},
				shadow: {
					none: {},
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.card },
					lg: { boxShadow: theme.shadows.lg },
				},
				expanded: {
					true: {},
					false: {},
				},
			},

			compoundVariants: [
				// headerContentGap이 none이 아니면 shadow도 root에서 제거
				{
					headerContentGap: 'sm',
					shadow: 'sm',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'sm',
					shadow: 'md',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'sm',
					shadow: 'lg',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'md',
					shadow: 'sm',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'md',
					shadow: 'md',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'md',
					shadow: 'lg',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'lg',
					shadow: 'sm',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'lg',
					shadow: 'md',
					styles: { boxShadow: 'none' },
				},
				{
					headerContentGap: 'lg',
					shadow: 'lg',
					styles: { boxShadow: 'none' },
				},
				...containerCompoundVariants,
			],
		},
		// Gap between items
		itemGap: {
			variants: {
				headerContentGap: {
					none: { gap: 0 },
					sm: { gap: theme.spacing[2] },
					md: { gap: theme.spacing[3] },
					lg: { gap: theme.spacing[4] },
				},
			},
		},
	};
});

// ============================================================================
// Component
// ============================================================================

export const AccordionItem = forwardRef<View, AccordionItemProps>(
	(props, ref) => {
		const {
			value,
			disabled = false,
			children,
			style,
			headerContentGap,
			...viewProps
		} = props;

		const { expandedValues, variant, colorScheme, shadow, rounded } =
			useAccordionContext();

		const isExpanded = expandedValues.includes(value);

		accordionItemStyles.useVariants({
			colorScheme,
			variant,
			headerContentGap,
			rounded,
			shadow,
			expanded: isExpanded,
		});

		const itemContextValue = useMemo<AccordionItemContextValue>(
			() => ({
				value,
				isExpanded,
				isDisabled: disabled,
			}),
			[value, isExpanded, disabled]
		);

		return (
			<AccordionItemProvider value={itemContextValue}>
				<View
					ref={ref}
					style={[accordionItemStyles.container, style]}
					{...viewProps}
				>
					{children}
				</View>
			</AccordionItemProvider>
		);
	}
);

AccordionItem.displayName = 'AccordionItem';
