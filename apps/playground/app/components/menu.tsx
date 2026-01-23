import { Button, Chip, Icon, Menu } from '@fleet-ui/components';
import {
	Bookmark,
	Calendar,
	Check,
	Clock,
	Copy,
	Download,
	Edit,
	Filter,
	Heart,
	MoreVertical,
	Settings,
	Share,
	SortAsc,
	SortDesc,
	Star,
	Trash,
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Props 상수화
const SIZES = ['sm', 'md', 'lg'] as const;
const ROUNDED_OPTIONS = ['none', 'sm', 'md', 'lg'] as const;
const SHADOW_OPTIONS = ['none', 'sm', 'md', 'lg'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const;
const PLACEMENTS = [
	'top',
	'top-start',
	'top-end',
	'bottom',
	'bottom-start',
	'bottom-end',
] as const;

export default function MenuScreen() {
	useUnistyles();

	// 트리거 열기/닫기 상태
	const [basicMenuOpen, setBasicMenuOpen] = useState(false);
	const [placementMenuOpen, setPlacementMenuOpen] = useState(false);
	const [selectedPlacement, setSelectedPlacement] =
		useState<(typeof PLACEMENTS)[number]>('bottom-start');

	const [checkStates, setCheckStates] = useState({
		option1: false,
		option2: true,
		option3: false,
	});

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Menu"
					description="Dropdown Menu for displaying multiple options and allowing users to select or check/change states."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Basic Menu.Dropdown example with no trigger."
				>
					<Menu.Dropdown header={<Menu.Header>Edit Menu</Menu.Header>}>
						<Menu.DropdownCheckItem
							checked={true}
							onCheckedChange={(checked) => console.log('First Item', checked)}
						>
							First Item
						</Menu.DropdownCheckItem>
						<Menu.DropdownItem onPress={() => console.log('Second Item')}>
							Second Item
						</Menu.DropdownItem>
						<Menu.DropdownItem onPress={() => console.log('Third Item')}>
							Third Item
						</Menu.DropdownItem>
					</Menu.Dropdown>
				</Section>

				<Section title="Menu Trigger">
					<Menu.Trigger
						open={basicMenuOpen}
						onOpen={() => setBasicMenuOpen(true)}
						onClose={() => setBasicMenuOpen(false)}
						placement="bottom-start"
						dropdown={
							<Menu.Dropdown header={<Menu.Header>Menu</Menu.Header>}>
								<Menu.DropdownItem
									left={<Icon icon={Star} size="sm" />}
								>
									Add to Favorites
								</Menu.DropdownItem>
								<Menu.DropdownItem
									left={<Icon icon={Heart} size="sm" />}
								>
									Like
								</Menu.DropdownItem>
								<Menu.DropdownItem
									left={<Icon icon={Bookmark} size="sm" />}
								>
									Bookmark
								</Menu.DropdownItem>
								<Menu.DropdownItem
									left={<Icon icon={Share} size="sm" />}
								>
									Share
								</Menu.DropdownItem>
							</Menu.Dropdown>
						}
					>
						<Button variant="outlined">Open Menu</Button>
					</Menu.Trigger>
				</Section>

				<Section title="Sizes" description='Adjust min-width, padding vertical.'>
					<View style={{ gap: 16 }}>
						{SIZES.map((size) => (
							<View key={size} style={{ width: '100%' }}>
								<Text style={commonStyles.label}>Size: {size}</Text>
								<Menu.Dropdown size={size}>
									<Menu.DropdownItem>First Item</Menu.DropdownItem>
									<Menu.DropdownItem>Second Item</Menu.DropdownItem>
									<Menu.DropdownItem>Third Item</Menu.DropdownItem>
								</Menu.Dropdown>
							</View>
						))}
					</View>
				</Section>

				{/* Rounded Options */}
				<Section title="Rounded">
					<View style={{ gap: 16 }}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<View key={rounded}>
								<Text style={commonStyles.label}>Rounded: {rounded}</Text>
								<Menu.Dropdown rounded={rounded}>
									<Menu.DropdownItem>First Item</Menu.DropdownItem>
									<Menu.DropdownItem>Second Item</Menu.DropdownItem>
								</Menu.Dropdown>
							</View>
						))}
					</View>
				</Section>

				{/* Shadow Options */}
				<Section title="Shadow">
					<View style={{ gap: 16 }}>
						{SHADOW_OPTIONS.map((shadow) => (
							<View key={shadow}>
								<Text style={commonStyles.label}>Shadow: {shadow}</Text>
								<Menu.Dropdown shadow={shadow}>
									<Menu.DropdownItem>First Item</Menu.DropdownItem>
									<Menu.DropdownItem>Second Item</Menu.DropdownItem>
								</Menu.Dropdown>
							</View>
						))}
					</View>
				</Section>

				{/* With Icons */}
				<Section title="With Icons (left/right)">
					<Menu.Dropdown header={<Menu.Header>Actions</Menu.Header>}>
						<Menu.DropdownItem
							left={<Icon icon={Edit} size="sm" colorScheme="neutral" />}
						>
							Edit
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Copy} size="sm" colorScheme="neutral" />}
						>
							Copy
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Share} size="sm" colorScheme="neutral" />}
						>
							Share
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Download} size="sm" colorScheme="neutral" />}
						>
							Download
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Trash} size="sm" colorScheme="error" />}
							disabled
						>
							Delete
						</Menu.DropdownItem>
					</Menu.Dropdown>
				</Section>

				{/* Check Items */}
				<Section title="Check Items">
					<Text style={commonStyles.label}>Press Item to check/uncheck.</Text>
					<Menu.Dropdown header={<Menu.Header>Options</Menu.Header>}>
						<Menu.DropdownCheckItem
							checked={checkStates.option1}
							onCheckedChange={(checked) =>
								setCheckStates((prev) => ({ ...prev, option1: checked }))
							}
							colorScheme="primary"
						>
							Option 1
						</Menu.DropdownCheckItem>
						<Menu.DropdownCheckItem
							checked={checkStates.option2}
							onCheckedChange={(checked) =>
								setCheckStates((prev) => ({ ...prev, option2: checked }))
							}
							colorScheme="primary"
						>
							Option 2
						</Menu.DropdownCheckItem>
						<Menu.DropdownCheckItem
							checked={checkStates.option3}
							onCheckedChange={(checked) =>
								setCheckStates((prev) => ({ ...prev, option3: checked }))
							}
							colorScheme="primary"
						>
							Option 3
						</Menu.DropdownCheckItem>
					</Menu.Dropdown>
				</Section>

				{/* Check Items with Color Schemes */}
				<Section title="Check Items - Color Schemes">
					<Menu.Dropdown>
						{COLOR_SCHEMES.map((colorScheme) => (
							<Menu.DropdownCheckItem
								key={colorScheme}
								checked={true}
								colorScheme={colorScheme}
							>
								{colorScheme}
							</Menu.DropdownCheckItem>
						))}
					</Menu.Dropdown>
				</Section>

				{/* Disabled Items */}
				<Section title="Disabled State">
					<Menu.Dropdown>
						<Menu.DropdownItem>Enabled Item</Menu.DropdownItem>
						<Menu.DropdownItem disabled>Disabled Item</Menu.DropdownItem>
						<Menu.DropdownCheckItem checked={true} disabled>
							Disabled Check Item
						</Menu.DropdownCheckItem>
					</Menu.Dropdown>
				</Section>

				{/* Placement Demo */}
				<Section title="Placement" description='Adjust dropdown position relative to the trigger. If Enough space is not available, the dropdown will be positioned to the closest edge of the screen.'>
					<Text style={commonStyles.label}>
						Selected Placement: {selectedPlacement}
					</Text>
					<View style={{ gap: 8, marginBottom: 16 }}>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
							{PLACEMENTS.map((p) => (
								<Chip
									key={p}
									size="sm"
									variant={selectedPlacement === p ? 'filled' : 'outlined'}
									onPress={() => setSelectedPlacement(p)}
								>
									{p}
								</Chip>
							))}
						</View>
					</View>

					<View style={{ alignItems: 'center', paddingVertical: 60 }}>
						<Menu.Trigger
							open={placementMenuOpen}
							onOpen={() => setPlacementMenuOpen(true)}
							onClose={() => setPlacementMenuOpen(false)}
							placement={selectedPlacement}
							dropdown={
								<Menu.Dropdown rounded="lg" shadow="lg">
									<Menu.DropdownItem>메뉴 항목 1</Menu.DropdownItem>
									<Menu.DropdownItem>메뉴 항목 2</Menu.DropdownItem>
									<Menu.DropdownItem>메뉴 항목 3</Menu.DropdownItem>
								</Menu.Dropdown>
							}
						>
							<Button>Placement: {selectedPlacement}</Button>
						</Menu.Trigger>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
