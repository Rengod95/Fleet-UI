import {
	Accordion,
	Button,
	Chip,
	Icon,
	IconButton,
	ImageCard,
	Input,
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
	Menu,
	Progress,
	RadioCard,
	Swiper,
	Switch,
	TabBar,
	TableRow,
	Typo,
} from '@fleet-ui/components';
import { Image } from 'expo-image';
import {
	ArrowDownLeftIcon,
	ArrowRightCircle,
	ArrowUpRightIcon,
	BellIcon,
	Bookmark,
	CameraIcon,
	DollarSign,
	Eye,
	Heart,
	MailIcon,
	MapPinIcon,
	MessageCircle,
	Search,
	Share,
	Star,
	XIcon,
} from 'lucide-react-native';
import { View } from 'react-native';
import { ScopedTheme, StyleSheet, useUnistyles } from 'react-native-unistyles';

export default function Showcases() {
	const { theme } = useUnistyles();

	return (
		<View style={styles.container}>
			<TabBarMock />
			<ItemListMock />
			<ModalMock />
			<AccordionBill />
			<ProgressCardMock />
			{/* <ImageCardMock /> */}
			<InputMock />
			<SwitchMock />
			<ButtonMock />
			<MenuMock />
			<RadioCardMock />
			<IconButtonMock />
		</View>
	);
}

const TabBarMock = () => {
	return (
		<View style={styles.TabBarContainer}>
			<TabBar
				selectedPage={0}
				items={['Home', 'Explore', 'Profile']}
				colorScheme="neutral"
				variant="filled"
				rounded="lg"
				size="sm"
			/>
		</View>
	);
};

