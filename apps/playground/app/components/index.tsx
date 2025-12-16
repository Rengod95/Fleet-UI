import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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
		id: 'button',
		name: 'Button',
		description: 'Interactive button component',
		icon: '🔘',
	},
	{
		id: 'icon-button',
		name: 'IconButton',
		description: 'Icon-only button with variants',
		icon: '⭐',
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
		id: 'layout-top',
		name: 'LayoutTop',
		description: 'Composable top layout with asset/title/right slots',
		icon: '⬆️',
	},
	{
		id: 'divider',
		name: 'Divider',
		description: 'Horizontal line separator',
		icon: '🔳',
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
		id: 'slider',
		name: 'Slider',
		description: 'Range input with single/dual thumb support',
		icon: '🎚️',
	},
	{
		id: 'step-indicator',
		name: 'StepIndicator',
		description: 'Dot-based step indicator with expansion animation',
		icon: '⚫',
	},
	{
		id: 'switch',
		name: 'Switch',
		description: 'iOS 26 style switch with animations',
		icon: '🔄',
	},
	{
		id: 'swiper',
		name: 'Swiper',
		description: 'Swipe to confirm gesture component',
		icon: '👆',
	},
	{
		id: 'typo',
		name: 'Typo',
		description: 'Semantic typography wrapper',
		icon: '📝',
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
		id: 'image-card',
		name: 'ImageCard',
		description: 'Image-based card component',
		icon: '🖼️',
	},
	{
		id: 'card',
		name: 'Card',
		description: 'Container component',
		icon: '🃏',
	},
	{
		id: 'modal',
		name: 'Modal',
		description: 'Overlay dialog component',
		icon: '📱',
	},
	{
		id: 'bottom-sheet-modal',
		name: 'BottomSheetModal',
		description: 'Detached bottom sheet modal',
		icon: '📃',
	},
	{
		id: 'icon',
		name: 'Icon',
		description: 'Lucide Icon wrapper',
		icon: '⭐',
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
		id: 'otp-input',
		name: 'OTPInput',
		description: 'One-time password input with bounce animation',
		icon: '🔢',
	},
	{
		id: 'menu',
		name: 'Menu',
		description: 'Dropdown menu with items and check options',
		icon: '📋',
	},
	{
		id: 'state',
		name: 'State',
		description: 'Result page component for status display',
		icon: '📊',
	},
	{
		id: 'section',
		name: 'Section',
		description: 'List 구간을 구분하는 레이아웃 섹션',
		icon: '🗂️',
	},
	{
		id: 'toast',
		name: 'Toast',
		description: '전역 알림 토스트 (top/bottom, drag dismiss)',
		icon: '🍞',
	},
] as const;

export default function ComponentsIndex() {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.description}>
					Browse available UI components. Tap on a component to see examples and
					usage.
				</Text>

				<View style={styles.grid}>
					{COMPONENTS.map((component) => (
						<Link
							key={component.id}
							href={`/components/${component.id}`}
							asChild
						>
							<Pressable style={styles.card}>
								<Text style={styles.icon}>{component.icon}</Text>
								<Text style={styles.cardTitle}>{component.name}</Text>
								<Text style={styles.cardDescription}>
									{component.description}
								</Text>
							</Pressable>
						</Link>
					))}
				</View>

				<View style={styles.note}>
					<Text style={styles.noteText}>
						ℹ️ Components will be available once you add them to the
						@fleet-ui/components package.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	content: {
		padding: 20,
	},
	description: {
		fontSize: 14,
		color: '#666',
		marginBottom: 24,
		lineHeight: 20,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		marginBottom: 24,
	},
	card: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 12,
		width: '48%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	icon: {
		fontSize: 32,
		marginBottom: 8,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
		marginBottom: 4,
	},
	cardDescription: {
		fontSize: 12,
		color: '#666',
		lineHeight: 16,
	},
	note: {
		backgroundColor: '#E3F2FD',
		padding: 16,
		borderRadius: 8,
		borderLeftWidth: 4,
		borderLeftColor: '#2196F3',
	},
	noteText: {
		fontSize: 12,
		color: '#1565C0',
		lineHeight: 18,
	},
});
