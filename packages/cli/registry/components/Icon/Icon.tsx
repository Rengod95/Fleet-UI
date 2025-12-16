import type { FleetTheme } from '@fleet-ui/local/core';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import type { IconProps } from './Icon.types';

const SIZE_MAP = {
	_2xs: 12,
	xs: 16,
	sm: 20,
	md: 24,
	lg: 28,
	xl: 32,
	_2xl: 40,
	_3xl: 48,
	_4xl: 64,
} as const;

const getColorFromScheme = (
	theme: FleetTheme,
	colorScheme: NonNullable<IconProps['colorScheme']>
) => {
	const colorMap = {
		primary: theme.colors.primary.text_1,
		neutral: theme.colors.neutral.text_3,
		error: theme.colors.error.text_1,
		warning: theme.colors.warning.text_1,
		success: theme.colors.success.text_1,
		info: theme.colors.info.text_1,
		secondary: theme.colors.neutral.text_2,
	};
	return colorMap[colorScheme];
};

export const Icon = forwardRef<View, IconProps>((props, ref) => {
	const {
		icon: IconComponent,
		colorScheme = 'neutral',
		size = 'md',
		color: customColor,
		strokeWidth = 2,
		accessibilityLabel,
		style,
		...restProps
	} = props;

	const { theme } = useUnistyles();

	// 커스텀 색상 또는 colorScheme 기반 색상
	const iconColor = customColor || getColorFromScheme(theme, colorScheme);
	const iconSize = SIZE_MAP[size];

	return (
		<View
			ref={ref}
			accessibilityRole="image"
			accessibilityLabel={accessibilityLabel}
			style={[{ width: iconSize, height: iconSize, }, style]}
			{...restProps}
		>
			<IconComponent
				color={iconColor}
				size={iconSize}
				strokeWidth={strokeWidth}
			/>
		</View>
	);
});

Icon.displayName = 'Icon';
