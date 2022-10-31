const rootMain = require('../../../.storybook/main');

module.exports = {
	...rootMain,

	core: { ...rootMain.core },

	stories: ['../src/README.stories.mdx'],
	addons: [...rootMain.addons],
	webpackFinal: async (config, { configType }) => {
		// apply any global webpack configs that might have been specified in .storybook/main.js
		if (rootMain.webpackFinal) {
			config = await rootMain.webpackFinal(config, { configType });
		}

		// add your own webpack tweaks if needed

		return config;
	},
	refs: (config, { configType }) => {
		if (configType === 'DEVELOPMENT') {
			return {
				'source-foundations': {
					title: 'source-foundations',
					url: 'http://localhost:4401',
				},
				'source-react-components': {
					title: 'source-react-components',
					url: 'http://localhost:4402',
				},
				'source-react-components-development-kitchen': {
					title: 'source-react-components-development-kitchen',
					url: 'http://localhost:4403',
				},
			};
		}
		return {
			'source-foundations': {
				title: 'source-foundations',
				url: 'https://dkueb6x1zvheb.cloudfront.net',
			},
			'source-react-components': {
				title: 'source-react-components',
				url: 'https://d2fsrka4th9xxh.cloudfront.net',
			},
			'source-react-components-development-kitchen': {
				title: 'source-react-components-development-kitchen',
				url: 'https://d3ag6334pu7s8o.cloudfront.net',
			},
		};
	},
};
