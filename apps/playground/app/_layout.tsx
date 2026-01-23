import '@fleet-ui/core/unistyles';
import { ToastProvider } from '@fleet-ui/components';
// import '@fleet-ui/core';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUnistyles } from 'react-native-unistyles';
// Initialize Fleet UI theming with Unistyles

export default function RootLayout() {
	const { theme } = useUnistyles();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ToastProvider>
				<StatusBar style="auto" />
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
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="components"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="showcases"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="scenarios"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</ToastProvider>
		</GestureHandlerRootView>
	);
}
