const baseConfig = require('../../jest.preset');

module.exports = {
	...baseConfig,
	displayName: 'animations',
	rootDir: '.',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
