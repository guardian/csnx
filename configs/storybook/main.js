const fs = require('node:fs');

const nodeModulesExclude = {
	and: [/node_modules/],
	not: [/@guardian\//],
};

module.exports = {
	stories: [],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
	],
	features: {
		// used in composition
		buildStoriesJson: true,
	},
	webpackFinal: async (config, { configType }) => {
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

		config.module.rules.push({
			test: /\.html$/i,
			loader: 'html-loader',
		});

		// update storybook webpack config to transpile *all* JS
		config.module.rules.find(
			(rule) => String(rule.test) === String(/\.(cjs|mjs|tsx?|jsx?)$/),
		).exclude = nodeModulesExclude;

		config.resolve.plugins ||= [];
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
		head + fs.readFileSync(require.resolve('./preview-head.html'), 'utf8'),
};
