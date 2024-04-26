const rootMain = require('../../../.storybook/main');

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
			'source-foundations': {
				title: 'source-foundations',
				// port set in libs/@guardian/source-foundations/package.json
				url: 'http://localhost:4401',
			},
			'source-react-components': {
				title: 'source-react-components',
				// port set in libs/@guardian/source-react-components/package.json
				url: 'http://localhost:4402',
			},
			'source-react-components-development-kitchen': {
				title: 'source-react-components-development-kitchen',
				// port set in libs/@guardian/source-react-components-development-kitchen/package.json
				url: 'http://localhost:4403',
			},
		};
	},
};
