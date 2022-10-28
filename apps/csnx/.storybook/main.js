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
				url: 'http://com-gu-storybook-source-foundations.s3-website-eu-west-1.amazonaws.com',
			},
			'source-react-components': {
				title: 'source-react-components',
				url: 'http://com-gu-storybook-source-react-components.s3-website-eu-west-1.amazonaws.com',
			},
			'source-react-components-development-kitchen': {
				title: 'source-react-components-development-kitchen',
				url: 'http://com-gu-storybook-source-react-components-development-kitchen.s3-website-eu-west-1.amazonaws.com',
			},
		};
	},
};
