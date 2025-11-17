import type { Preview } from '@storybook/react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Import Unistyles configuration
// You'll need to set this up based on your tokens
// import { UnistylesRegistry } from 'react-native-unistyles';
// import { lightSchemeColorPalette, darkSchemeColorPalette } from '@my-sdk/tokens';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: 'centered',
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: '#ffffff',
				},
				{
					name: 'dark',
					value: '#000000',
				},
			],
		},
		viewport: {
			viewports: {
				iphone12: {
					name: 'iPhone 12',
					styles: {
						width: '390px',
						height: '844px',
					},
					type: 'mobile',
				},
				iphone12Pro: {
					name: 'iPhone 12 Pro',
					styles: {
						width: '390px',
						height: '844px',
					},
					type: 'mobile',
				},
				iphone14ProMax: {
					name: 'iPhone 14 Pro Max',
					styles: {
						width: '430px',
						height: '932px',
					},
					type: 'mobile',
				},
				galaxyS21: {
					name: 'Galaxy S21',
					styles: {
						width: '360px',
						height: '800px',
					},
					type: 'mobile',
				},
				pixel5: {
					name: 'Pixel 5',
					styles: {
						width: '393px',
						height: '851px',
					},
					type: 'mobile',
				},
				ipadMini: {
					name: 'iPad Mini',
					styles: {
						width: '768px',
						height: '1024px',
					},
					type: 'tablet',
				},
				ipadPro: {
					name: 'iPad Pro',
					styles: {
						width: '1024px',
						height: '1366px',
					},
					type: 'tablet',
				},
				desktop: {
					name: 'Desktop',
					styles: {
						width: '1440px',
						height: '900px',
					},
					type: 'desktop',
				},
			},
		},
	},
	decorators: [
		(Story) => (
			<View style={styles.container}>
				<Story />
			</View>
		),
	],
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
});

export default preview;
