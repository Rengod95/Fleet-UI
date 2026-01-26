import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

export default function ShowcasesLayout() {
	const { theme } = useUnistyles();

	return (
		<BottomSheetModalProvider>
			<Stack
				screenOptions={{
					headerShown: false,
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
		</BottomSheetModalProvider>
	);
}
