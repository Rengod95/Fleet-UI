/**
 * Unistyles Configuration for Fleet UI
 *
 * This file configures react-native-unistyles with Fleet UI's design tokens.
 * Import this file once in your app's entry point to enable theming.
 *
 * @example
 * ```tsx
 * // In your App.tsx or _layout.tsx
 * import '@fleet-ui/local/core/unistyles';
 * ```
 */

import type { UnistylesThemes } from 'react-native-unistyles';
import { StyleSheet } from 'react-native-unistyles';
import { darkTheme } from './theme/darkTheme';
import { lightTheme } from './theme/lightTheme';
import { primitiveBreakpoints } from './tokens';
import type { FleetThemes } from './types';

export const themes: UnistylesThemes & FleetThemes = {
	light: lightTheme,
	dark: darkTheme,
};

/**
 * Configure Unistyles
 * If you want to reject device's color scheme, you can set `adaptiveThemes` to false.
 * And you can set `initialTheme` to 'light' or 'dark'.
 */
StyleSheet.configure({
	themes,
	breakpoints: primitiveBreakpoints,
	settings: {
		initialTheme: 'light',
	},
});

export { primitiveBreakpoints, lightTheme, darkTheme };
