// Jest setup for @my-sdk/animations

// Mock React Native Reanimated
jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock');

	// The mock misses some functions, so we add them here
	Reanimated.default.call = () => {};

	return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
