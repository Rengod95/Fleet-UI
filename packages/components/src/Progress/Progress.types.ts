import type { ViewProps } from 'react-native';

/**
 * Progress Color Scheme
 * 토큰 시스템의 semantic 컬러 그룹
 */
export type ProgressColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

/**
 * Track Variant
 * - lined: thin horizontal line track
 * - flat: basic horizontal bar track
 */
export type ProgressTrackVariant = 'lined' | 'flat';

/**
 * Thumb Variant (display type)
 * - circle: simple circle
 * - number: circle with number
 * - none: no thumb
 */
export type ProgressThumbVariant = 'circle' | 'number' | 'none';
export type ProgressThumbGap = 'none' | 'sm' | 'md' | 'lg';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressRounded = 'none' | 'sm' | 'md' | 'lg';
export type ProgressShadow = 'none' | 'sm' | 'md' | 'lg';
export interface ProgressStepLabel {
	/** Step index (0-based) */
	stepIndex: number;
	/** Label text */
	label: string;
}

/**
 * Progress Props Interface
 *
 * Structure (depends on thumbVariant):
 *
 * 1. thumbVariant !== 'none' (circle, number):
 *    - step=N → N Thumb + (N-1) Track
 *    - order: [Thumb0] - [Track0] - [Thumb1] - [Track1] - ... - [ThumbN-1]
 *    - example (step=5, activeStep=2):
 *      [●] [━━━━━] [●] [─────] [○] [─────] [○] [─────] [○]
 *        1        2        3        4        5
 *      (Thumb 1, 2 activated, Track1 activated)
 *
 * 2. thumbVariant === 'none':
 *    - step=N → N Tracks created without Thumb.
 *    - order: [Track0] - [Track1] - ... - [TrackN-1]
 *    - example (step=5, activeStep=2):
 *      [━━━━━] [━━━━━] [─────] [─────] [─────]
 *        1        2        3        4        5
 *      (Track 1, 2 activated)
 *
 * - activeStep: 1-based (1 ~ N)
 *   - 0: Nothing is activated
 *   - 1: The first step is activated
 *   - N: All steps are activated (completed)
 */
export interface ProgressProps extends Omit<ViewProps, 'children'> {
	/**
	 * Total step count (integer, 1~100)
	 * step=N → N Thumb or Track created
	 * @required
	 */
	step: number;

	/**
	 * Current activated step (1-based)
	 * - 0: nothing is activated
	 * - 1: The first step is activated
	 * - step: All steps are activated (completed)
	 * Controlled mode
	 */
	activeStep?: number;

	/**
	 * Default active step (Uncontrolled mode)
	 * @default 1
	 */
	defaultActiveStep?: number;

	/**
	 * Step change callback
	 */
	onStepChange?: (step: number) => void;

	/**
	 * Track variant
	 * @default 'flat'
	 */
	trackVariant?: ProgressTrackVariant;

	/**
	 * Thumb variant (display type)
	 * @default 'none'
	 */
	thumbVariant?: ProgressThumbVariant;

	/**
	 * Gap between Thumb and Track
	 * @default 'md'
	 */
	thumbGap?: ProgressThumbGap;

	/**
	 * Color scheme
	 * @default 'primary'
	 */
	colorScheme?: ProgressColorScheme;

	/**
	 * Size
	 * @default 'md'
	 */
	size?: ProgressSize;

	/**
	 * Border radius
	 * @default 'md'
	 */
	rounded?: ProgressRounded;

	/**
	 * Shadow
	 * @default 'none'
	 */
	shadow?: ProgressShadow;

	/**
	 * Interactive mode activation
	 * true when user can tap the step to change
	 * @default false
	 */
	interactive?: boolean;

	/**
	 * Step press callback (only works in interactive mode)
	 * - step: 1-based (1 ~ N)
	 */
	onStepPress?: (step: number) => void;

	/**
	 * Animation activation
	 * @default true
	 */
	animated?: boolean;

	/**
	 * Animation duration (ms)
	 * @default 300
	 */
	animationDuration?: number;

	/**
	 * Step label array
	 * array of objects containing stepIndex and label
	 */
	labels?: ProgressStepLabel[];

	/**
	 * Show labels
	 * @default false
	 */
	showLabels?: boolean;

	/**
	 * Accessibility label
	 */
	accessibilityLabel?: string;

	/**
	 * Test identifier
	 */
	testID?: string;
}

/**
 * Individual Track Item Props
 */
export interface ProgressTrackItemProps {
	index: number;
	isActive: boolean;
	isCompleted: boolean;
	trackVariant: ProgressTrackVariant;
	thumbVariant: ProgressThumbVariant;
	thumbGap: ProgressThumbGap;
	colorScheme: ProgressColorScheme;
	size: ProgressSize;
	rounded: ProgressRounded;
	shadow: ProgressShadow;
	animated: boolean;
	animationDuration: number;
	isFirst: boolean;
	isLast: boolean;
	label?: string;
	showLabel: boolean;
	interactive: boolean;
	onPress?: () => void;
}
