import '@fleet-ui/core/unistyles';
import { ToastProvider } from '@fleet-ui/components';
// import '@fleet-ui/core';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
// Initialize Fleet UI theming with Unistyles

export default function RootLayout() {
	const { theme } = useUnistyles();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ToastProvider>
				<StatusBar style="auto" />
				{/* <View style={styles.background}> */}
				<View style={styles.container}>
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
					{/* </View> */}
				</View>
			</ToastProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	background: {
		display: 'flex',
		flexDirection: 'row',
		maxWidth: rt.screen.width,
		height: rt.screen.height,
		backgroundColor: theme.colors.neutral.content_1,
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		// maxWidth: 720,
		minHeight: rt.screen.height,
		// alignSelf: 'center',
		backgroundColor: theme.colors.neutral.content_1,
	},
}));
