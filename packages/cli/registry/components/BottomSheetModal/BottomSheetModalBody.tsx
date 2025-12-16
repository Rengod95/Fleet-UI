import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type {
	BottomSheetModalBodyDescriptionProps,
	BottomSheetModalBodyProps,
} from './BottomSheetModal.types';

export const BottomSheetModalBody = ({
	children,
	style,
	size = 'md',
}: BottomSheetModalBodyProps) => {
	styles.useVariants({ size });

	return <View style={[styles.container, style]}>{children}</View>;
};

BottomSheetModalBody.displayName = 'BottomSheetModalBody';

export const BottomSheetModalBodyDescription = ({
	children,
	style,
	size = 'md',
}: BottomSheetModalBodyDescriptionProps) => {
	styles.useVariants({ size });

	return <Text style={[styles.description, style]}>{children}</Text>;
};

BottomSheetModalBodyDescription.displayName = 'BottomSheetModalBodyDescription';

const styles = StyleSheet.create((theme) => ({
	container: {
		paddingHorizontal: theme.spacing[7],
		paddingVertical: theme.spacing[5],
		variants: {
			size: {
				sm: {
					paddingHorizontal: theme.spacing[5],
					paddingVertical: theme.spacing[4],
				},
				md: {
					paddingHorizontal: theme.spacing[7],
					paddingVertical: theme.spacing[5],
				},
				lg: {
					paddingHorizontal: theme.spacing[8],
					paddingVertical: theme.spacing[6],
				},
			},
		},
	},
	description: {
		color: theme.colors.neutral.text_2,
		...theme.typography.body3,
		textAlign: 'center',
		variants: {
			size: {
				sm: {
					...theme.typography.body3,
				},
				md: {
					...theme.typography.body3,
				},
				lg: {
					...theme.typography.body2,
				},
			},
		},
	},
}));
