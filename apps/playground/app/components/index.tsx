import {
	Icon,
	Input,
	Item,
	ItemContent,
	ItemTitle,
	LayoutTop,
	Section,
} from '@fleet-ui/components';
import { Link } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const COMPONENTS = [
	{
		id: 'accordion',
		name: 'Accordion',
		description: 'Expandable content sections with animations',
		icon: '📂',
	},
	{
		id: 'actionbutton',
		name: 'ActionButton',
		description: 'Icon/Image-focused vertical button',
		icon: '🎯',
	},
	{
		id: 'bottom-sheet-modal',
		name: 'BottomSheetModal',
		description: 'Detached bottom sheet modal',
		icon: '📃',
	},
	{
		id: 'button',
		name: 'Button',
		description: 'Interactive button component',
		icon: '🔘',
	},
	{
		id: 'checkbox',
		name: 'Checkbox',
		description: 'Controlled checkbox with animations',
		icon: '☑️',
	},
	{
		id: 'checkbox-card',
		name: 'CheckboxCard',
		description: 'Card-style checkbox with Item layout',
		icon: '✅',
	},
	{
		id: 'chip',
		name: 'Chip',
		description: 'Small, interactive, clickable labels',
		icon: '🏷️',
	},
	{
		id: 'context-header',
		name: 'ContextHeader',
		description: 'Custom header replacing native navigation stack header',
		icon: '📍',
	},
	{
		id: 'divider',
		name: 'Divider',
		description: 'Horizontal line separator',
		icon: '🔳',
	},
	{
		id: 'icon-button',
		name: 'IconButton',
		description: 'Icon-only button with variants',
		icon: '⭐',
	},
	{
		id: 'icon',
		name: 'Icon',
		description: 'Lucide Icon wrapper',
		icon: '⭐',
	},

	{
		id: 'image-card',
		name: 'ImageCard',
		description: 'Image-based card component',
		icon: '🖼️',
	},
	{
		id: 'input',
		name: 'Input',
		description: 'Text input component',
		icon: '✏️',
	},
	{
		id: 'item',
		name: 'Item',
		description: 'Versatile content display with media, title, and actions',
		icon: '📋',
	},
	{
		id: 'layout-top',
		name: 'LayoutTop',
		description: 'Composable top layout with asset/title/right slots',
		icon: '⬆️',
	},
	{
		id: 'menu',
		name: 'Menu',
		description: 'Dropdown menu with items and check options',
		icon: '📋',
	},
	{
		id: 'modal',
		name: 'Modal',
		description: 'Overlay dialog component',
		icon: '📱',
	},
	{
		id: 'otp-input',
		name: 'OTPInput',
		description: 'One-time password input with bounce animation',
		icon: '🔢',
	},
	{
		id: 'progress',
		name: 'Progress',
		description: 'Step-based progress bar (flat/lined tracks)',
		icon: '📊',
	},
	{
		id: 'radio',
		name: 'Radio',
		description: 'Controlled radio button with animations',
		icon: '🔘',
	},
	{
		id: 'radio-card',
		name: 'RadioCard',
		description: 'Card-style radio with Item layout',
		icon: '🔵',
	},

	{
		id: 'section',
		name: 'Section',
		description: 'List 구간을 구분하는 레이아웃 섹션',
		icon: '🗂️',
	},
	{
		id: 'slider',
		name: 'Slider',
		description: 'Range input with single/dual thumb support',
		icon: '🎚️',
	},
	{
		id: 'state',
		name: 'State',
		description: 'Result page component for status display',
		icon: '📊',
	},
	{
		id: 'step-indicator',
		name: 'StepIndicator',
		description: 'Dot-based step indicator with expansion animation',
		icon: '⚫',
	},
	{
		id: 'swiper',
		name: 'Swiper',
		description: 'Swipe to confirm gesture component',
		icon: '👆',
	},
	{
		id: 'switch',
		name: 'Switch',
		description: 'iOS 26 style switch with animations',
		icon: '🔄',
	},
	{
		id: 'tabbar',
		name: 'TabBar',
		description: 'Dynamic tab bar with sync support',
		icon: '📑',
	},

	{
		id: 'table-row',
		name: 'TableRow',
		description: 'Table-like row component',
		icon: '📋',
	},
	{
		id: 'typo',
		name: 'Typo',
		description: 'Semantic typography wrapper',
		icon: '📝',
	},
	{
		id: 'toast',
		name: 'Toast',
		description: '전역 알림 토스트 (top/bottom, drag dismiss)',
		icon: '🍞',
	},
	{
		id: 'card',
		name: 'Card',
		description: 'Container component',
		icon: '🃏',
	},
] as const;

export default function ComponentsIndex() {
	useUnistyles();
	const [searchQuery, setSearchQuery] = useState('');

	const filteredComponents = useMemo(
		() =>
			COMPONENTS.filter(
				(component) =>
					component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					component.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			),
		[searchQuery]
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Input
					size="md"
					variant="filled"
					colorScheme="primary"
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search components..."
					endContent={<Icon icon={Search} />}
				/>
			</View>
			<ScrollView style={styles.scrollContainer}>
				<View style={styles.content}>
					<LayoutTop
						size="sm"
						title={<LayoutTop.TitleTypo>Components</LayoutTop.TitleTypo>}
						subtitleBottom={
							<LayoutTop.SubtitleTypo>
								Browse available UI components. Tap on a component to see
								examples and usage.
							</LayoutTop.SubtitleTypo>
						}
					/>
					<Section
						title="Component List"
						size="md"
						contentStyle={{ marginTop: 8 }}
					>
						<View style={styles.grid}>
							{filteredComponents.map((component) => (
								<Link href={`/components/${component.id}`} asChild>
									<Item
										variant="filled"
										style={{ height: 56, paddingHorizontal: 20 }}
									>
										<ItemContent>
											<ItemTitle size="lg">{component.name}</ItemTitle>
											{/* <ItemDescription size='md'>{description}</ItemDescription> */}
										</ItemContent>
									</Item>
								</Link>
							))}
						</View>
					</Section>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		padding: theme.spacing[5],
		paddingTop: rt.insets.top,
		paddingBottom: rt.insets.bottom,
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	header: {
		// paddingHorizontal: theme.spacing[5],
		paddingVertical: theme.spacing[5],
	},
	scrollContainer: {
		paddingVertical: theme.spacing[5],
		flex: 1,
	},
	content: {
		gap: theme.spacing[5],
	},
	description: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_3,
		marginBottom: theme.spacing[6],
		lineHeight: 20,
	},
	grid: {
		flex: 1,
		width: '100%',
		gap: theme.spacing[4],
	},
}));
