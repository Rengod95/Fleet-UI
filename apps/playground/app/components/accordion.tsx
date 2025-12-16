import {
	Accordion,
	type AccordionColorScheme,
	type AccordionShadow,
	type AccordionSize,
	type AccordionVariant,
} from '@fleet-ui/components';
import type {
	AccordionGap,
	AccordionRounded,
} from '@fleet-ui/components/src/Accordion/Accordion.types';
import { HelpCircle, Info, Settings, Star, User } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// ============================================================================
// Constants
// ============================================================================

const VARIANTS: AccordionVariant[] = ['ghost', 'outlined', 'flat', 'faded'];

const COLOR_SCHEMES: AccordionColorScheme[] = [
	'neutral',
	'primary',
	'error',
	'success',
	'warning',
	'info',
];

const SIZES: AccordionSize[] = ['sm', 'md', 'lg'];

const SHADOWS: AccordionShadow[] = ['none', 'sm', 'md', 'lg'];

const GAPS: AccordionGap[] = ['none', 'sm', 'md', 'lg'];

const ROUNDED: AccordionRounded[] = ['none', 'sm', 'md', 'lg'];

// ============================================================================
// Demo Data
// ============================================================================

const FAQ_ITEMS = [
	{
		value: 'item-1',
		title: 'Is it accessible?',
		content: 'Yes. It adheres to the WAI-ARIA design pattern.',
	},
	{
		value: 'item-2',
		title: 'Is it styled?',
		content:
			'Yes. It comes with default styles that match the other components aesthetic.',
	},
	{
		value: 'item-3',
		title: 'Is it animated?',
		content:
			"Yes. It's animated by default using Reanimated with ease-out easing.",
	},
];

// ============================================================================
// Component
// ============================================================================

