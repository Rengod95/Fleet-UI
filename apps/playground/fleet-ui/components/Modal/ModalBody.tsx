import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useModalContext } from './Modal.context';
import type { ModalBodyProps } from './Modal.types';

/**
 * Modal Body
 *
 * Content area for modal body.
 *
 * @example
 * ```tsx
 * <Modal.Body>
 *   <Text>Modal body content</Text>
 * </Modal.Body>
 * ```
 */
export const ModalBody = ({ children, style, ...viewProps }: ModalBodyProps) => {
	const { colorScheme, size } = useModalContext();

	styles.useVariants({ colorScheme, size });

	return (
		<View style={[styles.container, style]} {...viewProps}>
			{children}
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
				sm: {
					gap: theme.spacing[4],
				},
				md: {
					gap: theme.spacing[5],
				},
				lg: {
					gap: theme.spacing[6],
				},
			},
		},
	},
}));
