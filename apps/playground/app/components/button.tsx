import {
	Button,
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
	'xl',
	'2xl',
	'smooth_sm',
	'smooth_md',
	'smooth_lg',
	'floating',
	'banner',
	'inner',
	'card',
	'button',
	'button_primary',
	'overlay',
];

const ROUNDED: ButtonRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'full'];

export default function ButtonExamplesScreen() {
	useUnistyles();
	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Button"
					description="This page showcases the `@fleet-ui/components` Button across its props: variant, size, colorScheme, shadow, rounded, fullWidth, loading, and icon combinations."
				/>

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
						<View key={scheme} style={commonStyles.row}>
							{VARIANTS.map((variant) => (
								<Button
									key={`${scheme}-${variant}`}
									colorScheme={scheme}
									variant={variant}
									style={styles.button}
								>
									sda
								</Button>
							))}
						</View>
					))}
				</Section>

				<Section
					title="Sizes"
					description="Compact, default, and large density."
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
					title="Shadow"
					description="Elevation presets from none to large."
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
								shadow:{shadow}
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
					<View style={commonStyles.fullWidthContainer}>
						<Button fullWidth style={commonStyles.fullWidthButton}>
							Default full width
						</Button>
						<Button
							fullWidth
							loading
							style={commonStyles.fullWidthButton}
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
					<View style={commonStyles.row}>
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
					<View style={commonStyles.row}>
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

const styles = StyleSheet.create(() => ({
	button: {
		marginRight: 4,
		marginBottom: 4,
	},
}));