const ModalMock = () => {
	const { theme } = useUnistyles();

	return (
		<View
			style={{
				position: 'absolute',
				bottom: 12,
				left: 32,
				width: 240,
				height: 280,
				backgroundColor: theme.colors.neutral.content_1,
				boxShadow: theme.shadows.overlay,
				borderRadius: theme.rounded.xl,
				borderCurve: 'continuous',
				flexDirection: 'column',
				padding: theme.spacing[4],
				alignItems: 'center',
				// justifyContent: 'center',
			}}
		>
			{/* @ts-ignore */}
			<Image
				source={require('../../assets/sample-icon.png')}
				style={{ width: 72, height: 72 }}
			/>
			<View
				style={{
					paddingVertical: theme.spacing[4],
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<Typo
					variant="h6Strong"
					style={{ textAlign: 'center', alignSelf: 'center' }}
				>
					Modal Header
				</Typo>
				<Typo
					variant="body3"
					style={{
						color: theme.colors.neutral.text_3,
						textAlign: 'center',
						alignSelf: 'center',
					}}
				>
					Let's get started with 30+ components
				</Typo>
			</View>
			<View
				style={{
					gap: theme.spacing[2],
					paddingHorizontal: theme.spacing[5],
					width: '100%',
					paddingVertical: theme.spacing[4],
				}}
			>
				<Button variant="filled" colorScheme="neutral" fullWidth size="sm">
					Start with Fleet UI
				</Button>
				<Button variant="ghost" colorScheme="neutral" fullWidth size="sm">
					Start with chat
				</Button>
			</View>
		</View>
	);
};

const ItemListMock = () => {
	return (
		<View style={styles.ItemListContainer}>
			<Item size="sm">
				<ItemMedia mediaType="icon" size="sm">
					<Icon icon={ArrowUpRightIcon} size="sm" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle size="sm">Transac to Franks A.</ItemTitle>
					<ItemDescription size="sm">2026-01-25 10:00:00</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Chip variant="flat" colorScheme="success" size="sm">
						+124.50 USD
					</Chip>
				</ItemActions>
			</Item>
			<Item size="sm">
				<ItemMedia mediaType="icon" size="sm">
					<Icon icon={ArrowDownLeftIcon} size="sm" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle size="sm">Transac to furkans A.</ItemTitle>
					<ItemDescription size="sm">2026-01-25 10:00:00</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Chip variant="flat" colorScheme="error" size="sm">
						-144.50 USD
					</Chip>
				</ItemActions>
			</Item>
			<Item size="sm">
				<ItemMedia mediaType="icon" size="sm">
					<Icon icon={ArrowRightCircle} size="sm" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle size="sm">Transaction to rebec</ItemTitle>
					<ItemDescription size="sm">2026-01-25 10:00:00</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Chip variant="faded" colorScheme="warning" size="sm">
						warning
					</Chip>
				</ItemActions>
			</Item>
		</View>
	);
};

const AccordionBill = () => {
	const { theme } = useUnistyles();

	return (
		<View style={styles.AccordionBillContainer}>
			<Accordion
				type="single"
				defaultValue="shipping-info"
				collapsable={true}
				colorScheme="neutral"
				size="sm"
				variant="ghost"
			>
				<Accordion.Item value="shipping-info">
					<Accordion.Header
						style={{
							padding: theme.spacing[4],
							paddingVertical: theme.spacing[5],
						}}
					>
						Final Shipping Info
					</Accordion.Header>
					<Accordion.Content style={{ padding: theme.spacing[0] }}>
						<View style={{ gap: theme.spacing[1] }}>
							{/* <Divider verticalMargin="sm" /> */}
							<View
								style={{
									backgroundColor: theme.colors.neutral.content_2,
									borderRadius: theme.rounded.md,
									padding: theme.spacing[4],
								}}
							>
								<TableRow
									size="sm"
									left="Name"
									right="John Doe"
									highlightRight={true}
								/>
								<TableRow
									size="sm"
									left="Ad."
									right={
										<TableRow.Value>
											<Chip variant="flat" colorScheme="success" size="sm">
												123 Main St, Antown
											</Chip>
										</TableRow.Value>
									}
									highlightRight={false}
									rightVariant="ghost"
									colorScheme="info"
								/>
								<TableRow size="sm" left="Email" right="john.doe@example.com" />
							</View>
							<View
								style={{
									backgroundColor: theme.colors.neutral.content_2,
									borderRadius: theme.rounded.sm,
									padding: theme.spacing[4],
									paddingVertical: theme.spacing[1],
								}}
							>
								<TableRow size="sm" left="Payment Method" right="Credit Card" />
							</View>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'flex-end',
									width: '100%',
									gap: theme.spacing[3],
									paddingVertical: theme.spacing[4],
									paddingHorizontal: theme.spacing[2],
								}}
							>
								<Typo variant="body2Strong" style={{ alignSelf: 'center' }}>
									Total 100.00
								</Typo>
								<IconButton
									icon={<DollarSign size={16} />}
									size="xs"
									style={{ width: 28, height: 28 }}
									colorScheme="neutral"
								/>
							</View>
							{/* <Divider verticalMargin="sm" /> */}
							<View
								style={{
									width: '100%',
									// marginTop: theme.spacing[2],
									paddingVertical: theme.spacing[2],
								}}
							>
								<Swiper
									size="sm"
									colorScheme="neutral"
									variant="flat"
									rounded="md"
								/>
							</View>
						</View>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</View>
	);
};

const ProgressCardMock = () => {
	const { theme } = useUnistyles();

	return (
		<View style={styles.ProgressCardContainer}>
			<Item size="sm" colorScheme="primary">
				<ItemMedia mediaType="image" size="sm" variant="filled">
					<Icon icon={CameraIcon} size="md" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle size="sm">Uploading record video</ItemTitle>
					<ItemDescription size="sm">2026-01-25 10:00:00</ItemDescription>
				</ItemContent>
				<ItemActions>
					<IconButton
						icon={<XIcon size={16} />}
						size="xs"
						style={{ width: 28, height: 28 }}
						colorScheme="neutral"
						variant="flat"
					/>
				</ItemActions>
			</Item>
			<View
				style={{
					paddingHorizontal: theme.spacing[4],
					paddingBottom: theme.spacing[2],
				}}
			>
				<Progress
					step={10}
					activeStep={5}
					thumbVariant="none"
					trackVariant="lined"
					colorScheme="primary"
					thumbGap="none"
				/>
			</View>
		</View>
	);
};

