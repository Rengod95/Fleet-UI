import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { RadioCardGroupProvider } from './RadioCard.context';
import type {
	RadioCardGroupContextValue,
	RadioCardGroupProps,
} from './RadioCard.types';

// ============================================================================
// Styles
// ============================================================================

const radioCardGroupStyles = StyleSheet.create((theme) => ({
	container: {
		flexDirection: 'column',

		variants: {
			gap: {
				none: { gap: 0 },
				sm: { gap: theme.spacing[2] },
				md: { gap: theme.spacing[3] },
				lg: { gap: theme.spacing[4] },
			},
		},
	},
}));

// ============================================================================
// RadioCardGroup Component
// ============================================================================

export const RadioCardGroup = (props: RadioCardGroupProps) => {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		name,
		disabled = false,
		children,
		style,
		gap = 'md',
		accessibilityLabel,
		...rest
	} = props;

	// Hybrid Control Pattern: controlled/uncontrolled 자동 전환
	const [internalValue, setInternalValue] = useState<string | undefined>(
		defaultValue
	);
	const isControlled = valueProp !== undefined;
	const value = isControlled ? valueProp : internalValue;

	// Apply variants
	radioCardGroupStyles.useVariants({ gap });

	// Check if a specific value is selected
	const isSelected = useCallback(
		(itemValue: string): boolean => {
			return value === itemValue;
		},
		[value]
	);

	// Select value (Radio is single select)
	const selectValue = useCallback(
		(newValue: string) => {
			// If the value is already selected, ignore (Radio is single select)
			if (value === newValue) return;

			if (!isControlled) {
				setInternalValue(newValue);
			}
			onValueChange?.(newValue);
		},
		[value, isControlled, onValueChange]
	);

	// Context value
	const contextValue = useMemo<RadioCardGroupContextValue>(
		() => ({
			value,
			selectValue,
			isSelected,
			disabled,
			name,
		}),
		[value, selectValue, isSelected, disabled, name]
	);

	return (
		<RadioCardGroupProvider value={contextValue}>
			<View
				{...rest}
				style={[radioCardGroupStyles.container, style]}
				accessibilityRole="radiogroup"
				accessibilityLabel={accessibilityLabel ?? name}
			>
				{children}
			</View>
		</RadioCardGroupProvider>
	);
};

RadioCardGroup.displayName = 'RadioCardGroup';
