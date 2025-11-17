import { Button } from '@fleet-ui/components';
import type {
	ButtonColorScheme,
	ButtonRounded,
	ButtonShadow,
	ButtonSize,
	ButtonVariant,
} from '@fleet-ui/components';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const COLOR_SCHEMES: ButtonColorScheme[] = [
	'primary',
	'secondary',
	'neutral',
	'danger',
	'success',
	'warning',
	'info',
];

const VARIANTS: ButtonVariant[] = ['filled', 'outlined', 'flat', 'ghost', 'faded'];

const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

const SHADOWS: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];

const ROUNDED: ButtonRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'full'];

function Section({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			{description ? (
				<Text style={styles.sectionDescription}>{description}</Text>
			) : null}
			<View style={styles.sectionBody}>{children}</View>
		</View>
	);
}

function DemoIcon({ label }: { label: string }) {
	return <Text style={styles.icon}>{label}</Text>;
}

export default function ButtonExamplesScreen() {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.pageTitle}>Button</Text>
				<Text style={styles.pageDescription}>
					This page showcases the `@fleet-ui/components` Button across its props:
					variant, size, colorScheme, shadow, rounded, fullWidth, loading, and
					icon combinations.
				</Text>

				<Section title="Variants" description="Visual treatments of the button.">
					<View style={styles.row}>
						{VARIANTS.map((variant) => (
							<Button key={variant} variant={variant} style={styles.button}>
								{variant}
							</Button>
						))}
					</View>
				</Section>

				<Section
					title="Color schemes"
					description="Semantic color roles mapped from the design tokens."
				>
					{COLOR_SCHEMES.map((scheme) => (
						<View key={scheme} style={styles.row}>
							{VARIANTS.map((variant) => (
								<Button
									key={`${scheme}-${variant}`}
									colorScheme={scheme}
									variant={variant}
									style={styles.button}
								>
									{scheme} / {variant}
								</Button>
							))}
						</View>
					))}
				</Section>

				<Section title="Sizes" description="Compact, default, and large density.">
					<View style={styles.row}>
						{SIZES.map((size) => (
							<Button key={size} size={size} style={styles.button}>
								{size.toUpperCase()}
							</Button>
						))}
					</View>
				</Section>

				<Section
					title="Shadow"
					description="Elevation presets from none to large."
				>
					<View style={styles.row}>
						{SHADOWS.map((shadow) => (
							<Button
								key={shadow}
								shadow={shadow}
								style={styles.button}
								variant="filled"
							>
								shadow: {shadow}
							</Button>
						))}
					</View>
				</Section>

				<Section
					title="Rounded"
					description="Border radius presets, from sharp to pill."
				>
					<View style={styles.row}>
						{ROUNDED.map((rounded) => (
							<Button
								key={rounded}
								rounded={rounded}
								style={styles.button}
								variant="filled"
							>
								rounded: {rounded}
							</Button>
						))}
					</View>
				</Section>

				<Section
					title="Full width & loading"
					description="Layout behavior and async loading state."
				>
					<View style={styles.fullWidthContainer}>
						<Button fullWidth style={styles.fullWidthButton}>
							Default full width
						</Button>
						<Button
							fullWidth
							loading
							style={styles.fullWidthButton}
							testID="button-loading"
						>
							Loading state
						</Button>
					</View>
				</Section>

				<Section
					title="Icons"
					description="Left / right icons and icon-only usage."
				>
					<View style={styles.row}>
						<Button
							leftIcon={<DemoIcon label="←" />}
							style={styles.button}
							variant="filled"
						>
							Left icon
						</Button>
						<Button
							rightIcon={<DemoIcon label="→" />}
							style={styles.button}
							variant="filled"
						>
							Right icon
						</Button>
					</View>
					<View style={styles.row}>
						<Button
							iconOnly
							variant="filled"
							rounded="full"
							aria-label="Favorite"
							style={styles.button}
						>
							<DemoIcon label="★" />
						</Button>
						<Button
							iconOnly
							variant="ghost"
							aria-label="Settings"
							style={styles.button}
						>
							<DemoIcon label="⚙︎" />
						</Button>
					</View>
				</Section>

				<Section
					title="Disabled"
					description="Disabled state, independent from loading."
				>
					<View style={styles.row}>
						<Button disabled style={styles.button}>
							Disabled
						</Button>
						<Button disabled variant="outlined" style={styles.button}>
							Disabled outlined
						</Button>
					</View>
				</Section>
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
		gap: 24,
	},
	pageTitle: {
		fontSize: 28,
		fontWeight: '700',
		color: '#000',
		marginBottom: 8,
	},
	pageDescription: {
		fontSize: 14,
		color: '#555',
		lineHeight: 20,
		marginBottom: 8,
	},
	section: {
		marginTop: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
		marginBottom: 4,
	},
	sectionDescription: {
		fontSize: 13,
		color: '#666',
		lineHeight: 18,
		marginBottom: 8,
	},
	sectionBody: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 12,
		gap: 8,
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	button: {
		marginRight: 4,
		marginBottom: 4,
	},
	fullWidthContainer: {
		gap: 8,
	},
	fullWidthButton: {
		alignSelf: 'stretch',
	},
	icon: {
		fontSize: 16,
	},
});


