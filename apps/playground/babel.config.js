module.exports = (api) => {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'@fleet-ui/local': './fleet-ui',
					},
				},
			],
			[
				'react-native-unistyles/plugin',
				{
					root: 'app',
					autoProcessImports: ['@fleet-ui/local'],
				},
			],
			'@babel/plugin-proposal-export-namespace-from',
			'babel-plugin-react-compiler',
			'react-native-worklets/plugin',
			// 'react-native-reanimated/plugin',
		],
	};
};
