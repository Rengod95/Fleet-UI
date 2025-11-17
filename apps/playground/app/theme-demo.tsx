import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export default function ThemeDemo() {
	const { theme } = useUnistyles();
	const [count, setCount] = useState(0);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Fleet UI Theme Demo</Text>
				<Text style={styles.subtitle}>Powered by react-native-unistyles</Text>
			</View>

			{/* Color Palette Demo */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Color Palette</Text>
				<View style={styles.colorGrid}>
					{(['accent', 'success', 'warning', 'info', 'error'] as const).map(
						(color) => (
							<View key={color} style={styles.colorCard}>
								<View
									style={[
										styles.colorSwatch,
										{
											backgroundColor: theme.colors[color]['5'],
										},
									]}
								/>
								<Text style={styles.colorLabel}>{color}</Text>
							</View>
						)
					)}
				</View>
			</View>

			{/* Typography Demo */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Typography</Text>
				<Text style={styles.text2xs}>2XS - {theme.fontSize._2xs}px</Text>
				<Text style={styles.textXs}>XS - {theme.fontSize.xs}px</Text>
				<Text style={styles.textSm}>SM - {theme.fontSize.sm}px</Text>
				<Text style={styles.textMd}>MD - {theme.fontSize.md}px</Text>
				<Text style={styles.textLg}>LG - {theme.fontSize.lg}px</Text>
				<Text style={styles.textXl}>XL - {theme.fontSize.xl}px</Text>
			</View>

			{/* Spacing Demo */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Spacing Scale</Text>
				<View style={styles.spacingContainer}>
					{Object.entries(theme.space).map(([key, value]) => (
						<View key={key} style={styles.spacingRow}>
							<Text style={styles.spacingLabel}>{key}</Text>
							<View
								style={[styles.spacingBar, { width: (value as number) * 4 }]}
							/>
							<Text style={styles.spacingValue}>{value}px</Text>
						</View>
					))}
				</View>
			</View>

			{/* Interactive Button Demo */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Interactive Elements</Text>
				<Pressable
					style={({ pressed }) => [
						styles.button,
						pressed && styles.buttonPressed,
					]}
					onPress={() => setCount(count + 1)}
				>
					<Text style={styles.buttonText}>Pressed {count} times</Text>
				</Pressable>
			</View>

			{/* Border Radius Demo */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Border Radius</Text>
				<View style={styles.radiusGrid}>
					{Object.entries(theme.borderRadius).map(([key, value]) => (
						<View key={key} style={styles.radiusCard}>
							<View
								style={[
									styles.radiusBox,
									{
										borderRadius:
											(value as number) === 999 ? 999 : (value as number),
									},
								]}
							/>
							<Text style={styles.radiusLabel}>
								{key}: {(value as number) === 999 ? 'full' : `${value}px`}
							</Text>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.bg['1'],
	},
	header: {
		padding: theme.space.xl,
		backgroundColor: theme.colors.accent['5'],
		alignItems: 'center',
	},
	title: {
		fontSize: theme.fontSize._3xl,
		fontWeight: theme.fontWeight['700'],
		color: theme.colors.white,
		marginBottom: theme.space.xs,
	},
	subtitle: {
		fontSize: theme.fontSize.md,
		color: theme.colors.white,
		opacity: 0.9,
	},
	section: {
		padding: theme.space.xl,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.bd['1'],
	},
	sectionTitle: {
		fontSize: theme.fontSize.xl,
		fontWeight: theme.fontWeight['600'],
		color: theme.colors.text['1'],
		marginBottom: theme.space.md,
	},
	colorGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.space.md,
	},
	colorCard: {
		alignItems: 'center',
		gap: theme.space.xs,
	},
	colorSwatch: {
		width: 60,
		height: 60,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.bd['1'],
	},
	colorLabel: {
		fontSize: theme.fontSize.sm,
		color: theme.colors.text['2'],
		textTransform: 'capitalize',
	},
	text2xs: {
		fontSize: theme.fontSize._2xs,
		color: theme.colors.text['1'],
		marginBottom: theme.space.xs,
	},
	textXs: {
		fontSize: theme.fontSize.xs,
		color: theme.colors.text['1'],
		marginBottom: theme.space.xs,
	},
	textSm: {
		fontSize: theme.fontSize.sm,
		color: theme.colors.text['1'],
		marginBottom: theme.space.xs,
	},
	textMd: {
		fontSize: theme.fontSize.md,
		color: theme.colors.text['1'],
		marginBottom: theme.space.xs,
	},
	textLg: {
		fontSize: theme.fontSize.lg,
		color: theme.colors.text['1'],
		marginBottom: theme.space.xs,
	},
	textXl: {
		fontSize: theme.fontSize.xl,
		color: theme.colors.text['1'],
		marginBottom: theme.space.xs,
	},
	spacingContainer: {
		gap: theme.space.sm,
	},
	spacingRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.space.md,
	},
	spacingLabel: {
		fontSize: theme.fontSize.sm,
		color: theme.colors.text['2'],
		width: 60,
	},
	spacingBar: {
		height: 20,
		backgroundColor: theme.colors.accent['4'],
		borderRadius: theme.borderRadius._2xs,
	},
	spacingValue: {
		fontSize: theme.fontSize.sm,
		color: theme.colors.text['3'],
		width: 40,
	},
	button: {
		backgroundColor: theme.colors.accent['5'],
		paddingHorizontal: theme.space.xl,
		paddingVertical: theme.space.md,
		borderRadius: theme.borderRadius.md,
		alignItems: 'center',
	},
	buttonPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	buttonText: {
		color: theme.colors.white,
		fontSize: theme.fontSize.md,
		fontWeight: theme.fontWeight['600'],
	},
	radiusGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.space.md,
	},
	radiusCard: {
		alignItems: 'center',
		gap: theme.space.xs,
		width: 100,
	},
	radiusBox: {
		width: 60,
		height: 60,
		backgroundColor: theme.colors.info['4'],
		borderWidth: 1,
		borderColor: theme.colors.bd['1'],
	},
	radiusLabel: {
		fontSize: theme.fontSize._2xs,
		color: theme.colors.text['2'],
		textAlign: 'center',
	},
}));
