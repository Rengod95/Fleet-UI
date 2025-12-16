import {
	Button,
	Chip,
	Icon,
	TableRow,
	type TableRowAlign,
	type TableRowColorScheme,
	type TableRowContainerVariant,
	TableRowLabel,
	type TableRowSize,
	TableRowValue,
} from '@fleet-ui/components';
import { Check, Copy, ExternalLink } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Enum Props Constants
const COLOR_SCHEMES: TableRowColorScheme[] = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
];

const SIZES: TableRowSize[] = ['sm', 'md', 'lg'];

const ALIGNS: TableRowAlign[] = ['space-between', 'left'];

const CONTAINER_VARIANTS: TableRowContainerVariant[] = [
	'ghost',
	'outlined',
	'flat',
];

export default function TableRowExamplesScreen() {
	useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="TableRow"
					description="A component that displays data in a key-value format with left (label) and right (value) aligned content. Based on Toss Design System TableRow."
				/>

				{/* Basic Usage */}
				<Section
					title="Basic Usage"
					description="Simple TableRow with left label and right value."
				>
					<View style={styles.column}>
						<TableRow
							left="받는 분"
							right="김토스"
							leftVariant="flat"
							rightVariant="ghost"
						/>
						<TableRow
							left="받는 분 통장표시"
							right="강토스"
							leftVariant="flat"
							rightVariant="ghost"
						/>
						<TableRow left="미리알림" right="이체 1일 전" />
					</View>
				</Section>

				{/* Highlight */}
				<Section
					title="Highlight"
					description="Highlight the left or right content."
				>
					<View style={styles.column}>
						<TableRow left="Default Left" right="Default Right" />
						<TableRow
							left="Left Highlighted"
							right="Default Right"
							highlightLeft={true}
						/>
						<TableRow
							left="Default Left"
							right="Right Highlighted"
							highlightRight={true}
						/>
						<TableRow
							left="Both"
							right="Both Highlighted"
							highlightLeft={true}
							highlightRight={true}
						/>
					</View>
				</Section>

				{/* Align Modes */}
				<Section
					title="Alignment"
					description="space-between: Left and right at opposite ends. left: Both aligned to the left."
				>
					<View style={styles.column}>
						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>
								space-between (default)
							</Text>
							<TableRow
								align="space-between"
								left="받는 분 통장표시"
								right="강토스"
								highlightRight={true}
								highlightLeft={false}
							/>
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>left</Text>
							<TableRow align="left" left="받는 분 통장표시" right="강토스" />
						</View>
					</View>
				</Section>

				{/* Left Ratio */}
				<Section
					title="Left Ratio"
					description="Control the width ratio of the left section when align='left'."
				>
					<View style={styles.column}>
						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftRatio={'{30}'}</Text>
							<TableRow
								align="left"
								leftRatio={30}
								left="받는 분"
								right="김토스"
							/>
							<TableRow
								align="left"
								leftRatio={30}
								left="통장표시"
								right="강토스"
							/>
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftRatio={'{50}'}</Text>
							<TableRow
								align="left"
								leftRatio={50}
								left="받는 분"
								right="김토스"
							/>
							<TableRow
								align="left"
								leftRatio={50}
								left="통장표시"
								right="강토스"
							/>
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftRatio={'{70}'}</Text>
							<TableRow
								align="left"
								leftRatio={70}
								left="받는 분"
								right="김토스"
							/>
							<TableRow
								align="left"
								leftRatio={70}
								left="통장표시"
								right="강토스"
							/>
						</View>
					</View>
				</Section>

				{/* Sizes */}
				<Section title="Sizes" description="Size variants from sm to lg.">
					<View style={styles.column}>
						{SIZES.map((size) => (
							<TableRow
								key={size}
								size={size}
								left={`Size: ${size}`}
								right={`Value for ${size}`}
							/>
						))}
					</View>
				</Section>

				{/* Container Variants */}
				<Section
					title="Container Variants"
					description="leftVariant and rightVariant control the visual style of each section container."
				>
					<View style={styles.column}>
						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>leftVariant options</Text>
							{CONTAINER_VARIANTS.map((variant) => (
								<TableRow
									key={`left-${variant}`}
									leftVariant={variant}
									left={`leftVariant: ${variant}`}
									right="Default right"
								/>
							))}
						</View>

						<View style={styles.subsection}>
							<Text style={styles.subsectionTitle}>rightVariant options</Text>
							{CONTAINER_VARIANTS.map((variant) => (
								<TableRow
									key={`right-${variant}`}
									rightVariant={variant}
									left="Default left"
									right={`rightVariant: ${variant}`}
								/>
							))}
						</View>
					</View>
				</Section>

				{/* Mixed Container Variants */}
				<Section
					title="Mixed Container Variants"
					description="Combining different leftVariant and rightVariant styles."
				>
					<View style={styles.column}>
						<TableRow
							leftVariant="flat"
							rightVariant="outlined"
							left="flat"
							right="outlined"
						/>
						<TableRow
							leftVariant="outlined"
							rightVariant="flat"
							left="outlined"
							right="flat"
						/>
						<TableRow
							leftVariant="flat"
							rightVariant="flat"
							colorScheme="primary"
							left="Primary"
							right="Both flat"
						/>
					</View>
				</Section>

				{/* Color Schemes with Variants */}
				<Section
					title="Color Schemes + Variants"
					description="Colored container variants."
				>
					<View style={styles.column}>
						<TableRow
							colorScheme="success"
							leftVariant="flat"
							rightVariant="flat"
							left="Success"
							right="Verified"
						/>
						<TableRow
							colorScheme="error"
							leftVariant="outlined"
							rightVariant="outlined"
							left="Error"
							right="Failed"
						/>
						<TableRow
							colorScheme="warning"
							leftVariant="flat"
							left="Warning"
							right="Pending"
						/>
					</View>
				</Section>

				{/* Custom Content */}
				<Section
					title="Custom Content"
					description="Using React components for left/right content."
				>
					<View style={styles.column}>
						<TableRow
							left="Text style override"
							right="Primary link text"
							disableRightTextStyle
							rightTextStyle={styles.linkText}
						/>
						<TableRow
							left="Status"
							right={
								<Chip size="sm" colorScheme="success">
									Active
								</Chip>
							}
							disableRightTextStyle
						/>
						<TableRow
							left="Account"
							right={
								<View style={styles.row}>
									<Text style={styles.valueText}>1234-5678-9012</Text>
									<Icon icon={Copy} size="sm" />
								</View>
							}
							disableRightTextStyle
						/>
						<TableRow
							left={
								<View style={styles.row}>
									<Icon icon={Check} size="sm" />
									<Text style={styles.labelText}>Verified</Text>
								</View>
							}
							right="2024.01.15"
							disableLeftTextStyle
						/>
					</View>
				</Section>

				{/* Real-world Examples */}
				<Section
					title="Real-world Examples"
					description="Practical usage examples."
				>
					<View style={[styles.column, { gap: 32 }]}>
						{/* Payment Receipt */}
						<View style={styles.exampleCard}>
							<Text style={styles.cardTitle}>Payment Receipt</Text>
							<TableRow left="결제 금액" right="12,500원" size="lg" />
							<TableRow left="결제 수단" right="토스페이" />
							<TableRow left="결제 일시" right="2024.12.06 14:30" />
							<TableRow
								left="결제 상태"
								right={
									<Chip size="md" colorScheme="success">
										완료
									</Chip>
								}
								disableRightTextStyle
							/>
						</View>

						{/* Account Info */}
						<View style={styles.exampleCard}>
							<Text style={styles.cardTitle}>Account Information</Text>
							<TableRow left="이름" right="홍길동" leftVariant="flat" />
							<TableRow
								left="이메일"
								right="hong@example.com"
								leftVariant="flat"
							/>
							<TableRow
								left="전화번호"
								right="010-1234-5678"
								leftVariant="flat"
							/>
							<TableRow left="가입일" right="2024.01.01" leftVariant="flat" />
						</View>

						{/* Product Details */}
						<View style={styles.exampleCard}>
							<Text style={styles.cardTitle}>Product Details</Text>
							<TableRow
								align="left"
								leftRatio={35}
								left="상품명"
								right="Premium Subscription"
								rightVariant="ghost"
								highlightRight={true}
							/>
							<TableRow
								align="left"
								leftRatio={35}
								left="가격"
								right="월 9,900원"
								rightVariant="ghost"
								highlightRight={true}
							/>
							<TableRow
								align="left"
								leftRatio={35}
								left="혜택"
								right="무제한 이용"
							/>
							<TableRow
								align="left"
								leftRatio={35}
								left="링크"
								right={'자세히 보기'}
								rightVariant="flat"
								colorScheme="primary"
							/>
						</View>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	column: {
		gap: theme.spacing[4],
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	subsection: {
		marginBottom: theme.spacing[6],
		gap: theme.spacing[1],
	},
	subsectionTitle: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
		fontWeight: theme.text.fontWeight.medium,
		marginBottom: theme.spacing[4],
	},
	exampleCard: {
		borderCurve: 'continuous',
		backgroundColor: theme.colors.neutral.content_1,
		borderRadius: theme.rounded.xl,
		padding: theme.spacing[6],
		gap: theme.spacing[3],
		boxShadow: theme.shadows.lg,
	},
	cardTitle: {
		...theme.typography.body2Strong,
		color: theme.colors.neutral.text_1,
		marginBottom: theme.spacing[2],
	},
	labelText: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_2,
	},
	valueText: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_1,
	},
	linkText: {
		...theme.typography.body3,
		color: theme.colors.primary.solid,
	},
}));
