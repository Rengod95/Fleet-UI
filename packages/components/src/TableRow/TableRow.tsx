import type React from 'react';
import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type {
	TableRowComponent,
	TableRowLabelProps,
	TableRowProps,
	TableRowValueProps,
} from './TableRow.types';

const isTextContent = (content: React.ReactNode): boolean => {
	return typeof content === 'string' || typeof content === 'number';
};

// ============================================================================
// TableRow Main Component
// ============================================================================

export const TableRowBase = forwardRef<View, TableRowProps>((props, ref) => {
	const {
		left,
		right,
		align = 'space-between',
		leftRatio,
		colorScheme = 'neutral',
		size = 'md',
		leftVariant = 'ghost',
		rightVariant = 'ghost',
		highlightLeft = false,
		highlightRight = false,
		style,
		leftStyle,
		rightStyle,
		leftTextStyle,
		rightTextStyle,
		disableLeftTextStyle = false,
		disableRightTextStyle = false,
		...restProps
	} = props;

	styles.useVariants({
		colorScheme,
		leftVariant,
		rightVariant,
		size,
		align,
		highlightLeft,
		highlightRight,
	});

	const renderLeft = () => {
		const shouldApplyLeftRatio = align === 'left' && leftRatio !== undefined;
		const leftContainerStyle = [
			styles.leftContainer({
				hasRatio: shouldApplyLeftRatio,
			}),
			shouldApplyLeftRatio ? { width: `${leftRatio}%` as const } : undefined,
			leftStyle,
		];

		if (isTextContent(left)) {
			return (
				<View style={leftContainerStyle}>
					<Text
						style={
							disableLeftTextStyle
								? leftTextStyle
								: [styles.leftText, leftTextStyle]
						}
					>
						{left}
					</Text>
				</View>
			);
		}

		return <View style={leftContainerStyle}>{left}</View>;
	};

	const renderRight = () => {
		const rightContainerStyle = [
			styles.rightContainer({
				align,
			}),
			rightStyle,
		];

		if (isTextContent(right)) {
			return (
				<View style={rightContainerStyle}>
					<Text
						style={
							disableRightTextStyle
								? rightTextStyle
								: [styles.rightText, rightTextStyle]
						}
					>
						{right}
					</Text>
				</View>
			);
		}

		return <View style={rightContainerStyle}>{right}</View>;
	};

	return (
		<View ref={ref} style={[styles.container, style]} {...restProps}>
			{renderLeft()}
			{renderRight()}
		</View>
	);
});

TableRowBase.displayName = 'TableRowBase';

// ============================================================================
// TableRowLabel Component
// ============================================================================

export const TableRowLabel = forwardRef<View, TableRowLabelProps>(
	(props, ref) => {
		const {
			children,
			style,
			textStyle,
			disableTextStyle = false,
			colorScheme = 'neutral',
			size = 'md',
			variant = 'ghost',
			highlight = false,
			...restProps
		} = props;

		styles.useVariants({
			colorScheme,
			leftVariant: variant,
			rightVariant: 'ghost',
			size,
			align: 'space-between',
			highlightLeft: highlight,
			highlightRight: false,
		});

		return (
			<View
				ref={ref}
				style={[styles.leftContainer({ hasRatio: false }), style]}
				{...restProps}
			>
				{isTextContent(children) ? (
					<Text
						style={
							disableTextStyle ? textStyle : [styles.leftText, textStyle]
						}
					>
						{children}
					</Text>
				) : (
					children
				)}
			</View>
		);
	}
);

TableRowLabel.displayName = 'TableRowLabel';

// ============================================================================
// TableRowValue Component
// ============================================================================

export const TableRowValue = forwardRef<View, TableRowValueProps>(
	(props, ref) => {
		const {
			children,
			style,
			textStyle,
			disableTextStyle = false,
			colorScheme = 'neutral',
			size = 'md',
			variant = 'ghost',
			highlight = false,
			align = 'space-between',
			...restProps
		} = props;

		styles.useVariants({
			colorScheme,
			leftVariant: 'ghost',
			rightVariant: variant,
			size,
			align,
			highlightLeft: false,
			highlightRight: highlight,
		});

		return (
			<View
				ref={ref}
				style={[styles.rightContainer({ align }), style]}
				{...restProps}
			>
				{isTextContent(children) ? (
					<Text
						style={
							disableTextStyle ? textStyle : [styles.rightText, textStyle]
						}
					>
						{children}
					</Text>
				) : (
					children
				)}
			</View>
		);
	}
);

