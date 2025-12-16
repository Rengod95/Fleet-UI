import { Icon, State, type StateVariant } from '@fleet-ui/components';
import { Rocket, Sparkles, Zap } from 'lucide-react-native';
import { Image, ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Enum Props 상수화
const VARIANTS: StateVariant[] = [
	'success',
	'error',
	'warning',
	'info',
	'neutral',
	'ghost',
];

export default function StateExamplesScreen() {
	const { theme } = useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="State"
					description="특정 작업의 결과를 시각적으로 보여주는 페이지 컴포넌트입니다. 성공, 에러, 경고 등의 상태를 알리고 다양한 메시지나 액션을 제공합니다."
				/>

				{/* Basic Usage */}
				<Section
					title="Basic Usage"
					description="기본적인 State 사용법. variant에 따라 자동으로 아이콘이 표시됩니다."
				>
					<State
						variant="success"
						title="Task Completed!"
						description="Your request has been successfully processed."
						button={
							<State.Button onPress={() => console.log('Check')}>
								Check
							</State.Button>
						}
					/>
				</Section>

				{/* Variants */}
				<Section
					title="Variants"
					description="variant prop으로 상태 유형을 설정합니다. 각 variant는 고유한 아이콘과 색상을 가집니다."
				>
					{VARIANTS.map((variant) => (
						<View key={variant} style={styles.variantItem}>
							<Text style={styles.variantLabel}>{variant}</Text>
							<State
								variant={variant}
								title={getVariantTitle(variant)}
								description={getVariantDescription(variant)}
							/>
						</View>
					))}
				</Section>

				{/* With Button */}
				<Section
					title="With Button"
					description="State.Button을 사용하여 액션 버튼을 추가할 수 있습니다."
				>
					<State
						variant="error"
						title="연결에 실패했습니다"
						description="네트워크 연결을 확인하고 다시 시도해 주세요."
						button={
							<State.Button onPress={() => console.log('다시 시도')}>
								다시 시도
							</State.Button>
						}
					/>
				</Section>

				{/* Custom Asset */}
				<Section
					title="Custom Asset"
					description="asset prop으로 커스텀 아이콘이나 이미지를 표시할 수 있습니다."
				>
					<State
						variant="neutral"
						asset={
							<View style={styles.customIconFrame}>
								<Icon icon={Rocket} size="_2xl" colorScheme="primary" />
							</View>
						}
						title="새로운 기능 출시"
						description="더 빠르고 강력해진 새 버전을 만나보세요."
						button={
							<State.Button onPress={() => console.log('시작하기')}>
								시작하기
							</State.Button>
						}
					/>

					<State
						variant="neutral"
						asset={
							<View style={styles.customIconFrame}>
								<Icon icon={Sparkles} size="_2xl" colorScheme="warning" />
							</View>
						}
						title="특별 이벤트 진행 중"
						description="지금 참여하면 특별한 혜택을 받을 수 있습니다."
					/>

					<State
						variant="neutral"
						asset={
							<Image
								source={{ uri: 'https://picsum.photos/80/80' }}
								style={styles.customImage}
							/>
						}
						title="프로필 업데이트"
						description="프로필 사진이 성공적으로 변경되었습니다."
					/>
				</Section>

				{/* Ghost Variant */}
				<Section
					title="Ghost Variant"
					description="ghost variant는 아이콘 프레임 없이 텍스트만 표시합니다."
				>
					<State
						variant="ghost"
						title="데이터가 없습니다"
						description="아직 등록된 항목이 없습니다. 새 항목을 추가해 보세요."
						button={
							<State.Button onPress={() => console.log('추가하기')}>
								항목 추가
							</State.Button>
						}
					/>
				</Section>

				{/* Use Cases */}
				<Section title="Use Cases" description="실제 사용 시나리오 예시">
					{/* Empty State */}
					<View style={styles.useCaseContainer}>
						<Text style={styles.useCaseLabel}>Empty State</Text>
						<State
							variant="neutral"
							asset={
								<View style={styles.customIconFrame}>
									<Icon icon={Zap} size="_2xl" colorScheme="info" />
								</View>
							}
							title="검색 결과가 없습니다"
							description="다른 키워드로 검색해 보세요."
						/>
					</View>

					{/* Error State */}
					<View style={styles.useCaseContainer}>
						<Text style={styles.useCaseLabel}>Error State</Text>
						<State
							variant="error"
							title="오류가 발생했습니다"
							description="잠시 후 다시 시도해 주세요. 문제가 지속되면 고객센터로 문의해 주세요."
							button={
								<State.Button onPress={() => console.log('문의하기')}>
									고객센터 문의
								</State.Button>
							}
						/>
					</View>

					{/* Success State */}
					<View style={styles.useCaseContainer}>
						<Text style={styles.useCaseLabel}>Success State</Text>
						<State
							variant="success"
							title="결제가 완료되었습니다"
							description="주문 내역은 마이페이지에서 확인하실 수 있습니다."
							button={
								<State.Button onPress={() => console.log('주문 확인')}>
									주문 내역 보기
								</State.Button>
							}
						/>
					</View>
				</Section>

				{/* Bottom Spacer */}
				<View style={{ height: 40 }} />
			</View>
		</ScrollView>
	);
}

// Helper functions
function getVariantTitle(variant: StateVariant): string {
	const titles: Record<StateVariant, string> = {
		success: '성공',
		error: '오류',
		warning: '경고',
		info: '안내',
		neutral: '알림',
		ghost: '알림 (Ghost)',
	};
	return titles[variant];
}

function getVariantDescription(variant: StateVariant): string {
	const descriptions: Record<StateVariant, string> = {
		success: '작업이 성공적으로 완료되었습니다.',
		error: '오류가 발생했습니다. 다시 시도해 주세요.',
		warning: '주의가 필요한 상황입니다.',
		info: '참고할 정보가 있습니다.',
		neutral: '일반적인 알림 메시지입니다.',
		ghost: '아이콘 없이 텍스트만 표시합니다.',
	};
	return descriptions[variant];
}

const styles = StyleSheet.create((theme) => ({
	variantItem: {
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.neutral.border_subtle,
		paddingBottom: theme.spacing[4],
	},
	variantLabel: {
		...theme.typography.caption1Strong,
		color: theme.colors.neutral.text_4,
		textTransform: 'uppercase',
		marginBottom: theme.spacing[2],
		paddingHorizontal: theme.spacing[4],
	},
	customIconFrame: {
		width: 64,
		height: 64,
		borderRadius: theme.rounded.xl,
		backgroundColor: theme.colors.neutral.content_2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	customImage: {
		width: 80,
		height: 80,
		borderRadius: theme.rounded.xl,
	},
	useCaseContainer: {
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.neutral.border_subtle,
		paddingBottom: theme.spacing[4],
	},
	useCaseLabel: {
		...theme.typography.body3Strong,
		color: theme.colors.neutral.text_3,
		marginBottom: theme.spacing[2],
		paddingHorizontal: theme.spacing[4],
	},
}));
