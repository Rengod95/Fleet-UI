// Jest setup for @my-sdk/components
import '@testing-library/jest-native/extend-expect';

// Mock React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Unistyles
jest.mock('react-native-unistyles', () => ({
	createStyleSheet: (styles) => styles,
	useStyles: (stylesheet) => ({
		styles: typeof stylesheet === 'function' ? stylesheet({}) : stylesheet,
		theme: {},
	}),
	UnistylesRegistry: {
		addThemes: jest.fn().mockReturnThis(),
		addBreakpoints: jest.fn().mockReturnThis(),
	},
}));
