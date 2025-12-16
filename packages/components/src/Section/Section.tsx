import React, { forwardRef, useCallback, useMemo } from 'react';
import {
	type GestureResponderEvent,
	Pressable,
	Text,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { FleetTheme } from '@fleet-ui/core';
import type {
	SectionComponent,
	SectionHeaderProps,
	SectionProps,
	SectionRightIconProps,
	SectionRightTypoProps,
	SectionSpacing,
	SectionSubtitleProps,
	SectionTitleProps,
} from './Section.types';

// ============================================
// Animation Configs
// ============================================

const SPRING_CONFIG = { stiffness: 1800, damping: 80, mass: 2 };

// ============================================
// Constants
// ============================================

const DEFAULT_TITLE_RATIO = 70;
const RIGHT_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

const getSizePreset = (theme: FleetTheme) => ({
	sm: {
		title: theme.typography.body1Strong,
		subtitle: theme.typography.body3,
		right: theme.typography.body3,
		contentGap: theme.spacing[5],
		icon: theme.spacing[6],
	},
	md: {
		title: theme.typography.h6Strong,
		subtitle: theme.typography.body3,
		right: theme.typography.body3,
		contentGap: theme.spacing[5],
		icon: theme.spacing[7],
	},
	lg: {
		title: theme.typography.h4,
		subtitle: theme.typography.body2,
		right: theme.typography.body3,
		contentGap: theme.spacing[5],
		icon: theme.spacing[8],
	},
	xl: {
		title: theme.typography.h3,
		subtitle: theme.typography.body2,
		right: theme.typography.body3,
		contentGap: theme.spacing[5],
		icon: theme.spacing[9],
	},
});

// ============================================
// Helper Functions
// ============================================

const clampNumber = (value: number, min: number, max: number) => {
	return Math.min(max, Math.max(min, value));
};

// ============================================
// Hooks
// ============================================

const usePressFeedback = (
	enabled: boolean,
	onPressIn?: ((event: GestureResponderEvent) => void) | null,
	onPressOut?: ((event: GestureResponderEvent) => void) | null
) => {
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
			if (!enabled) return;
			scale.value = withSpring(0.8, SPRING_CONFIG);
			opacity.value = withSpring(0.7, SPRING_CONFIG);
			onPressIn?.(event);
		},
		[enabled, onPressIn, opacity, scale]
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
			scale.value = withSpring(1, SPRING_CONFIG);
			opacity.value = withSpring(1, SPRING_CONFIG);
			onPressOut?.(event);
		},
		[onPressOut, opacity, scale]
	);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: scale.value,
			},
		],
		opacity: opacity.value,
	}));

	return { animatedStyle, handlePressIn, handlePressOut };
};

// ============================================
// Component
// ============================================

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SectionTitle = forwardRef<View, SectionTitleProps>(
	(props, ref) => {
		const { size = 'md', children, style, testID, ...rest } = props;
		styles.useVariants({ size });

		return (
			<Text
				ref={ref}
				style={[styles.title, style]}
				numberOfLines={1}
				ellipsizeMode="tail"
				testID={testID}
				{...rest}
			>
				{children}
			</Text>
		);
	}
);
SectionTitle.displayName = 'Section.Title';

export const SectionSubtitle = forwardRef<View, SectionSubtitleProps>(
	(props, ref) => {
		const {
			size = 'md',
			children,
			numberOfLines = 2,
			style,
			testID,
			...rest
		} = props;
		styles.useVariants({ size });
		return (
			<Text
				ref={ref}
				style={[styles.subtitle, style]}
				numberOfLines={numberOfLines}
				ellipsizeMode="tail"
				testID={testID}
				{...rest}
			>
				{children}
			</Text>
		);
	}
);

SectionSubtitle.displayName = 'Section.Subtitle';

export const SectionRightTypo = forwardRef<View, SectionRightTypoProps>(
	(props, ref) => {
		const {
			size = 'md',
			children,
			style: textStyle,
			containerStyle,
			textProps,
			disabled,
			hitSlop,
			onPress,
			onPressIn,
			onPressOut,
			testID,
			...restPressableProps
		} = props;

		const isInteractive = Boolean(onPress || onPressIn || onPressOut);
		const isDisabled = Boolean(disabled);
		styles.useVariants({ size });

		const { animatedStyle, handlePressIn, handlePressOut } = usePressFeedback(
			isInteractive && !isDisabled,
			onPressIn,
			onPressOut
		);

		return (
			<AnimatedPressable
				ref={ref}
				hitSlop={hitSlop ?? RIGHT_HIT_SLOP}
				accessibilityRole={isInteractive ? 'button' : undefined}
				accessibilityState={isInteractive ? { disabled: isDisabled } : undefined}
				onPress={onPress}
				onPressIn={isInteractive ? handlePressIn : undefined}
				onPressOut={isInteractive ? handlePressOut : undefined}
				disabled={isDisabled}
				style={[
					styles.rightAction,
					isInteractive ? animatedStyle : undefined,
					containerStyle,
				]}
				testID={testID}
				{...restPressableProps}
			>
				<Text style={[styles.rightText, textStyle]} {...textProps}>
					{children}
				</Text>
			</AnimatedPressable>
		);
	}
);
SectionRightTypo.displayName = 'Section.RightTypo';

