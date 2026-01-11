import {
	Chip,
	Icon,
	type ChipColorScheme,
	type ChipRounded,
	type ChipSize,
	type ChipVariant,
} from '@fleet-ui/components';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ScopedTheme, StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	PageHeader,
	Section,
} from '../../common/views';
import { ArrowRight, Check, Circle, Star } from 'lucide-react-native';

const COLOR_SCHEMES: ChipColorScheme[] = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
];

const VARIANTS: ChipVariant[] = [
	'filled',
	'outlined',
	'flat',
	'ghost',
	'faded',
];

const SIZES: ChipSize[] = ['sm', 'md', 'lg'];

const ROUNDED: ChipRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];

export default function ChipExamplesScreen() {
	const { theme } = useUnistyles();

	// Interactive selection state
	const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());

	const [invertSampleChips, setInvertSampleChips] = useState<Set<string>>(new Set());

	const toggleInvertSampleChip = (id: string) => {
		setInvertSampleChips((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	};

	const toggleChip = (id: string) => {
		setSelectedChips((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	};

	// Dismissible chips state
	const [dismissibleChips, setDismissibleChips] = useState([
		'React',
		'TypeScript',
		'Unistyles',
		'Expo',
	]);

	const removeChip = (chip: string) => {
		setDismissibleChips((prev) => prev.filter((c) => c !== chip));
	};

	const resetDismissibleChips = () => {
		setDismissibleChips(['React', 'TypeScript', 'Unistyles', 'Expo']);
	};

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Chip"
					description="Compact elements used for filtering, selection, or displaying tags. Supports inverted styles for selection states and dismissible functionality with onClose."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic Chip example (minimal required props, filled variant)."
				>
					<View style={commonStyles.row}>
						<Chip variant="filled" colorScheme="primary" style={styles.chip}>
							Chip
						</Chip>
					</View>
				</Section>

				{/* Variants */}
				<Section title="Variants" description="Visual treatments of the chip.">
					<View style={[commonStyles.row, {gap:0}]}>
						{VARIANTS.map((variant) => (
							<Chip key={variant} variant={variant} style={styles.chip}>
								{variant}
							</Chip>
						))}
					</View>
				</Section>

				{/* Color Schemes */}
				<Section
					title="Color Schemes"
					description="Semantic color roles mapped from the design tokens."
				>
					{COLOR_SCHEMES.map((scheme) => (
						<View key={scheme} style={[commonStyles.row, {gap:0}]}>
							{VARIANTS.map((variant) => (
								<Chip
									key={`${scheme}-${variant}`}
									colorScheme={scheme}
									variant={variant}
									style={styles.chip}
								>
									{variant}
								</Chip>
							))}
						</View>
					))}
				</Section>

				{/* Sizes */}
				<Section
					title="Sizes"
					description="Compact sizing optimized for inline usage."
				>
					<View style={commonStyles.row}>
						{SIZES.map((size) => (
							<Chip key={size} size={size} style={styles.chip}>
								{size.toUpperCase()}
							</Chip>
						))}
					</View>
				</Section>

				{/* Rounded */}
				<Section
					title="Rounded"
					description="Border radius presets. Default is 'full' for pill shape."
				>
					<View style={commonStyles.row}>
						{ROUNDED.map((rounded) => (
							<Chip
								key={rounded}
								rounded={rounded}
								style={styles.chip}
								variant="filled"
							>
								{rounded}
							</Chip>
						))}
					</View>
				</Section>

				{/* With Icons */}
				<Section
					title="leftIcon and rightIcon props"
					description="Left and right icon slots positioned at chip edges."
				>
					<View style={commonStyles.row}>
						
							<Chip
								leftIcon={
									<ScopedTheme name="dark" invertedAdaptive>
										<Icon size="xs" colorScheme="neutral" icon={Star} />
									</ScopedTheme>
								}
								style={styles.chip}
								variant="filled"
							>
								Left icon
							</Chip>
						<Chip
							rightIcon={
								<ScopedTheme name="dark" invertedAdaptive>
									<Icon size="xs" colorScheme="neutral" icon={ArrowRight} />
								</ScopedTheme>
							}
							style={styles.chip}
							variant="filled"
						>
							Right icon
						</Chip>
					</View>
				</Section>

				{/* Dismissible */}
				<Section
					title="Dismissible"
					description="onClose prop displays a close button. Click to remove chips."
				>
					<View style={commonStyles.row}>
						{dismissibleChips.map((chip) => (
							<Chip
								key={chip}
								variant="filled"
								colorScheme="primary"
								onClose={() => removeChip(chip)}
								style={styles.chip}
							>
								{chip}
							</Chip>
						))}
						{dismissibleChips.length === 0 && (
							<Chip
								variant="outlined"
								colorScheme="neutral"
								onPress={resetDismissibleChips}
								style={styles.chip}
							>
								Reset chips
							</Chip>
						)}
					</View>
					<View style={[commonStyles.row, { marginTop: 8 }]}>
						<Chip
							variant="outlined"
							colorScheme="error"
							onClose={() => {}}
							style={styles.chip}
						>
							Error tag
						</Chip>
						<Chip
							variant="faded"
							colorScheme="success"
							onClose={() => {}}
							style={styles.chip}
						>
							Success tag
						</Chip>
					</View>
				</Section>

				{/* Inverted */}
				<Section
					title="Inverted Prop"
					description="It's useful for selected state."
				>
					<Text style={[commonStyles.label, {alignSelf:'flex-start'}]}>
						Press to toggle inverted state
					</Text>
					<View style={[commonStyles.row, {gap:0}]}>
						{VARIANTS.map((variant) => (
								<Chip
									variant={variant}
									colorScheme="primary"
									inverted={invertSampleChips.has(variant)}
									onPress={() => toggleInvertSampleChip(variant)}
									style={styles.chip}
								>
									{variant}
								</Chip>
						))}
					</View>
				</Section>


				{/* Interactive (Selectable) */}
				<Section
					title="Interactive (Selectable)"
					description="Combine onPress with inverted prop for selectable filter chips."
				>
					<Text style={[styles.label, { color: theme.colors.neutral.text_2 }]}>
						Click to toggle selection
					</Text>
					<View style={commonStyles.row}>
						{['React', 'Vue', 'Angular', 'Svelte'].map((framework) => (
							<Chip
								key={framework}
								variant="outlined"
								colorScheme="primary"
								inverted={selectedChips.has(framework)}
								onPress={() => toggleChip(framework)}
								style={styles.chip}
							>
								{framework}
							</Chip>
						))}
					</View>

					<Text
						style={[
							styles.label,
							{ color: theme.colors.neutral.text_2, marginTop: 16 },
						]}
					>
						Filled variant selection
					</Text>
					<View style={commonStyles.row}>
						{['Small', 'Medium', 'Large'].map((size) => (
							<Chip
								key={size}
								variant="filled"
								colorScheme="neutral"
								inverted={selectedChips.has(size)}
								onPress={() => toggleChip(size)}
								style={styles.chip}
							>
								{size}
							</Chip>
						))}
					</View>

					<Text
						style={[
							styles.label,
							{ color: theme.colors.neutral.text_2, marginTop: 16 },
						]}
					>
						With left icon
					</Text>
					<View style={commonStyles.row}>
						{['Music', 'Video', 'Photo'].map((category) => (
							<Chip
								key={category}
								variant="faded"
								colorScheme="info"
								inverted={selectedChips.has(category)}
								onPress={() => toggleChip(category)}
								leftIcon={
									<DemoIcon label={selectedChips.has(category) ? '✓' : '○'} />
								}
								style={styles.chip}
							>
								{category}
							</Chip>
						))}
					</View>
				</Section>

				{/* Loading */}
				<Section
					title="Loading"
					description="Loading state with activity indicator."
				>
					<View style={commonStyles.row}>
						<Chip loading style={styles.chip}>
							Loading
						</Chip>
						<Chip
							loading
							variant="outlined"
							colorScheme="primary"
							style={styles.chip}
						>
							Processing
						</Chip>
						<Chip
							loading
							variant="flat"
							colorScheme="success"
							style={styles.chip}
						>
							Saving
						</Chip>
					</View>
				</Section>

				{/* Disabled */}
				<Section
					title="Disabled"
					description="Disabled state with reduced opacity."
				>
					<View style={commonStyles.row}>
						<Chip disabled style={styles.chip}>
							Disabled
						</Chip>
						<Chip disabled variant="outlined" style={styles.chip}>
							Disabled outlined
						</Chip>
						<Chip
							disabled
							variant="flat"
							colorScheme="error"
							style={styles.chip}
						>
							Disabled flat
						</Chip>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	chip: {
		marginRight: 8,
		marginBottom: 8,
	},
	label: {
		fontSize: theme.typography.caption1.fontSize,
		marginBottom: 8,
	},
	compareGroup: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginRight: 8,
		gap: 4,
	},
}));
