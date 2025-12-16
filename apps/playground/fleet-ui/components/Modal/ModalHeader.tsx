import { X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useModalContext } from './Modal.context';
import type { ModalHeaderProps } from './Modal.types';

/**
 * Modal Header
 *
 * Modal header content area.
 * - Title/subtitle or custom children
 * - Optional close button
 *
 * @example
 * ```tsx
 * <Modal.Header title="Notification" />
 * <Modal.Header>
 *   <CustomHeaderContent />
 * </Modal.Header>
 * ```
 */
export const ModalHeader = ({
	title,
	showCloseButton = true,
	children,
	titleStyle,
	style,
	...viewProps
}: ModalHeaderProps) => {
	const { close, size, colorScheme } = useModalContext();
	const { theme } = useUnistyles();

	styles.useVariants({ size, colorScheme });

	// If custom children are provided, render them directly
	if (children) {
		return (
			<View style={[styles.container, style]} {...viewProps}>
				{children}
				{showCloseButton && (
					<Pressable
						style={styles.closeButton}
						onPress={close}
						hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
						accessibilityRole="button"
						accessibilityLabel="Close modal"
					>
						<X size={24} color={theme.colors.neutral.text_4} />
					</Pressable>
				)}
			</View>
		);
	}

	return (
		<View style={[styles.container, style]} {...viewProps}>
			<View style={styles.textContainer}>
				{title && (
					<Text style={[styles.title, titleStyle]} numberOfLines={2}>
						{title}
					</Text>
				)}
			</View>
			{showCloseButton && (
				<Pressable
					style={styles.closeButton}
					onPress={close}
					hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
					accessibilityRole="button"
					accessibilityLabel="Close modal"
				>
					<X
						size={24}
						color={
							colorScheme === 'inverted'
								? theme.colors.neutral.text_inversed
								: theme.colors.neutral.text_2
						}
					/>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		gap: theme.spacing[3],
	},

	textContainer: {
		flex: 1,
		gap: theme.spacing[1],
	},

	title: {
		...theme.typography.h3,
		color: theme.colors.neutral.text_1,

		variants: {
			size: {
				sm: {
					...theme.typography.h6Strong,
				},
				md: {
					...theme.typography.h5Strong,
				},
				lg: {
					...theme.typography.h4Strong,
				},
			},
			colorScheme: {
				base: {
					color: theme.colors.neutral.text_1,
				},
				inverted: {
					color: theme.colors.neutral.text_inversed,
				},
			},
		},
	},

	closeButton: {
		padding: theme.spacing[1],
		borderRadius: theme.rounded.full,
	},
}));
