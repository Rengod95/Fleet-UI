import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const COMPONENTS = [
	{
		id: 'button',
		name: 'Button',
		description: 'Interactive button component',
		icon: '🔘',
	},
	{
		id: 'input',
		name: 'Input',
		description: 'Text input component',
		icon: '✏️',
	},
	{
		id: 'card',
		name: 'Card',
		description: 'Container component',
		icon: '🃏',
	},
	{
		id: 'modal',
		name: 'Modal',
		
		description: 'Overlay dialog component',
		icon: '📱',
	},
];

export default function ComponentsIndex() {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.description}>
					Browse available UI components. Tap on a component to see examples and
					usage.
				</Text>

				<View style={styles.grid}>
					{COMPONENTS.map((component) => (
						<Link
							key={component.id}
							href={`/components/${component.id}`}
							asChild
						>
							<Pressable style={styles.card}>
								<Text style={styles.icon}>{component.icon}</Text>
								<Text style={styles.cardTitle}>{component.name}</Text>
								<Text style={styles.cardDescription}>
									{component.description}
								</Text>
							</Pressable>
						</Link>
					))}
				</View>

				<View style={styles.note}>
					<Text style={styles.noteText}>
						ℹ️ Components will be available once you add them to the
						@fleet-ui/components package.
					</Text>
				</View>
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
	description: {
		fontSize: 14,
		color: '#666',
		marginBottom: 24,
		lineHeight: 20,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		marginBottom: 24,
	},
	card: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 12,
		width: '48%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	icon: {
		fontSize: 32,
		marginBottom: 8,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
		marginBottom: 4,
	},
	cardDescription: {
		fontSize: 12,
		color: '#666',
		lineHeight: 16,
	},
	note: {
		backgroundColor: '#E3F2FD',
		padding: 16,
		borderRadius: 8,
		borderLeftWidth: 4,
		borderLeftColor: '#2196F3',
	},
	noteText: {
		fontSize: 12,
		color: '#1565C0',
		lineHeight: 18,
	},
});
