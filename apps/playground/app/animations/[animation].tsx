import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AnimationDetail() {
	const { animation } = useLocalSearchParams<{ animation: string }>();

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>{animation}</Text>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>About</Text>
					<Text style={styles.description}>
						This is the detail page for the {animation} animation preset.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Demo</Text>
					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>
							Animation demo will appear here once you implement the {animation}{' '}
							animation.
						</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Usage</Text>
					<View style={styles.codeBlock}>
						<Text style={styles.code}>
							{`import { use${animation.charAt(0).toUpperCase() + animation.slice(1)}In } from '@fleet-ui/animations';\n\nfunction MyComponent() {\n  const { animatedStyle } = use${animation.charAt(0).toUpperCase() + animation.slice(1)}In();\n  \n  return (\n    <Animated.View style={animatedStyle}>\n      {/* content */}\n    </Animated.View>\n  );\n}`}
						</Text>
					</View>
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
		fontSize: 28,
		fontWeight: '700',
		color: '#000',
		marginBottom: 24,
		textTransform: 'capitalize',
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
		marginBottom: 12,
	},
	description: {
		fontSize: 14,
		color: '#666',
		lineHeight: 20,
	},
	placeholder: {
		backgroundColor: '#fff',
		padding: 40,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#e0e0e0',
		borderStyle: 'dashed',
		height: 200,
	},
	placeholderText: {
		fontSize: 14,
		color: '#999',
		textAlign: 'center',
		lineHeight: 20,
	},
	codeBlock: {
		backgroundColor: '#1e1e1e',
		padding: 16,
		borderRadius: 8,
	},
	code: {
		color: '#d4d4d4',
		fontSize: 12,
		fontFamily: 'monospace',
		lineHeight: 18,
	},
});
