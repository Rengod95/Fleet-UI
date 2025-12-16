import type { ViewProps } from 'react-native';

/**
 * StepIndicator color scheme.
 *
 * Semantic color groups from the token system.
 */
export type StepIndicatorColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

/**
 * StepIndicator size.
 */
export type StepIndicatorSize = 'sm' | 'md' | 'lg';

/**
 * Step label.
 */
export interface StepIndicatorLabel {
	/** Step index (0-based). */
	stepIndex: number;
	/** Label text. */
	label: string;
}

/**
 * StepIndicator props.
 */
export interface StepIndicatorProps extends Omit<ViewProps, 'children'> {
	/**
	 * @description The Step index is 1-based. 
	 * @example If you have 5 step pages or something, the step value should be 5.
	 */
	step: number;

	/**
	 * Current active step (0-based) for controlled mode.
	 * @default undefined
	 */
	activeStep?: number;

	/**
	 * Default active step for initializing the component. (0-based)
	 * @default 0
	 */
	defaultActiveStep?: number;

	/**
	 * Callback fired when the active step changes (0-based).
	 */
	onStepChange?: (step: number) => void;

	/**
	 * Color scheme.
	 * @default 'primary'
	 */
	colorScheme?: StepIndicatorColorScheme;

	/**
	 * Size.
	 * @default 'md'
	 */
	size?: StepIndicatorSize;

	/**
	 * Enables interactive mode.
	 * When true, users can tap a step to change the active step.
	 * @default false
	 */
	interactive?: boolean;

	/**
	 * Callback fired when a step is pressed (0-based).
	 * Only works in interactive mode.
	 */
	onStepPress?: (stepIndex: number) => void;

	/**
	 * Enables animations.
	 * @default true
	 */
	animated?: boolean;

	/**
	 * Gap between steps/dots (px).
	 *
	 * @default Computed from size
	 */
	gap?: number;
	/**
	 * Accessibility label for the whole indicator.
	 *
	 * @default `Step {activeStep + 1} of {step}`
	 */
	accessibilityLabel?: string;

	/**
	 * Test identifier for the container.
	 */
	testID?: string;
}
