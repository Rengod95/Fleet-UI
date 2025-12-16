import { useCallback, useMemo, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import type {
	OTPRenderProps,
	OTPSlotRenderProps,
	UseOTPInputOptions,
	UseOTPInputReturn,
} from './OTPInput.types';

// ============================================
// Default Paste Transformer
// ============================================

/**
 * Default paste transformation function
 * Extracts a sequence of maxLength digits from pasted text
 */
const createDefaultPasteTransformer =
	(maxLength: number) =>
	(pasted: string): string => {
		// find exactly maxLength digits (no other digits before or after)
		// lookbehind may have compatibility issues with some runtimes (e.g. Hermes)
		const otpRegex = new RegExp(`(?:^|\\D)(\\d{${maxLength}})(?:\\D|$)`);
		const match = pasted.match(otpRegex);
		return match?.[1] ?? '';
	};

// ============================================
// Hook
// ============================================

export function useOTPInput({
	maxLength,
	defaultValue = '',
	pattern,
	placeholder,
	onChangeText,
	onComplete,
	pasteTransformer,
}: UseOTPInputOptions): UseOTPInputReturn {
	// State
	const [value, setValue] = useState(defaultValue);
	const [prevValue, setPrevValue] = useState(defaultValue);
	const [isFocused, setIsFocused] = useState(false);

	// Refs
	const inputRef = useRef<TextInput>(null);

	// pattern regex memoization
	const regexp = useMemo(
		() =>
			pattern
				? typeof pattern === 'string'
					? new RegExp(pattern)
					: pattern
				: null,
		[pattern]
	);

	// paste transformation function
	const transformer = useMemo(
		() => pasteTransformer ?? createDefaultPasteTransformer(maxLength),
		[pasteTransformer, maxLength]
	);

	// ============================================
	// Handlers
	// ============================================

	const handleChangeText = useCallback(
		(text: string) => {
			// detect paste: if more than one character is input at once, consider it as paste
			const isPaste = text.length > value.length + 1;
			const transformedText = isPaste ? transformer(text) : text;

			// slice to maxLength
			const newValue = transformedText.slice(0, maxLength);

			// pattern validation
			if (newValue.length > 0 && regexp && !regexp.test(newValue)) {
				return;
			}

			// save previous value (for animation trigger)
			setPrevValue(value);
			setValue(newValue);

			// call callback
			onChangeText?.(newValue);

			// check if complete
			if (newValue.length === maxLength) {
				onComplete?.(newValue);
			}
		},
		[maxLength, regexp, onChangeText, onComplete, transformer, value]
	);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleBlur = useCallback(() => {
		setIsFocused(false);
	}, []);

	// ============================================
	// Actions
	// ============================================

	const clear = useCallback(() => {
		inputRef.current?.clear();
		setPrevValue(value);
		setValue('');
		onChangeText?.('');
	}, [onChangeText, value]);

	const focus = useCallback(() => {
		inputRef.current?.focus();
	}, []);

	const blur = useCallback(() => {
		inputRef.current?.blur();
	}, []);

	const setValueAction = useCallback(
		(newValue: string) => {
			handleChangeText(newValue);
		},
		[handleChangeText]
	);

	// ============================================
	// Create slots
	// ============================================

	const slots = useMemo<OTPSlotRenderProps[]>(() => {
		return Array.from({ length: maxLength }).map((_, index) => {
			const isActive = isFocused && index === value.length;
			const char = value[index] ?? null;
			const prevChar = prevValue[index] ?? null;
			const placeholderChar =
				value.length === 0 ? (placeholder?.[index] ?? null) : null;

			return {
				index,
				char,
				prevChar,
				placeholderChar,
				isActive,
				hasFakeCaret: isActive && char === null,
				isFocused,
			};
		});
	}, [isFocused, maxLength, value, prevValue, placeholder]);

	// ============================================
	// Render Props
	// ============================================

	const renderProps = useMemo<OTPRenderProps>(
		() => ({ slots, isFocused }),
		[slots, isFocused]
	);

	// ============================================
	// Return
	// ============================================

	return {
		inputRef,
		value,
		isFocused,
		renderProps,
		handlers: {
			onChangeText: handleChangeText,
			onFocus: handleFocus,
			onBlur: handleBlur,
		},
		actions: {
			clear,
			focus,
			blur,
			setValue: setValueAction,
		},
	};
}
