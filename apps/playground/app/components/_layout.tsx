import { Stack } from 'expo-router';

export default function ComponentsLayout() {
	return (
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
					title: 'Components',
				}}
			/>
			<Stack.Screen
				name="button"
				options={{
					title: 'Button',
				}}
			/>
			<Stack.Screen
				name="input"
				options={{
					title: 'Input',
				}}
			/>
			<Stack.Screen
				name="card"
				options={{
					title: 'Card',
				}}
			/>
			<Stack.Screen
				name="modal"
				options={{
					title: 'Modal',
				}}
			/>
		</Stack>
	);
}
