import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// Initialize Fleet UI theming with Unistyles
import '@fleet-ui/core/unistyles';

export default function RootLayout() {
	return (
		<>
			<StatusBar style="auto" />
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#007AFF',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: '600',
					},
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: 'My UI SDK Playground',
					}}
				/>
				<Stack.Screen
					name="components"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="animations"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</>
	);
}
