const rootMain = require('../../../../configs/storybook/main');

// To customise your Storybook config for this project, update this file

module.exports = {
	...rootMain,

	core: { ...rootMain.core },

	stories: [
		...rootMain.stories,
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [...rootMain.addons],
	webpackFinal: async (config, { configType }) => {
		// apply any global webpack configs that might have been specified in .storybook/main.js
		if (rootMain.webpackFinal) {
			config = await rootMain.webpackFinal(config, { configType });
		}

		// add your own webpack tweaks if needed

		return config;
	},
};
