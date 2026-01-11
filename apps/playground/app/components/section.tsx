import {
	Icon,
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
	Section as LayoutSection,
	SectionHeader,
	SectionRightIcon,
	SectionRightTypo,
	type SectionSize,
} from '@fleet-ui/components';
import { ChevronRight, Home } from 'lucide-react-native';
import { Alert, ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	Section as DemoSection,
	PageHeader,
} from '../../common/views';

const SIZES: SectionSize[] = ['sm', 'md', 'lg', 'xl'];

export default function SectionExamplesScreen() {
	const { theme } = useUnistyles();

	const handleMorePress = () => {
		Alert.alert('자세히 보기', '우측 텍스트를 눌렀습니다.');
	};

	const handleChevronPress = () => {
		Alert.alert('아이콘 액션', '우측 아이콘을 눌렀습니다.');
	};

	return (
		<ScrollView style={commonStyles.container}>
			<View style={[commonStyles.content]}>
				<PageHeader
					title="Section"
					description="Section is a layout component that separates list sections. It places title/subtitle/right action in the header and controls size/padding/ratio based on token."
				/>

				<DemoSection
					title="Overview"
					value="overview"
					description="The most basic Section example with Items."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<LayoutSection
						title="Section Title"
						subtitle="Section Subtitle"
						style={styles.card}
						contentTopMargin={12}
					>
						{[1,2,3,4].map(item => {
							return (
								<Item key={item} variant="filled">
									<ItemMedia mediaType="icon" variant="flat" size="md">
										<Icon icon={Home} size="md" />
									</ItemMedia>
									<ItemContent>
										<ItemTitle size="md">Item {item} Title</ItemTitle>
										<ItemDescription size="md">Item description</ItemDescription>
									</ItemContent>
								</Item>
							)
						})}
					</LayoutSection>
				</DemoSection>

				<DemoSection
					title="Title Only + Right Icon"
					description="Title and right icon can be used together."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column, { gap: 44 }]}>
						<LayoutSection
							title="Section Title"
							right={
								<SectionRightIcon
									accessibilityLabel="Icon action"
									onPress={handleChevronPress}
									icon={
										<ChevronRight
											size={theme.spacing[7]}
											color={theme.colors.neutral.text_2}
											strokeWidth={1.5}
										/>
									}
								/>
							}
							contentStyle={styles.body}
							style={styles.card}
						></LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Title + Subtitle"
					description="Title and subtitle can be used together."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column, { gap: 44 }]}>
						<LayoutSection
							title="Section Title"
							subtitle="Section Subtitle"
							contentStyle={styles.body}
							style={styles.card}
						></LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Sizes"
					description="Adjust title/subtitle/right icon size based on size."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column, { gap: 44 }]}>
						{SIZES.map((size) => (
							<LayoutSection
								key={size}
								size={size}
								title={`Section Title ${size}`}
								subtitle="Here is the subtitle."
								right={
									<SectionRightTypo size={size} onPress={handleMorePress}>
										View more
									</SectionRightTypo>
								}
								contentStyle={styles.body}
								style={styles.card}
							>
							</LayoutSection>
						))}
					</View>
				</DemoSection>

				<DemoSection
					title="Subtitle Position"
					description="Determine where the subtitle will be placed in the title/right row using subtitlePosition."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={styles.column}>
						<LayoutSection
							title="Subtitle at Top"
							subtitle="subtitlePosition 'top'"
							subtitlePosition="top"
							right={
								<SectionRightTypo onPress={handleMorePress}>
									View more
								</SectionRightTypo>
							}
							contentStyle={styles.body}
							style={styles.card}
						></LayoutSection>

						<LayoutSection
							title="Subtitle at Bottom"
							subtitle="subtitlePosition 'bottom'"
							subtitlePosition="bottom"
							right={
								<SectionRightTypo onPress={handleMorePress}>
									View more
								</SectionRightTypo>
							}
							contentStyle={styles.body}
							style={styles.card}
						></LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Title Ratio"
					description="Adjust the ratio of the title area and right area using titleRatio."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={styles.column}>
						<LayoutSection
							title="Title 80% - Long Text example, Long Text example"
							subtitle="titleRatio = 80"
							titleRatio={80}
							right={<SectionRightTypo>View more</SectionRightTypo>}
							headerStyle={{backgroundColor: theme.colors.neutral.content_4}}
							style={styles.card}
						/>

						<LayoutSection
							title="Title 60% - Long Text example, Long Text example"
							subtitle="titleRatio = 60"
							titleRatio={60}
							right={<SectionRightTypo>View more</SectionRightTypo>}
							contentStyle={styles.body}
							style={styles.card}
						>
							<View
								style={[
									styles.placeholder,
									{ backgroundColor: theme.colors.neutral.content_2 },
								]}
							/>
						</LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="contentPaddingVertical"
					description="Adjust the padding of the body(content area) using contentPaddingVertical."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column,{width:'100%'}]}>
						<LayoutSection
							title="contentPaddingVertical = 32"
							subtitle="Subtitle is here"
							contentPaddingVertical={32}
							contentGap={40}
							style={[styles.card]}
							right={<SectionRightTypo>Link</SectionRightTypo>}
							contentStyle={{width:'100%', backgroundColor:theme.colors.primary.content_3}}
						>
							<View style={{width:'100%'}}>
							{[1,2,3,4].map(item => {
								return (
									<Item key={item} variant="filled">
										<ItemMedia mediaType="icon" variant="flat" size="md">
											<Icon icon={Home} size="md" />
										</ItemMedia>
										<ItemContent>
											<ItemTitle size="md">Item {item} Title</ItemTitle>
											<ItemDescription size="md">Item description</ItemDescription>
										</ItemContent>
									</Item>
								)
							})}
						</View>
						</LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="contentPaddingHorizontal"
					description="Adjust the padding of the body(content area) using contentPaddingHorizontal."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column,{width:'100%'}]}>
						<LayoutSection
							title="contentPaddingHorizontal = 32"
							subtitle="Subtitle is here"
							contentPaddingHorizontal={32}
							contentGap={40}
							style={[styles.card]}
							right={<SectionRightTypo>Link</SectionRightTypo>}
							contentStyle={{width:'100%', backgroundColor:theme.colors.primary.content_3}}
						>
							<View style={{width:'100%'}}>
							{[1,2,3,4].map(item => {
								return (
									<Item key={item} variant="filled">
										<ItemMedia mediaType="icon" variant="flat" size="md">
											<Icon icon={Home} size="md" />
										</ItemMedia>
										<ItemContent>
											<ItemTitle size="md">Item {item} Title</ItemTitle>
											<ItemDescription size="md">Item description</ItemDescription>
										</ItemContent>
									</Item>
								)
							})}
						</View>
						</LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="contentTopMargin"
					description="Adjust the top margin of the body(content area) between header and body."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column,{width:'100%'}]}>
						<LayoutSection
							title="contentTopMargin = 48"
							subtitle="Subtitle is here"
							contentTopMargin={48}
							contentGap={40}
							style={[styles.card]}
							right={<SectionRightTypo>Link</SectionRightTypo>}
							contentStyle={{width:'100%', backgroundColor:theme.colors.primary.content_3}}
						>
							<View style={{width:'100%'}}>
							{[1,2,3,4].map(item => {
								return (
									<Item key={item} variant="filled">
										<ItemMedia mediaType="icon" variant="flat" size="md">
											<Icon icon={Home} size="md" />
										</ItemMedia>
										<ItemContent>
											<ItemTitle size="md">Item {item} Title</ItemTitle>
											<ItemDescription size="md">Item description</ItemDescription>
										</ItemContent>
									</Item>
								)
							})}
						</View>
						</LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="contentGap"
					description="Adjust the gap between items in body(content area)."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column,{width:'100%'}]}>
						<LayoutSection
							title="contentGap = 24"
							subtitle="Subtitle is here"
							contentGap={24}
							style={[styles.card]}
							right={<SectionRightTypo>Link</SectionRightTypo>}
							contentStyle={{width:'100%', backgroundColor:theme.colors.primary.content_3}}
						>
							{[1,2,3,4].map(item => {
								return (
									<Item key={item} variant="filled">
										<ItemMedia mediaType="icon" variant="flat" size="md">
											<Icon icon={Home} size="md" />
										</ItemMedia>
										<ItemContent>
											<ItemTitle size="md">Item {item} Title</ItemTitle>
											<ItemDescription size="md">Item description</ItemDescription>
										</ItemContent>
									</Item>
								)
							})}
						</LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Right Actions"
					description="Text/Icon right action with onPress will apply Reanimated spring feedback."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column, {gap:24}]}>
						<LayoutSection
							title="Text Action"
							subtitle="SectionRightTypo is used"
							right={
								<SectionRightTypo onPress={handleMorePress}>
									View more
								</SectionRightTypo>
							}
							contentStyle={styles.body}
							style={styles.card}
						>
							<View
								style={[
									styles.placeholder,
									{ backgroundColor: theme.colors.neutral.content_2 },
								]}
							/>
						</LayoutSection>

						<LayoutSection
							title="Icon Action"
							subtitle="SectionRightIcon is used"
							right={
								<SectionRightIcon
									accessibilityLabel="아이콘 액션"
									onPress={handleChevronPress}
									icon={
										<ChevronRight
											size={theme.spacing[7]}
											color={theme.colors.neutral.text_2}
											strokeWidth={1.5}
										/>
									}
								/>
							}
							contentStyle={styles.body}
							style={styles.card}
						>
							<View
								style={[
									styles.placeholder,
									{ backgroundColor: theme.colors.info.content_2 },
								]}
							/>
						</LayoutSection>
					</View>
				</DemoSection>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	column: {
		gap: theme.spacing[17],
	},
	card: {
		backgroundColor: theme.colors.neutral.content_1,
		borderRadius: theme.rounded.xl,
		borderCurve: 'continuous',
	},
	body: {
	},
	placeholder: {
		borderRadius: theme.rounded.lg,
		borderCurve: 'continuous',
		height: 88,
	},
}));
