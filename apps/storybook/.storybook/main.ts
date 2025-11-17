import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: [
		'../stories/**/*.mdx',
		'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		// Co-located stories in packages
		'../../../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../../packages/animations/src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../../packages/core/src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-react-native-web',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config) => {
		// Resolve React Native Web
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'react-native$': 'react-native-web',
			'react-native-linear-gradient': 'react-native-web-linear-gradient',
		};

		config.resolve.extensions = [
			'.web.tsx',
			'.web.ts',
			'.web.jsx',
			'.web.js',
			'.tsx',
			'.ts',
			'.jsx',
			'.js',
		];

		// Handle React Native file extensions
		config.module = config.module || {};
		config.module.rules = config.module.rules || [];

		// Add babel-loader for React Native
		config.module.rules.push({
			test: /\.(js|jsx|ts|tsx)$/,
			exclude:
				/node_modules\/(?!(react-native|@react-native|react-native-web|react-native-unistyles|react-native-reanimated))/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react',
						'@babel/preset-typescript',
					],
					plugins: [
						'react-native-web',
						'@babel/plugin-proposal-class-properties',
					],
				},
			},
		});

		return config;
	},
};

export default config;
