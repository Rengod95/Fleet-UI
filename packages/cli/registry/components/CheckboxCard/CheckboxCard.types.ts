import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type {
	CheckboxRounded,
	CheckboxVariant,
} from '../Checkbox/Checkbox.types';
import type {
	ItemColorScheme,
	ItemRounded,
	ItemShadow,
	ItemSize,
	ItemVariant,
} from '../Item/Item.types';

// ============================================================================
// CheckboxCard Types
// ============================================================================

/**
 * 인디케이터 위치
 * - start: 왼쪽에 체크박스 표시
 * - end: 오른쪽에 체크박스 표시
 */
export type CheckboxCardIndicatorPosition = 'start' | 'end';

/**
 * CheckboxCard Props
 */
export interface CheckboxCardProps extends PressableProps {
	// ========== Content Props ==========
	/**
	 * 카드 제목 (필수)
	 */
	title: string;

	/**
	 * 카드 설명 (선택)
	 */
	description?: string;

	/**
	 * 헤더 영역 커스텀 콘텐츠 (선택)
	 */
	header?: ReactNode;

	/**
	 * 푸터 영역 커스텀 콘텐츠 (선택)
	 */
	footer?: ReactNode;

	/**
	 * 타이틀 앞에 표시할 미디어/아이콘 (선택)
	 */
	media?: ReactNode;

	/**
	 * Content 왼쪽에 배치할 커스텀 콘텐츠 (선택)
	 */
	left?: ReactNode;

	/**
	 * Content 오른쪽에 배치할 커스텀 콘텐츠 (선택)
	 */
	right?: ReactNode;

	// ========== Checkbox 기능 Props ==========
	/**
	 * Checked 상태 (Controlled)
	 */
	checked?: boolean;

	/**
	 * 기본 checked 상태 (Uncontrolled)
	 * @default false
	 */
	defaultChecked?: boolean;

	/**
	 * Checked 상태 변경 핸들러
	 */
	onCheckedChange?: (checked: boolean) => void;

	/**
	 * 그룹 내 식별자 (CheckboxCardGroup 사용 시)
	 */
	value?: string;

	// ========== Card 스타일 Props (Item 기반) ==========
	/**
	 * Color scheme
	 * @default 'neutral'
	 */
	colorScheme?: ItemColorScheme;

	/**
	 * Card variant
	 * @default 'outlined'
	 */
	variant?: ItemVariant;

	/**
	 * Card 크기
	 * @default 'md'
	 */
	size?: ItemSize;

	/**
	 * Border radius
	 * @default 'md'
	 */
	rounded?: ItemRounded;

	/**
	 * Shadow
	 * @default 'none'
	 */
	shadow?: ItemShadow;

	// ========== Checkbox 인디케이터 Props ==========
	/**
	 * 체크박스 인디케이터 위치
	 * @default 'end'
	 */
	indicatorPosition?: CheckboxCardIndicatorPosition;

	/**
	 * 체크박스 인디케이터 variant
	 * @default 'filled'
	 */
	indicatorVariant?: CheckboxVariant;

	/**
	 * 체크박스 인디케이터 rounded
	 * @default 'sm'
	 */
	indicatorRounded?: CheckboxRounded;

	// ========== 선택 상태 스타일 Props ==========

	/**
	 * 선택 시 적용할 인디케이터 variant (미지정 시 기본 indicatorVariant 사용)
	 */
	indicatorSelectedVariant?: CheckboxVariant;
	/**
	 * 선택 시 적용할 colorScheme (미지정 시 기본 colorScheme 사용)
	 */
	selectedColorScheme?: ItemColorScheme;

	/**
	 * 선택 시 적용할 variant (미지정 시 기본 variant 사용)
	 * 예: 기본 flat → 선택 시 outlined로 변경
	 */
	selectedVariant?: ItemVariant;

	// ========== 공통 Props ==========
	/**
	 * 비활성화 상태
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Custom style
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Accessibility label
	 */
	accessibilityLabel?: string;

	/**
	 * Test ID
	 */
	testID?: string;
}

// ============================================================================
// CheckboxCardGroup Types
// ============================================================================

export interface CheckboxCardGroupProps {
	/**
	 * 현재 선택된 values (Controlled)
	 */
	values?: string[];

	/**
	 * 기본 선택 values (Uncontrolled)
	 * @default []
	 */
	defaultValues?: string[];

	/**
	 * 선택 변경 핸들러
	 */
	onValuesChange?: (values: string[]) => void;

	/**
	 * 최대 선택 개수 (undefined면 무제한)
	 */
	max?: number;

	/**
	 * 최소 선택 개수
	 * @default 0
	 */
	min?: number;

	/**
	 * 전체 비활성화
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * 그룹 내 CheckboxCard들
	 */
	children?: ReactNode;

	/**
	 * 컨테이너 스타일
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * 카드 간 간격
	 * @default 'md'
	 */
	gap?: 'none' | 'sm' | 'md' | 'lg';
}

// ============================================================================
// Context Types
// ============================================================================

export interface CheckboxCardGroupContextValue {
	/**
	 * 현재 선택된 values
	 */
	values: string[];

	/**
	 * value 토글 핸들러
	 */
	toggleValue: (value: string) => void;

	/**
	 * 특정 value가 선택되었는지 확인
	 */
	isSelected: (value: string) => boolean;

	/**
	 * 그룹 전체 disabled 상태
	 */
	disabled: boolean;

	/**
	 * 최대 선택 개수 도달 여부
	 */
	isMaxReached: boolean;
}
