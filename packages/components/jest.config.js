const baseConfig = require('../../jest.preset');

module.exports = {
	...baseConfig,
	displayName: 'components',
	rootDir: '.',
	testEnvironment: 'node',
	setupFilesAfterEnv: [
		'<rootDir>/jest.setup.js',
		'@testing-library/jest-native/extend-expect',
	],
};
