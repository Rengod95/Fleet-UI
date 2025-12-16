
import { forwardRef } from 'react';
import {
	View,
} from 'react-native';
import { ScopedTheme, StyleSheet } from 'react-native-unistyles';
import type {
	DividerProps,
} from './Divider.types';

const dividerStyles = StyleSheet.create((theme) => ({
	container: {
		width: '100%',

		variants: {
			variant: {
				line: {
					backgroundColor: theme.colors.neutral.border_subtle,
				},
				thick: {
					backgroundColor: theme.colors.neutral.content_3,
				},
			},
			size: {
				sm: {},
				md: {},
				lg: {},
			},
			horizontalMargin: {
				none: {
					marginHorizontal: 0,
				},
				sm: {
					marginHorizontal: theme.spacing[3],
				},
				md: {
					marginHorizontal: theme.spacing[4],
				},
				lg: {
					marginHorizontal: theme.spacing[6],
				},
			},
			verticalMargin: {
				none: {
					marginVertical: 0,
				},
				sm: {
					marginVertical: theme.spacing[3],
				},
				md: {
					marginVertical: theme.spacing[4],
				},
				lg: {
					marginVertical: theme.spacing[5],
				},
				xl: {
					marginVertical: theme.spacing[8],
				},
			},
		},

		compoundVariants: [
			// line + size 조합
			{
				variant: 'line' as const,
				size: 'sm' as const,
				styles: {
					height: StyleSheet.hairlineWidth,
					backgroundColor: theme.colors.neutral.border_strong,
				},
			},
			{
				variant: 'line' as const,
				size: 'md' as const,
				styles: {
					height: 1,
					backgroundColor: theme.colors.neutral.border_subtle,
				},
			},
			{
				variant: 'line' as const,
				size: 'lg' as const,
				styles: {
					height: 3,
					backgroundColor: theme.colors.neutral.border_subtle,
				},
			},
			// thick + size 조합
			{
				variant: 'thick' as const,
				size: 'sm' as const,
				styles: {
					height: 4,
				},
			},
			{
				variant: 'thick' as const,
				size: 'md' as const,
				styles: {
					height: 15,
				},
			},
			{
				variant: 'thick' as const,
				size: 'lg' as const,
				styles: {
					height: 20,
				},
			},
			// padded가 있을 때 width 조정
			{
				horizontalMargin: 'sm' as const,
				styles: {
					width: 'auto',
				},
			},
			{
				horizontalMargin: 'md' as const,
				styles: {
					width: 'auto',
				},
			},
			{
				horizontalMargin: 'lg' as const,
				styles: {
					width: 'auto',
				},
			},
		],
	},
}));

/**
 * Divider component
 * 
 * A horizontal divider component for visually separating content areas or sections
 *
 * @example
 * ```tsx
 * // Default usage
 * <Divider />
 *
 * // Thick section divider
 * <Divider variant="thick" size="md" />
 *
 * // Horizontal margin divider
 * <Divider horizontalMargin="md" />
 * ```
 */
export const Divider = forwardRef<View, DividerProps>((props, ref) => {
	const {
		variant = 'line',
		size = 'md',
		horizontalMargin = 'none',
		colorScheme = 'base',
		style,
		testID,
		...rest
	} = props;

	dividerStyles.useVariants({
		variant,
		size,
		horizontalMargin,
	});

  return (
    <ScopedTheme invertedAdaptive={colorScheme === 'inverted'}>
      <View
        ref={ref}
        accessibilityRole="none"
        importantForAccessibility="no"
        testID={testID}
        style={[dividerStyles.container, style]}
        {...rest}
      />
    </ScopedTheme>
  );
});

Divider.displayName = 'Divider';
