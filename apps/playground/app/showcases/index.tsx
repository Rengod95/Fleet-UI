import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	Input,
	Icon,
	LayoutTop,
	Section,
	Item,
	ItemContent,
	ItemTitle,
	ItemDescription,
} from '@fleet-ui/components';
import { Search } from 'lucide-react-native';
import { Link } from 'expo-router';

const SHOWCASES = [
	{
		id: 'tabbar',
		name: 'TabBar',
		description: 'Bottom tab navigation with badge support',
	},
	{
		id: 'bottom-sheet-modal',
		name: 'BottomSheetModal',
		description: 'Detached bottom sheet with gesture',
	},
	{
		id: 'modal',
		name: 'Modal',
		description: 'Overlay dialog with animations',
	},
	{
		id: 'toast',
		name: 'Toast',
		description: 'Global notification with drag dismiss',
	},
	{
		id: 'menu',
		name: 'Menu',
		description: 'Dropdown menu with items',
	},
] as const;

export default function ShowcasesIndex() {
	useUnistyles();
	const [searchQuery, setSearchQuery] = useState('');

	const filteredShowcases = useMemo(
		() =>
			SHOWCASES.filter(
				(showcase) =>
					showcase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					showcase.description.toLowerCase().includes(searchQuery.toLowerCase())
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
					placeholder="Search showcases..."
					endContent={<Icon icon={Search} />}
				/>
			</View>
			<ScrollView style={styles.scrollContainer}>
				<View style={styles.content}>
					<LayoutTop
						size="md"
						title={<LayoutTop.TitleTypo>Showcases</LayoutTop.TitleTypo>}
						subtitleBottom={
							<LayoutTop.SubtitleTypo>
								Interactive demos in real-world context
							</LayoutTop.SubtitleTypo>
						}
					/>

					<Section title="Available Showcases" size="lg" contentStyle={{ marginTop: 8 }}>
						<View style={styles.list}>
							{filteredShowcases.map((showcase) => (
								<Link key={showcase.id} href={`/showcases/${showcase.id}`} asChild>
									<Item
										variant="filled"
										style={{ height: 56, paddingHorizontal: 20 }}
									>
										<ItemContent>
											<ItemTitle size="lg">{showcase.name}</ItemTitle>
											<ItemDescription size="md">
												{showcase.description}
											</ItemDescription>
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
		backgroundColor: theme.colors.neutral.content_1,
	},
	header: {
		paddingVertical: theme.spacing[5],
	},
	scrollContainer: {
		paddingVertical: theme.spacing[5],
		flex: 1,
	},
	content: {
		gap: theme.spacing[5],
	},
	list: {
		flex: 1,
		width: '100%',
		gap: theme.spacing[4],
	},
}));
