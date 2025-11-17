/**
 * Unistyles Configuration for Fleet UI
 *
 * This file configures react-native-unistyles with Fleet UI's design tokens.
 * Import this file once in your app's entry point to enable theming.
 *
 * @example
 * ```tsx
 * // In your App.tsx or _layout.tsx
 * import '@fleet-ui/core/unistyles';
 * ```
 */

import type { UnistylesThemes } from 'react-native-unistyles';
import { StyleSheet } from 'react-native-unistyles';

import { breakpoints } from './theme';
import { darkTheme } from './theme/darkTheme';
import { lightTheme } from './theme/lightTheme';
import type { FleetThemes } from './types';

export const themes: UnistylesThemes & FleetThemes = {
	light: lightTheme,
	dark: darkTheme,
};

StyleSheet.configure({
	settings: {
		initialTheme: 'dark',
	},
	themes,
	breakpoints,
});

export { breakpoints, lightTheme, darkTheme };
