import {
	Button,
	Chip,
	Icon,
	TableRow,
	type TableRowAlign,
	type TableRowColorScheme,
	type TableRowContainerVariant,
	TableRowLabel,
	type TableRowSize,
	TableRowValue,
} from '@fleet-ui/components';
import { Check, Copy, ExternalLink } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Enum Props Constants
const COLOR_SCHEMES: TableRowColorScheme[] = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
];

const SIZES: TableRowSize[] = ['sm', 'md', 'lg'];

const ALIGNS: TableRowAlign[] = ['space-between', 'left'];

const CONTAINER_VARIANTS: TableRowContainerVariant[] = [
	'ghost',
	'outlined',
	'flat',
];

export default function TableRowExamplesScreen() {
	useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="TableRow"
					description="A component that displays data in a key-value format with left (label) and right (value) aligned content. Inspired by Toss Design System TableRow."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic TableRow example."
				>
					<View style={commonStyles.fullWidthContainer}>
						<View style={[styles.exampleCard, { width:'100%'}]}>
							<Text style={styles.cardTitle}>Payment Receipt</Text>
							<TableRow rightVariant='outlined' left="Payment Method" right="TossPay" />
							<TableRow left="Payment Date" right="2024.12.06 14:30" />
							<TableRow left="Payment Status" right="Completed" />
							<TableRow leftVariant="flat" left="Amount" right="12,500$ (USD)" size="lg" />
						</View>
					</View>
				</Section>

				{/* Highlight */}
				<Section
					title="Highlight"
					description="Highlight the left or right content."
				>
					<View style={[styles.column, {width:'100%'}]}>
						<TableRow left="Default Left" right="Default Right" />
						<TableRow
							left="Left Highlighted"
							right="Default Right"
							highlightLeft={true}
						/>
						<TableRow
							left="Default Left"
							right="Right Highlighted"
							highlightRight={true}
						/>
						<TableRow
							left="Both"
							right="Both Highlighted"
							highlightLeft={true}
							highlightRight={true}
						/>
					</View>
				</Section>

				{/* Align Modes */}
				<Section
					title="Alignment"
					description="Align the left and right content to the left or space-between."
				>
					<View style={[styles.column, {width:'100%'}]}>
						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>
								space-between (default)
							</Text>
							<TableRow
								align="space-between"
								left="Recipient"
								right="John Doe"
							/>
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>left</Text>
							<TableRow align="left" left="Recipient" right="John Doe" />
						</View>

					</View>
				</Section>

				{/* Left Ratio */}
				<Section
					title="Left Ratio"
					description="Control the width ratio of the left section when align='left'."
				>
					<View style={[styles.column, {width:'100%'}]}>
						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftRatio={'{30}'}</Text>
							<TableRow
								align="left"
								leftRatio={30}
								left="Recipient"
								right="John Doe"
							/>
							<TableRow
								align="left"
								leftRatio={30}
								left="Account Number"
								right="1234567890"
							/>
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftRatio={'{50}'}</Text>
							<TableRow
								align="left"
								leftRatio={50}
								left="Recipient"
								right="John Doe"
							/>
							<TableRow
								align="left"
								leftRatio={50}
								left="Account Number"
								right="1234567890"
							/>
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftRatio={'{70}'}</Text>
							<TableRow
								align="left"
								leftRatio={70}
								left="Recipient"
								right="John Doe"
							/>
							<TableRow
								align="left"
								leftRatio={70}
								left="Account Number"
								right="1234567890"
							/>
						</View>
					</View>
				</Section>

				{/* Sizes */}
				<Section title="Sizes" description="Size variants from sm to lg.">
					<View style={[styles.column, {width:'100%'}]}>
						{SIZES.map((size) => (
							<TableRow
								key={size}
								size={size}
								left={`Size: ${size}`}
								right={`Value for ${size}`}
							/>
						))}
					</View>
				</Section>

				{/* Container Variants */}
				<Section
					title="Variants"
					description="TableRow's variant can be applied separately to left and right."
				>
					<View style={[styles.column, {width:'100%'}]}>
						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftVariant options</Text>
							{CONTAINER_VARIANTS.map((variant) => (
								<TableRow
									key={`left-${variant}`}
									leftVariant={variant}
									left={`leftVariant: ${variant}`}
									right="Default right"
								/>
							))}
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>rightVariant options</Text>
							{CONTAINER_VARIANTS.map((variant) => (
								<TableRow
									key={`right-${variant}`}
									rightVariant={variant}
									left="Default left"
									right={`rightVariant: ${variant}`}
								/>
							))}
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>mixed variants are available.</Text>
							<TableRow
								leftVariant="flat"
								rightVariant="outlined"
								left="Flat"
								right="Outlined"
							/>
							<TableRow
								leftVariant="outlined"
								rightVariant="ghost"
								left="Flat"
								right="Outlined"
							/>
							<TableRow
								leftVariant="ghost"
								rightVariant="flat"
								left="Ghost"
								right="Flat"
							/>
						</View>
					</View>
				</Section>

				{/* Color Schemes with Variants */}
				<Section
					title="Color Schemes + Variants"
					description="Colored container variants."
				>
					<View style={styles.column}>
						<TableRow
							colorScheme="success"
							leftVariant="flat"
							rightVariant="flat"
							left="Success"
							right="Verified"
						/>
						<TableRow
							colorScheme="error"
							leftVariant="outlined"
							rightVariant="outlined"
							left="Error"
							right="Failed"
						/>
						<TableRow
							colorScheme="warning"
							leftVariant="flat"
							left="Warning"
							right="Pending"
						/>
					</View>
				</Section>

				{/* Custom Content */}
				<Section
					title="Custom Content"
					description="Using React components for left/right content."
				>
					<View style={[styles.column, {width:'100%'}]}>
						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>Text style overrides are available.</Text>
							<TableRow
								left="Text style override"
								right="Primary link text"
								disableRightTextStyle
								rightTextStyle={styles.linkText}
							/>
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>left, and right prop can be passed with any ReactNode type.</Text>
							<TableRow
								left="Status"
								right={
									<Chip size="sm" colorScheme="success">
										Active
									</Chip>
								}
								disableRightTextStyle
							/>
							<TableRow
								left="Account"
								right={
									<View style={styles.row}>
										<Text style={styles.valueText}>1234-5678-9012</Text>
										<Icon icon={Copy} size="sm" />
									</View>
								}
								disableRightTextStyle
							/>
							<TableRow
								left={
									<View style={styles.row}>
										<Icon icon={Check} size="sm" />
										<Text style={styles.labelText}>Verified</Text>
									</View>
								}
								right="2024.01.15"
								disableLeftTextStyle
							/>
						</View>
					</View>
				</Section>

			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	column: {
		gap: theme.spacing[4],
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	subsection: {
		marginBottom: theme.spacing[6],
		gap: theme.spacing[1],
	},
	subsectionTitle: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
		fontWeight: theme.text.fontWeight.medium,
		marginBottom: theme.spacing[4],
	},
	exampleCard: {
		borderCurve: 'continuous',
		backgroundColor: theme.colors.neutral.content_1,
		borderRadius: theme.rounded.xl,
		padding: theme.spacing[6],
		gap: theme.spacing[3],
		boxShadow: theme.shadows.lg,
	},
	cardTitle: {
		...theme.typography.body2Strong,
		color: theme.colors.neutral.text_1,
		marginBottom: theme.spacing[2],
	},
	labelText: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_2,
	},
	valueText: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_1,
	},
	linkText: {
		...theme.typography.body3,
		color: theme.colors.primary.solid,
	},
}));
