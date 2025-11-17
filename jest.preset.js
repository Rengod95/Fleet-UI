/**
 * Shared Jest Preset
 *
 * Common configuration that can be extended by individual packages
 */

module.exports = {
	preset: 'react-native',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	transformIgnorePatterns: [
		'node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-unistyles)/)',
	],
	moduleNameMapper: {
		'^@fleet-ui/(.*)$': '<rootDir>/../$1/src',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'babel-jest',
			{ configFile: './babel.config.js' },
		],
	},
	testMatch: [
		'**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)',
		'**/*.(test|spec).(ts|tsx|js|jsx)',
	],
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.stories.tsx',
		'!src/**/*.test.tsx',
		'!src/**/index.ts',
	],
	coverageDirectory: '<rootDir>/coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	verbose: true,
};
