import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { MenuDropdownProps } from './Menu.types';

// ============================================================================
// Styles
// ============================================================================

export const menuDropdownStyles = StyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.neutral.content_1,
		overflow: 'hidden',

		variants: {
			size: {
				sm: {
					minWidth: 140,
					paddingVertical: theme.spacing[1],
				},
				md: {
					minWidth: 180,
					paddingVertical: theme.spacing[3],
				},
				lg: {
					minWidth: 220,
					paddingVertical: theme.spacing[2],
				},
			},
			rounded: {
				none: {
					borderRadius: theme.rounded.none,
				},
				sm: {
					borderRadius: theme.rounded.sm,
				},
				md: {
					borderRadius: theme.rounded.md,
				},
				lg: {
					borderRadius: theme.rounded.lg,
				},
			},
			shadow: {
				none: {
					boxShadow: undefined,
				},
				sm: {
					boxShadow: theme.shadows.md,
				},
				md: {
					boxShadow: theme.shadows.lg,
				},
				lg: {
					boxShadow: theme.shadows.xl,
				},
			},
		},
	},
}));

// ============================================================================
// MenuDropdown Component
// ============================================================================

export const MenuDropdown = ({
	header,
	size = 'md',
	rounded = 'md',
	shadow = 'md',
	children,
	style,
	...viewProps
}: MenuDropdownProps) => {
	menuDropdownStyles.useVariants({
		size,
		rounded,
		shadow,
	});

	return (
		<View
			{...viewProps}
			accessibilityRole="menu"
			style={[menuDropdownStyles.container, style]}
		>
			{header}
			{children}
		</View>
	);
};

MenuDropdown.displayName = 'Menu.Dropdown';
