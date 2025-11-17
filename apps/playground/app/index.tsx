import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>My UI SDK Playground</Text>
				<Text style={styles.subtitle}>Explore components and animations</Text>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Navigation</Text>

					<Link href="/components" asChild>
						<Pressable style={styles.card}>
							<View>
								<Text style={styles.cardTitle}>🎨 Components</Text>
								<Text style={styles.cardDescription}>
									Explore UI components library
								</Text>
							</View>
							<Text style={styles.arrow}>→</Text>
						</Pressable>
					</Link>

					<Link href="/animations" asChild>
						<Pressable style={styles.card}>
							<View>
								<Text style={styles.cardTitle}>✨ Animations</Text>
								<Text style={styles.cardDescription}>
									Explore animation presets and utilities
								</Text>
							</View>
							<Text style={styles.arrow}>→</Text>
						</Pressable>
					</Link>

					<Link href="/theme-demo" asChild>
						<Pressable style={styles.card}>
							<View>
								<Text style={styles.cardTitle}>🎨 Theme Demo</Text>
								<Text style={styles.cardDescription}>
									Explore Fleet UI theming with Unistyles
								</Text>
							</View>
							<Text style={styles.arrow}>→</Text>
						</Pressable>
					</Link>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>About</Text>
					<Text style={styles.description}>
						This playground demonstrates the My UI SDK - a cross-platform
						component and animation library for React and React Native.
					</Text>
					<Text style={styles.description}>
						All components work seamlessly on iOS, Android, and Web.
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
	title: {
		fontSize: 32,
		fontWeight: '700',
		color: '#000',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		marginBottom: 32,
	},
	section: {
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#000',
		marginBottom: 16,
	},
	card: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 12,
		marginBottom: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
		marginBottom: 4,
	},
	cardDescription: {
		fontSize: 14,
		color: '#666',
	},
	arrow: {
		fontSize: 24,
		color: '#007AFF',
	},
	description: {
		fontSize: 14,
		color: '#666',
		lineHeight: 20,
		marginBottom: 8,
	},
});
