import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

export default function ShowcasesLayout() {
	const { theme } = useUnistyles();
	const { embed } = useLocalSearchParams<{ embed?: string }>();
	const isEmbed = embed === '1' || embed === 'true';

	return (
		<Stack
			screenOptions={{
				headerShown: !isEmbed,
				headerStyle: {
					backgroundColor: theme.colors.neutral.content_1,
				},
				headerTintColor: theme.colors.neutral.text_1,
				headerTitleStyle: {
					fontWeight: '600',
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'Showcases',
				}}
			/>
		</Stack>
	);
}
