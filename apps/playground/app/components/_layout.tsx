import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

export default function ComponentsLayout() {
	const { theme } = useUnistyles();
	return (
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
					title: 'Components',
				}}
			/>
			<Stack.Screen
				name="table-row"
				options={{
					title: 'TableRow',
				}}
			/>
			<Stack.Screen
				name="accordion"
				options={{
					title: 'Accordion',
				}}
			/>
			<Stack.Screen
				name="ActionButton"
				options={{
					title: 'ActionButton',
				}}
			/>
			<Stack.Screen
				name="button"
				options={{
					title: 'Button',
				}}
			/>
			<Stack.Screen
				name="checkbox"
				options={{
					title: 'Checkbox',
				}}
			/>
			<Stack.Screen
				name="context-header"
				options={{
					title: 'ContextHeader',
				}}
			/>
			<Stack.Screen
				name="checkbox-card"
				options={{
					title: 'CheckboxCard',
				}}
			/>
			<Stack.Screen
				name="divider"
				options={{
					title: 'Divider',
				}}
			/>
			<Stack.Screen
				name="radio"
				options={{
					title: 'Radio',
				}}
			/>
			<Stack.Screen
				name="radio-card"
				options={{
					title: 'RadioCard',
				}}
			/>
			<Stack.Screen
				name="slider"
				options={{
					title: 'Slider',
				}}
			/>
			<Stack.Screen
				name="switch"
				options={{
					title: 'Switch',
				}}
			/>
			<Stack.Screen
				name="swiper"
				options={{
					title: 'Swiper',
				}}
			/>
			<Stack.Screen
				name="typo"
				options={{
					title: 'Typo',
				}}
			/>
			<Stack.Screen
				name="input"
				options={{
					title: 'Input',
				}}
			/>
			<Stack.Screen
				name="item"
				options={{
					title: 'Item',
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
			<Stack.Screen
				name="icon"
				options={{
					title: 'Icon',
				}}
			/>
			<Stack.Screen
				name="tabbar"
				options={{
					title: 'TabBar',
				}}
			/>
			<Stack.Screen
				name="bottom-sheet-modal"
				options={{
					title: 'BottomSheetModal',
				}}
			/>
			<Stack.Screen
				name="otp-input"
				options={{
					title: 'OTPInput',
				}}
			/>
			<Stack.Screen
				name="menu"
				options={{
					title: 'Menu',
				}}
			/>
			<Stack.Screen
				name="icon-button"
				options={{
					title: 'IconButton',
				}}
			/>
			<Stack.Screen
				name="state"
				options={{
					title: 'State',
				}}
			/>
			<Stack.Screen
				name="section"
				options={{
					title: 'Section',
				}}
			/>
			<Stack.Screen
				name="toast"
				options={{
					title: 'Toast',
				}}
			/>
		</Stack>
	);
}
