import {
	ActionButton,
	type ActionButtonRounded,
	type ActionButtonShadow,
	type ActionButtonSize,
	type ActionButtonVariant,
	Icon,
} from '@fleet-ui/components';
import { BoxIcon } from 'lucide-react-native';
import { Image, ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	PageHeader,
	Section,
} from '../../common/views';

const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const;

const VARIANTS: ActionButtonVariant[] = ['filled', 'outlined', 'flat', 'faded'];

const SIZES: ActionButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const SHADOWS: ActionButtonShadow[] = ['none', 'sm', 'md', 'lg'];

const ROUNDED: ActionButtonRounded[] = [
	'none',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'full',
];

export default function ActionButtonExamplesScreen() {
	useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="ActionButton"
					description="Icon/Image-focused vertical button with content container and optional title. Demonstrates variant, size, colorScheme, rounded, and shadow props."
				/>

				<Section
					title="Variants"
					description="Visual treatments: filled (same bg), outlined (border only), flat (content bg), faded (content bg + border)."
				>
					<View style={commonStyles.row}>
						{VARIANTS.map((variant) => (
							<ActionButton key={variant} variant={variant} title={variant}>
								<Icon
									icon={BoxIcon}
									size="md"
									strokeWidth={1.5}
									colorScheme="neutral"
									accessibilityLabel={'Star'}
								/>
							</ActionButton>
						))}
					</View>
				</Section>

				<Section
					title="Color Schemes"
					description="All color schemes with flat variant."
				>
					<View style={commonStyles.row}>
						{COLOR_SCHEMES.map((scheme) => (
							<ActionButton
								key={scheme}
								colorScheme={scheme}
								variant="flat"
								title={scheme}
							>
								<Icon
									icon={BoxIcon}
									size="md"
									strokeWidth={1.5}
									colorScheme={scheme}
									accessibilityLabel={'Star'}
								/>
							</ActionButton>
						))}
					</View>
				</Section>

				<Section
					title="Color Schemes × Variants"
					description="Combination of all color schemes and variants."
				>
					{COLOR_SCHEMES.map((scheme) => (
						<View key={scheme} style={styles.schemeRow}>
							{VARIANTS.map((variant) => (
								<ActionButton
									key={`${scheme}-${variant}`}
									colorScheme={scheme}
									variant={variant}
									title={`${scheme.slice(0, 3)}`}
								>
									<Icon
										icon={BoxIcon}
										size="md"
										strokeWidth={1.5}
										colorScheme={scheme}
										accessibilityLabel={'Star'}
									/>
								</ActionButton>
							))}
						</View>
					))}
				</Section>

				<Section
					title="Sizes"
					description="Size presets from xs to xl, plus extend (flex: 1)."
				>
					<View style={commonStyles.row}>
						{SIZES.map((size) => (
							<ActionButton
								key={size}
								size={size}
								title={size}
								colorScheme="neutral"
								variant="flat"
							>
								<Icon
									icon={BoxIcon}
									size="md"
									strokeWidth={1}
									accessibilityLabel={'Star'}
								/>
							</ActionButton>
						))}
					</View>
				</Section>

				<Section
					title="Extend prop with size:md"
					description="Flex: 1 behavior in row."
				>
					<View style={styles.extendRow}>
						<ActionButton size="md" extend title="Extend 1">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton size="md" extend title="Extend 2">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton size="md" extend title="Extend 3">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
					</View>
				</Section>

				<Section
					title="Shadow with variant:filled"
					description="Shadow presets applied to root container."
				>
					<View style={commonStyles.row}>
						{SHADOWS.map((shadow) => (
							<ActionButton
								key={shadow}
								shadow={shadow}
								title={shadow}
								variant="filled"
							>
								<Icon
									icon={BoxIcon}
									size="md"
									strokeWidth={1}
									accessibilityLabel={'Star'}
								/>
							</ActionButton>
						))}
					</View>
				</Section>

				<Section
					title="Container Rounded"
					description="Border radius for root container."
				>
					<View style={commonStyles.row}>
						{ROUNDED.map((rounded) => (
							<ActionButton
								key={rounded}
								containerRounded={rounded}
								title={rounded}
								variant="filled"
							>
								<Icon
									icon={BoxIcon}
									size="md"
									strokeWidth={1}
									accessibilityLabel={'Star'}
								/>
							</ActionButton>
						))}
					</View>
				</Section>

				<Section
					title="Content Rounded"
					description="Border radius for content container (independent)."
				>
					<View style={commonStyles.row}>
						{ROUNDED.map((rounded) => (
							<ActionButton
								key={rounded}
								contentRounded={rounded}
								containerRounded="md"
								title={rounded}
								variant="flat"
							>
								<Icon
									icon={BoxIcon}
									size="md"
									strokeWidth={1}
									accessibilityLabel={'Star'}
								/>
							</ActionButton>
						))}
					</View>
				</Section>

				<Section
					title="Icon Examples"
					description="Different icon types and sizes."
				>
					<View style={commonStyles.row}>
						<ActionButton title="Star" variant="filled">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton title="Heart" variant="flat">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton title="Settings" variant="outlined">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton title="Bell" variant="faded">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
					</View>
				</Section>

				<Section title="Image Example" description="Using an image as content.">
					<View style={commonStyles.row}>
						<ActionButton
							title="Profile"
							variant="flat"
							contentRounded="md"
							size="lg"
						>
							<Image
								source={{
									uri: 'https://i.pravatar.cc/100?img=1',
								}}
								style={styles.image}
							/>
						</ActionButton>
						<ActionButton
							title="Avatar"
							variant="outlined"
							contentRounded="full"
						>
							<Image
								source={{
									uri: 'https://i.pravatar.cc/100?img=2',
								}}
								style={styles.image}
							/>
						</ActionButton>
					</View>
				</Section>

				<Section
					title="Without Title"
					description="Icon-only mode (requires accessibilityLabel)."
				>
					<View style={[commonStyles.row, { gap: 24 }]}>
						<ActionButton variant="filled" accessibilityLabel="Favorite">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton variant="outlined" accessibilityLabel="Like">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton variant="flat" accessibilityLabel="Settings">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={2}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
					</View>
				</Section>

				<Section
					title="Disabled"
					description="Disabled state with reduced opacity."
				>
					<View style={commonStyles.row}>
						<ActionButton disabled title="Disabled" variant="filled">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton disabled title="Disabled" variant="outlined">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton disabled title="Disabled" variant="flat">
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
					</View>
				</Section>

				<Section
					title="Style Overrides"
					description="Custom style overrides for rootStyle, contentStyle, and textStyle."
				>
					<View style={commonStyles.row}>
						<ActionButton
							title="Custom Root"
							variant="flat"
							rootStyle={{ backgroundColor: '#FF6B6B' }}
						>
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton
							title="Custom Content"
							variant="flat"
							contentStyle={{ backgroundColor: '#4ECDC4' }}
						>
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
						<ActionButton
							title="Custom Text"
							variant="flat"
							textStyle={{ color: '#FF6B6B' }}
						>
							<Icon
								icon={BoxIcon}
								size="md"
								strokeWidth={1}
								accessibilityLabel={'Star'}
							/>
						</ActionButton>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create(() => ({
	button: {
		marginRight: 8,
		marginBottom: 8,
	},
	schemeRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginBottom: 8,
	},
	extendRow: {
		flexDirection: 'row',
		gap: 8,
		width: '100%',
	},
	image: {
		width: 36,
		height: 36,
		borderRadius: 20,
	},
}));
