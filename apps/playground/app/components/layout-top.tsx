import { LayoutTop, Button, Icon } from '@fleet-ui/components';
import { ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	PageHeader,
	Section,
} from '../../common/views';
import { ArrowRight, BoxIcon, Heart, HeartOffIcon, Sparkles } from 'lucide-react-native';

const SIZES: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
const PADDINGS: Array<'none' | 'sm' | 'md' | 'lg'> = ['none', 'sm', 'md', 'lg'];

export default function LayoutTopExamplesScreen() {
	useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="LayoutTop"
					description="A flexible top layout container with slots for asset, title, subtitles, and right content. Supports size-based typography and padding presets with per-slot overrides."
				/>

				<Section
					title="Sizes (context)"
					description="Context size controls default title/subtitle typography."
				>
					<View style={styles.blockGap}>
						{SIZES.map((size) => (
							<LayoutTop
								key={size}
								size={size}
								asset={
									<LayoutTop.Asset>
										<Icon icon={BoxIcon} size="xl" />
									</LayoutTop.Asset>
								}
								title={<LayoutTop.TitleTypo>{`Layout Top Base Example`}</LayoutTop.TitleTypo>}
								subtitleBottom={
									<LayoutTop.SubtitleTypo numberOfLines={2}>
										Choose your preferences to continue.
									</LayoutTop.SubtitleTypo>
								}
								right={
									<LayoutTop.Asset>
										<Icon icon={ArrowRight} size="md" />
									</LayoutTop.Asset>
								}
							/>
						))}
					</View>
				</Section>

				<Section
					title="Per-slot size override"
					description="Override title/subtitle size independent of context size."
				>
					<View style={styles.blockGap}>
						<LayoutTop
							size="md"
							asset={
								<LayoutTop.Asset>
									<DemoIcon />
								</LayoutTop.Asset>
							}
							subtitleTop={
								<LayoutTop.SubtitleTypo size="sm">
									Context size: md
								</LayoutTop.SubtitleTypo>
							}
							title={
								<LayoutTop.TitleTypo size="lg">
									Title override to lg
								</LayoutTop.TitleTypo>
							}
							subtitleBottom={
								<LayoutTop.SubtitleTypo size="sm" numberOfLines={2}>
									Subtitle override to sm with two lines support.
								</LayoutTop.SubtitleTypo>
							}
							right={
								<LayoutTop.Asset>
									<Icon icon={Sparkles} size="md" />
								</LayoutTop.Asset>
							}
						/>
					</View>
				</Section>

				<Section
					title="Padding presets"
					description="Use spacing tokens or custom numeric values."
				>
					<View style={styles.blockGap}>
						{PADDINGS.map((pad) => (
							<LayoutTop
								key={pad}
								paddingTop={pad}
								paddingBottom={pad}
								title={<LayoutTop.TitleTypo>{`padding: ${pad}`}</LayoutTop.TitleTypo>}
								subtitleBottom={
									<LayoutTop.SubtitleTypo>
										Top & bottom use the same preset spacing.
									</LayoutTop.SubtitleTypo>
								}
							/>
						))}

						<LayoutTop
							paddingTop={28}
							paddingBottom={36}
							size="sm"
							title={<LayoutTop.TitleTypo>Custom numeric padding</LayoutTop.TitleTypo>}
							subtitleBottom={
								<LayoutTop.SubtitleTypo>
									Top: 28px, Bottom: 36px
								</LayoutTop.SubtitleTypo>
							}
						/>
					</View>
				</Section>

				<Section
					title="Slot composition"
					description="Combine asset, subtitles, title, and right slot."
				>
					<View style={styles.blockGap}>
						<LayoutTop
							size="lg"
							asset={
								<LayoutTop.Asset>
									<DemoIcon />
								</LayoutTop.Asset>
							}
							subtitleTop={<LayoutTop.SubtitleTypo>Upgrade plan</LayoutTop.SubtitleTypo>}
							title={<LayoutTop.TitleTypo>Billing overview</LayoutTop.TitleTypo>}
							subtitleBottom={
								<LayoutTop.SubtitleTypo>
									See your upcoming invoice and usage summary.
								</LayoutTop.SubtitleTypo>
							}
							right={
								<Button size="sm" variant="flat" colorScheme="neutral">
									Change
								</Button>
							}
						/>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	blockGap: {
		gap: theme.spacing[6],
	},
}));