const ButtonMock = () => {
	return (
		<View style={styles.ButtonMockContainer}>
			<Button size="sm" variant="flat" colorScheme="primary" fullWidth>
				Confirm
			</Button>
			<Button size="sm" variant="outlined" colorScheme="neutral" fullWidth>
				Cancel
			</Button>
			{/* <IconButton
				icon={<PlusIcon size={20} />}
				size="sm"
				colorScheme="neutral"
			/> */}
		</View>
	);
};
const _ImageCardMock = () => {
	const { theme } = useUnistyles();
	return (
		<View style={styles.ImageCardContainer}>
			<ImageCard
				source={{
					uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
					width: 220,
					height: 340,
				}}
				aspectRatio="3:4"
				width={220}
				height={340}
				rounded="lg"
				shadow="lg"
				topContent={
					<View style={[{ flex: 1, gap: 4, justifyContent: 'flex-end' }]}>
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
		</View>
	);
};

const SwitchMock = () => {
	return (
		<View style={styles.SwitchMockContainer}>
			<Item size="sm" colorScheme="primary">
				<ItemMedia mediaType="icon" size="sm" variant="filled">
					<Icon icon={BellIcon} size="sm" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle size="sm">Enable notifications</ItemTitle>
					<ItemDescription size="sm">
						Receive notifications for new messages and updates.
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Switch size="sm" />
				</ItemActions>
			</Item>
		</View>
	);
};

const InputMock = () => {
	const { theme } = useUnistyles();
	return (
		<View style={styles.InputContainer}>
			<View
				style={{
					gap: theme.spacing[4],
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: theme.spacing[2],
				}}
			>
				<Icon
					icon={MailIcon}
					size="sm"
					color={theme.colors.neutral.text_4}
					strokeWidth={1.5}
				/>
				<Input
					size="sm"
					colorScheme="primary"
					variant="filled"
					rounded="sm"
					placeholder="Enter your email"
				/>
			</View>
			<View
				style={{
					gap: theme.spacing[4],
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: theme.spacing[2],
					maxWidth: '100%',
				}}
			>
				<Icon
					icon={MapPinIcon}
					size="sm"
					color={theme.colors.neutral.text_4}
					strokeWidth={1.5}
				/>
				<Input
					size="sm"
					colorScheme="primary"
					variant="bordered"
					rounded="sm"
					placeholder="Street name and number"
				/>
			</View>
		</View>
	);
};

const MenuMock = () => {
	const { theme } = useUnistyles();

	return (
		<View style={styles.MenuMockContainer}>
			<Menu.Dropdown size="sm" header={<Menu.Header>Menu</Menu.Header>}>
				<Menu.DropdownItem
					left={<Icon icon={Star} size="xs" />}
					style={{ paddingVertical: theme.spacing[3] }}
				>
					<Typo variant="caption1Strong">Add to Favorites</Typo>
				</Menu.DropdownItem>
				<Menu.DropdownItem
					left={<Icon icon={Heart} size="xs" />}
					style={{ paddingVertical: theme.spacing[3] }}
				>
					<Typo variant="caption1Strong">Like</Typo>
				</Menu.DropdownItem>
				<Menu.DropdownItem
					left={<Icon icon={Bookmark} size="xs" />}
					style={{ paddingVertical: theme.spacing[3] }}
				>
					<Typo variant="caption1Strong">Bookmark</Typo>
				</Menu.DropdownItem>
				<Menu.DropdownItem
					left={<Icon icon={Share} size="xs" />}
					style={{ paddingVertical: theme.spacing[3] }}
				>
					<Typo variant="caption1Strong">Share</Typo>
				</Menu.DropdownItem>
			</Menu.Dropdown>
		</View>
	);
};

const RadioCardMock = () => {
	const { theme } = useUnistyles();

	return (
		<View style={styles.RadioCardMockContainer}>
			<RadioCard
				style={{ paddingVertical: theme.spacing[4] }}
				title="Radio Card 1"
				value="radio-card-1"
				selected={true}
				colorScheme="neutral"
				variant="filled"
				size="sm"
				description="This is a description for the radio card"
			/>
			<RadioCard
				style={{ paddingVertical: theme.spacing[4] }}
				title="Radio Card 2"
				value="radio-card-2"
				selected={false}
				colorScheme="success"
				variant="outlined"
				size="sm"
				description="This is a description for the radio card"
			/>
		</View>
	);
};

const IconButtonMock = () => {
	const { theme } = useUnistyles();
	return (
		<View style={styles.IconButtonMockContainer}>
			<IconButton
				size="sm"
				variant="filled"
				colorScheme="neutral"
				aria-label="icon button"
				icon={<Search strokeWidth={1.5} />}
			/>
			<IconButton
				size="sm"
				variant="outlined"
				colorScheme="success"
				aria-label="icon button"
				icon={<Search color={theme.colors.success.text_1} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	container: {
		position: 'relative',
		flex: 1,
		backgroundColor: theme.colors.background,
		width: 720,
		height: 720,
		maxWidth: 720,
		maxHeight: 720,
		justifyContent: 'center',
		alignItems: 'center',
	},

	ItemListContainer: {
		width: 320,
		position: 'absolute',
		top: 24,
		right: 32,
		backgroundColor: theme.colors.neutral.content_1,
		boxShadow: theme.shadows.overlay,
		borderRadius: theme.rounded.xl,
		borderCurve: 'continuous',
		paddingVertical: theme.spacing[4],
		paddingHorizontal: theme.spacing[3],
	},

	TabBarContainer: {
		width: 280,
		position: 'absolute',
		top: 56,
		left: 72,
	},

	AccordionBillContainer: {
		width: 240,
		position: 'absolute',
		top: 210,
		right: 12,
		padding: theme.spacing[2],
		boxShadow: theme.shadows.overlay,
		borderRadius: theme.rounded.md,
		backgroundColor: theme.colors.neutral.content_1,
		borderCurve: 'continuous',
	},
	ProgressCardContainer: {
		width: 320,
		position: 'absolute',
		top: 112,
		left: 32,
		padding: theme.spacing[2],
		boxShadow: theme.shadows.overlay,
		borderRadius: theme.rounded.md,
		backgroundColor: theme.colors.neutral.content_1,
		borderCurve: 'continuous',
	},
	ImageCardContainer: {
		width: 320,
		position: 'absolute',
		top: 210,
		left: 32,
	},
	InputContainer: {
		width: 240,
		position: 'absolute',
		top: 300,
		left: 177,
		padding: theme.spacing[2],
		gap: theme.spacing[3],
		// boxShadow: theme.shadows.overlay,
		borderRadius: theme.rounded.md,
		// backgroundColor: theme.colors.neutral.content_1,
		borderCurve: 'continuous',
	},
	SwitchMockContainer: {
		width: 300,
		position: 'absolute',
		top: 210,
		left: 165,
		bottom: 115,
		right: 12,
		padding: theme.spacing[2],
		gap: theme.spacing[3],
		borderRadius: theme.rounded.md,
		borderCurve: 'continuous',
	},
	ButtonMockContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		width: 140,
		position: 'absolute',
		bottom: 210,
		left: 320,
		padding: theme.spacing[2],
		gap: theme.spacing[3],
		borderRadius: theme.rounded.md,
		borderCurve: 'continuous',
	},
	MenuMockContainer: {
		width: 120,
		position: 'absolute',
		top: 220,
		left: 12,
	},

	RadioCardMockContainer: {
		width: 300,
		position: 'absolute',
		bottom: 32,
		right: 10,
		padding: theme.spacing[2],
		gap: theme.spacing[3],
		borderRadius: theme.rounded.md,
		borderCurve: 'continuous',
	},
	IconButtonMockContainer: {
		flexDirection: 'row',
		gap: theme.spacing[3],
		position: 'absolute',
		bottom: 132,
		left: 300,
	},
}));
