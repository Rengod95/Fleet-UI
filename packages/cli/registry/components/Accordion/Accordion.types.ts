import type {
	ComponentType,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from 'react';
import type { PressableProps, View, ViewProps } from 'react-native';

// ============================================================================
// Common Types
// ============================================================================

export type AccordionVariant = 'ghost' | 'outlined' | 'flat' | 'faded';

export type AccordionSize = 'sm' | 'md' | 'lg';

export type AccordionColorScheme =
	| 'primary'
	| 'neutral'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';

export type AccordionHeaderContentGap = 'none' | 'sm' | 'md' | 'lg';

export type AccordionShadow = 'none' | 'sm' | 'md' | 'lg';

export type AccordionRounded = 'none' | 'sm' | 'md' | 'lg';

export type AccordionGap = 'none' | 'sm' | 'md' | 'lg';

// ============================================================================
// Single vs Multiple Type Discrimination
// ============================================================================

interface AccordionSingleProps {
	/**
	 * 확장 모드: 하나의 아이템만 확장 가능
	 */
	type: 'single';
	/**
	 * single 모드에서 모든 아이템을 접을 수 있는지 여부
	 * @default false
	 */
	collapsible?: boolean;
	/**
	 * 비제어 모드 초기값
	 */
	defaultValue?: string;
	/**
	 * 제어 모드 값
	 */
	value?: string;
	/**
	 * 값 변경 콜백
	 */
	onValueChange?: (value: string) => void;
}

interface AccordionMultipleProps {
	/**
	 * 확장 모드: 여러 아이템 동시 확장 가능
	 */
	type: 'multiple';
	/**
	 * 비제어 모드 초기값
	 */
	defaultValue?: string[];
	/**
	 * 제어 모드 값
	 */
	value?: string[];
	/**
	 * 값 변경 콜백
	 */
	onValueChange?: (value: string[]) => void;
}

// ============================================================================
// Accordion (Root) Props
// ============================================================================

export type AccordionBaseProps = {
	/**
	 * 색상 테마
	 * @default 'neutral'
	 */
	colorScheme?: AccordionColorScheme;
	/**
	 * 시각적 variant
	 * - ghost: 배경/보더 없음
	 * - outlined: 배경 없음, 보더만 존재
	 * - flat: content_2 배경
	 * - faded: content_2 배경 + border_subtle 보더
	 * @default 'ghost'
	 */
	variant?: AccordionVariant;
	/**
	 * 그림자 크기
	 * @default 'none'
	 */
	shadow?: AccordionShadow;
	/**
	 * 컴포넌트 크기
	 * @default 'md'
	 */
	size?: AccordionSize;
	/**
	 * 모서리 둥글기
	 * @default 'md'
	 */
	rounded?: AccordionRounded;
	/**
	 * 컴포넌트 간격
	 * @default 'md'
	 */
	gap?: AccordionGap;
	/**
	 * 자식 요소 (AccordionItem들)
	 */
	children: ReactNode;
	/**
	 *
	 */
	collapsible?: boolean;
};

export type AccordionProps = AccordionBaseProps &
	(AccordionSingleProps | AccordionMultipleProps) &
	Omit<ViewProps, 'children'>;

// ============================================================================
// AccordionItem Props
// ============================================================================

export interface AccordionItemProps extends Omit<ViewProps, 'children'> {
	/**
	 * 고유 식별자 (필수)
	 */
	value: string;
	/**
	 * 비활성화 여부
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * 자식 요소 (AccordionHeader, AccordionContent)
	 */
	children: ReactNode;
	/**
	 * 헤더 콘텐츠 간격
	 */
	headerContentGap?: AccordionHeaderContentGap;
}

// ============================================================================
// AccordionHeader Props
// ============================================================================

export interface AccordionHeaderProps extends Omit<PressableProps, 'children'> {
	/**
	 * 왼쪽 아이콘
	 */
	leftIcon?: ReactNode;
	/**
	 * 오른쪽 아이콘 (기본: ChevronDown)
	 * false로 설정하면 기본 아이콘 숨김
	 */
	rightIcon?: ReactNode | false;
	/**
	 * 헤더 콘텐츠
	 */
	children: ReactNode;
}

// ============================================================================
// AccordionContent Props
// ============================================================================

export interface AccordionContentProps extends Omit<ViewProps, 'children'> {
	/**
	 * 콘텐츠
	 */
	children: ReactNode;
}

// ============================================================================
// Context Types
// ============================================================================

export interface AccordionContextValue {
	type: 'single' | 'multiple';
	collapsible: boolean;
	expandedValues: string[];
	toggleItem: (value: string) => void;
	variant: AccordionVariant;
	colorScheme: AccordionColorScheme;
	shadow: AccordionShadow;
	size: AccordionSize;
	rounded: AccordionRounded;
}

export interface AccordionItemContextValue {
	value: string;
	isExpanded: boolean;
	isDisabled: boolean;
}

// ============================================================================
// Compound Component Type
// ============================================================================

export type AccordionComponent = ForwardRefExoticComponent<
	AccordionProps & RefAttributes<View>
> & {
	Item: ComponentType<AccordionItemProps>;
	Header: ComponentType<AccordionHeaderProps>;
	Content: ComponentType<AccordionContentProps>;
};
