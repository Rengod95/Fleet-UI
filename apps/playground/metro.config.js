const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, 'node_modules'),
	path.resolve(monorepoRoot, 'node_modules'),
];

// Support workspace protocol
config.resolver.disableHierarchicalLookup = false;

// Resolve platform-specific extensions
config.resolver.sourceExts = [
	...config.resolver.sourceExts,
	'tsx',
	'ts',
	'jsx',
	'js',
];

config.resolver.platforms = ['ios', 'android', 'web', 'native'];

module.exports = config;
