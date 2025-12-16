import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../common/views';

export default function ThemeDemo() {
	const { theme } = useUnistyles();

	return (
		<ScrollView
			style={commonStyles.container}
			contentContainerStyle={{ paddingBottom: 40 }}
		>
			<View style={commonStyles.content}>
				<PageHeader
					title="Fleet UI Theme Demo"
					description="Powered by react-native-unistyles. This page demonstrates the available design tokens including colors, typography, spacing, border radius, and shadows."
				/>

				{/* Colors Demo */}
				<Section title="Colors" description="Semantic color palette">
					<View style={styles.groupContainer}>
						{Object.entries(theme.colors).map(([category, values]) => {
							if (typeof values !== 'object' || !values) return null;

							// Filter out non-color values if any, though our types say it's all colors
							return (
								<View key={category} style={styles.categoryContainer}>
									<Text style={styles.categoryTitle}>{category}</Text>
									<View style={commonStyles.row}>
										{Object.entries(values).map(([shade, colorValue]) => (
											<View key={shade} style={styles.swatchContainer}>
												<View
													style={[
														styles.swatch,
														{ backgroundColor: colorValue as string },
													]}
												/>
												<Text style={styles.swatchLabel}>{shade}</Text>
												<Text style={styles.swatchValue}>
													{colorValue as string}
												</Text>
											</View>
										))}
									</View>
								</View>
							);
						})}
					</View>
				</Section>

				{/* Typography Demo */}
				<Section title="Typography" description="Semantic typography scale">
					<View style={styles.groupContainer}>
						{Object.entries(theme.typography).map(([key, style]) => (
							<View key={key} style={styles.typographyRow}>
								<Text style={[style, { color: theme.colors.neutral.text_1 }]}>
									{key} • The quick brown fox jumps over the lazy dog
								</Text>
								<Text style={styles.metaText}>
									{style.fontSize}px / {style.fontWeight} / {style.lineHeight}px
								</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Spacing Demo */}
				<Section title="Spacing" description="Primitive spacing scale">
					<View style={styles.groupContainer}>
						{Object.entries(theme.spacing).map(([key, value]) => (
							<View key={key} style={styles.spacingRow}>
								<Text style={styles.labelWidth}>{key}</Text>
								<View style={styles.spacingBarContainer}>
									<View
										style={[styles.spacingBar, { width: value as number }]}
									/>
								</View>
								<Text style={styles.valueText}>{value}px</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Border Radius Demo */}
				<Section
					title="Border Radius"
					description="Corner radius tokens applied to cards"
				>
					<View style={commonStyles.row}>
						{Object.entries(theme.rounded).map(([key, value]) => (
							<View key={key} style={styles.cardContainer}>
								<View
									style={[styles.demoCard, { borderRadius: value as number }]}
								>
									<Text style={styles.cardText}>Ra</Text>
								</View>
								<Text style={styles.propLabel}>{key}</Text>
								<Text style={styles.propValue}>
									{value === 9999 ? 'full' : `${value}px`}
								</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Shadows Demo */}
				<Section
					title="Shadows"
					description="Semantic shadow tokens applied to cards"
				>
					<View style={[commonStyles.row, { gap: 24 }]}>
						{Object.entries(theme.shadows).map(([key, value]) => (
							<View key={key} style={styles.cardContainer}>
								<View
									style={[
										styles.demoCard,
										{ boxShadow: value as string },
									]}
								>
									<Text style={styles.cardText}>Sh</Text>
								</View>
								<Text style={styles.propLabel}>{key}</Text>
							</View>
						))}
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	groupContainer: {
		gap: theme.spacing[6],
	},
	categoryContainer: {
		gap: theme.spacing[3],
	},
	categoryTitle: {
		...theme.typography.h4,
		color: theme.colors.neutral.text_1,
		textTransform: 'capitalize',
	},
	swatchContainer: {
		alignItems: 'center',
		gap: theme.spacing[1],
		width: 100,
	},
	swatch: {
		width: 60,
		height: 60,
		borderRadius: theme.rounded.md,
	},
	swatchLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_1,
		textAlign: 'center',
	},
	swatchValue: {
		...theme.typography.caption2,
		color: theme.colors.neutral.text_3,
		textAlign: 'center',
		fontSize: 10,
	},
	typographyRow: {
		gap: theme.spacing[1],
		paddingBottom: theme.spacing[2],
	},
	metaText: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
	},
	spacingRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[3],
	},
	labelWidth: {
		width: 40,
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
	},
	spacingBarContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	spacingBar: {
		height: 16,
		backgroundColor: theme.colors.primary.solid,
		borderRadius: theme.rounded._2xs,
		minWidth: 1,
	},
	valueText: {
		width: 40,
		textAlign: 'right',
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
	},
	cardContainer: {
		alignItems: 'center',
		gap: theme.spacing[2],
		width: 100,
		marginBottom: theme.spacing[2],
	},
	demoCard: {
		width: 80,
		height: 80,
		backgroundColor: theme.colors.neutral.content_1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: theme.rounded.md,
	},
	cardText: {
		...theme.typography.h4,
		color: theme.colors.neutral.text_3,
	},
	propLabel: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_1,
		textAlign: 'center',
	},
	propValue: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
		textAlign: 'center',
	},
}));
