import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const SAMPLE_PAGES = [
	{
		name: 'onboarding',
		title: '📱 Onboarding Flow',
		description: '회원가입/로그인 흐름 (StepIndicator, Input, OTPInput, Button, Checkbox, Progress, Modal, Toast)',
		href: '/samples/onboarding',
	},
	{
		name: 'settings',
		title: '⚙️ Settings Page',
		description: '설정 페이지 (Section, Switch, Radio, RadioCard, Slider, Item, Accordion, Divider)',
		href: '/samples/settings',
	},
	{
		name: 'billing',
		title: '💳 Billing Page',
		description: '결제 페이지 (RadioCard, CheckboxCard, Slider, Input, Chip, TableRow, BottomSheetModal, State)',
		href: '/samples/billing',
	},
	{
		name: 'form',
		title: '📝 Forms & Inputs',
		description: '폼 입력 페이지 (Input variants, sizes, states, validation, Contact/Payment/Profile forms)',
		href: '/samples/form',
	},
] as const;

export default function SamplesIndex() {
	useUnistyles();

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Sample Pages</Text>
				<Text style={styles.subtitle}>
					실제 도메인 컨텍스트에서 컴포넌트 조합을 테스트합니다
				</Text>

				<View style={styles.cardList}>
					{SAMPLE_PAGES.map((page) => (
						<Link key={page.name} href={page.href as any} asChild>
							<Pressable style={styles.card}>
								<View style={styles.cardContent}>
									<Text style={styles.cardTitle}>{page.title}</Text>
									<Text style={styles.cardDescription}>{page.description}</Text>
								</View>
								<Text style={styles.arrow}>→</Text>
							</Pressable>
						</Link>
					))}
				</View>

				<View style={styles.infoBox}>
					<Text style={styles.infoTitle}>🎯 목적</Text>
					<Text style={styles.infoText}>
						• 컴포넌트 간 시각적 조화 검증{'\n'}
						• 실제 UX 흐름에서의 사용성 테스트{'\n'}
						• 스타일 일관성 및 상호작용 확인
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.neutral.content_1,
	},
	content: {
		padding: 20,
	},
	title: {
		...theme.typography.h2,
		color: theme.colors.neutral.text_1,
		marginBottom: 8,
	},
	subtitle: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_3,
		marginBottom: 24,
	},
	cardList: {
		gap: 12,
		marginBottom: 32,
	},
	card: {
		backgroundColor: theme.colors.neutral.content_2,
		padding: 20,
		borderRadius: theme.rounded.lg,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		boxShadow: theme.shadows.card,
	},
	cardContent: {
		flex: 1,
		marginRight: 12,
	},
	cardTitle: {
		...theme.typography.h5,
		color: theme.colors.neutral.text_1,
		marginBottom: 4,
	},
	cardDescription: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_3,
	},
	arrow: {
		...theme.typography.h4,
		color: theme.colors.primary.solid,
	},
	infoBox: {
		backgroundColor: theme.colors.info.subtle,
		padding: 16,
		borderRadius: theme.rounded.md,
		borderWidth: 1,
		borderColor: theme.colors.info.border,
	},
	infoTitle: {
		...theme.typography.h6,
		color: theme.colors.info.text,
		marginBottom: 8,
	},
	infoText: {
		...theme.typography.body3,
		color: theme.colors.info.text,
		lineHeight: 22,
	},
}));
