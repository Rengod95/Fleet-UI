import { Card } from '@fleet-ui/components';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const VARIANTS = ['base', 'fade', 'outlined', 'flat'] as const;
const COLOR_SCHEMES = [
	'neutral',
	'primary',
	'error',
	'success',
	'warning',
	'info',
] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const ROUNDED = [
	'none',
	'_2xs',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'_2xl',
	'full',
] as const;
const SHADOWS = [
	'none',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'smooth_lg',
] as const;

export default function CardScreen() {
	useUnistyles();

	return (
		<ScrollView
			style={commonStyles.container}
			contentContainerStyle={commonStyles.content}
		>
			<PageHeader
				title="Card"
				description="A versatile container component for grouping related content."
			/>

			{/* Variants */}
			<Section
				title="Variants"
				description="Visual style variations of the Card."
			>
				<View style={commonStyles.fullWidthContainer}>
					{VARIANTS.map((variant) => (
						<Card key={variant} variant={variant}>
							<Text style={styles.cardLabel}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Text>
							<Text style={styles.cardDescription}>variant="{variant}"</Text>
						</Card>
					))}
				</View>
			</Section>

			{/* Color Schemes for each variant */}
			{VARIANTS.map((variant) => (
				<Section
					key={variant}
					title={`Colors - ${variant}`}
					description={`Color scheme variations for ${variant} variant.`}
				>
					<View style={commonStyles.fullWidthContainer}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<Card
								key={`${variant}-${colorScheme}`}
								variant={variant}
								colorScheme={colorScheme}
							>
								<Text style={styles.cardLabel}>
									{colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}
								</Text>
							</Card>
						))}
					</View>
				</Section>
			))}

			{/* Sizes */}
			<Section
				title="Sizes"
				description="Different padding and minimum height options."
			>
				<View style={commonStyles.fullWidthContainer}>
					{SIZES.map((size) => (
						<Card key={size} size={size} variant="outlined">
							<Text style={styles.cardLabel}>Size: {size.toUpperCase()}</Text>
						</Card>
					))}
				</View>
			</Section>

			{/* Rounded */}
			<Section
				title="Rounded"
				description="Border radius variations with continuous curve."
			>
				<View style={commonStyles.row}>
					{ROUNDED.map((rounded) => (
						<Card
							key={rounded}
							rounded={rounded}
							variant="outlined"
							size="sm"
							fullWidth={false}
						>
							<Text style={styles.cardLabel}>{rounded}</Text>
						</Card>
					))}
				</View>
			</Section>

			{/* Shadows */}
			<Section title="Shadows" description="Shadow elevation levels.">
				<View style={[commonStyles.fullWidthContainer, { gap: 24 }]}>
					{SHADOWS.map((shadow) => (
						<Card key={shadow} shadow={shadow} variant="base">
							<Text style={styles.cardLabel}>shadow="{shadow}"</Text>
						</Card>
					))}
				</View>
			</Section>

			{/* Full Width */}
			<Section title="Full Width" description="Width behavior control.">
				<View style={commonStyles.fullWidthContainer}>
					<Card variant="outlined" fullWidth={true}>
						<Text style={styles.cardLabel}>fullWidth=true (default)</Text>
					</Card>
					<Card variant="outlined" fullWidth={false}>
						<Text style={styles.cardLabel}>fullWidth=false</Text>
					</Card>
				</View>
			</Section>

			{/* Combined Example */}
			<Section
				title="Combined Example"
				description="Using multiple props together."
			>
				<View style={[commonStyles.fullWidthContainer, { gap: 16 }]}>
					<Card
						variant="fade"
						colorScheme="primary"
						size="lg"
						rounded="xl"
						shadow="md"
					>
						<Text style={styles.cardTitle}>Premium Card</Text>
						<Text style={styles.cardDescription}>
							variant="fade" colorScheme="primary" size="lg" rounded="xl"
							shadow="md"
						</Text>
					</Card>
					<Card
						variant="outlined"
						colorScheme="success"
						size="md"
						rounded="lg"
						shadow="sm"
					>
						<Text style={styles.cardTitle}>Success Card</Text>
						<Text style={styles.cardDescription}>
							variant="outlined" colorScheme="success" size="md" rounded="lg"
							shadow="sm"
						</Text>
					</Card>
					<Card variant="flat" colorScheme="error" size="sm" rounded="md">
						<Text style={styles.cardTitle}>Error Card</Text>
						<Text style={styles.cardDescription}>
							variant="flat" colorScheme="error" size="sm" rounded="md"
						</Text>
					</Card>
				</View>
			</Section>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	cardLabel: {
		...theme.typography.body2,
		fontWeight: '600',
		color: theme.colors.neutral.text_1,
	},
	cardTitle: {
		...theme.typography.body1,
		fontWeight: '700',
		color: theme.colors.neutral.text_1,
		marginBottom: theme.spacing[2],
	},
	cardDescription: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
	},
}));
