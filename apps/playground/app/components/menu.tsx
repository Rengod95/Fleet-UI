import { Button, Icon, Menu } from '@fleet-ui/components';
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
	const [iconMenuOpen, setIconMenuOpen] = useState(false);
	const [checkMenuOpen, setCheckMenuOpen] = useState(false);
	const [placementMenuOpen, setPlacementMenuOpen] = useState(false);
	const [selectedPlacement, setSelectedPlacement] =
		useState<(typeof PLACEMENTS)[number]>('bottom-start');

	// 체크 상태들
	const [checkStates, setCheckStates] = useState({
		option1: false,
		option2: true,
		option3: false,
	});

	// 필터 체크 상태
	const [filterStates, setFilterStates] = useState({
		recent: true,
		starred: false,
		archived: false,
	});

	// 정렬 체크 상태
	const [sortOption, setSortOption] = useState<string>('date-desc');

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Menu"
					description="드롭다운 메뉴를 통해 여러 옵션을 정리하여 보여주고, 사용자가 원하는 항목을 선택하거나 상태를 확인/변경할 수 있는 컴포넌트입니다."
				/>

				{/* Basic Dropdown */}
				<Section title="Basic Dropdown (No Trigger)">
					<Menu.Dropdown header={<Menu.Header>편집 메뉴</Menu.Header>}>
						<Menu.DropdownCheckItem
							checked={true}
							onCheckedChange={(checked) => console.log('첫 번째', checked)}
						>
							첫 번째 메뉴
						</Menu.DropdownCheckItem>
						<Menu.DropdownItem onPress={() => console.log('두 번째')}>
							두 번째 메뉴
						</Menu.DropdownItem>
						<Menu.DropdownItem onPress={() => console.log('세 번째')}>
							세 번째 메뉴
						</Menu.DropdownItem>
					</Menu.Dropdown>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<View style={{ gap: 16 }}>
						{SIZES.map((size) => (
							<View key={size}>
								<Text style={commonStyles.label}>Size: {size}</Text>
								<Menu.Dropdown size={size}>
									<Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
									<Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
									<Menu.DropdownItem>세 번째 메뉴</Menu.DropdownItem>
								</Menu.Dropdown>
							</View>
						))}
					</View>
				</Section>

				{/* Rounded Options */}
				<Section title="Rounded Options">
					<View style={{ gap: 16 }}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<View key={rounded}>
								<Text style={commonStyles.label}>Rounded: {rounded}</Text>
								<Menu.Dropdown rounded={rounded}>
									<Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
									<Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
								</Menu.Dropdown>
							</View>
						))}
					</View>
				</Section>

				{/* Shadow Options */}
				<Section title="Shadow Options">
					<View style={{ gap: 16 }}>
						{SHADOW_OPTIONS.map((shadow) => (
							<View key={shadow}>
								<Text style={commonStyles.label}>Shadow: {shadow}</Text>
								<Menu.Dropdown shadow={shadow}>
									<Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
									<Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
								</Menu.Dropdown>
							</View>
						))}
					</View>
				</Section>

				{/* With Icons */}
				<Section title="With Icons (left/right)">
					<Menu.Dropdown header={<Menu.Header>작업</Menu.Header>}>
						<Menu.DropdownItem
							left={<Icon icon={Edit} size="sm" colorScheme="neutral" />}
						>
							수정하기
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Copy} size="sm" colorScheme="neutral" />}
						>
							복사하기
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Share} size="sm" colorScheme="neutral" />}
						>
							공유하기
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Download} size="sm" colorScheme="neutral" />}
						>
							다운로드
						</Menu.DropdownItem>
						<Menu.DropdownItem
							left={<Icon icon={Trash} size="sm" colorScheme="error" />}
							disabled
						>
							삭제하기
						</Menu.DropdownItem>
					</Menu.Dropdown>
				</Section>

				{/* Check Items */}
				<Section title="Check Items">
					<Menu.Dropdown header={<Menu.Header>옵션 선택</Menu.Header>}>
						<Menu.DropdownCheckItem
							checked={checkStates.option1}
							onCheckedChange={(checked) =>
								setCheckStates((prev) => ({ ...prev, option1: checked }))
							}
							colorScheme="primary"
						>
							옵션 1
						</Menu.DropdownCheckItem>
						<Menu.DropdownCheckItem
							checked={checkStates.option2}
							onCheckedChange={(checked) =>
								setCheckStates((prev) => ({ ...prev, option2: checked }))
							}
							colorScheme="primary"
						>
							옵션 2
						</Menu.DropdownCheckItem>
						<Menu.DropdownCheckItem
							checked={checkStates.option3}
							onCheckedChange={(checked) =>
								setCheckStates((prev) => ({ ...prev, option3: checked }))
							}
							colorScheme="primary"
						>
							옵션 3
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
						<Menu.DropdownItem>활성화된 항목</Menu.DropdownItem>
						<Menu.DropdownItem disabled>비활성화된 항목</Menu.DropdownItem>
						<Menu.DropdownCheckItem checked={true} disabled>
							비활성화된 체크 항목
						</Menu.DropdownCheckItem>
					</Menu.Dropdown>
				</Section>

				{/* Menu.Trigger - Basic */}
				<Section title="Menu.Trigger - Basic">
					<Menu.Trigger
						open={basicMenuOpen}
						onOpen={() => setBasicMenuOpen(true)}
						onClose={() => setBasicMenuOpen(false)}
						placement="bottom-start"
						dropdown={
							<Menu.Dropdown header={<Menu.Header>메뉴</Menu.Header>}>
								<Menu.DropdownItem onPress={() => console.log('Action 1')}>
									Action 1
								</Menu.DropdownItem>
								<Menu.DropdownItem onPress={() => console.log('Action 2')}>
									Action 2
								</Menu.DropdownItem>
								<Menu.DropdownItem onPress={() => console.log('Action 3')}>
									Action 3
								</Menu.DropdownItem>
							</Menu.Dropdown>
						}
					>
						<Button variant="outlined">메뉴 열기</Button>
					</Menu.Trigger>
				</Section>

				{/* Menu.Trigger - With Icons */}
				<Section title="Menu.Trigger - With Icons">
					<Menu.Trigger
						open={iconMenuOpen}
						onOpen={() => setIconMenuOpen(true)}
						onClose={() => setIconMenuOpen(false)}
						placement="bottom-end"
						dropdown={
							<Menu.Dropdown>
								<Menu.DropdownItem
									left={<Icon icon={Star} size="sm" />}
									onPress={() => setIconMenuOpen(false)}
								>
									즐겨찾기에 추가
								</Menu.DropdownItem>
								<Menu.DropdownItem
									left={<Icon icon={Heart} size="sm" />}
									onPress={() => setIconMenuOpen(false)}
								>
									좋아요
								</Menu.DropdownItem>
								<Menu.DropdownItem
									left={<Icon icon={Bookmark} size="sm" />}
									onPress={() => setIconMenuOpen(false)}
								>
									북마크
								</Menu.DropdownItem>
								<Menu.DropdownItem
									left={<Icon icon={Share} size="sm" />}
									onPress={() => setIconMenuOpen(false)}
								>
									공유하기
								</Menu.DropdownItem>
							</Menu.Dropdown>
						}
					>
						<Button
							variant="ghost"
							leftIcon={<Icon icon={MoreVertical} size="sm" />}
						>
							더보기
						</Button>
					</Menu.Trigger>
				</Section>

				{/* Menu.Trigger - Check Items (Filter Example) */}
				<Section title="Example: Filter Menu">
					<Text style={commonStyles.label}>
						Active Filters:{' '}
						{Object.entries(filterStates)
							.filter(([_, v]) => v)
							.map(([k]) => k)
							.join(', ') || 'None'}
					</Text>
					<Menu.Trigger
						open={checkMenuOpen}
						onOpen={() => setCheckMenuOpen(true)}
						onClose={() => setCheckMenuOpen(false)}
						closeOnSelect={false}
						placement="bottom-start"
						dropdown={
							<Menu.Dropdown
								header={<Menu.Header>필터 옵션</Menu.Header>}
								shadow="lg"
							>
								<Menu.DropdownCheckItem
									checked={filterStates.recent}
									onCheckedChange={(checked) =>
										setFilterStates((prev) => ({
											...prev,
											recent: checked,
										}))
									}
									colorScheme="primary"
								>
									최근 항목
								</Menu.DropdownCheckItem>
								<Menu.DropdownCheckItem
									checked={filterStates.starred}
									onCheckedChange={(checked) =>
										setFilterStates((prev) => ({
											...prev,
											starred: checked,
										}))
									}
									colorScheme="warning"
								>
									즐겨찾기
								</Menu.DropdownCheckItem>
								<Menu.DropdownCheckItem
									checked={filterStates.archived}
									onCheckedChange={(checked) =>
										setFilterStates((prev) => ({
											...prev,
											archived: checked,
										}))
									}
									colorScheme="neutral"
								>
									보관된 항목
								</Menu.DropdownCheckItem>
							</Menu.Dropdown>
						}
					>
						<Button
							variant="outlined"
							leftIcon={<Icon icon={Filter} size="sm" />}
						>
							필터
						</Button>
					</Menu.Trigger>
				</Section>

				{/* Example: Sort Menu */}
				<Section title="Example: Sort Menu">
					<Text style={commonStyles.label}>Current Sort: {sortOption}</Text>
					<Menu.Trigger
						closeOnSelect={false}
						placement="bottom-start"
						dropdown={
							<Menu.Dropdown header={<Menu.Header>정렬 기준</Menu.Header>}>
								<Menu.DropdownCheckItem
									checked={sortOption === 'date-desc'}
									onCheckedChange={(checked) =>
										checked && setSortOption('date-desc')
									}
									colorScheme="primary"
								>
									최신순
								</Menu.DropdownCheckItem>
								<Menu.DropdownCheckItem
									checked={sortOption === 'date-asc'}
									onCheckedChange={(checked) =>
										checked && setSortOption('date-asc')
									}
									colorScheme="primary"
								>
									오래된순
								</Menu.DropdownCheckItem>
								<Menu.DropdownCheckItem
									checked={sortOption === 'name-asc'}
									onCheckedChange={(checked) =>
										checked && setSortOption('name-asc')
									}
									colorScheme="primary"
								>
									이름순 (A-Z)
								</Menu.DropdownCheckItem>
								<Menu.DropdownCheckItem
									checked={sortOption === 'name-desc'}
									onCheckedChange={(checked) =>
										checked && setSortOption('name-desc')
									}
									colorScheme="primary"
								>
									이름순 (Z-A)
								</Menu.DropdownCheckItem>
							</Menu.Dropdown>
						}
					>
						<Button
							variant="outlined"
							leftIcon={<Icon icon={SortAsc} size="sm" />}
						>
							정렬
						</Button>
					</Menu.Trigger>
				</Section>

				{/* Placement Demo */}
				<Section title="Placement Options">
					<Text style={commonStyles.label}>
						Selected Placement: {selectedPlacement}
					</Text>
					<View style={{ gap: 8, marginBottom: 16 }}>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
							{PLACEMENTS.map((p) => (
								<Button
									key={p}
									size="sm"
									variant={selectedPlacement === p ? 'filled' : 'outlined'}
									onPress={() => setSelectedPlacement(p)}
								>
									{p}
								</Button>
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

				{/* Example: Context Menu */}
				<Section title="Example: Context Menu (Edit Actions)">
					<Menu.Trigger
						placement="bottom-start"
						dropdown={
							<Menu.Dropdown shadow="lg" rounded="lg">
								<Menu.DropdownItem left={<Icon icon={Edit} size="sm" />}>
									편집
								</Menu.DropdownItem>
								<Menu.DropdownItem left={<Icon icon={Copy} size="sm" />}>
									복제
								</Menu.DropdownItem>
								<Menu.DropdownItem left={<Icon icon={Download} size="sm" />}>
									내보내기
								</Menu.DropdownItem>
								<Menu.DropdownItem
									left={<Icon icon={Trash} size="sm" colorScheme="error" />}
								>
									삭제
								</Menu.DropdownItem>
							</Menu.Dropdown>
						}
					>
						<Button variant="flat">컨텍스트 메뉴</Button>
					</Menu.Trigger>
				</Section>
			</View>
		</ScrollView>
	);
}
