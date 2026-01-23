import { Typo, type TypoVariant } from '@fleet-ui/components';
import { ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const VARIANTS: TypoVariant[] = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'body1',
	'body2',
	'body3',
	'caption1',
	'caption2',
] as const;

const SEMANTIC_WEAK_STRONG_VARIANTS: TypoVariant[] = [
	'h1Weak',
	'h1Strong',
	'h2Weak',
	'h2Strong',
	'h3Weak',
	'h3Strong',
	'h4Weak',
	'h4Strong',
	'h5Weak',
	'h5Strong',
	'h6Weak',
	'h6Strong',
	'body1Weak',
	'body1Strong',
	'body2Weak',
	'body2Strong',
	'body3Weak',
	'body3Strong',
	'caption1Weak',
	'caption1Strong',
	'caption2Weak',
	'caption2Strong',
] as const;

export default function TypoExamplesScreen() {
	const { theme } = useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Typo"
					description="Semantic typography wrapper that maps design tokens to React Native Text. Use it when you want consistent font scales with optional layout extension."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic Typo example."
				>
					<Typo variant="body1">Typo</Typo>
				</Section>

				<Section
					title="Semantic variants"
					description="Each variant maps directly to Layer 2 semantic typography tokens."
				>
					<View style={styles.variantList}>
						{VARIANTS.map((variant) => (
							<Typo key={variant} variant={variant} style={styles.variantItem}>
								{variant.toUpperCase()} · The Quick Brown fox
							</Typo>
						))}
					</View>
				</Section>

				<Section title="Semanitc Weak Strong" description="Semanitc weak and strong variants are available for each variant.">
					<View style={styles.variantList}>
						{SEMANTIC_WEAK_STRONG_VARIANTS.map((variant) => (
							<Typo key={variant} variant={variant} style={styles.variantItem}>
								{variant.toUpperCase()}{'\n'}Sample Text
							</Typo>
						))}
					</View>
				</Section>

				<Section
					title="Extend Prop"
					description="Default text hugs its content width. Toggle extend to occupy the horizontal space while keeping the line height."
				>
					<View style={styles.extendColumn}>
						<View style={styles.extendWrapper}>
							<Typo variant="body2" style={{backgroundColor: 'red', color: 'white'}}>
								Default width
							</Typo>
						</View>
						<View style={styles.extendWrapper}>
							<Typo variant="body2" extend numberOfLines={1} style={{backgroundColor: 'blue', color: 'white'}}>
								Extend Mode (width: 100%)
							</Typo>
						</View>
					</View>
				</Section>

				<Section title="Color Scheme" description="Color scheme is used to control the color of the text.">
					<View style={styles.variantList}>
						<Typo variant="body2" colorScheme="neutral">
							Neutral
						</Typo>
					</View>
					<View style={styles.variantList}>
						<Typo variant="body2" colorScheme="primary">
							Primary
						</Typo>
					</View>
					<View style={styles.variantList}>
						<Typo variant="body2" colorScheme="success">
							Success
						</Typo>
					</View>
					<View style={styles.variantList}>
						<Typo variant="body2" colorScheme="warning">
							Warning
						</Typo>
					</View>
					<View style={styles.variantList}>
						<Typo variant="body2" colorScheme="error">
							Error
						</Typo>
					</View>
					<View style={styles.variantList}>
						<Typo variant="body2" colorScheme="info">
							Info
						</Typo>
					</View>
				</Section>
				<Section title="Color Weight" description="Color weight is used to control the weight of the text.">
					<View style={[styles.variantList, { backgroundColor: '#666666' }]}>
						<Typo variant="body2" colorWeight={1} colorScheme="success">
							Weight 1
						</Typo>
					</View>
					<View style={[styles.variantList, { backgroundColor: '#666666' }]}>
						<Typo variant="body2" colorWeight={2} colorScheme="success">
							Weight 2
						</Typo>
					</View>
					<View style={[styles.variantList, { backgroundColor: '#666666' }]}>
						<Typo variant="body2" colorScheme="success" colorWeight={3}>
							Weight 3
						</Typo>
					</View>
					<View style={[styles.variantList, { backgroundColor: '#666666' }]}>
						<Typo variant="body2" colorWeight={4} colorScheme="success">
							Weight 4
						</Typo>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	variantList: {
		gap: theme.spacing[5],
		width: '100%',
	},
	variantItem: {
		color: theme.colors.neutral.text_1,
	},
	extendColumn: {
		width: '100%',
		gap: theme.spacing[3],
	},
	extendWrapper: {
		width: '100%',
		padding: theme.spacing[4],
		borderRadius: theme.rounded.md,
		borderWidth: 1,
		borderColor: theme.colors.neutral.border_default,
		backgroundColor: theme.colors.neutral.content_1,
	},
}));
