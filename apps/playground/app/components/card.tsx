import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CardPlaceholderScreen() {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Card</Text>
				<Text style={styles.description}>
					The Card component is not implemented yet in @fleet-ui/components.
					Once it is available, this screen can showcase its variants and
					examples.
				</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	content: {
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: '#000',
		marginBottom: 16,
	},
	description: {
		fontSize: 14,
		color: '#666',
		lineHeight: 20,
	},
});


