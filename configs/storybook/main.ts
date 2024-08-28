import { readFileSync } from 'node:fs';
import { isObject } from '@guardian/libs';
import type { StorybookConfig } from '@storybook/react-webpack5';

export type { StorybookConfig };

const nodeModulesExclude = {
	and: [/node_modules/],
	not: [/@guardian\//],
};

const config: StorybookConfig = {
	stories: [],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
	],
	webpackFinal: async (config, { configType }) => {
		config.module ??= { rules: [] };
		config.module.rules ??= [];

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
		for (const rule of config.module.rules) {
			if (isObject(rule) && rule.test instanceof RegExp) {
				if (
					rule.test.test('file.js') ||
					rule.test.test('file.cjs') ||
					rule.test.test('file.mjs') ||
					rule.test.test('file.jsx') ||
					rule.test.test('file.ts') ||
					rule.test.test('file.cts') ||
					rule.test.test('file.mts') ||
					rule.test.test('file.tsx')
				) {
					rule.exclude = nodeModulesExclude;
				}
			}
		}

		return config;
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
	previewHead: (head) =>
		head + readFileSync(require.resolve('./preview-head.html'), 'utf8'),
};

export default config;