export const SectionRightIcon = forwardRef<View, SectionRightIconProps>(
	(props, ref) => {
		const {
			size = 'md',
			icon,
			style,
			accessibilityLabel,
			'aria-label': ariaLabel,
			disabled,
			hitSlop,
			onPress,
			onPressIn,
			onPressOut,
			testID,
			...restPressableProps
		} = props;

		const { theme } = useUnistyles();
		const sizePreset = useMemo(() => getSizePreset(theme), [theme]);
		const iconSide = sizePreset[size].icon;

		const isInteractive = Boolean(onPress || onPressIn || onPressOut);
		const isDisabled = Boolean(disabled);
		const label = ariaLabel ?? accessibilityLabel;
		
		styles.useVariants({ size });

		const { animatedStyle, handlePressIn, handlePressOut } = usePressFeedback(
			isInteractive && !isDisabled,
			onPressIn,
			onPressOut
		);

		if (__DEV__ && isInteractive && !label) {
			// biome-ignore lint/suspicious/noConsole: Development-time accessibility guidance
			console.warn(
				'SectionRightIcon: `aria-label` or `accessibilityLabel` is required when interactive.'
			);
		}

		return (
			<AnimatedPressable
				ref={ref}
				hitSlop={hitSlop ?? RIGHT_HIT_SLOP}
				accessibilityRole={isInteractive ? 'button' : undefined}
				accessibilityLabel={label}
				accessibilityState={isInteractive ? { disabled: isDisabled } : undefined}
				onPress={onPress}
				onPressIn={isInteractive ? handlePressIn : undefined}
				onPressOut={isInteractive ? handlePressOut : undefined}
				disabled={isDisabled}
				style={[
					styles.rightAction,
					isInteractive ? animatedStyle : undefined,
					style,
				]}
				testID={testID}
				{...restPressableProps}
			>
				<View style={styles.rightIconWrapper({ side: iconSide })}>
					{icon}
				</View>
			</AnimatedPressable>
		);
	}
);
SectionRightIcon.displayName = 'Section.RightIcon';

export const SectionHeader = forwardRef<View, SectionHeaderProps>(
	(props, ref) => {
		const {
			title,
			subtitle,
			right,
			rightIcon,
			size = 'md',
			gap,
			padding,
			titleRatio = DEFAULT_TITLE_RATIO,
			subtitlePosition = 'bottom',
			disabled,
			style,
			testID,
			...rest
		} = props;

		const { theme } = useUnistyles();

		const paddingHorizontal = padding ?? 0;
		const headerGap = gap ?? 3;

		styles.useVariants({ size });

		const renderTitle = () => {
			if (!title) return null;
			if (typeof title === 'string' || typeof title === 'number') {
				return <SectionTitle size={size}>{title}</SectionTitle>;
			}
			return title;
		};

		const renderSubtitle = () => {
			if (!subtitle) return null;
			if (typeof subtitle === 'string' || typeof subtitle === 'number') {
				return <SectionSubtitle size={size}>{subtitle}</SectionSubtitle>;
			}
			return subtitle;
		};

		const resolvedRight =
			right ??
			(rightIcon ? <SectionRightIcon size={size} icon={rightIcon} /> : null);

		const normalizedTitleRatio = resolvedRight
			? clampNumber(titleRatio, 0, 100)
			: undefined;

		return (
			<View
				ref={ref}
				style={[
					styles.header({
						paddingHorizontal,
						gap: headerGap,
					}),
					disabled ? { opacity: 0.6 } : undefined,
					style,
				]}
				testID={testID}
				{...rest}
			>
				{subtitlePosition === 'top' ? renderSubtitle() : null}

				<View style={styles.titleRow}>
					<View style={styles.titleArea({ titleRatio: normalizedTitleRatio })}>
						{renderTitle()}
					</View>
					{resolvedRight ? (
						<View style={styles.rightArea({ titleRatio: normalizedTitleRatio })}>
							{resolvedRight}
						</View>
					) : null}
				</View>

				{subtitlePosition === 'bottom' ? renderSubtitle() : null}
			</View>
		);
	}
);
SectionHeader.displayName = 'Section.Header';

