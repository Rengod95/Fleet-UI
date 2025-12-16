import { StyleSheet } from 'react-native-unistyles';

export const commonStyles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.neutral.content_1,
	},
	content: {
		padding: 20,
		gap: theme.spacing[7],
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: theme.spacing[6],
	},
	fullWidthContainer: {
		gap: 8,
	},
	fullWidthButton: {
		alignSelf: 'stretch',
	},
	column: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		gap: theme.spacing[5],
	},
	label: {
		marginBottom: theme.spacing[4],
		...theme.typography.body3,
		fontWeight: theme.text.fontWeight.semibold,
		color: theme.colors.neutral.text_4,
	},
}));
