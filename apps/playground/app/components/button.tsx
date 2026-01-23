import {
	Button,
	Icon,
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
	type ButtonColorScheme,
	type ButtonRounded,
	type ButtonShadow,
	type ButtonSize,
	type ButtonVariant,
} from '@fleet-ui/components';
import { ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	PageHeader,
	Section,
} from '../../common/views';
import { AlertCircle } from 'lucide-react-native';

const COLOR_SCHEMES: ButtonColorScheme[] = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
];

const VARIANTS: ButtonVariant[] = [
	'filled',
	'outlined',
	'flat',
	'ghost',
	'faded',
];

const SIZES: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];

const SHADOWS: ButtonShadow[] = [
	'none',
	'sm',
	'md',
	'lg',
];

const ROUNDED: ButtonRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'full'];

export default function ButtonExamplesScreen() {
	const { theme } = useUnistyles();

	return (
		<View style={commonStyles.container}>
		<ScrollView>
			<View style={commonStyles.content}>
				<PageHeader
					title="Button"
					description="This page showcases the `@fleet-ui/components` Button across its props: variant, size, colorScheme, shadow, rounded, fullWidth, loading, and icon combinations."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic Button example (minimal required props, filled variant)."
				>
					<View style={commonStyles.column}>
						<Button variant="filled" colorScheme="primary">
							Button
						</Button>
					</View>
				</Section>

				<Section
					title="Variants"
					description="Visual treatments of the button."
				>
					<View style={commonStyles.row}>
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
						<View key={scheme} style={[commonStyles.row, {marginBottom: theme.spacing[12] }]}>
							{VARIANTS.map((variant) => (
								<Button
									key={`${scheme}-${variant}`}
									colorScheme={scheme}
									variant={variant}
									style={styles.button}
								>
									{variant}
								</Button>
							))}
						</View>
					))}
				</Section>

				<Section
					title="Sizes"
					description="Different padding and minimum height options."
				>
					<View style={commonStyles.row}>
						{SIZES.map((size) => (
							<Button key={size} size={size} style={styles.button}>
								{size.toUpperCase()}
							</Button>
						))}
					</View>
				</Section>

				<Section
					title="Shadows"
					description="Shadow elevation levels. Default is none."
				>
					<View style={[commonStyles.row, { gap: 24 }]}>
						{SHADOWS.map((shadow) => (
							<Button
								key={shadow}
								shadow={shadow}
								style={styles.button}
								colorScheme="neutral"
								variant="ghost"
							>
								{shadow}
							</Button>
						))}
					</View>
				</Section>

				<Section
					title="Rounded"
					description="Border radius presets, from sharp to pill."
				>
					<View style={commonStyles.row}>
						{ROUNDED.map((rounded) => (
							<Button
								key={rounded}
								rounded={rounded}
								style={styles.button}
								variant='flat'
							>
								{rounded} rounded
							</Button>
						))}
					</View>
				</Section>

				<Section
					title="Full width"
					description="Expand Button to 100% of the container width. Using AlignSelf:stretch"
				>
					<View style={commonStyles.fullWidthContainer}>
						<Button	fullWidth>
							Full width
						</Button>
					</View>

					<View style={commonStyles.fullWidthContainer}>
						<Button>
							Basic
						</Button>
					</View>
				</Section>

				<Section
					title="Icons"
					description="Left / right icons applied to the Button."
				>
					<View style={commonStyles.row}>
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
					<View style={{width: '100%', marginTop: theme.spacing[5]}}>
						<Item variant="fade" colorScheme="error" rounded="sm" >
							<ItemMedia mediaType="icon" variant="flat" size="md">
								<Icon strokeWidth={1.5} icon={AlertCircle} size="md" colorScheme='error' />
							</ItemMedia>
							<ItemContent>
								<ItemTitle size='lg'>Icon-only Buttons are not recommended</ItemTitle>
								<ItemDescription>
								   Instead use a IconButton component.
								</ItemDescription>
							</ItemContent>
						</Item>
					</View>
				</Section>

				<Section
					title="Disabled"
					description="Disabled state, independent from loading."
				>
					<View style={commonStyles.row}>
						<Button disabled style={styles.button}>
							Disabled
						</Button>
						<Button disabled variant="outlined" style={styles.button}>
							Disabled outlined
						</Button>
					</View>
				</Section>

				<Section
					title="Loading"
					description="Loading state, blocks interaction, renders a loading indicator."
				>
					<Button loading style={styles.button}>
						Loading
					</Button>
				</Section>
			</View>
		</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create(() => ({
	button: {
		marginRight: 4,
		marginBottom: 4,
	},
}));
