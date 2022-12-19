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
				'atoms-rendering': {
					title: 'atoms-rendering',
					url: 'http://localhost:4404',
				},
			};
		}
		return {
			'source-foundations': {
				title: 'source-foundations',
				url: 'https://main.diy95zty49kdd.amplifyapp.com',
			},
			'source-react-components': {
				title: 'source-react-components',
				url: 'https://main.d2zt1j33ncruvj.amplifyapp.com',
			},
			'source-react-components-development-kitchen': {
				title: 'source-react-components-development-kitchen',
				url: 'https://main.d25xfnd702qjsd.amplifyapp.com',
			},
			'atoms-rendering': {
				title: 'source-react-components-development-kitchen',
				url: 'https://main.d1lzcy2qxdbvgt.amplifyapp.com/',
			},
		};
	},
};
