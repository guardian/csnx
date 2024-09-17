import type { StorybookConfig } from '@storybook/react-vite';
import { env } from 'node:process';
import { isOneOf, isUndefined } from '@guardian/libs';

const configName = env.CONFIG;

if (isUndefined(configName)) {
	throw new Error('process.env.CONFIG is not defined');
}

const projectConfigs = {
	composed: {
		stories: ['../src/README.mdx'],
		refs: () => ({
			source: {
				title: 'source',
				url: 'http://localhost:4401',
			},
			'source-development-kitchen': {
				title: 'source-development-kitchen',
				url: 'http://localhost:4402',
			},
		}),
	},
	source: {
		stories: [
			'../../../libs/@guardian/source/src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
		],
	},
	'source-development-kitchen': {
		stories: [
			'../../../libs/@guardian/source-development-kitchen/src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
		],
	},
};

const isValidConfigName = isOneOf(Object.keys(projectConfigs));

if (!isValidConfigName(configName)) {
	throw new Error(`No config exists for '${configName}'.`);
}

const config: StorybookConfig = {
	...projectConfigs[configName as keyof typeof projectConfigs],
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
};

// eslint-disable-next-line import/no-default-export -- it's the storybook way
export default config;
