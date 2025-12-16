import { GestureResponderEvent, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '../Button';
import type {
	BottomSheetModalActionProps,
} from './BottomSheetModal.types';
import { useInnerContext } from './BottomSheetModalInnerContext';
import { useCallback } from 'react';

export const BottomSheetModalAction = ({
	primaryButtonProps,
	secondaryButtonProps,
	layout = 'vertical',
	size = 'md',
	showPrimary = true,
	showSecondary = false,
	style,
}: BottomSheetModalActionProps) => {
	const { close } = useInnerContext();
	styles.useVariants({ layout });

	const handlePrimaryButtonPress = useCallback((event: GestureResponderEvent) => {
		primaryButtonProps?.onPress?.(event);
		close?.();
	}, [primaryButtonProps?.onPress, close]);

	const handleSecondaryButtonPress = useCallback((event: GestureResponderEvent) => {
		secondaryButtonProps?.onPress?.(event);
		close?.();
	}, [secondaryButtonProps?.onPress, close]);

	return (
		<View
			style={[
				styles.container,
				style,
			]}
		>
			{showSecondary && (
				<Button
					variant="ghost"
					colorScheme={secondaryButtonProps?.colorScheme ?? 'neutral'}
					fullWidth
					size={size}
					rounded="lg"
					{...secondaryButtonProps}
					onPress={handleSecondaryButtonPress}
					style={[{ flex: 1, maxHeight: 56 }, secondaryButtonProps?.style]}
				>
					{secondaryButtonProps?.children || 'Cancel'}
				</Button>
			)}
			{showPrimary && (
				<Button
					variant="filled"
					colorScheme={primaryButtonProps?.colorScheme ?? 'neutral'}
					fullWidth
					size={size}
					shadow="md"
					rounded="lg"
					{...primaryButtonProps}
					onPress={handlePrimaryButtonPress}
					style={[{ flex: 1, maxHeight: 56 }, primaryButtonProps?.style]}
				>
					{primaryButtonProps?.children || 'Confirm'}
				</Button>
			)}
		</View>
	);
};

BottomSheetModalAction.displayName = 'BottomSheetModalAction';

const styles = StyleSheet.create((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: theme.spacing[8],
		variants: {
			layout: {
				horizontal: {
					flexDirection: 'row',
					gap: theme.spacing[3],
					paddingHorizontal: theme.spacing[7],
					minHeight: 84,
				},
				vertical: {
					flexDirection: 'column-reverse',
					gap: theme.spacing[3],
					paddingHorizontal: theme.spacing[8],
					minHeight: 144,
				},
			},
		},
	},
}));
