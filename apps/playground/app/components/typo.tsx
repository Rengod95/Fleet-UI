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
	'button',
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
					title="Semantic variants"
					description="Each variant maps directly to Layer 2 semantic typography tokens."
				>
					<View style={styles.variantList}>
						{VARIANTS.map((variant) => (
							<Typo key={variant} variant={variant} style={styles.variantItem}>
								{variant.toUpperCase()} · The quick brown fox jumps over the
								lazy dog.
							</Typo>
						))}
					</View>
				</Section>

				<Section
					title="Extend layout"
					description="Default text hugs its content width. Toggle extend to occupy the horizontal space while keeping the line height."
				>
					<View style={styles.extendColumn}>
						<View style={styles.extendWrapper}>
							<Typo variant="body2">
								Default width — text shrinks to content and leaves surrounding
								flex space untouched.
							</Typo>
						</View>
						<View style={styles.extendWrapper}>
							<Typo variant="body2" extend numberOfLines={1}>
								Extend mode — width: 100% with height locked to the variant line
								height. Useful for truncation inside rows.
							</Typo>
						</View>
					</View>
				</Section>

				<Section
					title="Style overrides"
					description="Use the style prop to tap directly into semantic colors and layout tweaks."
				>
					<View style={styles.variantList}>
						<Typo
							variant="body1"
							style={{ color: theme.colors.primary.text_1 }}
						>
							Primary action copy using theme.colors.primary.text_1
						</Typo>
						<Typo
							variant="body1"
							style={{
								color: theme.colors.success.text_1,
								textTransform: 'uppercase',
								letterSpacing: 1,
							}}
						>
							Success emphasis with uppercase tracking
						</Typo>
						<Typo
							variant="body1"
							style={{
								color: theme.colors.warning.text_1,
								textAlign: 'center',
							}}
						>
							Centered warning helper text using theme.tokens
						</Typo>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	variantList: {
		gap: theme.spacing[3],
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
