import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const ANIMATIONS = [
	{
		id: 'fade',
		name: 'Fade',
		description: 'Fade in/out animations',
		icon: '🌫️',
	},
	{
		id: 'slide',
		name: 'Slide',
		description: 'Slide animations',
		icon: '↔️',
	},
	{
		id: 'scale',
		name: 'Scale',
		description: 'Scale transformations',
		icon: '🔍',
	},
	{
		id: 'rotate',
		name: 'Rotate',
		description: 'Rotation animations',
		icon: '🔄',
	},
	{
		id: 'spring',
		name: 'Spring',
		description: 'Spring physics animations',
		icon: '🎪',
	},
];

export default function AnimationsIndex() {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.description}>
					Browse available animation presets. Tap on an animation to see
					examples and usage.
				</Text>

				<View style={styles.grid}>
					{ANIMATIONS.map((animation) => (
						<Link
							key={animation.id}
							href={`/animations/${animation.id}`}
							asChild
						>
							<Pressable style={styles.card}>
								<Text style={styles.icon}>{animation.icon}</Text>
								<Text style={styles.cardTitle}>{animation.name}</Text>
								<Text style={styles.cardDescription}>
									{animation.description}
								</Text>
							</Pressable>
						</Link>
					))}
				</View>

				<View style={styles.note}>
					<Text style={styles.noteText}>
						ℹ️ Animations will be available once you add them to the
						@fleet-ui/animations package.
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
