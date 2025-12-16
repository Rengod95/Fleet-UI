import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { BottomSheetModalFooterProps } from './BottomSheetModal.types';

export const BottomSheetModalFooter = ({
	children,
	style,
	size = 'md',
}: BottomSheetModalFooterProps) => {
	styles.useVariants({ size });

	return <View style={[styles.container, style]}>{children}</View>;
};

BottomSheetModalFooter.displayName = 'BottomSheetModalFooter';

const styles = StyleSheet.create((theme) => ({
	container: {
		paddingTop: theme.spacing[2],
		variants: {
			size: {
				sm: {
					paddingHorizontal: theme.spacing[5],
					paddingBottom: theme.spacing[5],
				},
				md: {
					
					paddingHorizontal: theme.spacing[6],
					paddingBottom: theme.spacing[6],
				},
				lg: {
					paddingHorizontal: theme.spacing[7],
					paddingBottom: theme.spacing[7],
				},
			},
		},
	},
}));
