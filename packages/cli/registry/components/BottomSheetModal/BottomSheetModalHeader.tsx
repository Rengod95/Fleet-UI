import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { BottomSheetModalHeaderProps } from './BottomSheetModal.types';

export const BottomSheetModalHeader = ({
	title,
	subtitle,
	actionIcon,
	size = 'md',
	alignment = 'start',
	children,
	titleStyle,
	subtitleStyle,
	iconWrapperStyle,
	style,
	...props
}: BottomSheetModalHeaderProps) => {
	styles.useVariants({ size, alignment });

	return (
		<View {...props} style={[styles.container, style]}>
			{actionIcon && (
				<View style={[styles.actionIconWrapper, iconWrapperStyle]}>
					{actionIcon}
				</View>
			)}
			{(title || subtitle) && (
				<View style={styles.titleWrapper}>
					{title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
					{subtitle && (
						<Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
					)}
				</View>
			)}
			{children}
		</View>
	);
};

BottomSheetModalHeader.displayName = 'BottomSheetModalHeader';

const styles = StyleSheet.create((theme) => ({
	container: {
		backgroundColor: 'transparent',
		paddingHorizontal: theme.spacing[7],
		paddingTop: theme.spacing[8],
		paddingBottom: theme.spacing[7],
		gap: theme.spacing[4],
		variants: {
			size: {
				sm: {
				},
				md: {
				},
				lg: {
				},
			},
		},
	},
	actionIconWrapper: {
		alignItems: 'center',
		marginBottom: theme.spacing[4],
		justifyContent: 'center',
		variants: {
			alignment:{
				center: {
					alignItems: 'center',
				},
				start: {
					alignItems: 'flex-start',
				},
				end: {
					alignItems: 'flex-end',
				},
			}
		}
	},
	titleWrapper: {
		gap: theme.spacing[1],
		variants: {
			alignment: {
				center: {
					alignItems: 'center',
				},
				start: {
					alignItems: 'flex-start',
				},
				end: {
					alignItems: 'flex-end',
				},
			},
		},
	},
	title: {
		color: theme.colors.neutral.text_1,
		variants: {
			size: {
				sm: {
					...theme.typography.h6,
					fontWeight: theme.text.fontWeight.bold,
				},
				md: {
					...theme.typography.h5,
					fontWeight: theme.text.fontWeight.bold,
				},
				lg: {
					...theme.typography.h4,
					fontWeight: theme.text.fontWeight.bold,
				},
			},
		},
	},
	subtitle: {
		...theme.typography.body1,
		color: theme.colors.neutral.text_3,
		variants: {
			size: {
				sm: {
					...theme.typography.body2,
				},
				md: {
					...theme.typography.body1,
				},
				lg: {
					...theme.typography.body1,
				},
			},
			
		},
	},
}));
