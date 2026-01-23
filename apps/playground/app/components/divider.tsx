import {
	Divider,
	type DividerColorScheme,
	type DividerSize,
	type DividerVariant,
} from '@fleet-ui/components';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';
import { DividerHorizontalMargin } from '@fleet-ui/components/src/Divider/Divider.types';

const VARIANTS: DividerVariant[] = ['line', 'thick'];
const SIZES: DividerSize[] = ['sm', 'md', 'lg'];
const PADDED: DividerHorizontalMargin[] = ['none', 'sm', 'md', 'lg'];
const COLOR_SCHEMES: DividerColorScheme[] = ['base', 'inverted'];

export default function DividerExamplesScreen() {
	const { theme } = useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Divider"
					description="Separate content sections with a visual horizontal line. Supports line (thin) and thick (thick) styles."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Basic Divider example (line variant)."
				>
					<Text style={commonStyles.label}>Divider</Text>
					<Divider variant="line" />
				</Section>

				{/* Variants */}
				<Section
					title="Variants"
					description="line: thin horizontal line, thick: thick horizontal line for section separation"
				>
					<Text style={commonStyles.label}>line (default)</Text>
					<Divider variant="line" />
					<Text style={commonStyles.label}>thick</Text>
					<Divider variant="thick" />
				</Section>

				{/* Sizes - Line Variant */}
				<Section
					title="Sizes (line variant)"
					description="sm: hairlineWidth, md: 1px (default), lg: 4px"
				>
					{SIZES.map((size) => (
						<>
							<Text style={commonStyles.label}>size: {size}</Text>
							<Divider variant="line" size={size} />
						</>
					))}
				</Section>

				{/* Sizes - Thick Variant */}
				<Section
					title="Sizes (thick variant)"
					description="sm: 4px, md: 16px (default), lg: 24px"
				>
					{SIZES.map((size) => (
						<>
							<Text style={commonStyles.label}>size: {size}</Text>
							<Divider variant="thick" size={size} />
						</>
					))}
				</Section>

				{/* Padded */}
				<Section
					title="Horizontal Margin"
					description="Apply horizontal margin to adjust the width of the divider."
				>
					{PADDED.map((padded) => (
						<View style={{width: '100%', gap: theme.spacing[5]}}>
							<Text style={commonStyles.label}>{padded}</Text>
							<Divider horizontalMargin={padded} />
						</View>
					))}
				</Section>

				{/* Padded with Thick Variant */}
				<Section
					title="Horizontal Margin + Thick"
					description="Apply horizontal margin to the thick divider."
				>
					{PADDED.map((padded) => (
						<View style={{width: '100%', gap: theme.spacing[5]}}>
							<Text style={commonStyles.label}>{padded}</Text>
							<Divider variant="thick" size="sm" horizontalMargin={padded} />
						</View>
					))}
				</Section>

				{/* Color Schemes */}
				<Section
					title="Color Schemes"
					description="base: default color, inverted: theme inversion (use ScopedTheme)"
				>
					<>
						<Text style={commonStyles.label}>inverted: false (default)</Text>
						<Divider inverted={false} />
					</>

					<>
						<Text style={commonStyles.label}>inverted: true</Text>
						<Divider inverted={true} />
					</>
				</Section>

				{/* Inverted on Dark Background */}
				<Section
					title="Inverted Example"
					description="Use inverted on dark background"
				>
					<View
						style={[
							styles.darkBackground,
							{ backgroundColor: theme.colors.neutral.content_inversed },
						]}
					>
						<Text
							style={[
								styles.darkBackgroundText,
								{ color: theme.colors.neutral.text_inversed },
							]}
						>
							Dark Background
						</Text>
						<Divider inverted={true} />
						<Text
							style={[
								styles.darkBackgroundText,
								{ color: theme.colors.neutral.text_inversed },
							]}
						>
							Content After Divider
						</Text>
					</View>
				</Section>

				{/* Use Cases */}
				<Section title="Use Cases" description="Real-world usage scenario examples">
					<View style={{width: '100%', gap: theme.spacing[5]}}>
					{/* List Item Separation */}
					<Text
						style={[
							commonStyles.label,
							{ color: theme.colors.neutral.text_1, marginTop: 12 },
						]}
					>
						1. List item separation
					</Text>
					<View style={styles.listContainer}>
						<View style={styles.listItem}>
							<Text style={{ color: theme.colors.neutral.text_1 }}>Item 1</Text>
						</View>
						<Divider size="sm" />
						<View style={styles.listItem}>
							<Text style={{ color: theme.colors.neutral.text_1 }}>Item 2</Text>
						</View>
						<Divider size="sm" />
						<View style={styles.listItem}>
							<Text style={{ color: theme.colors.neutral.text_1 }}>Item 3</Text>
						</View>
					</View>

					{/* Section Separation */}
					<Text
						style={[
							commonStyles.label,
							{ color: theme.colors.neutral.text_1, marginTop: 12 },
						]}
					>
						2. Section separation
					</Text>
					<View style={styles.sectionContainer}>
						<View style={styles.section}>
							<Text
								style={[
									styles.sectionTitle,
									{ color: theme.colors.neutral.text_1 },
								]}
							>
								Section A
							</Text>
							<Text style={{ color: theme.colors.neutral.text_2 }}>
								Section A content goes here...
							</Text>
						</View>
						<Divider variant="thick" size="md" />
						<View style={styles.section}>
							<Text
								style={[
									styles.sectionTitle,
									{ color: theme.colors.neutral.text_1 },
								]}
							>
								Section B
							</Text>
							<Text style={{ color: theme.colors.neutral.text_2 }}>
								Section B content goes here...
							</Text>
						</View>
					</View>

					{/* Card Internal Separation */}
					<Text
						style={[
							commonStyles.label,
							{ color: theme.colors.neutral.text_1, marginTop: 12 },
						]}
					>
						3. Card internal separation (padding applied)
					</Text>
					<View
						style={[
							styles.cardContainer,
							{
								backgroundColor: theme.colors.neutral.content_1,
								borderColor: theme.colors.neutral.border_default,
							},
						]}
					>
						<Text
							style={[styles.cardTitle, { color: theme.colors.neutral.text_1 }]}
						>
							Card Title
						</Text>
						<Divider horizontalMargin="md" />
						<Text style={{ color: theme.colors.neutral.text_2 }}>
							Card content with padded divider that doesn't extend to the edges.
						</Text>
					</View>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	demoContainer: {
		marginBottom: 16,
	},
	label: {
		...commonStyles.label,
		marginBottom: 8,
	},
	darkBackground: {
		padding: 16,
		borderRadius: theme.rounded.md,
		gap: 12,
	},
	darkBackgroundText: {
		fontSize: theme.typography.body2.fontSize,
	},
	useCaseTitle: {
		fontSize: theme.typography.body1.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
		marginBottom: 12,
	},
	listContainer: {
		borderRadius: theme.rounded.md,
		overflow: 'hidden',
	},
	listItem: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	sectionContainer: {
		gap: 0,
	},
	section: {
		borderColor: theme.colors.neutral.border_subtle,
		paddingVertical: theme.spacing[6],
		paddingHorizontal: theme.spacing[6],
	},
	sectionTitle: {
		fontSize: theme.typography.h4.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
		marginBottom: 8,
	},
	cardContainer: {
		borderRadius: theme.rounded.lg,
		boxShadow: theme.shadows.smooth_md,
		padding: 16,
		gap: 12,
	},
	cardTitle: {
		fontSize: theme.typography.h4.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
	},
	combinationGroup: {
		marginBottom: 24,
	},
	combinationTitle: {
		fontSize: theme.typography.body2Strong.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
		marginBottom: 12,
		textTransform: 'uppercase',
	},
}));
