import { forwardRef } from 'react';
import { ActivityIndicator, Pressable, Text, type View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { StateButtonProps } from './State.types';


// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

/**
 * State.Button Component
 *
 * Used as an action button within the State component.
 * It makes it easy to implement actions like retry, go back to home, etc.
 *
 * @example
 * ```tsx
 * <State.Button onPress={handleRetry}>Retry</State.Button>
 * ```
 */
export const StateButton = forwardRef<View, StateButtonProps>((props, ref) => {
	const {
		children,
		onPress,
		disabled = false,
		loading = false,
		style,
		testID,
	} = props;

	const { theme } = useUnistyles();
	const isDisabled = disabled || loading;

	return (
		<Pressable
			ref={ref}
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			disabled={isDisabled}
			onPress={onPress}
			testID={testID}
			style={({ pressed }) => [
				styles.button,
				pressed && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator size="small" color={theme.colors.neutral.text_1} />
			) : null}
			<Text style={styles.buttonText}>{children}</Text>
		</Pressable>
	);
});

StateButton.displayName = 'StateButton';


// ------------------------------------------------------------
// STYLES
// ------------------------------------------------------------
const styles = StyleSheet.create((theme) => ({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: theme.spacing[5],
		paddingVertical: theme.spacing[3],
		borderRadius: theme.rounded.md,
		borderCurve: 'continuous',
		backgroundColor: theme.colors.neutral.content_3,
		minHeight: 44,
		gap: theme.spacing[2],
	},
	buttonPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	buttonText: {
		...theme.typography.body2Strong,
		color: theme.colors.neutral.text_1,
	},
}));