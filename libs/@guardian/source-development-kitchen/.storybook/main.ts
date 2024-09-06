import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: [
		resolve('..', process.cwd(), 'src/**/*.mdx'),
		resolve('..', process.cwd(), 'src/**/*.stories.@(js|jsx|mjs|ts|tsx)'),
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
};

export default config;
