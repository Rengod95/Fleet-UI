import {
	IconButton,
	type IconButtonColorScheme,
	type IconButtonRounded,
	type IconButtonSize,
	type IconButtonVariant,
} from '@fleet-ui/components';
import { Bell, Search, Settings, Star } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	PageHeader,
	Section,
} from '../../common/views';

const VARIANTS: IconButtonVariant[] = ['filled', 'outlined', 'flat', 'ghost'];
const COLOR_SCHEMES: IconButtonColorScheme[] = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
];
const SIZES: IconButtonSize[] = ['xs', 'sm', 'md', 'lg'];
const ROUNDED: IconButtonRounded[] = [
	'none',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'full',
];

const REMOTE_ICON =
	'https://static.toss.im/icons/svg/icon-search-bold-mono.svg';

export default function IconButtonExamplesScreen() {
	useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="IconButton"
					description="Icon-only button that supports Lucide React nodes or remote image sources, with filled / ghost / outlined / flat variants."
				/>

				<Section
					title="Variants"
					description="Filled, outlined, flat, and ghost styles across neutral scheme."
				>
					<View style={commonStyles.row}>
						{VARIANTS.map((variant) => (
							<IconButton
								key={variant}
								variant={variant}
								aria-label={`${variant} icon button`}
								icon={<Search />}
								testID={`icon-button-variant-${variant}`}
							/>
						))}
					</View>
				</Section>

				<Section
					title="Color schemes"
					description="Semantic palettes mapped to icon and surface."
				>
					<View style={styles.verticalGap}>
						{COLOR_SCHEMES.map((scheme) => (
							<View key={scheme} style={commonStyles.row}>
								{VARIANTS.map((variant) => (
									<IconButton
										key={`${scheme}-${variant}`}
										colorScheme={scheme}
										variant={variant}
										aria-label={`${scheme} ${variant} icon button`}
										icon={<Bell />}
									/>
								))}
							</View>
						))}
					</View>
				</Section>

				<Section
					title="Sizes"
					description="Compact to large touch targets; icon scales with size."
				>
					<View style={commonStyles.row}>
						{SIZES.map((size) => (
							<IconButton
								variant="flat"
								key={size}
								size={size}
								aria-label={`size ${size}`}
								icon={<Settings />}
							/>
						))}
					</View>
				</Section>

				<Section
					title="Rounded"
					description="Border radius presets from square to pill."
				>
					<View style={commonStyles.row}>
						{ROUNDED.map((rounded) => (
							<IconButton
								key={rounded}
								variant="flat"
								rounded={rounded}
								aria-label={`rounded ${rounded}`}
								icon={<Star />}
							/>
						))}
					</View>
				</Section>

				<Section
					title="Icon sources"
					description="Lucide icon node, remote URL via `src`, and custom React node."
				>
					<View style={commonStyles.row}>
						<IconButton
							icon={<Bell />}
							aria-label="lucide node"
							colorScheme="primary"
						/>
						<IconButton
							src={REMOTE_ICON}
							variant="flat"
							aria-label="remote url icon"
						/>
						<IconButton
							icon={<DemoIcon label="A" />}
							variant="ghost"
							aria-label="custom react node"
						/>
					</View>
				</Section>

				<Section
					title="Loading & disabled"
					description="Async state overlay and disabled interactivity."
				>
					<View style={commonStyles.row}>
						<IconButton
							loading
							aria-label="loading icon button"
							icon={<Search />}
						/>
						<IconButton
							disabled
							variant="outlined"
							aria-label="disabled icon button"
							icon={<Bell />}
						/>
					</View>
				</Section>

				<Section
					title="Custom icon appearance"
					description="Override icon color and size for specific needs."
				>
					<View style={commonStyles.row}>
						<IconButton
							icon={<Star />}
							iconColor="#FFB800"
							variant="filled"
							colorScheme="neutral"
							aria-label="custom gold icon color"
						/>
						<IconButton
							icon={<Search />}
							iconSize={28}
							variant="ghost"
							colorScheme="primary"
							aria-label="larger icon size"
						/>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create(() => ({
	verticalGap: {
		gap: 12,
	},
}));
