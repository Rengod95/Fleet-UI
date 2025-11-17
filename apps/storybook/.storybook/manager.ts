import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
	theme: themes.normal,
	panelPosition: 'bottom',
	sidebar: {
		showRoots: true,
	},
});
