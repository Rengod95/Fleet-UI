import {
	ActionButton,
	Icon,
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
	LayoutTop,
	Section,
} from '@fleet-ui/components';
import { router } from 'expo-router';
import {
	Component,
	FileText,
	Github,
	Info,
	Palette,
	Rocket,
	User,
} from 'lucide-react-native';
import { Linking, ScrollView, View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

export default function Home() {
	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<View style={styles.content}>
					<LayoutTop
						size="sm"
						title={
							<LayoutTop.TitleTypo>Fleet UI Playground</LayoutTop.TitleTypo>
						}
						subtitleBottom={
							<LayoutTop.SubtitleTypo>
								Explore components and design system
							</LayoutTop.SubtitleTypo>
						}
					/>

					<Section title="Navigation" size="md">
						<View style={styles.gridContainer}>
							<View style={styles.gridRow}>
								<ActionButton
									size="xl"
									variant="flat"
									colorScheme="success"
									title="Components"
									contentRounded="lg"
									onPress={() => router.push('/components')}
								>
									<Icon icon={Component} size="lg" strokeWidth={1.5} />
								</ActionButton>
								<ActionButton
									variant="flat"
									colorScheme="primary"
									size="xl"
									title="Scenarios"
									contentRounded="lg"
									onPress={() => router.push('/scenarios')}
								>
									<Icon icon={Rocket} size="xl" strokeWidth={1.5} />
								</ActionButton>
								<ActionButton
									variant="flat"
									colorScheme="error"
									size="xl"
									title="Theme Demo"
									contentRounded="lg"
									onPress={() => router.push('/theme-demo')}
								>
									<Icon icon={Palette} size="xl" strokeWidth={1.5} />
								</ActionButton>
							</View>

							<View style={styles.gridRow}></View>
						</View>
					</Section>

					<Section title="Resources" size="md" contentGap={8}>
						<Item
							variant="filled"
							onPress={() =>
								Linking.openURL('https://github.com/Rengod95/fleet-ui')
							}
						>
							<ItemMedia mediaType="icon" variant="flat">
								<Icon icon={Github} size="lg" strokeWidth={1.5} />
							</ItemMedia>

							<ItemContent>
								<ItemTitle>GitHub</ItemTitle>
								<ItemDescription>
									View source code and contribute
								</ItemDescription>
							</ItemContent>
						</Item>

						<Item
							variant="filled"
							onPress={() => Linking.openURL('https://fleet-ui.dev')}
						>
							<ItemMedia mediaType="icon" variant="flat">
								<Icon icon={FileText} size="lg" strokeWidth={1.5} />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Official Docs</ItemTitle>
								<ItemDescription>
									Complete guides and API reference
								</ItemDescription>
							</ItemContent>
						</Item>
					</Section>

					<Section title="About" size="md">
						<Item variant="flat">
							<ItemMedia mediaType="icon" variant="flat" verticalAlign="top">
								<Icon icon={Info} size="lg" strokeWidth={1.5} />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Fleet UI</ItemTitle>
								<ItemDescription>
									A cross-platform component and animation library for React and
									React Native. All components work seamlessly on iOS, Android,
									and Web.
								</ItemDescription>
							</ItemContent>
						</Item>

						<Item variant="flat">
							<ItemMedia mediaType="icon" variant="flat">
								<Icon icon={User} size="lg" strokeWidth={1.5} />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Developer</ItemTitle>
								<ItemDescription>Made by Rengod95</ItemDescription>
							</ItemContent>
						</Item>
					</Section>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		height: rt.screen.height,
		_web: {
			maxWidth: 720,
			marginHorizontal: 'auto',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},
	scrollContainer: {
		paddingTop: rt.insets.top,
		paddingBottom: rt.insets.bottom,
		flex: 1,
	},
	content: {
		padding: theme.spacing[5],
		marginTop: theme.spacing[10],
		gap: theme.spacing[12],
	},
	gridContainer: {
		marginTop: theme.spacing[5],
		gap: theme.spacing[5],
	},
	gridRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	gridItem: {
		aspectRatio: 1,
	},
}));
