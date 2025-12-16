import { BottomSheetModal, Button, Input } from '@fleet-ui/components';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

export default function BottomSheetModalScreen() {
	const { theme } = useUnistyles();

	// Scenarios
	const [welcomeVisible, setWelcomeVisible] = useState(false);
	const [headerDescriptionVisible, setHeaderDescriptionVisible] =
		useState(false);
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [resultVisible, setResultVisible] = useState(false);
	const [customBodyVisible, setCustomBodyVisible] = useState(false);
	const [customHeaderVisible, setCustomHeaderVisible] = useState(false);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<ScrollView
					style={commonStyles.container}
					contentContainerStyle={{ paddingBottom: 100 }}
				>
					<View style={commonStyles.content}>
						<PageHeader
							title="BottomSheetModal"
							description="Detached Bottom Sheet Modal with compound components pattern."
						/>

						<Section title="Title + Subtitle + Action Icon + Action Buttons">
							<View style={commonStyles.row}>
								<Button onPress={() => setWelcomeVisible(true)}>
									Open Modal
								</Button>
							</View>
						</Section>

						<Section title="Title + Subtitle + Action Buttons">
							<View style={commonStyles.row}>
								<Button onPress={() => setHeaderDescriptionVisible(true)}>
									Open Modal
								</Button>
							</View>
						</Section>

						<Section title="Non-detached Bottom Sheet Modal">
							<View style={commonStyles.row}>
								<Button onPress={() => setResultVisible(true)}>
									Open Modal
								</Button>
							</View>
						</Section>

						<Section title="Custom Header">
							<View style={commonStyles.row}>
								<Button onPress={() => setCustomHeaderVisible(true)}>
									Open Modal
								</Button>
							</View>
						</Section>
					</View>
				</ScrollView>

				{/* 1. Welcome Modal */}
				<BottomSheetModal
					visible={welcomeVisible}
					onDismiss={() => setWelcomeVisible(false)}
				>
					<BottomSheetModal.Header
					size='lg'
						title="Welcome Fleet UI!"
						subtitle="Let's get started with 30+ components"
						actionIcon={
							<Image
								source={require('../../assets/sample-icon.png')}
								style={{ width: 124, height: 124 }}
							/>
						}
						alignment='center'
					/>

					<BottomSheetModal.Action
						primaryButtonProps={{
							children: 'Apple로 시작',
							onPress: () => console.log('Apple'),
						}}
						secondaryButtonProps={{
							children: '채팅으로 시작',
							onPress: () => console.log('Chat'),
						}}
						showPrimary
						showSecondary
					/>
				</BottomSheetModal>

				{/* 2. Header Description */}
				<BottomSheetModal
					visible={headerDescriptionVisible}
					onDismiss={() => setHeaderDescriptionVisible(false)}
				>
					<BottomSheetModal.Header
						title="Header Description"
						subtitle="Let's get started with 30+ components"
					/>
					<BottomSheetModal.Action
						layout="horizontal"
						showPrimary
						showSecondary
					/>
				</BottomSheetModal>

				{/* 2. Confirmation Modal */}
				<BottomSheetModal
					visible={confirmVisible}
					onDismiss={() => setConfirmVisible(false)}
				>
					<BottomSheetModal.Header
						actionIcon={
							<Image
								source={require('../../assets/sample-icon.png')}
								style={{ width: 48, height: 48 }}
							/>
						}
						subtitle="다음부터 자동으로 로그인할까요?"
					/>
					<BottomSheetModal.Body>
						<BottomSheetModal.BodyDescription>
							'설정'에서 언제든 변경할 수 있어요.
						</BottomSheetModal.BodyDescription>
					</BottomSheetModal.Body>
					<BottomSheetModal.Action
						layout="horizontal"
						primaryButtonProps={{
							children: '네, 좋아요',
							onPress: () => setConfirmVisible(false),
						}}
						secondaryButtonProps={{
							children: '다음에 할게요',
							onPress: () => setConfirmVisible(false),
						}}
						showPrimary
						showSecondary
					/>
				</BottomSheetModal>

				{/* 3. Result Modal */}
				<BottomSheetModal
					visible={resultVisible}
					onDismiss={() => setResultVisible(false)}
					detached={false}
				>
					<BottomSheetModal.Header
						title="최혜지님의"
						subtitle="대출 조회 결과가 나왔어요"
					/>
					<BottomSheetModal.Body>
						<View
							style={{
								padding: 16,
								backgroundColor: theme.colors.neutral.content_1,
								borderRadius: 12,
								alignItems: 'center',
								gap: 8,
							}}
						>
							<Text style={{ fontSize: 24, fontWeight: 'bold' }}>
								56개 금융사에서
							</Text>
							<Text style={{ fontSize: 16 }}>한 번에 대출 조회해보세요</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									gap: 8,
									marginTop: 8,
								}}
							>
								<Text>✅</Text>
								<Text>신용도에 영향이 없어요</Text>
							</View>
							<View
								style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
							>
								<Text>🏛️</Text>
								<Text>방문없이 한 번에 심사가 가능해요</Text>
							</View>
						</View>
					</BottomSheetModal.Body>
					<BottomSheetModal.Action
						layout="vertical"
						primaryButtonProps={{
							children: '한번에 조회하기',
							onPress: () => setResultVisible(false),
						}}
						secondaryButtonProps={{
							children: '관심없어요',
							onPress: () => setResultVisible(false),
						}}
						showPrimary
						showSecondary
					/>
				</BottomSheetModal>

				{/* 4. Custom Body */}
				<BottomSheetModal
					visible={customBodyVisible}
					onDismiss={() => setCustomBodyVisible(false)}
				>
					<BottomSheetModal.Header title="커스텀 바디 예제" />
					<BottomSheetModal.Body>
						<ScrollView
							style={{
								height: 200,
								backgroundColor: theme.colors.neutral.content_1,
								borderRadius: 8,
								padding: 12,
							}}
						>
							{Array.from({ length: 10 }).map((_, i) => (
								<View
									key={i}
									style={{
										padding: 12,
										borderBottomWidth: 1,
										borderBottomColor: theme.colors.neutral.border_subtle,
									}}
								>
									<Text>List Item {i + 1}</Text>
								</View>
							))}
						</ScrollView>
					</BottomSheetModal.Body>
					<BottomSheetModal.Footer>
						<Button onPress={() => setCustomBodyVisible(false)} fullWidth>
							닫기
						</Button>
					</BottomSheetModal.Footer>
				</BottomSheetModal>

				{/* 5. Custom Header */}
				<BottomSheetModal
					visible={customHeaderVisible}
					onDismiss={() => setCustomHeaderVisible(false)}
					detached={false}
				>
					<BottomSheetModal.Header title="Select your favorite component on Fleet UI">
						<Input
							variant="filled"
							size="lg"
							placeholder="Search your own favorite component for Fleet UI"
							endContent={<Search />}
						/>
					</BottomSheetModal.Header>
					{/* <BottomSheetModal.Body>
            <Text>Custom Body</Text>
            <Text>Custom Body</Text>
            <Text>Custom Body</Text>
            <Text>Custom Body</Text>
          </BottomSheetModal.Body> */}
					{/* <BottomSheetModal.Action showPrimary showSecondary/> */}
				</BottomSheetModal>

				{/* 6. Custom Body */}
				<BottomSheetModal
					visible={customBodyVisible}
					detached={false}
					onDismiss={() => setCustomBodyVisible(false)}
				>
					<BottomSheetModal.Body>
						<Text>Custom Body</Text>
						<Text>Custom Body</Text>
						<Text>Custom Body</Text>
						<Text>Custom Body</Text>
					</BottomSheetModal.Body>
					<BottomSheetModal.Action showPrimary showSecondary />
					<BottomSheetModal.Footer>
						<Button onPress={() => setCustomBodyVisible(false)} fullWidth>
							닫기
						</Button>
					</BottomSheetModal.Footer>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
