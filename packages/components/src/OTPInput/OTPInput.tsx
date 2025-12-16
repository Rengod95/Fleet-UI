import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { BlurEvent, FocusEvent, Platform, Pressable, TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { OTPInputProps, OTPInputRef } from './OTPInput.types';
import { OTPSlot } from './OTPSlot';
import { useOTPInput } from './useOTPInput';

// ============================================
// Component
// ============================================

/**
 * OTP (One-Time Password) Input component
 *
 * @example
 * // Basic usage
 * <OTPInput maxLength={6} onComplete={(code) => console.log(code)} />
 *
 * @example
 * // Custom styling example
 * <OTPInput
 *   maxLength={4}
 *   colorScheme="primary"
 *   variant="bordered"
 *   size="lg"
 *   radius="lg"
 * />
 *
 * @example
 * // Custom render function example
 * <OTPInput
 *   maxLength={6}
 *   render={({ slots }) => (
 *     <View style={{ flexDirection: 'row' }}>
 *       {slots.map((slot, i) => (
 *         <CustomSlot key={i} {...slot} />
 *       ))}
 *     </View>
 *   )}
 * />
 */
export const OTPInput = forwardRef<OTPInputRef, OTPInputProps>((props, ref) => {
	const {
		maxLength,
		defaultValue,
		onChangeText,
		onComplete,
		pattern,
		placeholder,
		pasteTransformer,

		// Style props
		colorScheme = 'neutral',
		variant = 'bordered',
		size = 'md',
		rounded = 'md',
		shadow = 'none',
		isDisabled = false,
		isInvalid = false,
		gap,

		// Style overrides
		containerStyle,
		slotStyle,
		slotTextStyle,
		caretStyle,

		// Render override
		render,

		// TextInput props
		inputMode = 'numeric',
		onFocus: onFocusProp,
		onBlur: onBlurProp,
		accessibilityLabel: accessibilityLabelProp,
		accessibilityHint: accessibilityHintProp,
		...textInputProps
	} = props;

	styles.useVariants({ size });

	// ============================================
	// Hook
	// ============================================

	const { inputRef, value, renderProps, handlers, actions } = useOTPInput({
		maxLength,
		defaultValue,
		pattern,
		placeholder,
		onChangeText,
		onComplete,
		pasteTransformer,
	});

	// ============================================
	// Expose ref
	// ============================================

	useImperativeHandle(
		ref,
		() => ({
			setValue: actions.setValue,
			focus: () => {
				if (isDisabled) return;
				actions.focus();
			},
			blur: actions.blur,
			clear: actions.clear,
		}),
		[actions, isDisabled]
	);

	// ============================================
	// Handlers
	// ============================================

	const handleInputFocus = useCallback(
		(event: FocusEvent) => {
			handlers.onFocus();
			onFocusProp?.(event);
		},
		[handlers, onFocusProp]
	);

	const handleInputBlur = useCallback(
		(event: BlurEvent) => {
			handlers.onBlur();
			onBlurProp?.(event);
		},
		[handlers, onBlurProp]
	);

	const handleContainerPress = useCallback(() => {
		if (isDisabled) return;
		actions.focus();
	}, [isDisabled, actions]);

	// ============================================
	// Default Render
	// ============================================

	const defaultRender = useMemo(() => {
		return renderProps.slots.map((slot) => (
			<OTPSlot
				key={slot.index}
				slot={slot}
				colorScheme={colorScheme}
				variant={variant}
				size={size}
				rounded={rounded}
				shadow={shadow}
				isDisabled={isDisabled}
				isInvalid={isInvalid}
				slotStyle={slotStyle}
				textStyle={slotTextStyle}
				caretStyle={caretStyle}
			/>
		));
	}, [
		renderProps.slots,
		colorScheme,
		variant,
		size,
		rounded,
		shadow,
		isDisabled,
		isInvalid,
		slotStyle,
		slotTextStyle,
		caretStyle,
	]);

	// Determine render function
	const renderedContent = render ? render(renderProps) : defaultRender;

	// ============================================
	// Render
	// ============================================

	return (
		<Pressable
			style={[styles.container,  containerStyle]}
			onPress={handleContainerPress}
			disabled={isDisabled}
			accessibilityRole="none"
			accessible={false}
			testID="otp-input-container"
		>
			<View
				accessible={false}
				accessibilityElementsHidden
				importantForAccessibility="no-hide-descendants"
				style={[styles.contentWrapper]}
			>
				{renderedContent}
			</View>

			{/* Hidden actual TextInput */}
			<TextInput
				ref={inputRef}
				style={styles.hiddenInput}
				value={value}
				onChangeText={handlers.onChangeText}
				{...textInputProps}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				inputMode={inputMode}
				maxLength={maxLength}
				// Opacity 0 is not supported for pasting feature on iOS, so we set it to 0.02 and hide the caret.
				caretHidden={Platform.OS === 'ios'}
				textContentType="oneTimeCode"
				autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
				editable={!isDisabled}
				accessible
				accessibilityRole="text"
				accessibilityState={{ disabled: isDisabled }}
				accessibilityLabel={
					accessibilityLabelProp ?? `OTP input with ${maxLength} digits`
				}
				accessibilityHint={accessibilityHintProp ?? 'Enter your verification code'}
				testID="otp-input"
			/>
		</Pressable>
	);
});

OTPInput.displayName = 'OTPInput';

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		variants: {
			size: {
				sm: {
					gap: theme.spacing[3],
				},
				md: {
					gap: theme.spacing[4],
				},
				lg: {
					gap: theme.spacing[4],
				},
				xl: {
					gap: theme.spacing[5],
				},
			},
		},
	},
	hiddenInput: {
		...StyleSheet.absoluteFillObject,
		...Platform.select({
			ios: {
				// Opacity 0 is not supported for pasting feature on iOS, so we set it to 0.02 and hide the caret.
				opacity: 0.02,
				color: 'transparent',
			},
			android: {
				opacity: 0,
			},
			default: {
				opacity: 0,
			},
		}),
	},
}));
