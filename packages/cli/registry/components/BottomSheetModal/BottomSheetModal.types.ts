import type {
	BottomSheetBackdropProps,
	BottomSheetBackgroundProps,
	BottomSheetModal as GorhomBottomSheetModal,
	BottomSheetModalProps as GorhomBottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import type {
	ComponentType,
	ForwardRefExoticComponent,
	ReactElement,
	ReactNode,
	RefAttributes,
} from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ButtonProps, ButtonSize } from '../Button/Button.types';

export type BottomSheetModalSize = 'sm' | 'md' | 'lg';
export type BottomSheetModalRounded =
	| 'none'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
export type BottomSheetModalShadow = 'none' | 'sm' | 'md' | 'lg' | 'overlay';

export interface BottomSheetModalRootProps
	extends Omit<
		GorhomBottomSheetModalProps,
		| 'snapPoints'
		| 'backgroundStyle'
		| 'index'
		| 'enableDynamicSizing'
		| 'handleComponent'
		| 'handleIndicatorStyle'
		| 'onDismiss'
	> {
	/**
	 * Modal visibility state
	 * @default false
	 */
	visible: boolean;

	/**
	 * @required It's required to call this function when the modal is dismissed.
	 * If you don't call this function, the modal will not be dismissed.
	 * @example
	 * <BottomSheetModalRoot
	 *   visible={stateVariable}
	 *   onDismiss={() => {
	 *     setStateVariable(false);
	 *   }}
	 * >
	 *   ...
	 */
	onDismiss: () => void;

	/**
	 * Size is determining the width of the content container.
	 * sm: 80%
	 * md: 90%
	 * lg: 100%
	 * @default 'lg'
	 */
	size?: BottomSheetModalSize;

	/**
	 * 
	 * @default 'md'
	 */
	shadow?: BottomSheetModalShadow;

	/**
	 * 모서리 둥글기 (Unistyles rounded token key)
	 * @default 'md'
	 */
	rounded?: BottomSheetModalRounded;

	/**
	 * Detached mode is a mode where the content container is detached from the bottom of the screen.
	 * It is used to create a modal that is not attached to the bottom of the screen.
	 * @default true
	 */
	detached?: boolean;

	/**
	 * Bottom margin Offset for detached mode
	 * it is added to SafeAreaInsets.bottom
	 * example: if SafeAreaInsets.bottom is 12, and bottomInset is 12, the content container will be 24px from the bottom of the screen
	 * @default 12
	 */
	bottomInset?: number;

	/**
	 * 커스텀 Backdrop 컴포넌트
	 */
	backdropComponent?: (props: BottomSheetBackdropProps) => ReactElement | null;

	/**
	 * 커스텀 Background 컴포넌트
	 */
	backgroundComponent?: (props: BottomSheetBackgroundProps) => ReactElement | null;

	children: ReactNode;
}

export interface BottomSheetModalHeaderProps {
	size?: BottomSheetModalSize;
	/**
	 * 헤더 타이틀
	 */
	title?: string;

	/**
	 * 헤더 서브타이틀
	 */
	subtitle?: string;

	/**
	 * title and subtitle text alignment on row direction
	 * @default 'start'
	 */
	alignment?: 'center' | 'start' | 'end';

	/**
	 * Top center action icon
	 */
	actionIcon?: ReactNode;

	/**
	 * 커스텀 헤더 내용 (title, subtitle, actionIcon 대신 렌더링됨)
	 */
	children?: ReactNode;

	/**
	 * 타이틀 스타일
	 */
	titleStyle?: StyleProp<TextStyle>;

	/**
	 * 서브타이틀 스타일
	 */
	subtitleStyle?: StyleProp<TextStyle>;

	/**
	 * 아이콘 래퍼 스타일
	 */
	iconWrapperStyle?: StyleProp<ViewStyle>;

	/**
	 * 헤더 컨테이너 스타일
	 */
	style?: StyleProp<ViewStyle>;
}

export interface BottomSheetModalBodyProps {
	size?: BottomSheetModalSize;
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

export interface BottomSheetModalBodyDescriptionProps {
	size?: BottomSheetModalSize;
	children: ReactNode;
	style?: StyleProp<TextStyle>;
}

export interface BottomSheetModalActionProps {
	size?: ButtonSize;
	/**
	 * Primary 버튼 Props
	 */
	primaryButtonProps?: Partial<ButtonProps>;

	/**
	 * Secondary 버튼 Props
	 */
	secondaryButtonProps?: Partial<ButtonProps>;

	/**
	 * 버튼 레이아웃 방향
	 * @default 'horizontal'
	 */
	layout?: 'horizontal' | 'vertical';

	/**
	 * Primary 버튼 표시 여부
	 * @default true
	 */
	showPrimary?: boolean;

	/**
	 * Secondary 버튼 표시 여부
	 * @default false
	 */
	showSecondary?: boolean;

	/**
	 * 컨테이너 스타일
	 */
	style?: StyleProp<ViewStyle>;
}

export interface BottomSheetModalFooterProps {
	size?: BottomSheetModalSize;
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

export interface InnerContextValue {
	close: () => void;
}

export type BottomSheetModalComponent = ForwardRefExoticComponent<
	BottomSheetModalRootProps & RefAttributes<GorhomBottomSheetModal>
> & {
	Header: ComponentType<BottomSheetModalHeaderProps>;
	Body: ComponentType<BottomSheetModalBodyProps>;
	BodyDescription: ComponentType<BottomSheetModalBodyDescriptionProps>;
	Action: ComponentType<BottomSheetModalActionProps>;
	Footer: ComponentType<BottomSheetModalFooterProps>;
};