export default function AccordionExamplesScreen() {
	const { theme } = useUnistyles();
	const [singleValue, setSingleValue] = useState<string>('');
	const [multipleValue, setMultipleValue] = useState<string[]>([]);

	const FAQ_ITEMS = useMemo(
		() => [
			{
				value: 'item-1',
				title: 'Is it accessible?',
				content: 'Yes. It adheres to the WAI-ARIA design pattern.',
			},
			{
				value: 'item-2',
				title: 'Is it styled?',
				content:
					'Yes. It comes with default styles that match the other components aesthetic.',
			},
			{
				value: 'item-3',
				title: 'Is it animated?',
				content:
					"Yes. It's animated by default using Reanimated with ease-out easing.",
			},
		],
		[]
	);

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Accordion"
					description="A vertically stacked set of interactive headings that each reveal a section of content. Supports single/multiple expand modes, various variants, sizes, and animations."
				/>

				{/* Controlled Mode */}
				<Section
					title="Controlled Mode"
					description="Value is controlled externally via state."
				>
					<Text style={styles.stateText}>
						Single: {singleValue || '(none)'}
					</Text>
					<Accordion
						type="single"
						collapsible
						value={singleValue}
						onValueChange={setSingleValue}
						variant="outlined"
					>
						<Accordion.Item key={'single_item_1'} value={'single_item_1'}>
							<Accordion.Header>Single Item 1</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>Single Item 1 Content</Text>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion>

					<View style={styles.spacer} />

					<Text style={styles.stateText}>
						Multiple: [{multipleValue.join(', ')}]
					</Text>
					<Accordion
						type="multiple"
						value={multipleValue}
						onValueChange={setMultipleValue}
						variant="outlined"
					>
						{FAQ_ITEMS.map((item) => (
							<Accordion.Item key={item.value} value={item.value}>
								<Accordion.Header>{item.title}</Accordion.Header>
								<Accordion.Content>
									<Text style={styles.contentText}>{item.content}</Text>
								</Accordion.Content>
							</Accordion.Item>
						))}
					</Accordion>
				</Section>

				{/* Variants */}
				<Section
					title="Variants"
					description="Different visual styles: ghost, outlined, flat, faded."
				>
					{VARIANTS.map((variant) => (
						<View key={variant} style={styles.variantContainer}>
							<Text style={styles.variantLabel}>{variant}</Text>
							<Accordion
								type="single"
								collapsible
								variant={variant}
								defaultValue="item-1"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>Accordion Header</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											This is the {variant} variant content.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-2">
									<Accordion.Header>Another Header</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											More content for the {variant} variant.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</View>
					))}
				</Section>

				{/* Color Schemes */}
				<Section
					title="Color Schemes"
					description="Semantic color roles applied when expanded."
				>
					{COLOR_SCHEMES.map((colorScheme) => (
						<View
							key={colorScheme}
							style={[styles.variantContainer, { gap: 8 }]}
						>
							<Text style={styles.variantLabel}>{colorScheme}</Text>
							<Accordion
								type="single"
								collapsible
								colorScheme={colorScheme}
								variant="flat"
								defaultValue="item-1"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>Expanded Item</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Content with {colorScheme} color scheme.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
							<Accordion
								type="single"
								collapsible
								colorScheme={colorScheme}
								variant="faded"
								defaultValue="item-1"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>Expanded Item</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Content with {colorScheme} color scheme.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
							<Accordion
								type="single"
								collapsible
								colorScheme={colorScheme}
								variant="outlined"
								defaultValue="item-1"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>Expanded Item</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Content with {colorScheme} color scheme.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</View>
					))}
				</Section>

				{/* Sizes */}
				<Section
					title="Sizes"
					description="Compact, default, and large density options."
				>
					{SIZES.map((size) => (
						<View key={size} style={styles.variantContainer}>
							<Text style={styles.variantLabel}>{size.toUpperCase()}</Text>
							<Accordion
								type="single"
								collapsible
								size={size}
								variant="outlined"
								defaultValue="item-1"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>Size {size.toUpperCase()}</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Test Content with {size} size.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</View>
					))}
				</Section>

				{/* Rounded */}

				<Section
					title="Rounded"
					description="Rounded styles from none to large."
				>
					{ROUNDED.map((rounded) => (
						<View key={rounded} style={styles.variantContainer}>
							<Text style={styles.variantLabel}>{rounded}</Text>
							<Accordion
								type="single"
								collapsible
								rounded={rounded}
								variant="flat"
								defaultValue="item-1"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>Rounded {rounded}</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Content with {rounded} rounded.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</View>
					))}
				</Section>

				{/* Gap */}
				<Section title="Gap" description="Gap styles from none to large.">
					{GAPS.map((gap) => (
						<View key={gap} style={styles.variantContainer}>
							<Text style={styles.variantLabel}>gap: {gap}</Text>
							<Accordion
								type="single"
								collapsible
								gap={gap}
								variant="flat"
								defaultValue="item-1"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>Gap {gap}</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Content with {gap} gap.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-2">
									<Accordion.Header>Gap {gap}</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Content with {gap} gap.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-3">
									<Accordion.Header>Gap {gap}</Accordion.Header>
									<Accordion.Content>
										<Text style={styles.contentText}>
											Content with {gap} gap.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</View>
					))}
				</Section>

				{/* Shadow */}
				<Section
					title="Shadow"
					description="Elevation presets from none to large."
				>
					<View style={styles.shadowGrid}>
						{SHADOWS.map((shadow) => (
							<View key={shadow} style={styles.shadowItem}>
								<Text style={styles.variantLabel}>shadow: {shadow}</Text>
								<Accordion
									type="single"
									collapsible
									shadow={shadow}
									variant="flat"
								>
									<Accordion.Item value="item-1">
										<Accordion.Header>Shadow {shadow}</Accordion.Header>
										<Accordion.Content>
											<Text style={styles.contentText}>
												Content with {shadow} shadow.
											</Text>
										</Accordion.Content>
									</Accordion.Item>
								</Accordion>
							</View>
						))}
					</View>
				</Section>

				{/* With Icons */}
				<Section
					title="With Icons"
					description="Left and right icons in the header."
				>
					<Accordion type="single" collapsible variant="outlined">
						<Accordion.Item value="item-1">
							<Accordion.Header
								leftIcon={
									<User size={18} color={theme.colors.neutral.text_2} />
								}
							>
								User Settings
							</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									Configure your user profile and preferences.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-2">
							<Accordion.Header
								leftIcon={
									<Settings size={18} color={theme.colors.neutral.text_2} />
								}
							>
								App Settings
							</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									Customize application behavior and appearance.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-3">
							<Accordion.Header
								leftIcon={
									<HelpCircle size={18} color={theme.colors.neutral.text_2} />
								}
							>
								Help & Support
							</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									Get help and contact support.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion>
				</Section>

				{/* Custom Right Icon */}
				<Section
					title="Custom Right Icon"
					description="Replace the default chevron with a custom icon."
				>
					<Accordion type="single" collapsible variant="flat">
						<Accordion.Item value="item-1">
							<Accordion.Header
								leftIcon={
									<Star size={18} color={theme.colors.warning.text_1} />
								}
								rightIcon={<Info size={18} color={theme.colors.info.text_1} />}
							>
								Featured Item
							</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									This item has a custom right icon instead of the chevron.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-2">
							<Accordion.Header rightIcon={false}>No Right Icon</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									This item has no right icon (rightIcon=false).
								</Text>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion>
				</Section>

				{/* Disabled Items */}
				<Section
					title="Disabled Items"
					description="Individual items can be disabled."
				>
					<Accordion type="single" collapsible variant="outlined">
						<Accordion.Item value="item-1">
							<Accordion.Header>Enabled Item</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>This item is enabled.</Text>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-2" disabled>
							<Accordion.Header>Disabled Item</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									This content won't be visible because the item is disabled.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-3">
							<Accordion.Header>Another Enabled Item</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									This item is also enabled.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion>
				</Section>

				{/* Non-collapsible Single */}
				<Section
					title="Non-collapsible Single"
					description="In single mode without collapsible, one item is always expanded."
				>
					<Accordion
						type="single"
						collapsible={false}
						defaultValue="item-1"
						variant="faded"
					>
						<Accordion.Item value="item-1">
							<Accordion.Header>Always One Open</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									You cannot collapse this item without opening another.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-2">
							<Accordion.Header>Click to Switch</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									Clicking another item will close the previous one.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion>
				</Section>

				{/* Combined Props */}
				<Section
					title="Combined Props"
					description="Multiple props combined for a complete example."
				>
					<Accordion
						type="single"
						collapsible
						colorScheme="primary"
						variant="faded"
						size="lg"
						shadow="md"
						rounded="lg"
						gap="sm"
						defaultValue="item-1"
					>
						<Accordion.Item value="item-1">
							<Accordion.Header
								leftIcon={
									<Star size={20} color={theme.colors.primary.text_1} />
								}
							>
								Premium Feature
							</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									This accordion combines: colorScheme="primary",
									variant="faded", size="lg", shadow="md", rounded="lg",
									headerContentGap="sm".
								</Text>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-2">
							<Accordion.Header
								leftIcon={
									<Info size={20} color={theme.colors.primary.text_1} />
								}
							>
								More Information
							</Accordion.Header>
							<Accordion.Content>
								<Text style={styles.contentText}>
									All styling props work together seamlessly.
								</Text>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion>
				</Section>
			</View>
		</ScrollView>
	);
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	contentText: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
	},
	variantContainer: {
		marginBottom: theme.spacing[4],
	},
	variantLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
		marginBottom: theme.spacing[2],
		textTransform: 'uppercase',
		fontWeight: '600',
	},
	stateText: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_2,
		marginBottom: theme.spacing[2],
		fontFamily: 'monospace',
	},
	spacer: {
		height: theme.spacing[5],
	},
	shadowGrid: {
		gap: theme.spacing[4],
	},
	shadowItem: {
		marginBottom: theme.spacing[3],
	},
}));
