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
 * - lined: 얇은 수평선 형태의 트랙
 * - flat: 기본적인 가로가 긴 bar 형태
 */
export type ProgressTrackVariant = 'lined' | 'flat';

/**
 * Thumb Variant (디스플레이 형태)
 * - circle: 단순 원형
 * - number: 숫자가 포함된 원
 * - none: thumb 없음
 */
export type ProgressThumbVariant = 'circle' | 'number' | 'none';

/**
 * Thumb Gap (Thumb와 Track 사이 간격)
 * - none: 간격 없음 (thumb와 track이 붙어있음)
 * - sm: 작은 간격
 * - md: 중간 간격
 * - lg: 큰 간격
 */
export type ProgressThumbGap = 'none' | 'sm' | 'md' | 'lg';

/**
 * Progress Size
 */
export type ProgressSize = 'sm' | 'md' | 'lg';

/**
 * Progress Rounded
 */
export type ProgressRounded = 'none' | 'sm' | 'md' | 'lg';

/**
 * Progress Shadow
 */
export type ProgressShadow = 'none' | 'sm' | 'md' | 'lg';

/**
 * Step Label 타입
 */
export interface ProgressStepLabel {
	/** 스텝 인덱스 (0-based) */
	stepIndex: number;
	/** 레이블 텍스트 */
	label: string;
}

/**
 * Progress Props Interface
 *
 * 구조 (thumbVariant에 따라 다름):
 *
 * 1. thumbVariant !== 'none' (circle, number):
 *    - step=N → N개의 Thumb(마커) + (N-1)개의 Track(연결선)
 *    - 순서: [Thumb0] - [Track0] - [Thumb1] - [Track1] - ... - [ThumbN-1]
 *    - 예시 (step=5, activeStep=2):
 *      [●] ━━━ [●] ─── [○] ─── [○] ─── [○]
 *       1       2       3       4       5
 *      (Thumb 1, 2 활성화, Track 0 완료)
 *
 * 2. thumbVariant === 'none':
 *    - step=N → N개의 Track만 생성 (Thumb 없음)
 *    - 순서: [Track0] - [Track1] - ... - [TrackN-1]
 *    - 예시 (step=5, activeStep=2):
 *      ━━━━━ ━━━━━ ───── ───── ─────
 *        1     2     3     4     5
 *      (Track 1, 2 활성화)
 *
 * - activeStep: 1-based (1 ~ N)
 *   - 0: 아무것도 활성화되지 않음
 *   - 1: 첫 번째 단계 활성화
 *   - N: 모든 단계 활성화 (완료)
 */
export interface ProgressProps extends Omit<ViewProps, 'children'> {
	/**
	 * 총 단계 수 (정수, 1~100)
	 * step=N → N개의 Thumb(마커) 또는 Track 생성
	 * @required
	 */
	step: number;

	/**
	 * 현재 활성화된 단계 (1-based)
	 * - 0: 아무것도 활성화되지 않음
	 * - 1: 첫 번째 단계 활성화
	 * - step: 모든 단계 활성화 (완료)
	 * Controlled mode
	 */
	activeStep?: number;

	/**
	 * 기본 활성 단계 (Uncontrolled mode)
	 * @default 1
	 */
	defaultActiveStep?: number;

	/**
	 * 스텝 변경 시 콜백
	 */
	onStepChange?: (step: number) => void;

	/**
	 * Track variant
	 * @default 'flat'
	 */
	trackVariant?: ProgressTrackVariant;

	/**
	 * Thumb variant (디스플레이 형태)
	 * @default 'none'
	 */
	thumbVariant?: ProgressThumbVariant;

	/**
	 * Thumb와 Track 사이 간격
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
	 * 인터랙티브 모드 활성화
	 * true일 때 사용자가 스텝을 탭하여 변경 가능
	 * @default false
	 */
	interactive?: boolean;

	/**
	 * 스텝 클릭 시 콜백 (interactive 모드에서만 동작)
	 * - step: 1-based (1 ~ N)
	 */
	onStepPress?: (step: number) => void;

	/**
	 * 애니메이션 활성화 여부
	 * @default true
	 */
	animated?: boolean;

	/**
	 * 애니메이션 지속 시간 (ms)
	 * @default 300
	 */
	animationDuration?: number;

	/**
	 * 스텝별 레이블 배열
	 * stepIndex와 label을 포함하는 객체 배열
	 */
	labels?: ProgressStepLabel[];

	/**
	 * 레이블 표시 여부
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
 * 개별 Track Item Props
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
