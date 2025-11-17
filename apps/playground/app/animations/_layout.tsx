import { Stack } from 'expo-router';

export default function AnimationsLayout() {
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
					title: 'Animations',
				}}
			/>
			<Stack.Screen
				name="[animation]"
				options={{
					title: 'Animation Details',
				}}
			/>
		</Stack>
	);
}
