import { forwardRef, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { AccordionProvider } from './Accordion.context';
import type {
	AccordionComponent,
	AccordionContextValue,
	AccordionProps,
} from './Accordion.types';
import { AccordionHeader } from './AccordionHeader';
import { AccordionItem } from './AccordionItem';
import { AccordionContent } from './AccordionContent';

function normalizeValue(
	value: string | string[] | undefined,
	type: 'single' | 'multiple'
): string[] {
	if (value === undefined) return [];
	if (type === 'single') {
		return typeof value === 'string' ? [value] : value.slice(0, 1);
	}
	return Array.isArray(value) ? value : [value];
}

const styles = StyleSheet.create((theme) => ({
	container: {
		variants: {
			gap: {
				none: {
					gap: 0,
				},
				sm: {
					gap: theme.spacing[3],
				},
				md: {
					gap: theme.spacing[4],
				},
				lg: {
					gap: theme.spacing[5],
				},
			},
		},
	},
}));

const AccordionBase = forwardRef<View, AccordionProps>((props, ref) => {
	const {
		type,
		collapsible = false,
		defaultValue,
		value: controlledValue,
		onValueChange,
		colorScheme = 'neutral',
		variant = 'ghost',
		shadow = 'none',
		size = 'md',
		rounded = 'md',
		gap = 'md',
		children,
		style,
		...viewProps
	} = props;

	styles.useVariants({ gap });

	// Uncontrolled state
	const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() =>
		normalizeValue(defaultValue, type)
	);

	// Determine if controlled
	const isControlled = controlledValue !== undefined;
	const expandedValues = isControlled
		? normalizeValue(controlledValue, type)
		: uncontrolledValue;

	const toggleItem = useCallback(
		(itemValue: string) => {
			let newValues: string[];

			if (type === 'single') {
				// Single mode
				const isCurrentlyExpanded = expandedValues.includes(itemValue);
				if (isCurrentlyExpanded) {
					// Collapse only if collapsible is true
					newValues = collapsible ? [] : [itemValue];
				} else {
					newValues = [itemValue];
				}

				if (!isControlled) {
					setUncontrolledValue(newValues);
				}
				(onValueChange as ((value: string) => void) | undefined)?.(
					newValues[0] ?? ''
				);
			} else {
				// Multiple mode
				const isCurrentlyExpanded = expandedValues.includes(itemValue);
				if (isCurrentlyExpanded) {
					newValues = expandedValues.filter((v) => v !== itemValue);
				} else {
					newValues = [...expandedValues, itemValue];
				}

				if (!isControlled) {
					setUncontrolledValue(newValues);
				}
				(onValueChange as ((value: string[]) => void) | undefined)?.(newValues);
			}
		},
		[type, collapsible, expandedValues, isControlled, onValueChange]
	);

	const contextValue = useMemo<AccordionContextValue>(
		() => ({
			type,
			collapsible: type === 'single' ? collapsible : true,
			expandedValues,
			toggleItem,
			variant,
			colorScheme,
			shadow,
			size,
			rounded,
		}),
		[
			type,
			collapsible,
			expandedValues,
			toggleItem,
			variant,
			colorScheme,
			shadow,
			size,
			rounded,
		]
	);

	return (
		<AccordionProvider value={contextValue}>
			<View ref={ref} style={[styles.container, style]} {...viewProps}>
				{children}
			</View>
		</AccordionProvider>
	);
});

AccordionBase.displayName = 'Accordion';

export const Accordion: AccordionComponent = Object.assign(AccordionBase, {
	Item: AccordionItem,
	Header: AccordionHeader,
	Content: AccordionContent,
});
