import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useModalContext } from './Modal.context';
import type { ModalDescriptionProps } from './Modal.types';

/**
 * Modal Description
 *
 * Modal description content area.
 *
 * @example
 * ```tsx
 * <Modal.Description>
 *   <Text>Modal description content</Text>
 * </Modal.Description>
 * ```
 */
export const ModalDescription = ({
	content,
	contentStyle,
	containerStyle,
	style,
	...viewProps
}: ModalDescriptionProps) => {
	const { colorScheme, size } = useModalContext();

	styles.useVariants({ colorScheme, size });

	return (
		<View style={[styles.container, containerStyle, style]} {...viewProps}>
			<Text style={[styles.content, contentStyle]}>{content}</Text>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	container: {
		variants: {
			colorScheme: {
				base: {},
				inverted: {},
			},
			size: {
				sm: {},
				md: {},
				lg: {},
			},
		},
	},
	content: {
		color: theme.colors.neutral.text_3,
		variants: {
			colorScheme: {
				base: {},
				inverted: {},
			},
			size: {
				sm: {
					...theme.typography.body3,
					letterSpacing: theme.text.letterSpacing.normal,
				},
				md: {
					...theme.typography.body2,
					letterSpacing: theme.text.letterSpacing.wide,
				},
				lg: {
					...theme.typography.body2,
					letterSpacing: theme.text.letterSpacing.wide,
				},
			},
		},
	},
}));
