import type { ReactNode, RefObject } from 'react';
import type {
	StyleProp,
	TextInput,
	TextInputProps,
	TextStyle,
	ViewStyle,
} from 'react-native';


export type OTPInputColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';
export type OTPInputVariant = 'flat' | 'bordered' | 'underlined' | 'faded';
export type OTPInputSize = 'sm' | 'md' | 'lg' | 'xl';
export type OTPInputRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type OTPInputShadow = 'none' | 'sm' | 'md' | 'lg';


// ============================================
// Hook Types
// ============================================

export interface UseOTPInputOptions
	extends Pick<
		OTPInputProps,
		| 'maxLength'
		| 'defaultValue'
		| 'pattern'
		| 'placeholder'
		| 'onChangeText'
		| 'onComplete'
		| 'pasteTransformer'
	> {}

export interface UseOTPInputReturn {
	/** TextInput ref */
	inputRef: RefObject<TextInput | null>;
	/** Current value */
	value: string;
	/** Focus state */
	isFocused: boolean;
	/** Render props (slots, isFocused) */
	renderProps: OTPRenderProps;
	/** Event handlers */
	handlers: {
		onChangeText: (text: string) => void;
		onFocus: () => void;
		onBlur: () => void;
	};
	/** Actions */
	actions: {
		clear: () => void;
		focus: () => void;
		blur: () => void;
		setValue: (value: string) => void;
	};
}



// ============================================
// Slot Render Props
// ============================================

export interface OTPSlotRenderProps {
	/** Slot index (from 0)*/
	index: number;
	/** Character inputted (null if empty) */
	char: string | null;
	/** Previous frame character (for animation detection) */
	prevChar: string | null;
	/** Placeholder character (null if empty) */
	placeholderChar: string | null;
	/** Whether the current slot is active (focused) */
	isActive: boolean;
	/** Whether to display a fake caret */
	hasFakeCaret: boolean;
	/** Whether the entire OTP Input is focused */
	isFocused: boolean;
}

// ============================================
// Slot Props
// ============================================

export interface OTPSlotProps {
	/** Slot render information */
	slot: OTPSlotRenderProps;
	/** Color scheme @default 'neutral' */
	colorScheme?: OTPInputColorScheme;
	/** Style variant @default 'bordered' */
	variant?: OTPInputVariant;
	/** Size @default 'md' */
	size?: OTPInputSize;
	/** Rounded @default 'md' */
	rounded?: OTPInputRounded;
	/** Shadow @default 'none' */
	shadow?: OTPInputShadow;
	/** Disabled state */
	isDisabled?: boolean;
	/** Error state */
	isInvalid?: boolean;
	/** Custom slot style */
	slotStyle?: StyleProp<ViewStyle>;
	/** Custom text style */
	textStyle?: StyleProp<TextStyle>;
	/** Custom caret style */
	caretStyle?: StyleProp<ViewStyle>;
}

// ============================================
// Caret Props
// ============================================

export interface OTPCaretProps {
	/** Color scheme @default 'neutral' */
	colorScheme?: OTPInputColorScheme;
	/** Size @default 'md' */
	size?: OTPInputSize;
	/** Custom style */
	style?: StyleProp<ViewStyle>;
}

// ============================================
// Render Props (for external render function)
// ============================================

/**
 * Information passed to the render prop
 */
export interface OTPRenderProps {
	/** Array of render information for each slot */
	slots: OTPSlotRenderProps[];
	/** Whether the entire Input is focused */
	isFocused: boolean;
}

/**
 * Custom render function type
 */
export type OTPInputRenderFn = (props: OTPRenderProps) => ReactNode;

// ============================================
// Main OTPInput Props
// ============================================

export interface OTPInputProps
	extends Omit<
		TextInputProps,
		'value' | 'onChangeText' | 'maxLength' | 'style'
	> {
	/**
	 * OTP length (required)
	 * Determines the number of slots
	 */
	maxLength: number;

	/**
	 * Default value
	 */
	defaultValue?: string;

	/**
	 * Value change callback
	 */
	onChangeText?: (value: string) => void;

	/**
	 * Input complete callback (when all slots are filled)
	 */
	onComplete?: (value: string) => void;

	/**
	 * Input pattern (regular expression)
	 * Used for input value validation
	 */
	pattern?: string | RegExp;

	/**
	 * Placeholder string
	 * Displayed for each slot (e.g. "●●●●●●")
	 */
	placeholder?: string;

	/**
	 * Paste transformation function
	 * Used when extracting OTP from clipboard
	 */
	pasteTransformer?: (pasted: string) => string;

	// ============================================
	// Style Props
	// ============================================

	/**
	 * Color scheme
	 * Applied to slot border color in focused state
	 * @default 'neutral'
	 */
	colorScheme?: OTPInputColorScheme;

	/**
	 * Style variant
	 * @default 'bordered'
	 */
	variant?: OTPInputVariant;

	/**
	 * Size
	 * Affects slot dimensions, spacing, and font size
	 * @default 'md'
	 */
	size?: OTPInputSize;

	/**
	 * Rounded for Slot Container
	 * @default 'md'
	 */
	rounded?: OTPInputRounded;

	/**
	 * Shadow
	 * @default 'none'
	 */
	shadow?: OTPInputShadow;

	/**
	 * Disabled state
	 * @default false
	 */
	isDisabled?: boolean;

	/**
	 * Error state
	 * @default false
	 */
	isInvalid?: boolean;

	/**
	 * Slot spacing (theme.spacing index)
	 * Determined automatically by size if not specified
	 */
	gap?: number;

	// ============================================
	// Style Overrides
	// ============================================

	/**
	 * root container style(slot group container)
	 */
	containerStyle?: StyleProp<ViewStyle>;

	/**
	 * Individual slot's container style (each slot container)
	 */
	slotStyle?: StyleProp<ViewStyle>;

	/**
	 * Slot text style
	 */
	slotTextStyle?: StyleProp<TextStyle>;

	/**
	 * Caret style
	 */
	caretStyle?: StyleProp<ViewStyle>;

	// ============================================
	// Render Function Override
	// ============================================

	/**
	 * Custom render function
	 * Used instead of default OTPSlot when provided
	 */
	render?: OTPInputRenderFn;
}

// ============================================
// Ref
// ============================================

export interface OTPInputRef {
	/** Set value */
	setValue: (value: string) => void;
	/** Focus */
	focus: () => void;
	/** Blur */
	blur: () => void;
	/** Clear */
	clear: () => void;
}
