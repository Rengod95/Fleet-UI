import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

export default function SamplesLayout() {
	const { theme } = useUnistyles();

	return (
		<BottomSheetModalProvider>
		<Stack
			screenOptions={{
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
					title: 'Sample Pages',
				}}
			/>
			<Stack.Screen
				name="onboarding"
				options={{
					title: 'Onboarding Flow',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					title: 'Settings',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="billing"
				options={{
					title: 'Billing',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="form"
				options={{
					title: 'Forms & Inputs',
					headerShown: false,
				}}
			/>
		</Stack>
		</BottomSheetModalProvider>
	);
}
