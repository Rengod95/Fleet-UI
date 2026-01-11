import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	LayoutTop,
	Section,
	Item,
	ItemContent,
	ItemTitle,
	ItemDescription,
} from '@fleet-ui/components';
import { Link } from 'expo-router';

const SCENARIOS = [
	{
		name: 'onboarding',
		title: '📱 Onboarding Flow',
		description:
			'회원가입/로그인 흐름 (StepIndicator, Input, OTPInput, Button, Checkbox, Progress, Modal, Toast)',
		href: '/scenarios/onboarding',
	},
	{
		name: 'settings',
		title: '⚙️ Settings Page',
		description:
			'설정 페이지 (Section, Switch, Radio, RadioCard, Slider, Item, Accordion, Divider)',
		href: '/scenarios/settings',
	},
	{
		name: 'billing',
		title: '💳 Billing Page',
		description:
			'결제 페이지 (RadioCard, CheckboxCard, Slider, Input, Chip, TableRow, BottomSheetModal, State)',
		href: '/scenarios/billing',
	},
	{
		name: 'form',
		title: '📝 Forms & Inputs',
		description:
			'폼 입력 페이지 (Input variants, sizes, states, validation, Contact/Payment/Profile forms)',
		href: '/scenarios/form',
	},
] as const;

export default function ScenariosIndex() {
	useUnistyles();

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<LayoutTop
					size="md"
					title={<LayoutTop.TitleTypo>Scenarios</LayoutTop.TitleTypo>}
					subtitleBottom={
						<LayoutTop.SubtitleTypo>
							실제 도메인 컨텍스트에서 컴포넌트 조합을 테스트합니다
						</LayoutTop.SubtitleTypo>
					}
				/>

				<Section title="Available Scenarios" size="lg" contentStyle={{ marginTop: 8 }}>
					<View style={styles.cardList}>
						{SCENARIOS.map((scenario) => (
							<Link key={scenario.name} href={scenario.href} asChild>
								<Item
									variant="filled"
									style={{ paddingHorizontal: 20, paddingVertical: 16 }}
								>
									<ItemContent>
										<ItemTitle size="lg">{scenario.title}</ItemTitle>
										<ItemDescription size="md">
											{scenario.description}
										</ItemDescription>
									</ItemContent>
								</Item>
							</Link>
						))}
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		paddingTop: rt.insets.top,
		paddingBottom: rt.insets.bottom,
		flex: 1,
		backgroundColor: theme.colors.neutral.content_1,
	},
	content: {
		padding: theme.spacing[5],
		gap: theme.spacing[5],
	},
	cardList: {
		gap: theme.spacing[3],
	},
}));
