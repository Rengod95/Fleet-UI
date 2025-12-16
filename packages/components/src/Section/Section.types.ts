import type { FleetTheme } from '@fleet-ui/core';
import type {
	ComponentType,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from 'react';
import type { PressableProps, TextProps, View, ViewProps } from 'react-native';

export type SectionSize = 'sm' | 'md' | 'lg' | 'xl';

export type SectionSubtitlePosition = 'top' | 'bottom';

/**
 * Spacing token key from `theme.spacing`.
 *
 * Note: This intentionally accepts token keys only (not raw px values) to keep
 * spacing usage consistent across the design system.
 */
export type SectionSpacing = keyof FleetTheme['spacing'] | number;

export interface SectionProps extends Omit<ViewProps, 'children'> {
	/** Header title content. */
	title?: ReactNode;
	/** Header subtitle content. */
	subtitle?: ReactNode;
	/**
	 * Content rendered in the right area of the header (text or custom node).
	 */
	right?: ReactNode;
	/**
	 * Right icon slot (used only when `right` is not provided).
	 */
	rightIcon?: ReactNode;
	/**
	 * Section size preset.
	 * @default 'md'
	 */
	size?: SectionSize;
	/**
	 * Vertical spacing between elements inside the header.
	 * @default 3
	 */
	gap?: SectionSpacing;
	/**
	 * Horizontal padding applied to both header and body.
	 * @default 0
	 */
	padding?: SectionSpacing;
	/**
	 * Spacing between header and body, and also the body's top padding.
	 * @default 5
	 */
	contentSpacing?: SectionSpacing;
	/**
	 * Title area ratio (the rest is allocated to the right area).
	 * @default 70
	 */
	titleRatio?: number;
	/**
	 * Subtitle position relative to the title row.
	 * @default 'bottom'
	 */
	subtitlePosition?: SectionSubtitlePosition;
	headerStyle?: ViewProps['style'];
	contentStyle?: ViewProps['style'];
	children?: ReactNode;
	testID?: string;
}

export interface SectionHeaderProps extends Omit<ViewProps, 'children'> {
	/** Header title content. */
	title?: ReactNode;
	/** Header subtitle content. */
	subtitle?: ReactNode;
	/** Content rendered in the right area of the header. */
	right?: ReactNode;
	/** Right icon slot (used only when `right` is not provided). */
	rightIcon?: ReactNode;
	/**
	 * Header size preset.
	 * @default 'md'
	 */
	size?: SectionSize;
	/**
	 * Vertical spacing between elements inside the header.
	 * @default 3
	 */
	gap?: SectionSpacing;
	/**
	 * Header horizontal padding.
	 * @default 0
	 */
	padding?: SectionSpacing;
	titleRatio?: number;
	subtitlePosition?: SectionSubtitlePosition;
	disabled?: boolean;
	testID?: string;
}

export interface SectionTitleProps extends Omit<TextProps, 'children'> {
	/**
	 * Title size preset.
	 * @default 'md'
	 */
	size?: SectionSize;
	children: ReactNode;
	testID?: string;
}

export interface SectionSubtitleProps extends Omit<TextProps, 'children'> {
	/**
	 * Subtitle size preset.
	 * @default 'md'
	 */
	size?: SectionSize;
	children: ReactNode;
	testID?: string;
}

export interface SectionRightTypoProps
	extends Omit<PressableProps, 'children' | 'style'> {
	/**
	 * Right action text size preset.
	 * @default 'md'
	 */
	size?: SectionSize;
	children: ReactNode;
	/**
	 * Text style applied to the label.
	 */
	style?: TextProps['style'];
	/**
	 * Container style applied to the pressable wrapper.
	 */
	containerStyle?: PressableProps['style'];
	/**
	 * Additional props forwarded to the inner Text component.
	 */
	textProps?: Omit<TextProps, 'children' | 'style'>;
}

export interface SectionRightIconProps
	extends Omit<PressableProps, 'style' | 'children'> {
	/**
	 * Right action icon size preset.
	 * @default 'md'
	 */
	size?: SectionSize;
	icon: ReactNode;
	/**
	 * Icon-only actions should provide an aria-label for accessibility (web).
	 */
	'aria-label'?: string;
	style?: ViewProps['style'];
}

export type SectionComponent = ForwardRefExoticComponent<
	SectionProps & RefAttributes<View>
> & {
	Header: ComponentType<SectionHeaderProps>;
	Title: ComponentType<SectionTitleProps>;
	Subtitle: ComponentType<SectionSubtitleProps>;
	RightTypo: ComponentType<SectionRightTypoProps>;
	RightIcon: ComponentType<SectionRightIconProps>;
};
