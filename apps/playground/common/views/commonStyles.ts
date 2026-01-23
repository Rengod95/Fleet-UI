import { StyleSheet } from 'react-native-unistyles';

export const commonStyles = StyleSheet.create((theme, rt) => ({
	container: {
		paddingTop: rt.insets.top,
		paddingBottom: rt.insets.bottom,
		flex: 1,
		backgroundColor: theme.colors.background,

	},
	content: {
		padding: theme.spacing[5],
		gap: theme.spacing[7],
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing[6],
	},
	fullWidthContainer: {
		width: '100%',
		padding: theme.spacing[4],
		gap: theme.spacing[5],
		alignItems: 'center',
		justifyContent: 'center',
		
	},
	column: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		gap: theme.spacing[5],
	},
	label: {
		alignSelf: 'flex-start',
		marginBottom: theme.spacing[4],
		...theme.typography.body3,
		fontWeight: theme.text.fontWeight.semibold,
		color: theme.colors.neutral.text_4,
	},
}));
