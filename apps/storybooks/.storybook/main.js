const rootMain = require('../../../configs/storybook/main');

module.exports = {
	...rootMain,

	core: { ...rootMain.core },

	stories: ['../src/README.mdx'],
	addons: [...rootMain.addons],
	webpackFinal: async (config, { configType }) => {
		// apply any global webpack configs that might have been specified in .storybook/main.js
		if (rootMain.webpackFinal) {
			config = await rootMain.webpackFinal(config, { configType });
		}

		// add your own webpack tweaks if needed

		return config;
	},
	refs: () => {
		return {
			source: {
				title: 'source',
				// port set in libs/@guardian/source/package.json
				url: 'http://localhost:4401',
			},
			'source-development-kitchen': {
				title: 'source-development-kitchen',
				// port set in libs/@guardian/source-development-kitchen/package.json
				url: 'http://localhost:4402',
			},
		};
	},
};
