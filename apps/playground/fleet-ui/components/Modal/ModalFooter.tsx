import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useModalContext } from './Modal.context';
import type { ModalFooterProps } from './Modal.types';

/**
 * Modal Footer
 *
 * Modal footer action area.
 * Usually used to layout buttons.
 *
 * @example
 * ```tsx
 * <Modal.Footer>
 *   <Button onPress={onCancel}>Cancel</Button>
 *   <Button onPress={onConfirm} colorScheme="primary">Confirm</Button>
 * </Modal.Footer>
 * ```
 */
export const ModalFooter = ({
	children,
	style,
	...viewProps
}: ModalFooterProps) => {
	const { colorScheme } = useModalContext();

	styles.useVariants({ colorScheme });

	return (
		<View style={[styles.container, style]} {...viewProps}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingTop: theme.spacing[3],
		gap: theme.spacing[3],

		variants: {
			colorScheme: {
				base: {},
				inverted: {},
			},
		},
	},
}));
