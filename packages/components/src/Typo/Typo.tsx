import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { TypoProps } from './Typo.types';

const styles = StyleSheet.create((theme) => {
	const paletteEntries = theme.utils.getColorSchemePaletteEntries(theme);

	const textCompoundVariants = paletteEntries.flatMap(([scheme, palette]) => {
		return [
			{
				colorScheme: scheme,
				colorWeight: 1,
				styles: {
					color: palette.text_1,
				},
			},
			{
				colorScheme: scheme,
				colorWeight: 2,
				styles: {
					color: palette.text_2,
				},
			},
			{
				colorScheme: scheme,
				colorWeight: 3,
				styles: {
					color: palette.text_3,
				},
			},
			{
				colorScheme: scheme,
				colorWeight: 4,
				styles: {
					color: palette.text_4,
				},
			},
		];
	});

	return {
		text: {
			color: theme.colors.neutral.text_1,
			variants: {
				variant: {
					h1: {
						...theme.typography.h1,
					},
					h1Strong: {
						...theme.typography.h1Strong,
					},
					h1Weak: {
						...theme.typography.h1Weak,
					},
					h2: {
						...theme.typography.h2,
					},
					h2Strong: {
						...theme.typography.h2Strong,
					},
					h2Weak: {
						...theme.typography.h2Weak,
					},
					h3: {
						...theme.typography.h3,
					},
					h3Strong: {
						...theme.typography.h3Strong,
					},
					h3Weak: {
						...theme.typography.h3Weak,
					},
					h4: {
						...theme.typography.h4,
					},
					h4Strong: {
						...theme.typography.h4Strong,
					},
					h4Weak: {
						...theme.typography.h4Weak,
					},
					h5: {
						...theme.typography.h5,
					},
					h5Strong: {
						...theme.typography.h5Strong,
					},
					h5Weak: {
						...theme.typography.h5Weak,
					},
					h6: {
						...theme.typography.h6,
					},
					h6Strong: {
						...theme.typography.h6Strong,
					},
					h6Weak: {
						...theme.typography.h6Weak,
					},
					body1: {
						...theme.typography.body1,
					},
					body1Strong: {
						...theme.typography.body1Strong,
					},
					body1Weak: {
						...theme.typography.body1Weak,
					},
					body2: {
						...theme.typography.body2,
					},
					body2Strong: {
						...theme.typography.body2Strong,
					},
					body2Weak: {
						...theme.typography.body2Weak,
					},
					body3: {
						...theme.typography.body3,
					},
					body3Strong: {
						...theme.typography.body3Strong,
					},
					body3Weak: {
						...theme.typography.body3Weak,
					},
					caption1: {
						...theme.typography.caption1,
					},
					caption1Strong: {
						...theme.typography.caption1Strong,
					},
					caption1Weak: {
						...theme.typography.caption1Weak,
					},
					caption2: {
						...theme.typography.caption2,
					},
					caption2Strong: {
						...theme.typography.caption2Strong,
					},
					caption2Weak: {
						...theme.typography.caption2Weak,
					},
					button: {
						...theme.typography.button,
					},
				},
				extend: {
					false: {
						flexShrink: 1,
						alignSelf: 'flex-start',
					},
					true: {
						width: '100%',
						// flexGrow: 1,
						alignSelf: 'stretch',
					},
				},
				colorScheme: {
					neutral: {},
					primary: {},
					error: {},
					success: {},
					warning: {},
					info: {},
				},
				colorWeight: {
					1: {},
					2: {},
					3: {},
					4: {},
				}
			},
			compoundVariants: textCompoundVariants,
		},
	};
});

export const Typo = forwardRef<RNText, TypoProps>((props, ref) => {
	const {
		variant = 'body2',
		extend = false,
		style,
		colorScheme = 'neutral',
		colorWeight = 1,
		children,
		...restProps
	} = props;

	styles.useVariants({ variant, extend, colorScheme, colorWeight });

	return (
		<RNText ref={ref} style={[styles.text, style]} {...restProps}>
			{children}
		</RNText>
	);
});

Typo.displayName = 'Typo';
