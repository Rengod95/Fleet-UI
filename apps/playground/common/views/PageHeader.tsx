import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

interface PageHeaderProps {
	title: string;
	description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
	useUnistyles();
	return (
		<View>
			<Text style={styles.pageTitle}>{title}</Text>
			<Text style={styles.pageDescription}>{description}</Text>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	pageTitle: {
		fontSize: 28,
		fontWeight: '700',
		color: theme.colors.neutral.text_1,
		marginBottom: 8,
	},
	pageDescription: {
		fontSize: 14,
		color: theme.colors.neutral.text_3,
		lineHeight: 20,
		marginBottom: 8,
	},
}));
