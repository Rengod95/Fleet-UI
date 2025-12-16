import {
	Button,
	Chip,
	Icon,
	ImageCard,
	Modal,
	type ModalRounded,
	type ModalSize,
} from '@fleet-ui/components';
import { Eye, MessageCircle, Share } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
	BounceIn,
	BounceOut,
	FadeIn,
	FadeOut,
	FlipInXUp,
	FlipOutXDown,
	SlideInDown,
	SlideInUp,
	SlideOutDown,
	SlideOutUp,
	ZoomIn,
	ZoomOut,
} from 'react-native-reanimated';
import { ScopedTheme, StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Props 상수화
const SIZES: ModalSize[] = ['sm', 'md', 'lg'];
const ROUNDED: ModalRounded[] = ['none', '_2xs', 'xs', 'sm', 'md', 'lg'];

export default function ModalExamplesScreen() {
	const { theme } = useUnistyles();

	// 각 예제별 모달 상태
	const [basicModal, setBasicModal] = useState(false);
	const [sizeModal, setSizeModal] = useState<{
		visible: boolean;
		size: ModalSize;
	}>({ visible: false, size: 'md' });
	const [roundedModal, setRoundedModal] = useState<{
		visible: boolean;
		rounded: ModalRounded;
	}>({ visible: false, rounded: 'md' });
	const [swipeModal, setSwipeModal] = useState(false);
	const [noSwipeModal, setNoSwipeModal] = useState(false);
	const [alertModal, setAlertModal] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Modal"
					description="화면 중앙 또는 하단에 표시되는 오버레이 모달. Reanimated entering/exiting 애니메이션과 드래그 dismiss를 지원합니다."
				/>

				{/* Basic Usage */}
				<Section title="Basic Usage" description="기본적인 Modal 사용법">
					<Button onPress={() => setBasicModal(true)}>기본 모달 열기</Button>

					<Modal visible={basicModal} onClose={() => setBasicModal(false)}>
						<Modal.Header title="Basic Modal Example Title with long text" />
						<Modal.Body>
							<Modal.Description content="Basic Modal Example Description For Long text Testing example descriptions." />
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="ghost"
								colorScheme="neutral"
								onPress={() => setBasicModal(false)}
							>
								취소
							</Button>
							<Button
								onPress={() => setBasicModal(false)}
								fullWidth
								colorScheme="neutral"
							>
								확인
							</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* Sizes */}
				<Section
					title="Sizes"
					description="Set max width and content padding, gaps by size variant"
				>
					<View style={styles.buttonRow}>
						{SIZES.map((size) => (
							<Button
								key={size}
								variant="outlined"
								size="sm"
								onPress={() => setSizeModal({ visible: true, size })}
							>
								{size}
							</Button>
						))}
					</View>

					<Modal
						visible={sizeModal.visible}
						onClose={() => setSizeModal({ ...sizeModal, visible: false })}
						size={sizeModal.size}
						closable={false}
					>
						<Modal.Header
							title={`Basic Modal Example Title with long text ${sizeModal.size}`}
						/>
						<Modal.Body>
							<Modal.Description content="Basic Modal Example Description For Long text Testing example descriptions." />
						</Modal.Body>
						<Modal.Footer>
							<Button
								onPress={() => setBasicModal(false)}
								fullWidth
								colorScheme="neutral"
							>
								Confirm
							</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* Rounded */}
				<Section
					title="Rounded"
					description="Set border radius by rounded variant"
				>
					<View style={styles.buttonRow}>
						{ROUNDED.map((rounded) => (
							<Button
								key={rounded}
								variant="outlined"
								size="sm"
								onPress={() => setRoundedModal({ visible: true, rounded })}
							>
								{rounded}
							</Button>
						))}
					</View>
					<Modal
						visible={roundedModal.visible}
						onClose={() => setRoundedModal({ ...roundedModal, visible: false })}
						rounded={roundedModal.rounded}
					>
						<Modal.Header
							title={`Basic Modal Example Title with long text ${roundedModal.rounded}`}
						/>
						<Modal.Body>
							<Modal.Description content="Basic Modal Example Description For Long text Testing example descriptions." />
						</Modal.Body>
						<Modal.Footer>
							<Button
								onPress={() =>
									setRoundedModal({ ...roundedModal, visible: false })
								}
								fullWidth
								colorScheme="neutral"
							>
								Confirm
							</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* Swipe to Dismiss */}
				<Section
					title="Swipe to Dismiss"
					description="드래그하여 모달을 닫을 수 있습니다"
				>
					<View style={styles.buttonRow}>
						<Button
							variant="outlined"
							size="sm"
							onPress={() => setSwipeModal(true)}
						>
							Swipe 활성화
						</Button>
						<Button
							variant="outlined"
							size="sm"
							onPress={() => setNoSwipeModal(true)}
						>
							Swipe 비활성화
						</Button>
					</View>

					<Modal
						visible={swipeModal}
						onClose={() => setSwipeModal(false)}
						swipeToDismiss={true}
					>
						<Modal.Header title="Swipe to Dismiss" showCloseButton={false} />
						<Modal.Body>
							<Text style={styles.bodyText}>
								swipeToDismiss={'{true}'} (기본값){'\n\n'}
								모달을 아래로 스와이프하여 닫을 수 있습니다. 임계값(100px)을
								넘으면 닫히고, 그렇지 않으면 원래 위치로 돌아갑니다.
							</Text>
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setSwipeModal(false)}>닫기</Button>
						</Modal.Footer>
					</Modal>

					<Modal
						visible={noSwipeModal}
						onClose={() => setNoSwipeModal(false)}
						swipeToDismiss={false}
						closable={true}
					>
						<Modal.Header title="Swipe 비활성화" />
						<Modal.Body>
							<ImageCard
								source={{
									uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
								}}
								aspectRatio="3:4"
								width={320}
								rounded="lg"
								shadow="lg"
								topContent={
									<View
										style={[{ flex: 1, gap: 4, justifyContent: 'flex-end' }]}
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
							<Modal.Description content="swipeToDismiss={'{false}'}" />
							<Modal.Description content="닫기 버튼이나 배경을 터치하여 닫아야 합니다." />
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setNoSwipeModal(false)}>닫기</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* Use Cases */}
				<Section title="Use Cases" description="실제 사용 시나리오 예시">
					<View style={styles.buttonRow}>
						<Button
							variant="outlined"
							colorScheme="warning"
							onPress={() => setAlertModal(true)}
						>
							Alert
						</Button>
						<Button
							variant="outlined"
							colorScheme="error"
							onPress={() => setConfirmModal(true)}
						>
							Confirm Delete
						</Button>
					</View>

					{/* Alert Modal */}
					<Modal
						visible={alertModal}
						onClose={() => setAlertModal(false)}
						size="md"
						closable={false}
						swipeToDismiss={false}
					>
						<Modal.Header
							title="네트워크 에러 발생"
							showCloseButton={false}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						/>
						<Modal.Body
							style={{ justifyContent: 'center', alignItems: 'center' }}
						>
							<Modal.Description content="네트워크 연결이 불안정합니다" />
							<Modal.Description content="잠시 후 다시 시도해주세요." />
						</Modal.Body>
						<Modal.Footer>
							<Button fullWidth onPress={() => setAlertModal(false)}>
								확인
							</Button>
						</Modal.Footer>
					</Modal>

					{/* Confirm Delete Modal */}
					<Modal
						visible={confirmModal}
						onClose={() => setConfirmModal(false)}
						size="md"
					>
						<Modal.Header title="삭제 확인" />
						<Modal.Body>
							<Modal.Description content="정말로 이 항목을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다." />
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="ghost"
								colorScheme="neutral"
								onPress={() => setConfirmModal(false)}
								style={{ flex: 1 }}
							>
								취소
							</Button>
							<Button
								colorScheme="error"
								onPress={() => setConfirmModal(false)}
								style={{ flex: 1 }}
							>
								삭제
							</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* Bottom Spacer */}
				<View style={{ height: 40 }} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	buttonRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.spacing[3],
	},
	buttonGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.spacing[2],
	},
	bodyText: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
		lineHeight: 22,
	},
}));
