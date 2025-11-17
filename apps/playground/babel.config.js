module.exports = (api) => {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'react-native-unistyles/plugin',
				{
					root: 'app',
				},
			],
			'@babel/plugin-proposal-export-namespace-from',
			'babel-plugin-react-compiler',
			'react-native-worklets/plugin',
			// 'react-native-reanimated/plugin',
		],
	};
};
