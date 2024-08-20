import type { StorybookConfig } from '@storybook/react-webpack5';
import { readFileSync } from 'node:fs';

const nodeModulesExclude = {
	and: [/node_modules/],
	not: [/@guardian\//],
};

export type { StorybookConfig };

const config: StorybookConfig = {
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	stories: [],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
	],
	async webpackFinal(config, { configType }) {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			exclude: nodeModulesExclude,
			use: [
				{
					loader: require.resolve('babel-loader'),
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript',
							[
								'@babel/preset-react',
								{
									runtime: 'automatic',
									importSource: '@emotion/react',
								},
							],
						],
						plugins: [
							'@babel/plugin-transform-typescript',
							'@emotion/babel-plugin',
						],
					},
				},
			],
		});

		// update storybook webpack config to transpile *all* JS
		config.module.rules.find(
			(rule) => String(rule.test) === String(/\.(cjs|mjs|tsx?|jsx?)$/),
		).exclude = nodeModulesExclude;

		config.resolve.plugins ||= [];
		return config;
	},
	features: {},
	docs: {
		autodocs: true,
	},
	previewHead(head = '') {
		return head + readFileSync(require.resolve('./preview-head.html'), 'utf8');
	},
};

export default config;
