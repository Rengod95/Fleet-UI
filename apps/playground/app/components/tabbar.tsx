import { Button, Icon, TabBar, Typo } from '@fleet-ui/components';
import { Home, Search, User } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const _COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'warning',
	'success',
	'info',
] as const;
const VARIANTS = ['underlined', 'filled', 'faded', 'flat', 'ghost'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const ROUNDED_OPTIONS = ['none', 'sm', 'md', 'lg', 'full'] as const;
const SHADOW_OPTIONS = ['none', 'sm', 'md', 'lg'] as const;
const INDICATOR_PADDINGS = ['none', 'sm', 'md', 'lg'] as const;

const SAMPLE_ITEMS = [
	'Home',
	'Explore',
	'Notifications',
	'Profile',
	'Something Long Title',
];
const _CUSTOM_ITEM_LABELS = ['Home', 'Explore', 'Profile'];

const CUSTOM_ITEMS = [
	<View style={{ flexDirection: 'row', gap: 12 }}>
		<Icon icon={Home} />
		<Typo>Home</Typo>
	</View>,
	<View style={{ flexDirection: 'row', gap: 12 }}>
		<Icon icon={Search} />
		<Typo>Explore</Typo>
	</View>,
	<View style={{ flexDirection: 'row', gap: 12 }}>
		<Icon icon={User} />
		<Typo>Profile</Typo>
	</View>,
];

export default function TabBarScreen() {
	useUnistyles();
	const [selectedPage, setSelectedPage] = useState(1);

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="TabBar"
					description="A horizontal tab component that displays multiple tabs, indicates the current selection, and triggers tab switching."
				/>

				<Section
					title="Overview"
					value="overview"
					description="The most basic TabBar example (uncontrolled)."
				>
					<View style={commonStyles.column}>
						<TabBar
							selectedPage={0} // You can also use the selectedPage prop to control the selected page.
							items={SAMPLE_ITEMS}
							variant="filled"
							colorScheme="neutral"
						/>
					</View>
				</Section>

				<Section title="Variants">
					{VARIANTS.map((variant) => (
						<View key={variant} style={[commonStyles.column]}>
							<Text style={commonStyles.label}>{variant}</Text>
							<TabBar
								selectedPage={1}
								items={SAMPLE_ITEMS}
								variant={variant}
								colorScheme="neutral"
							/>
						</View>
					))}
				</Section>

				<Section title="Sizes">
					{SIZES.map((size) => (
						<View key={size} style={[commonStyles.column]}>
							<Text style={commonStyles.label}>{size}</Text>
							<TabBar
								selectedPage={0}
								items={SAMPLE_ITEMS}
								size={size}
								variant="filled"
								colorScheme="neutral"
							/>
						</View>
					))}
				</Section>

				<Section title="Rounded">
					{ROUNDED_OPTIONS.map((rounded) => (
						<View key={rounded} style={[commonStyles.column]}>
							<Text style={commonStyles.label}>{rounded}</Text>
							<TabBar
								selectedPage={1}
								items={SAMPLE_ITEMS}
								rounded={rounded}
								variant="filled"
								colorScheme="neutral"
							/>
						</View>
					))}
				</Section>

				<Section title="Shadow (with underlined variant)">
					{SHADOW_OPTIONS.map((shadow) => (
						<View key={shadow} style={[commonStyles.column]}>
							<Text style={commonStyles.label}>{shadow}</Text>
							<TabBar
								selectedPage={0}
								items={SAMPLE_ITEMS}
								shadow={shadow}
								variant="underlined"
								colorScheme="neutral"
							/>
						</View>
					))}
				</Section>

				<Section title="Indicator Shadow (with filled variant)">
					{SHADOW_OPTIONS.map((shadow) => (
						<View key={shadow} style={[commonStyles.column]}>
							<Text style={commonStyles.label}>{shadow}</Text>
							<TabBar
								selectedPage={0}
								items={SAMPLE_ITEMS}
								indicatorShadow={shadow}
								variant="filled"
								colorScheme="neutral"
							/>
						</View>
					))}
				</Section>

				<Section title="Color schemes">
					<View style={[commonStyles.column]}>
						<Text style={commonStyles.label}>
							ColorSchems of Tabbar affects the only variants filled and
							underlined. other variants are affected on just item's text color.
						</Text>
						<TabBar
							selectedPage={0}
							items={SAMPLE_ITEMS}
							variant="filled"
							colorScheme={'primary'}
						/>
						<TabBar
							selectedPage={0}
							items={SAMPLE_ITEMS}
							variant="flat"
							colorScheme={'primary'}
						/>
						<TabBar
							selectedPage={0}
							items={SAMPLE_ITEMS}
							variant="faded"
							colorScheme={'primary'}
						/>
						<TabBar
							selectedPage={0}
							items={SAMPLE_ITEMS}
							variant="ghost"
							colorScheme={'primary'}
						/>
						<TabBar
							selectedPage={0}
							items={SAMPLE_ITEMS}
							variant="underlined"
							colorScheme={'primary'}
						/>
					</View>
				</Section>

				<Section title="Indicator padding">
					{INDICATOR_PADDINGS.map((indicatorPadding) => (
						<View key={indicatorPadding} style={[commonStyles.column]}>
							<Text style={commonStyles.label}>{indicatorPadding}</Text>
							<TabBar
								selectedPage={1}
								items={SAMPLE_ITEMS}
								indicatorPadding={indicatorPadding}
								variant="faded"
								colorScheme="neutral"
							/>
						</View>
					))}
				</Section>

				<Section title="Custom items">
					<View style={[commonStyles.column]}>
						<TabBar
							selectedPage={0}
							items={CUSTOM_ITEMS}
							variant="flat"
							colorScheme="neutral"
						/>

						<Text style={commonStyles.label}>
							If you should adjust the TabBar height by custom item's dynamic
							height or something like that, you can use the style prop
						</Text>
						<TabBar
							selectedPage={0}
							items={CUSTOM_ITEMS}
							variant="underlined"
							colorScheme="neutral"
							style={{ height: 60 }}
						/>
					</View>
				</Section>

				<Section
					title="Controlled (selectedPage / onSelect)"
					description="TabBar can be used as a controlled component, and the indicator will be synchronized even if the external selectedPage is changed."
				>
					<View style={commonStyles.column}>
						<TabBar
							selectedPage={selectedPage}
							items={SAMPLE_ITEMS}
							onSelect={setSelectedPage}
							variant="filled"
							colorScheme="neutral"
						/>

						<View style={styles.controlsRow}>
							<Button
								size="sm"
								variant="outlined"
								colorScheme="neutral"
								onPress={() => setSelectedPage((prev) => Math.max(prev - 1, 0))}
							>
								Prev
							</Button>
							<Button
								size="sm"
								variant="outlined"
								colorScheme="neutral"
								onPress={() =>
									setSelectedPage((prev) =>
										Math.min(prev + 1, SAMPLE_ITEMS.length - 1)
									)
								}
							>
								Next
							</Button>
						</View>
					</View>
				</Section>

				<Section title="Disabled Indicies">
					<View style={[commonStyles.column]}>
						<Text style={commonStyles.label}>
							Indices are the default values to disabled items on initializing
							TabBar.
						</Text>
						<TabBar
							selectedPage={0}
							items={CUSTOM_ITEMS}
							variant="underlined"
							colorScheme="neutral"
							style={{ height: 60 }}
							disabledIndices={[0, 1]}
						/>
					</View>
				</Section>

				<Section title="isItemDisabled Function">
					<View style={[commonStyles.column]}>
						<Text style={commonStyles.label}>
							You can also use the isItemDisabled(Callback Function) to disable
							items dynamically.
						</Text>
						<Text style={commonStyles.label}>
							The Below example is disabled the first and second items.
						</Text>
						<TabBar
							selectedPage={2}
							items={CUSTOM_ITEMS}
							variant="underlined"
							colorScheme="neutral"
							style={{ height: 60 }}
							isItemDisabled={(_item, index) => index === 0 || index === 1}
						/>
					</View>
				</Section>

				<Section title="Combinations">
					<View style={[commonStyles.column]}>
						<TabBar
							selectedPage={2}
							items={['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']}
							variant="faded"
							colorScheme="primary"
							size="lg"
							rounded="lg"
							shadow="md"
						/>
					</View>

					<View style={[commonStyles.column]}>
						<TabBar
							selectedPage={0}
							items={['One', 'Two', 'Three']}
							variant="flat"
							colorScheme="warning"
							size="sm"
							rounded="full"
							shadow="sm"
						/>
					</View>

					<View style={[commonStyles.column]}>
						<TabBar
							selectedPage={1}
							items={['Dashboard', 'Analytics', 'Settings']}
							variant="underlined"
							colorScheme="info"
							size="md"
							rounded="md"
							style={{ height: 64 }}
						/>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	exampleBlock: {
		gap: theme.spacing[3],
	},
	controlsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.spacing[3],
	},
	customItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	customItemText: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_1,
	},
}));
