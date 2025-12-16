/**
 * Menu Component
 *
 * A dropdown menu component that allows users to organize and display multiple options,
 * and select or check/change the desired item or status.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Menu.Trigger
 *   dropdown={
 *     <Menu.Dropdown header={<Menu.Header>Edit</Menu.Header>}>
 *       <Menu.DropdownItem onPress={() => {}}>First menu</Menu.DropdownItem>
 *       <Menu.DropdownItem onPress={() => {}}>Second menu</Menu.DropdownItem>
 *     </Menu.Dropdown>
 *   }
 * >
 *   <Button>Open menu</Button>
 * </Menu.Trigger>
 *
 * // Check item usage
 * <Menu.Dropdown>
 *   <Menu.DropdownCheckItem
 *     checked={checked}
 *     onCheckedChange={setChecked}
 *     colorScheme="primary"
 *   >
 *     Option 1
 *   </Menu.DropdownCheckItem>
 * </Menu.Dropdown>
 *
 * // Icon included
 * <Menu.DropdownItem
 *   right={<Menu.DropdownIcon icon={SettingsIcon} />}
 * >
 *   Settings
 * </Menu.DropdownItem>
 * ```
 */

import type { MenuComponent } from './Menu.types';
import { MenuDropdown } from './MenuDropdown';
import { MenuDropdownCheckItem } from './MenuDropdownCheckItem';
import { MenuDropdownIcon } from './MenuDropdownIcon';
import { MenuDropdownItem } from './MenuDropdownItem';
import { MenuHeader } from './MenuHeader';
import { MenuTrigger } from './MenuTrigger';

export const Menu ={
	Trigger: MenuTrigger,
	Dropdown: MenuDropdown,
	Header: MenuHeader,
	DropdownItem: MenuDropdownItem,
	DropdownCheckItem: MenuDropdownCheckItem,
	DropdownIcon: MenuDropdownIcon,
} satisfies MenuComponent;
