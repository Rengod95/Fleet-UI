import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useMenuContext } from './Menu.context';
import type { MenuDropdownIconProps } from './Menu.types';

// ============================================================================
// Size Mapping
// ============================================================================

const MENU_SIZE_TO_ICON_SIZE = {
	sm: 16,
	md: 20,
	lg: 24,
} as const;

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

// ============================================================================
// MenuDropdownIcon Component
// ============================================================================

export const MenuDropdownIcon = ({
	icon: IconComponent,
	size: customSize,
	color: customColor,
	strokeWidth = 2,
}: MenuDropdownIconProps) => {
	const context = useMenuContext();
	const { theme } = useUnistyles();

	const menuSize = context?.size || 'md';
	const iconSize = customSize || MENU_SIZE_TO_ICON_SIZE[menuSize];
	const iconColor = customColor || theme.colors.neutral.text_2;

	return (
		<View style={[styles.container, { width: iconSize, height: iconSize }]}>
			<IconComponent
				size={iconSize}
				color={iconColor}
				strokeWidth={strokeWidth}
			/>
		</View>
	);
};

MenuDropdownIcon.displayName = 'Menu.DropdownIcon';
