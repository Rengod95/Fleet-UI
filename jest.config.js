/**
 * Root Jest Configuration
 *
 * This is a base configuration for the monorepo.
 * Individual packages can extend this configuration.
 */

module.exports = {
	projects: ['<rootDir>/packages/*/jest.config.js'],
	collectCoverageFrom: [
		'packages/*/src/**/*.{ts,tsx}',
		'!packages/*/src/**/*.stories.tsx',
		'!packages/*/src/**/*.test.tsx',
		'!packages/*/src/**/index.ts',
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
};
