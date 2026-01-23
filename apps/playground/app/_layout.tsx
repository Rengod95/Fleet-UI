import '@fleet-ui/local/core/unistyles';
import { IconButton, ToastProvider } from '@fleet-ui/components';
// import '@fleet-ui/core';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SunDim } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
// Initialize Fleet UI theming with Unistyles

export default function RootLayout() {
	const { theme, rt } = useUnistyles();
	const handleThemeToggle = () => {
		UnistylesRuntime.setTheme(
			UnistylesRuntime.themeName === 'light' ? 'dark' : 'light'
		);
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ToastProvider>
				<StatusBar style="auto" />
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: theme.colors.background,
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
			<IconButton
				icon={<SunDim />}
				onPress={handleThemeToggle}
				style={{
					position: 'absolute',
					right: theme.spacing[7],
					bottom: theme.spacing[7] + rt.insets.bottom,
				}}
			/>
		</GestureHandlerRootView>
	);
}
