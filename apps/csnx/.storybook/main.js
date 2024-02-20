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
				url: 'https://main--635a6aa8070dfdbfdac36f65.chromatic.com',
			},
			'source-react-components': {
				title: 'source-react-components',
				url: 'https://main--635a6fffacd30d393597c1ff.chromatic.com',
			},
			'source-react-components-development-kitchen': {
				title: 'source-react-components-development-kitchen',
				url: 'https://main--635a7057acd30d393597c208.chromatic.com',
			},
		};
	},
};