TableRowValue.displayName = 'TableRowValue';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme, _rt) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	// Generate compound variants for left/right containers with colorScheme
	const leftContainerCompoundVariants = paletteEntries.flatMap(
		([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					leftVariant: 'outlined' as const,
					styles: {
						borderColor: palette.border_subtle,
					},
				},
				{
					colorScheme: scheme,
					leftVariant: 'ghost' as const,
					styles: {
						backgroundColor: 'transparent',
					},
				},
				{
					colorScheme: scheme,
					leftVariant: 'flat' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.content_1
							: palette.content_2,
					},
				},
			];
		}
	);

	const rightContainerCompoundVariants = paletteEntries.flatMap(
		([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					rightVariant: 'outlined' as const,
					styles: {
						borderColor: palette.border_subtle,
					},
				},
				{
					colorScheme: scheme,
					rightVariant: 'ghost' as const,
					styles: {
						backgroundColor: 'transparent',
					},
				},
				{
					colorScheme: scheme,
					rightVariant: 'flat' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.content_1
							: palette.content_2,
					},
				},
			];
		}
	);

	return {
		container: {
			flexDirection: 'row',
			alignItems: 'center',

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
						paddingVertical: theme.spacing[2],
						gap: theme.spacing[4],
						minHeight: 32,
					},
					md: {
						paddingVertical: theme.spacing[3],
						gap: theme.spacing[5],
						minHeight: 40,
					},
					lg: {
						paddingVertical: theme.spacing[4],
						gap: theme.spacing[6],
						minHeight: 48,
					},
				},
				align: {
					left: {
						justifyContent: 'flex-start',
					},
					'space-between': {
						justifyContent: 'space-between',
					},
				},
				leftVariant: {
					ghost: {},
					outlined: {},
					flat: {},
				},
				rightVariant: {
					ghost: {},
					outlined: {},
					flat: {},
				},
				highlightLeft: {
					true: {},
					false: {},
				},
				highlightRight: {
					true: {},
					false: {},
				},
			},
		},

		leftContainer: ({ hasRatio }: { hasRatio: boolean }) => ({
			flexShrink: hasRatio ? 0 : 1,
			borderRadius: theme.rounded.sm,
			borderCurve: 'continuous' as const,
			// backgroundColor: 'transparent',

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					warning: {},
					success: {},
					info: {},
				},
				leftVariant: {
					ghost: {
						backgroundColor: 'transparent',
					},
					outlined: {
						backgroundColor: 'transparent',
						borderWidth: StyleSheet.hairlineWidth,
						borderColor: theme.colors.neutral.border_default,
						paddingHorizontal: theme.spacing[3],
						paddingVertical: theme.spacing[2],
					},
					flat: {
						backgroundColor: theme.colors.neutral.content_3,
						paddingHorizontal: theme.spacing[3],
						paddingVertical: theme.spacing[2],
					},
				},
			},

			compoundVariants: leftContainerCompoundVariants,
		}),

		rightContainer: ({ align }: { align: 'left' | 'space-between' }) => ({
			flexShrink: align === 'left' ? 1 : 0,
			borderRadius: theme.rounded.sm,
			borderCurve: 'continuous' as const,

			variants: {
				colorScheme: {
					primary: {},
					neutral: {},
					error: {},
					warning: {},
					success: {},
					info: {},
				},
				rightVariant: {
					ghost: {
						backgroundColor: 'transparent',
					},
					outlined: {
						backgroundColor: 'transparent',
						borderWidth: StyleSheet.hairlineWidth,
						borderColor: theme.colors.neutral.border_default,
						paddingHorizontal: theme.spacing[3],
						paddingVertical: theme.spacing[2],
					},
					flat: {
						backgroundColor: theme.colors.neutral.content_2,
						paddingHorizontal: theme.spacing[3],
						paddingVertical: theme.spacing[2],
					},
				},
			},

			compoundVariants: rightContainerCompoundVariants,
		}),

		leftText: {
			color: theme.colors.neutral.text_4,
			fontWeight: theme.text.fontWeight.regular,

			variants: {
				leftVariant: {
					ghost: {},
					outlined: {},
					flat: {},
				},
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
						...theme.typography.caption1,
					},
					md: {
						...theme.typography.body3,
					},
					lg: {
						...theme.typography.body2,
					},
				},
				highlightLeft: {
					true: {},
					false: {},
				},
			},
			compoundVariants: [
				{
					highlightLeft: true,
					styles: {
						fontWeight: theme.text.fontWeight.semibold,
					},
				},
				{
					highlightLeft: false,
					styles: {
						fontWeight: theme.text.fontWeight.regular,
					},
				},
			],
		},

		rightText: {
			color: theme.colors.neutral.text_1,
			fontWeight: theme.text.fontWeight.regular,

			variants: {
				size: {
					sm: {
						...theme.typography.caption1,
					},
					md: {
						...theme.typography.body3,
					},
					lg: {
						...theme.typography.body2,
					},
				},
				highlightRight: {
					true: {},
					false: {},
				},
			},

			compoundVariants: [
				{
					highlightRight: true,
					styles: {
						fontWeight: theme.text.fontWeight.semibold,
					},
				},
				{
					highlightRight: false,
					styles: {
						fontWeight: theme.text.fontWeight.regular,
					},
				},
			],
		},
	};
});

export const TableRow = Object.assign(TableRowBase, {
	Label: TableRowLabel,
	Value: TableRowValue,
}) satisfies TableRowComponent;

export { styles as tableRowStyles };
