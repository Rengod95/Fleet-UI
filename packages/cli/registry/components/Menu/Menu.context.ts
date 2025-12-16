import { createContext, useContext } from 'react';
import type { MenuContextValue } from './Menu.types';

/**
 * Menu Context
 * Context for sharing the state of the dropdown items with the parent
 */
export const MenuContext = createContext<MenuContextValue | null>(null);

/**
 * Menu Context hook
 * @returns MenuContextValue | null
 */
export const useMenuContext = (): MenuContextValue | null => {
	return useContext(MenuContext);
};

/**
 * Menu Context Provider
 */
export const MenuProvider = MenuContext.Provider;
