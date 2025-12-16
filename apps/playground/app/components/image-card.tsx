import {
	Button,
	Chip,
	Icon,
	ImageCard,
	type ImageCardRounded,
	type ImageCardShadow,
	type ImageCardSize,
	type ImageCardVariant,
} from '@fleet-ui/components';
import {
	Bookmark,
	Eye,
	Heart,
	MessageCircle,
	MoreHorizontal,
	Share,
} from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { ScopedTheme, StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const VARIANTS: ImageCardVariant[] = ['vertical', 'horizontal'];
const SHADOWS: ImageCardShadow[] = [
	'none',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'card',
];
const ROUNDED: ImageCardRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
const SIZES: ImageCardSize[] = ['sm', 'md', 'lg'];

// Sample images for demo
const SAMPLE_IMAGES = {
	portrait:
		'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
	landscape:
		'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
	square:
		'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
	nature:
		'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
	city: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
};

export default function ImageCardExamplesScreen() {
	const { theme } = useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="ImageCard"
					description="A card component with a background image, gradient overlay, and content slots. Supports vertical/horizontal layouts with configurable typography size."
				/>

				{/* Basic Usage - Overview */}
				<Section
					title="Basic Usage"
					description="Default vertical card with image and content slots."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardContainer}>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							aspectRatio="3:4"
							width={320}
							rounded="lg"
							shadow="lg"
							topContent={
								<View
									style={[
										styles.footerContent,
										{ flex: 1, gap: 4, justifyContent: 'flex-end' },
									]}
								>
									<ScopedTheme name="dark">
										<Chip size="sm" variant="outlined" colorScheme="neutral">
											Fleet UI
										</Chip>
										<Chip size="sm" variant="outlined" colorScheme="neutral">
											Top Viewed
										</Chip>
									</ScopedTheme>
								</View>
							}
							title="Beautiful Portrait"
							description="A stunning portrait photograph with natural lighting and composition."
							footer={
								<View
									style={[
										styles.footerContent,
										{
											flex: 1,
											gap: 4,
											justifyContent: 'flex-end',
											width: '100%',
										},
									]}
								>
									<ScopedTheme name="light">
										<View
											style={{
												flex: 1,
												flexDirection: 'row',
												gap: 8,
												justifyContent: 'flex-start',
											}}
										>
											<Icon icon={Eye} size="sm" color="#ffffff" />
											<Icon icon={MessageCircle} size="sm" color="#ffffff" />
											<Icon icon={Share} size="sm" color="#ffffff" />
										</View>
										<Button
											size="sm"
											rounded="sm"
											variant="filled"
											colorScheme="success"
											shadow="button_primary"
											style={{ flex: 1 }}
										>
											View Profile
										</Button>
									</ScopedTheme>
								</View>
							}
						/>
					</View>
				</Section>

				{/* Size Variants */}
				<Section
					title="Size"
					description="Typography size variants: sm (compact), md (default), lg (large)."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardRow}>
						{SIZES.map((size, index) => (
							<ImageCard
								key={size}
								source={{ uri: SAMPLE_IMAGES.portrait }}
								aspectRatio="3:4.5"
								width={160 + index * 60}
								rounded="md"
								shadow="md"
								size={size}
								title={`Size: ${size.toUpperCase()}`}
								description="Typography scales with size prop for different card contexts."
							/>
						))}
					</View>
				</Section>

				{/* Variants */}
				<Section
					title="Variants"
					description="Vertical (default) places content at bottom, horizontal places content on right."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<Text style={[styles.label, { color: theme.colors.neutral.text_2 }]}>
						Vertical Layout
					</Text>
					<View style={styles.cardRow}>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							variant="vertical"
							aspectRatio="3:4"
							width={200}
							rounded="md"
							shadow="md"
							title="Vertical Card"
							description="Content positioned at the bottom 42% area."
							footer={
								<ScopedTheme name="dark">
									<Chip size="sm" variant="outlined" colorScheme="neutral">
										Default
									</Chip>
								</ScopedTheme>
							}
						/>
					</View>

					<Text
						style={[
							styles.label,
							{ color: theme.colors.neutral.text_2, marginTop: 24 },
						]}
					>
						Horizontal Layout
					</Text>
					<ImageCard
						source={{ uri: SAMPLE_IMAGES.landscape }}
						variant="horizontal"
						aspectRatio="16:9"
						width="100%"
						rounded="md"
						shadow="md"
						title="Horizontal Card"
						description="Content positioned on the right side, taking 50% of the width."
						footer={
							<ScopedTheme name="dark">
								<Button
									size="sm"
									variant="outlined"
									colorScheme="neutral"
									rounded="sm"
								>
									Learn More
								</Button>
							</ScopedTheme>
						}
					/>
				</Section>

				{/* Shadow */}
				<Section
					title="Shadow"
					description="Shadow intensity from token system."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardRow}>
						{SHADOWS.slice(0, 4).map((shadow) => (
							<ImageCard
								key={shadow}
								source={{ uri: SAMPLE_IMAGES.square }}
								aspectRatio={1}
								width={150}
								rounded="md"
								shadow={shadow}
								size="sm"
								title={shadow}
							/>
						))}
					</View>
					<View style={[styles.cardRow, { marginTop: 16 }]}>
						{SHADOWS.slice(4).map((shadow) => (
							<ImageCard
								key={shadow}
								source={{ uri: SAMPLE_IMAGES.square }}
								aspectRatio={1}
								width={150}
								rounded="md"
								shadow={shadow}
								size="sm"
								title={shadow}
							/>
						))}
					</View>
				</Section>

				{/* Rounded */}
				<Section
					title="Rounded"
					description="Border radius presets for card corners."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardRow}>
						{ROUNDED.slice(0, 3).map((rounded) => (
							<ImageCard
								key={rounded}
								source={{ uri: SAMPLE_IMAGES.nature }}
								aspectRatio={1}
								width={150}
								rounded={rounded}
								shadow="md"
								size="sm"
								title={rounded}
							/>
						))}
					</View>
					<View style={[styles.cardRow, { marginTop: 16 }]}>
						{ROUNDED.slice(3).map((rounded) => (
							<ImageCard
								key={rounded}
								source={{ uri: SAMPLE_IMAGES.nature }}
								aspectRatio={1}
								width={150}
								rounded={rounded}
								shadow="md"
								size="sm"
								title={rounded}
							/>
						))}
					</View>
				</Section>

				{/* Aspect Ratio */}
				<Section
					title="Aspect Ratio"
					description="Different aspect ratio configurations using number or string format."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<Text style={[styles.label, { color: theme.colors.neutral.text_2 }]}>
						Portrait (3:4), Square (1:1), Landscape (4:3)
					</Text>
					<View style={styles.cardRow}>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							aspectRatio="3:4"
							width={130}
							rounded="md"
							shadow="md"
							size="sm"
							title="3:4"
						/>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.square }}
							aspectRatio={1}
							width={150}
							rounded="md"
							shadow="md"
							size="sm"
							title="1:1"
						/>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.landscape }}
							aspectRatio="4:3"
							width={180}
							rounded="md"
							shadow="md"
							size="sm"
							title="4:3"
						/>
					</View>

					<Text
						style={[
							styles.label,
							{ color: theme.colors.neutral.text_2, marginTop: 24 },
						]}
					>
						Wide (16:9) with percentage width
					</Text>
					<ImageCard
						source={{ uri: SAMPLE_IMAGES.city }}
						aspectRatio="16:9"
						width="100%"
						rounded="lg"
						shadow="lg"
						title="Full Width Card"
						description="Using width='100%' with 16:9 aspect ratio for cinematic view."
					/>
				</Section>

				{/* Content Ratio */}
				<Section
					title="Content Ratio"
					description="Adjust the content area ratio (0-1) for custom layouts."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardRow}>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							aspectRatio="3:4"
							width={160}
							rounded="md"
							shadow="md"
							contentRatio={0.3}
							size="sm"
							title="30%"
							description="Minimal content area"
						/>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							aspectRatio="3:4"
							width={160}
							rounded="md"
							shadow="md"
							contentRatio={0.42}
							size="sm"
							title="42%"
							description="Default vertical ratio"
						/>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							aspectRatio="3:4"
							width={160}
							rounded="md"
							shadow="md"
							contentRatio={0.55}
							size="sm"
							title="55%"
							description="More content space"
						/>
					</View>
				</Section>

				{/* Content Slots */}
				<Section
					title="Content Slots"
					description="All available slots: topContent, title, description, action, footer."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardContainer}>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							aspectRatio="3:4"
							width={320}
							rounded="lg"
							shadow="xl"
							size="md"
							topContent={
								<View style={styles.tagRow}>
									<ScopedTheme name="dark">
										<Chip size="sm" variant="filled" colorScheme="success">
											Top Creator
										</Chip>
									</ScopedTheme>
								</View>
							}
							title="Emma Carter"
							description="User Experience Specialist dedicated to enhancing user satisfaction through intuitive design."
							action={
								<View style={[styles.actionRow, { marginTop: 8 }]}>
									<ScopedTheme name="dark">
										<View style={{ flexDirection: 'row', gap: 12 }}>
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'center',
													gap: 4,
												}}
											>
												<Icon icon={Heart} size="sm" color="#ffffff" />
												<Text style={{ color: '#ffffff', fontSize: 12 }}>
													387
												</Text>
											</View>
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'center',
													gap: 4,
												}}
											>
												<Icon icon={Bookmark} size="sm" color="#ffffff" />
												<Text style={{ color: '#ffffff', fontSize: 12 }}>
													1,873
												</Text>
											</View>
										</View>
									</ScopedTheme>
								</View>
							}
							footer={
								<View style={[styles.footerContent, { width: '100%' }]}>
									<ScopedTheme name="dark">
										<Button
											size="sm"
											variant="outlined"
											colorScheme="neutral"
											rounded="md"
											style={{ flex: 1 }}
										>
											Follow +
										</Button>
									</ScopedTheme>
								</View>
							}
						/>
					</View>
				</Section>

				{/* Content Fit */}
				<Section
					title="Content Fit"
					description="Image contentFit options from expo-image."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardRow}>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.landscape }}
							aspectRatio={1}
							width={150}
							rounded="md"
							shadow="md"
							contentFit="cover"
							size="sm"
							title="cover"
						/>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.landscape }}
							aspectRatio={1}
							width={150}
							rounded="md"
							shadow="md"
							contentFit="contain"
							size="sm"
							title="contain"
						/>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.landscape }}
							aspectRatio={1}
							width={150}
							rounded="md"
							shadow="md"
							contentFit="fill"
							size="sm"
							title="fill"
						/>
					</View>
				</Section>

				{/* Real-world Example - Midjourney Style */}
				<Section
					title="Real-world Example"
					description="Mimicking the original design reference (Midjourney style)."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.cardContainer}>
						<ImageCard
							source={{ uri: SAMPLE_IMAGES.portrait }}
							aspectRatio={0.8}
							width={320}
							rounded="xl"
							shadow="xl"
							size="lg"
							topContent={
								<View style={styles.tagRow}>
									<ScopedTheme name="dark">
										<Chip
											size="sm"
											variant="faded"
											colorScheme="neutral"
											rounded="sm"
										>
											85mm
										</Chip>
										<Chip
											size="sm"
											variant="faded"
											colorScheme="neutral"
											rounded="sm"
										>
											dewy skin
										</Chip>
									</ScopedTheme>
								</View>
							}
							title={`Image generated\nwith Midjourney`}
							description="close-up portrait of korean female model with natural skin texture, visible pores, joyful expression..."
							action={
								<View
									style={[styles.actionRow, { justifyContent: 'flex-end' }]}
								>
									<ScopedTheme name="dark">
										<Chip
											size="md"
											variant="faded"
											colorScheme="neutral"
											rounded="md"
											iconOnly
											aria-label="Copy prompt"
										>
											<Icon icon={MoreHorizontal} size="sm" color="#ffffff" />
										</Chip>
									</ScopedTheme>
								</View>
							}
						/>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	cardContainer: {
		alignItems: 'center',
		paddingVertical: theme.spacing[2],
	},
	cardRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.spacing[3],
		justifyContent: 'center',
	},
	label: {
		fontSize: theme.typography.caption1.fontSize,
		marginBottom: theme.spacing[2],
	},
	tagRow: {
		flexDirection: 'row',
		gap: theme.spacing[2],
	},
	footerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	actionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
}));
