import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { MenuHeaderProps } from './Menu.types';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	container: {
		paddingHorizontal: theme.spacing[4],
		paddingVertical: theme.spacing[2],
		marginBottom: theme.spacing[1],
	},
	text: {
		...theme.typography.body3,
		letterSpacing: theme.text.letterSpacing.wide,
		fontWeight: theme.text.fontWeight.semibold,
		color: theme.colors.neutral.text_4,
	},
}));

// ============================================================================
// MenuHeader Component
// ============================================================================

export const MenuHeader = ({ children, style, ...viewProps }: MenuHeaderProps) => {
	const isString = typeof children === 'string';

	return (
		<View style={styles.container} {...viewProps}>
			{isString ? (
				<Text style={[styles.text, style]}>{children}</Text>
			) : (
				children
			)}
		</View>
	);
};

MenuHeader.displayName = 'Menu.Header';