const SectionBase = forwardRef<View, SectionProps>((props, ref) => {
	const {
		title,
		subtitle,
		right,
		rightIcon,
		children,
		size = 'md',
		gap,
		padding,
		contentSpacing,
		titleRatio = DEFAULT_TITLE_RATIO,
		subtitlePosition = 'bottom',
		headerStyle,
		contentStyle,
		testID,
		style,
		...rest
	} = props;

	const paddingX = padding ?? 0;
	const bodyGap = contentSpacing ?? 5;

	return (
		<View ref={ref} style={[styles.container, style]} testID={testID} {...rest}>
			<SectionHeader
				title={title}
				subtitle={subtitle}
				right={right}
				rightIcon={rightIcon}
				size={size}
				gap={gap}
				padding={padding}
				titleRatio={titleRatio}
				subtitlePosition={subtitlePosition}
				style={headerStyle}
				testID={testID ? `${testID}-header` : undefined}
			/>

			{children ? (
				<View
					style={[
						styles.body({
							gap: bodyGap,
							paddingX,
						}),
						contentStyle,
					]}
					testID={testID ? `${testID}-content` : undefined}
				>
					{children}
				</View>
			) : null}
		</View>
	);
});

SectionBase.displayName = 'Section';

export const Section = Object.assign(SectionBase, {
	Header: SectionHeader,
	Title: SectionTitle,
	Subtitle: SectionSubtitle,
	RightTypo: SectionRightTypo,
	RightIcon: SectionRightIcon,
}) satisfies SectionComponent;

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create((theme) => {
	const sizePreset = getSizePreset(theme);

	return {
		container: {
			width: '100%',
		},
		header: ({
			paddingHorizontal,
			gap,
		}: {
			paddingHorizontal: number;
			gap: number;
		}) => ({
			width: '100%',
			gap,
			paddingHorizontal,
		}),
		titleRow: {
			flexDirection: 'row',
			alignItems: 'flex-end',
			gap: theme.spacing[4],
			width: '100%',
		},
		titleArea: ({ titleRatio }: { titleRatio?: number }) => ({
			flexGrow: 1,
			flexShrink: 1,
			width: titleRatio !== undefined ? `${titleRatio}%` : undefined,
		}),
		rightArea: ({ titleRatio }: { titleRatio?: number }) => ({
			flexGrow: 1,
			flexShrink: 0,
			alignItems: 'flex-end',
			justifyContent: 'center',
			// minWidth: theme.spacing[12],
			width:
				titleRatio !== undefined
					? `${Math.max(0, 100 - titleRatio)}%`
					: undefined,
		}),
		title: {
			color: theme.colors.neutral.text_1,
			variants: {
				size: {
					sm: { ...sizePreset.sm.title },
					md: { ...sizePreset.md.title },
					lg: { ...sizePreset.lg.title },
					xl: { ...sizePreset.xl.title },
				},
			},
		},
		subtitle: {
			paddingLeft: 1,
			color: theme.colors.neutral.text_3,
			variants: {
				size: {
					sm: {
						...sizePreset.sm.subtitle,
						lineHeight: theme.text.lineHeight._2xs,
					},
					md: {
						...sizePreset.md.subtitle,
						lineHeight: theme.text.lineHeight._2xs,
					},
					lg: {
						...sizePreset.lg.subtitle,
						lineHeight: theme.text.lineHeight.xs,
					},
					xl: {
						...sizePreset.xl.subtitle,
						lineHeight: theme.text.lineHeight.sm,
					},
				},
			},
		},
		body: ({ gap, paddingX }: { gap: number; paddingX: number }) => ({
			width: '100%',
			gap,
			paddingHorizontal: paddingX,
			paddingTop: gap,
		}),
		rightAction: {
			borderRadius: theme.rounded.md,
			borderCurve: 'continuous',
			alignItems: 'center',
			justifyContent: 'flex-end',
			flexDirection: 'row',

			variants: {
				size: {
					sm: {},
					md: {},
					lg: {},
					xl: {},
				},
			},
		},
		rightText: {
			color: theme.colors.neutral.text_4,
			variants: {
				size: {
					sm: { ...sizePreset.sm.right },
					md: { ...sizePreset.md.right },
					lg: { ...sizePreset.lg.right },
					xl: { ...sizePreset.xl.right },
				},
			},
		},
		rightIconWrapper: ({ side }: { side: number }) => ({
			width: side,
			height: side,
			alignItems: 'center',
			justifyContent: 'center',
		}),
	};
});
