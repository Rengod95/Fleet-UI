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
	const [backdropOpacityModal, setBackdropOpacityModal] = useState(false);
	const [backdropOpacity, setBackdropOpacity] = useState(0.5);
	const [backdropBlurModal, setBackdropBlurModal] = useState(false);
	const [backdropBlur, setBackdropBlur] = useState(true);
	const [backdropBlurIntensityModal, setBackdropBlurIntensityModal] = useState(false);
	const [backdropBlurIntensity, setBackdropBlurIntensity] = useState(50);
	const [closableModal, setClosableModal] = useState(false);
	const [closable, setClosable] = useState(true);
	const [showCloseButtonModal, setShowCloseButtonModal] = useState(false);
	const [showCloseButton, setShowCloseButton] = useState(true);
	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Modal"
					description="Overlay modal displayed in the center or bottom of the screen. Supports reanimated animations and drag dismiss."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Basic Modal example (open/close)."
				>
					<View style={commonStyles.column}>
						<Button variant="flat" onPress={() => setBasicModal(true)}>
							Open Modal
						</Button>
					</View>
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
								variant="flat"
								size="md"
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
					<View style={commonStyles.row}>
						{ROUNDED.map((rounded) => (
							<Button
								key={rounded}
								variant="flat"
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

				{/* Backdrop Opacity */}
				<Section title="Backdrop Opacity prop" description="Set backdrop opacity value (0-1)">
					<View style={commonStyles.row}>
						<Button variant="flat" size="md" onPress={() =>{
							 setBackdropOpacity(0);
							 setBackdropOpacityModal(true);
						}}>
							0
						</Button>
						<Button variant="flat" size="md" onPress={() =>{
							 setBackdropOpacity(0.3);
							 setBackdropOpacityModal(true);
						}}>
							0.3
						</Button>
						<Button variant="flat" size="md" onPress={() =>{
							 setBackdropOpacity(0.5);
							 setBackdropOpacityModal(true);
						}}>
							0.5
						</Button>
						<Button variant="flat" size="md" onPress={() =>{
							 setBackdropOpacity(1);
							 setBackdropOpacityModal(true);
						}}>
							1
						</Button>
					</View>
					<Modal
						visible={backdropOpacityModal}
						onClose={() => setBackdropOpacityModal(false)}
						backdropOpacity={backdropOpacity}
					>
						<Modal.Header title="Backdrop Opacity" />
						<Modal.Body>
							<Modal.Description content={`Backdrop Opacity is set to ${backdropOpacity}`} />
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setBackdropOpacityModal(false)}>Close</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* Backdrop Blur */}
				<Section title="Backdrop Blur prop" description="Set backdrop blur behavior">
					<View style={commonStyles.row}>
						<Button variant="flat" size="md" onPress={() => {
							setBackdropBlurModal(true);
							setBackdropBlur(true);
						}}>
							Enable Blur
						</Button>
						<Button variant="flat" size="md" onPress={() => {
							setBackdropBlurModal(true);
							setBackdropBlur(false);
						}}>
							Disable Blur
						</Button>
					</View>
					<Modal
						visible={backdropBlurModal}
						onClose={() => setBackdropBlurModal(false)}
						useBackdropBlur={backdropBlur}
					>
						<Modal.Header title="Backdrop Blur" />
						<Modal.Body>
							<Modal.Description content={`Backdrop Blur is set to ${backdropBlur}`} />
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setBackdropBlurModal(false)}>Close</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* Backdrop Blur Intensity */}
				<Section title="Backdrop Blur Intensity prop (0-100)" description="Set backdrop blur intensity. Default is 50.">
					<View style={commonStyles.row}>
						<Button variant="flat" size="md" onPress={() => {
							setBackdropBlurIntensity(10);
							setBackdropBlurIntensityModal(true);
						}}>
							10
						</Button>
						<Button variant="flat" size="md" onPress={() => {
							setBackdropBlurIntensity(50);
							setBackdropBlurIntensityModal(true);
						}}>
							50
						</Button>
						<Button variant="flat" size="md" onPress={() => {
							setBackdropBlurIntensity(100);
							setBackdropBlurIntensityModal(true);
						}}>
							100
						</Button>
					</View>
					<Modal
						visible={backdropBlurIntensityModal}
						onClose={() => setBackdropBlurIntensityModal(false)}
						backdropBlurIntensity={backdropBlurIntensity}
					>
						<Modal.Header title="Backdrop Blur Intensity" />
						<Modal.Body>
							<Modal.Description content={`Backdrop Blur Intensity is set to ${backdropBlurIntensity}`} />
						</Modal.Body>
					</Modal>
				</Section>

				{/* closable prop */}
				<Section title="closable prop" description="Set closable behavior">
					<Text style={commonStyles.label}>If true, modal can be closed via backdrop/swipe, if false, only via button</Text>
					<View style={commonStyles.row}>
						<Button variant="flat" size="md" onPress={() => {
							setClosableModal(true);
							setClosable(true);
						}}>
							Enable Closable
						</Button>
						<Button variant="flat" size="md" onPress={() => {
							setClosableModal(true);
							setClosable(false);
						}}>
							Disable Closable
						</Button>
					</View>
					<Modal
						visible={closableModal}
						onClose={() => setClosableModal(false)}
						closable={closable}
					>
						<Modal.Header title="Closable" />
						<Modal.Body>
							<Modal.Description content={`Closable is set to ${closable}`} />
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setClosableModal(false)}>Close</Button>
						</Modal.Footer>
					</Modal>
				</Section>

				{/* showCloseButton prop */}
				<Section title="showCloseButton prop" description="Decide to show 'X' button in the top right corner of modal header.">
					<View style={commonStyles.row}>
						<Button variant="flat" size="md" onPress={() => {
							setShowCloseButtonModal(true);
							setShowCloseButton(true);
						}}>
							Enable Show Close Button
						</Button>
						<Button variant="flat" size="md" onPress={() => {
							setShowCloseButtonModal(true);
							setShowCloseButton(false);
						}}>
							Disable Show Close Button
						</Button>
					</View>
					<Modal
						visible={showCloseButtonModal}
						onClose={() => setShowCloseButtonModal(false)}
					>
						<Modal.Header title="Show Close Button" showCloseButton={showCloseButton} />
						<Modal.Body>
							<Modal.Description content={`Show Close Button is set to ${showCloseButton}`} />
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setShowCloseButtonModal(false)}>Close</Button>
						</Modal.Footer>
					</Modal>
				</Section>
				
				{/* Swipe to Dismiss */}
				<Section
					title="Swipe to Dismiss prop"
					description="Set swipe to dismiss behavior"
				>
					<View style={commonStyles.row}>
						<Button
							variant="flat"
							size="sm"
							onPress={() => setSwipeModal(true)}
						>
							Enable Swipe
						</Button>
						<Button
							variant="flat"
							size="sm"
							onPress={() => setNoSwipeModal(true)}
						>
							Disable Swipe
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
								swipeToDismiss={'{true}'} (default){'\n\n'}
								You can close the modal by swiping down. If the threshold is exceeded, it will close, otherwise it will return to the original position.
							</Text>
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setSwipeModal(false)}>Close</Button>
						</Modal.Footer>
					</Modal>

					<Modal
						visible={noSwipeModal}
						onClose={() => setNoSwipeModal(false)}
						swipeToDismiss={false}
						closable={true}
					>
						<Modal.Header title="Swipe Disabled" />
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
											    style={{ flex: 1 }}
											>
												View Profile
											</Button>
										</ScopedTheme>
									</View>
								}
							/>
							<Modal.Description content="swipeToDismiss={'{false}'}" />
							<Modal.Description content="You need to close the modal by tapping the close button or background." />
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setNoSwipeModal(false)}>닫기</Button>
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
