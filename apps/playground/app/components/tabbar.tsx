import { Button, TabBar, type TabBarItem } from '@fleet-ui/components';
import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, DemoIcon, PageHeader, Section } from '../../common/views';

const COLOR_SCHEMES = [
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
const CUSTOM_ITEM_LABELS = ['Home', 'Explore', 'Profile'] as const;

export default function TabBarScreen() {
	useUnistyles();
	const [selectedPage, setSelectedPage] = useState(1);

	const customItems = useMemo(
		() =>
			[
				<View style={styles.customItem}>
					<DemoIcon />
					<Text style={styles.customItemText}>Home</Text>
				</View>,
				<View style={styles.customItem}>
					<DemoIcon />
					<Text style={styles.customItemText}>Explore</Text>
				</View>,
				<View style={styles.customItem}>
					<DemoIcon />
					<Text style={styles.customItemText}>Profile</Text>
				</View>,
			] satisfies TabBarItem[],
		[]
	);

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="TabBar"
					description="동적 탭 바 컴포넌트 - Pager와 동기화 가능"
				/>

				<Section
					title="Controlled (selectedPage / onSelect)"
					description="TabBar는 컨트롤드 컴포넌트로 사용 가능하며, 외부 selectedPage 변경에도 indicator가 동기화됩니다."
				>
					<TabBar
						selectedPage={selectedPage}
						items={SAMPLE_ITEMS}
						onSelect={setSelectedPage}
						variant="filled"
						colorScheme="neutral"
					/>

					<View style={styles.controlsRow}>
						<Button
							variant="outlined"
							colorScheme="neutral"
							onPress={() =>
								setSelectedPage((prev) => Math.max(prev - 1, 0))
							}
						>
							Prev
						</Button>
						<Button
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
				</Section>

				<Section title="Variants">
					{VARIANTS.map((variant) => (
						<View key={variant} style={styles.exampleBlock}>
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
						<View key={size} style={styles.exampleBlock}>
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
						<View key={rounded} style={styles.exampleBlock}>
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
						<View key={shadow} style={styles.exampleBlock}>
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
						<View key={shadow} style={styles.exampleBlock}>
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

				<Section title="Color schemes (filled)">
					{COLOR_SCHEMES.map((colorScheme) => (
						<View key={colorScheme} style={styles.exampleBlock}>
							<Text style={commonStyles.label}>{colorScheme}</Text>
							<TabBar
								selectedPage={0}
								items={SAMPLE_ITEMS}
								variant="filled"
								colorScheme={colorScheme}
							/>
						</View>
					))}
				</Section>

				<Section title="Indicator padding">
					{INDICATOR_PADDINGS.map((indicatorPadding) => (
						<View key={indicatorPadding} style={styles.exampleBlock}>
							<Text style={commonStyles.label}>{indicatorPadding}</Text>
							<TabBar
								selectedPage={1}
								items={SAMPLE_ITEMS}
								indicatorPadding={indicatorPadding}
								variant="filled"
								colorScheme="neutral"
							/>
						</View>
					))}
				</Section>

				<Section
					title="A11y labels (custom ReactNode items)"
					description="ReactNode 아이템 사용 시 accessibilityLabels / getItemAccessibilityLabel로 라벨을 제공할 수 있습니다."
				>
					<View style={styles.exampleBlock}>
						<Text style={commonStyles.label}>accessibilityLabels</Text>
						<TabBar
							selectedPage={0}
							items={customItems}
							variant="flat"
							colorScheme="primary"
							accessibilityLabels={CUSTOM_ITEM_LABELS}
						/>
					</View>

					<View style={styles.exampleBlock}>
						<Text style={commonStyles.label}>getItemAccessibilityLabel</Text>
						<TabBar
							selectedPage={0}
							items={customItems}
							variant="flat"
							colorScheme="primary"
							getItemAccessibilityLabel={(_, index) => CUSTOM_ITEM_LABELS[index]}
						/>
					</View>
				</Section>

				<Section
					title="Disabled indices + hitSlop"
					description="disabledIndices로 특정 탭을 비활성화할 수 있으며, hitSlop으로 터치 영역을 확장할 수 있습니다."
				>
					<View style={styles.exampleBlock}>
						<Text style={commonStyles.label}>disabledIndices</Text>
						<TabBar
							selectedPage={0}
							items={SAMPLE_ITEMS}
							variant="filled"
							colorScheme="neutral"
							disabledIndices={[1, 3]}
							hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
						/>
					</View>

					<View style={styles.exampleBlock}>
						<Text style={commonStyles.label}>isItemDisabled</Text>
						<TabBar
							selectedPage={0}
							items={SAMPLE_ITEMS}
							variant="filled"
							colorScheme="neutral"
							isItemDisabled={(_, index) => index === 2}
						/>
					</View>
				</Section>

				<Section title="Combinations">
					<View style={styles.exampleBlock}>
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

					<View style={styles.exampleBlock}>
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

					<View style={styles.exampleBlock}>
						<TabBar
							selectedPage={1}
							items={['Dashboard', 'Analytics', 'Settings']}
							variant="underlined"
							colorScheme="info"
							size="md"
							rounded="md"
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
