import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/README.mdx'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
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

// eslint-disable-next-line import/no-default-export -- it's the storybook way
export default config;
