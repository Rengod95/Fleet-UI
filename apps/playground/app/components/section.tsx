import {
	Icon,
	Section as LayoutSection,
	SectionHeader,
	SectionRightIcon,
	SectionRightTypo,
	type SectionSize,
} from '@fleet-ui/components';
import { ChevronRight } from 'lucide-react-native';
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
			<View style={[commonStyles.content, { gap: 122 }]}>
				<PageHeader
					title="Section"
					description="리스트 구간을 구분하는 레이아웃 컴포넌트. 헤더에 제목·서브타이틀·우측 액션을 배치하고, 사이즈/패딩/비율을 토큰 기반으로 제어합니다."
				/>

				<DemoSection
					title="Title Only + Right Icon"
					description="타이틀과 우측 아이콘을 함께 사용할 수 있습니다."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column, { gap: 44 }]}>
						<LayoutSection
							title="Section Title"
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
						></LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Title + Subtitle"
					description="타이틀과 우측 아이콘을 함께 사용할 수 있습니다."
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
					description="타이포, 패딩, 우측 아이콘 크기를 size에 따라 조정합니다."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={[styles.column, { gap: 44 }]}>
						{SIZES.map((size) => (
							<LayoutSection
								key={size}
								size={size}
								title={`Section Title ${size}`}
								subtitle="여기에 서브타이틀이 표시됩니다."
								right={
									<SectionRightTypo size={size} onPress={handleMorePress}>
										자세히 보기
									</SectionRightTypo>
								}
								contentStyle={styles.body}
								style={styles.card}
							>
								{/* <View style={[styles.placeholder, { backgroundColor: theme.colors.neutral.content_2 }]} /> */}
							</LayoutSection>
						))}
					</View>
				</DemoSection>

				<DemoSection
					title="Subtitle Position"
					description="subtitlePosition으로 서브타이틀이 타이틀/우측 행 위·아래 중 어디에 놓일지 결정합니다."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={styles.column}>
						<LayoutSection
							title="Top에 서브타이틀"
							subtitle="subtitlePosition 'top'"
							subtitlePosition="top"
							right={
								<SectionRightTypo onPress={handleMorePress}>
									자세히 보기
								</SectionRightTypo>
							}
							contentStyle={styles.body}
							style={styles.card}
						></LayoutSection>

						<LayoutSection
							title="Bottom에 서브타이틀"
							subtitle="subtitlePosition 'bottom'"
							subtitlePosition="bottom"
							right={
								<SectionRightTypo onPress={handleMorePress}>
									자세히 보기
								</SectionRightTypo>
							}
							contentStyle={styles.body}
							style={styles.card}
						></LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Title Ratio"
					description="titleRatio로 타이틀 영역과 우측 영역의 비율을 조정합니다."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={styles.column}>
						<LayoutSection
							title="타이틀 80%"
							subtitle="titleRatio=80"
							titleRatio={80}
							right={<SectionRightTypo>더보기</SectionRightTypo>}
							contentStyle={styles.body}
							style={styles.card}
						>
							<View
								style={[
									styles.placeholder,
									{ backgroundColor: theme.colors.warning.content_2 },
								]}
							/>
						</LayoutSection>

						<LayoutSection
							title="타이틀 60%"
							subtitle="titleRatio=60"
							titleRatio={60}
							right={<SectionRightTypo>더보기</SectionRightTypo>}
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
					title="Padding & Gap"
					description="padding, gap, contentSpacing으로 헤더 좌우 패딩과 타이틀-서브타이틀 간격, 바디 간격을 조절합니다."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={styles.column}>
						<LayoutSection
							title="좁은 패딩"
							subtitle="padding=theme.spacing[3], gap=theme.spacing[1]"
							padding={3}
							gap={1}
							contentSpacing={3}
							right={<SectionRightTypo>Link</SectionRightTypo>}
							contentStyle={styles.body}
							style={styles.card}
						>
							<View
								style={[
									styles.placeholder,
									{ backgroundColor: theme.colors.primary.content_2 },
								]}
							/>
						</LayoutSection>

						<LayoutSection
							title="넉넉한 패딩"
							subtitle="padding=theme.spacing[7], gap=theme.spacing[4]"
							padding={7}
							gap={4}
							contentSpacing={6}
							right={<SectionRightTypo>Link</SectionRightTypo>}
							contentStyle={styles.body}
							style={styles.card}
						>
							<View
								style={[
									styles.placeholder,
									{ backgroundColor: theme.colors.neutral.content_3 },
								]}
							/>
						</LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Right Actions"
					description="텍스트/아이콘 우측 액션에 onPress를 넘기면 Reanimated 스프링 피드백이 적용됩니다."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<View style={styles.column}>
						<LayoutSection
							title="텍스트 액션"
							subtitle="SectionRightTypo 사용"
							right={
								<SectionRightTypo onPress={handleMorePress}>
									자세히 보기
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
							title="아이콘 액션"
							subtitle="SectionRightIcon 사용"
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

						<LayoutSection
							title="커스텀 Right"
							subtitle="right prop에 노드를 직접 전달"
							right={<Icon icon={ChevronRight} />}
							contentStyle={styles.body}
							style={styles.card}
						>
							<View
								style={[
									styles.placeholder,
									{ backgroundColor: theme.colors.success.content_2 },
								]}
							/>
						</LayoutSection>
					</View>
				</DemoSection>

				<DemoSection
					title="Header Only"
					description="children 없이 헤더만 사용하여 리스트 상단 텍스트 라벨로 활용할 수 있습니다."
					sectionBodyStyle={{ marginTop: 24 }}
				>
					<SectionHeader
						title="헤더만 노출"
						subtitle="이 영역 아래에 FlatList 헤더 등으로 바로 연결할 수 있습니다."
						right={<SectionRightTypo>전체 보기</SectionRightTypo>}
						padding={5}
						testID="header-only"
					/>
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
		borderTopWidth: 1,
		borderTopColor: theme.colors.neutral.border_subtle,
	},
	placeholder: {
		borderRadius: theme.rounded.lg,
		borderCurve: 'continuous',
		height: 88,
	},
}));
