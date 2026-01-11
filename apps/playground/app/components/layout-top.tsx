import { LayoutTop, Button, Icon } from '@fleet-ui/components';
import { ScrollView, View, Text } from 'react-native';
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
	const { theme } = useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="LayoutTop"
					description="Page Header Layout for Describing the page."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic LayoutTop example (md)."
				>
					<View style={{width: '100%'}}>
						<LayoutTop
							size="md"
							asset={
								<LayoutTop.Asset>
									<Icon icon={BoxIcon} size="md" />
								</LayoutTop.Asset>
							}
							title={<LayoutTop.TitleTypo>Title is here</LayoutTop.TitleTypo>}
							subtitleBottom={
								<LayoutTop.SubtitleTypo numberOfLines={2}>
									Bottom Subtitle is here
								</LayoutTop.SubtitleTypo>
							}
						/>
					</View>
				</Section>

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
									<Icon icon={BoxIcon} size="md" />
								</LayoutTop.Asset>
							}
							subtitleTop={
								<LayoutTop.SubtitleTypo size="md">
									subtitle top size - md
								</LayoutTop.SubtitleTypo>
							}
							title={
								<LayoutTop.TitleTypo size="lg">
									title size: lg
								</LayoutTop.TitleTypo>
							}
							subtitleBottom={
								<LayoutTop.SubtitleTypo size="sm">
									subtitle bottom size - sm.
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
					title="Top & Bottom Padding presets"
					description="Use spacing tokens or custom numeric values for top and bottom padding."
				>
					<View style={styles.blockGap}>
						{PADDINGS.map((pad) => (
							<View style={{width: '100%', backgroundColor: theme.colors.neutral.content_2}}>
								<Text style={commonStyles.label}>{`padding: ${pad}`}</Text>
								<LayoutTop
									key={pad}
									paddingTop={pad}
									paddingBottom={pad}
									title={<LayoutTop.TitleTypo>{`${pad.toUpperCase()} Padding`}</LayoutTop.TitleTypo>}
									subtitleBottom={
										<LayoutTop.SubtitleTypo>
											Top & bottom use padding preset.
										</LayoutTop.SubtitleTypo>
									}
								/>
							</View>
						))}
						<View style={{width: '100%', backgroundColor: theme.colors.neutral.content_2}}>
							<LayoutTop
								paddingTop={28}
								paddingBottom={36}
								size="sm"
								title={<LayoutTop.TitleTypo>custom numeric padding</LayoutTop.TitleTypo>}
								subtitleBottom={
									<LayoutTop.SubtitleTypo>
										custom numeric padding - top: 28px, bottom: 36px
									</LayoutTop.SubtitleTypo>
								}
							/>
						</View>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	blockGap: {
		width: '100%',
		gap: theme.spacing[12],
	},
}));
