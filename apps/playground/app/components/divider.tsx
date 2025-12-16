import {
	Divider,
	type DividerColorScheme,
	type DividerSize,
	type DividerVariant,
} from '@fleet-ui/components';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';
import { DividerHorizontalMargin } from '@fleet-ui/components/src/Divider/Divider.types';

const VARIANTS: DividerVariant[] = ['line', 'thick'];
const SIZES: DividerSize[] = ['sm', 'md', 'lg'];
const PADDED: DividerHorizontalMargin[] = ['none', 'sm', 'md', 'lg'];
const COLOR_SCHEMES: DividerColorScheme[] = ['base', 'inverted'];

export default function DividerExamplesScreen() {
	const { theme } = useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Divider"
					description="콘텐츠 영역이나 섹션을 시각적으로 구분하는 수평 구분선. line(얇은 선)과 thick(두꺼운 선) 스타일을 지원합니다."
				/>

				{/* Variants */}
				<Section
					title="Variants"
					description="line: 일반적인 얇은 구분선, thick: 섹션 단위 구분을 위한 두꺼운 선"
				>
					<View style={styles.demoContainer}>
						<Text style={commonStyles.label}>line (default)</Text>
						<Divider variant="line" />
					</View>
					<View style={styles.demoContainer}>
						<Text style={commonStyles.label}>thick</Text>
						<Divider variant="thick" />
					</View>
				</Section>

				{/* Sizes - Line Variant */}
				<Section
					title="Sizes (line variant)"
					description="sm: hairlineWidth, md: 1px (default), lg: 4px"
				>
					{SIZES.map((size) => (
						<View key={size} style={styles.demoContainer}>
							<Text style={commonStyles.label}>size: {size}</Text>
							<Divider variant="line" size={size} />
						</View>
					))}
				</Section>

				{/* Sizes - Thick Variant */}
				<Section
					title="Sizes (thick variant)"
					description="sm: 4px, md: 16px (default), lg: 24px"
				>
					{SIZES.map((size) => (
						<View key={size} style={styles.demoContainer}>
							<Text style={commonStyles.label}>size: {size}</Text>
							<Divider variant="thick" size={size} />
						</View>
					))}
				</Section>

				{/* Padded */}
				<Section
					title="Padded"
					description="좌우 패딩을 적용하여 구분선의 너비를 조절합니다."
				>
					{PADDED.map((padded) => (
						<View key={padded} style={styles.demoContainer}>
							<Text style={commonStyles.label}>padded: {padded}</Text>
							<Divider padded={padded} />
						</View>
					))}
				</Section>

				{/* Padded with Thick Variant */}
				<Section
					title="Padded + Thick"
					description="두꺼운 구분선에도 패딩을 적용할 수 있습니다."
				>
					{PADDED.map((padded) => (
						<View key={padded} style={styles.demoContainer}>
							<Text style={commonStyles.label}>padded: {padded}</Text>
							<Divider variant="thick" size="sm" padded={padded} />
						</View>
					))}
				</Section>

				{/* Color Schemes */}
				<Section
					title="Color Schemes"
					description="base: 기본 색상, inverted: 테마 반전 (ScopedTheme 활용)"
				>
					<View style={styles.demoContainer}>
						<Text style={commonStyles.label}>colorScheme: base (default)</Text>
						<Divider colorScheme="base" />
					</View>

					<View style={styles.demoContainer}>
						<Text style={commonStyles.label}>colorScheme: inverted</Text>
						<Divider colorScheme="inverted" />
					</View>
				</Section>

				{/* Inverted on Dark Background */}
				<Section
					title="Inverted 사용 예시"
					description="어두운 배경에서 inverted 사용"
				>
					<View
						style={[
							styles.darkBackground,
							{ backgroundColor: theme.colors.neutral.content_inversed },
						]}
					>
						<Text
							style={[
								styles.darkBackgroundText,
								{ color: theme.colors.neutral.text_inversed },
							]}
						>
							Dark Background
						</Text>
						<Divider colorScheme="inverted" />
						<Text
							style={[
								styles.darkBackgroundText,
								{ color: theme.colors.neutral.text_inversed },
							]}
						>
							Content After Divider
						</Text>
					</View>
				</Section>

				{/* Use Cases */}
				<Section title="사용 사례" description="실제 사용 시나리오 예시">
					{/* List Item Separation */}
					<Text
						style={[
							styles.useCaseTitle,
							{ color: theme.colors.neutral.text_1 },
						]}
					>
						1. 리스트 항목 구분
					</Text>
					<View style={styles.listContainer}>
						<View style={styles.listItem}>
							<Text style={{ color: theme.colors.neutral.text_1 }}>Item 1</Text>
						</View>
						<Divider size="sm" />
						<View style={styles.listItem}>
							<Text style={{ color: theme.colors.neutral.text_1 }}>Item 2</Text>
						</View>
						<Divider size="sm" />
						<View style={styles.listItem}>
							<Text style={{ color: theme.colors.neutral.text_1 }}>Item 3</Text>
						</View>
					</View>

					{/* Section Separation */}
					<Text
						style={[
							styles.useCaseTitle,
							{ color: theme.colors.neutral.text_1, marginTop: 24 },
						]}
					>
						2. 섹션 구분
					</Text>
					<View style={styles.sectionContainer}>
						<View style={styles.section}>
							<Text
								style={[
									styles.sectionTitle,
									{ color: theme.colors.neutral.text_1 },
								]}
							>
								Section A
							</Text>
							<Text style={{ color: theme.colors.neutral.text_2 }}>
								Section A content goes here...
							</Text>
						</View>
						<Divider variant="thick" size="md" />
						<View style={styles.section}>
							<Text
								style={[
									styles.sectionTitle,
									{ color: theme.colors.neutral.text_1 },
								]}
							>
								Section B
							</Text>
							<Text style={{ color: theme.colors.neutral.text_2 }}>
								Section B content goes here...
							</Text>
						</View>
					</View>

					{/* Card Internal Separation */}
					<Text
						style={[
							styles.useCaseTitle,
							{ color: theme.colors.neutral.text_1, marginTop: 24 },
						]}
					>
						3. 카드 내부 구분 (패딩 적용)
					</Text>
					<View
						style={[
							styles.cardContainer,
							{
								backgroundColor: theme.colors.neutral.content_1,
								borderColor: theme.colors.neutral.border_default,
							},
						]}
					>
						<Text
							style={[styles.cardTitle, { color: theme.colors.neutral.text_1 }]}
						>
							Card Title
						</Text>
						<Divider padded="md" />
						<Text style={{ color: theme.colors.neutral.text_2 }}>
							Card content with padded divider that doesn't extend to the edges.
						</Text>
					</View>
				</Section>

				{/* All Combinations */}
				<Section
					title="Variant + Size 조합"
					description="모든 variant와 size 조합 표시"
				>
					{VARIANTS.map((variant) => (
						<View key={variant} style={styles.combinationGroup}>
							<Text
								style={[
									styles.combinationTitle,
									{ color: theme.colors.neutral.text_1 },
								]}
							>
								{variant}
							</Text>
							{SIZES.map((size) => (
								<View key={`${variant}-${size}`} style={styles.demoContainer}>
									<Text
										style={[
											styles.label,
											{ color: theme.colors.neutral.text_2 },
										]}
									>
										{variant} + {size}
									</Text>
									<Divider variant={variant} size={size} />
								</View>
							))}
						</View>
					))}
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	demoContainer: {
		marginBottom: 16,
	},
	label: {
		...commonStyles.label,
		marginBottom: 8,
	},
	darkBackground: {
		padding: 16,
		borderRadius: theme.rounded.md,
		gap: 12,
	},
	darkBackgroundText: {
		fontSize: theme.typography.body2.fontSize,
	},
	useCaseTitle: {
		fontSize: theme.typography.body1.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
		marginBottom: 12,
	},
	listContainer: {
		borderRadius: theme.rounded.md,
		overflow: 'hidden',
	},
	listItem: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	sectionContainer: {
		gap: 0,
	},
	section: {
		paddingVertical: 16,
		paddingHorizontal: 0,
	},
	sectionTitle: {
		fontSize: theme.typography.h4.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
		marginBottom: 8,
	},
	cardContainer: {
		borderRadius: theme.rounded.lg,
		borderWidth: 1,
		padding: 16,
		gap: 12,
	},
	cardTitle: {
		fontSize: theme.typography.h4.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
	},
	combinationGroup: {
		marginBottom: 24,
	},
	combinationTitle: {
		fontSize: theme.typography.body2Strong.fontSize,
		fontWeight: theme.text.fontWeight.semibold,
		marginBottom: 12,
		textTransform: 'uppercase',
	},
}));
