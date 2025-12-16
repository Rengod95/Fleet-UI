import type { LucideIcon } from 'lucide-react-native';
import type { ViewProps } from 'react-native';

export interface IconProps extends ViewProps {
	/**
	 * Lucide 아이콘 컴포넌트 (Component as Prop 패턴)
	 * @example
	 * import { Heart } from 'lucide-react-native';
	 * <Icon icon={Heart} />
	 */
	icon: LucideIcon;

	/**
	 * Color scheme (토큰 시스템)
	 * @default 'neutral'
	 */
	colorScheme?:
		| 'primary'
		| 'neutral'
		| 'error'
		| 'warning'
		| 'success'
		| 'info'
		| 'secondary';

	/**
	 * Icon size
	 * @default 'md'
	 */
	size?: '_2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '_2xl' | '_3xl' | '_4xl';

	/**
	 * 커스텀 색상 (colorScheme보다 우선)
	 */
	color?: string;

	/**
	 * Stroke width
	 * @default 2
	 */
	strokeWidth?: number;

	/**
	 * 접근성 레이블 (필수)
	 */
	accessibilityLabel?: string;
}
