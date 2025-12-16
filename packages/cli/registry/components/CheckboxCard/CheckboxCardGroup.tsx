import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CheckboxCardGroupProvider } from './CheckboxCard.context';
import type {
	CheckboxCardGroupContextValue,
	CheckboxCardGroupProps,
} from './CheckboxCard.types';

// ============================================================================
// Styles
// ============================================================================

const checkboxCardGroupStyles = StyleSheet.create((theme) => ({
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
// CheckboxCardGroup Component
// ============================================================================

export const CheckboxCardGroup = (props: CheckboxCardGroupProps) => {
	const {
		values: valuesProp,
		defaultValues = [],
		onValuesChange,
		max,
		min = 0,
		disabled = false,
		children,
		style,
		gap = 'md',
	} = props;

	// Hybrid Control Pattern: controlled/uncontrolled 자동 전환
	const [internalValues, setInternalValues] = useState<string[]>(defaultValues);
	const isControlled = valuesProp !== undefined;
	const values = isControlled ? valuesProp : internalValues;

	// Variants 적용
	checkboxCardGroupStyles.useVariants({ gap });

	// 특정 value가 선택되었는지 확인
	const isSelected = useCallback(
		(value: string): boolean => {
			return values.includes(value);
		},
		[values]
	);

	// 최대 선택 개수 도달 여부
	const isMaxReached = useMemo(() => {
		if (max === undefined) return false;
		return values.length >= max;
	}, [max, values]);

	// value 토글
	const toggleValue = useCallback(
		(value: string) => {
			const isCurrentlySelected = values.includes(value);
			let newValues: string[];

			if (isCurrentlySelected) {
				// 선택 해제 시 최소 개수 체크
				if (values.length <= min) {
					return; // 최소 개수 미만으로 줄일 수 없음
				}
				newValues = values.filter((v) => v !== value);
			} else {
				// 선택 시 최대 개수 체크
				if (max !== undefined && values.length >= max) {
					return; // 최대 개수 초과 불가
				}
				newValues = [...values, value];
			}

			if (!isControlled) {
				setInternalValues(newValues);
			}
			onValuesChange?.(newValues);
		},
		[values, min, max, isControlled, onValuesChange]
	);

	// Context value
	const contextValue = useMemo<CheckboxCardGroupContextValue>(
		() => ({
			values,
			toggleValue,
			isSelected,
			disabled,
			isMaxReached,
		}),
		[values, toggleValue, isSelected, disabled, isMaxReached]
	);

	return (
		<CheckboxCardGroupProvider value={contextValue}>
			<View style={[checkboxCardGroupStyles.container, style]}>{children}</View>
		</CheckboxCardGroupProvider>
	);
};

CheckboxCardGroup.displayName = 'CheckboxCardGroup';
