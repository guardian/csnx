const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const nodeModulesExclude = {
	and: [/node_modules/],
	not: [/@guardian\//],
};

module.exports = {
	stories: [],
	addons: [
		'@storybook/addon-a11y',
		{
			name: '@storybook/addon-docs',
			options: {
				transcludeMarkdown: true,
			},
		},
		'@storybook/addon-essentials',
		'@storybook/addon-links',
	],
	core: {
		builder: 'webpack5',
	},
	features: {
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
							'@babel/plugin-proposal-class-properties',
							'@emotion/babel-plugin',
						],
					},
				},
			],
		});

		// update storybook webpack config to transpile *all* JS
		config.module.rules.find(
			(rule) => String(rule.test) === String(/\.(mjs|tsx?|jsx?)$/),
		).exclude = nodeModulesExclude;

		config.resolve.plugins ||= [];
		config.resolve.plugins.push(
			new TsconfigPathsPlugin({
				configFile: path.resolve(__dirname, '..', 'tsconfig.base.json'),
				extensions: config.resolve.extensions,
				mainFields: config.resolve.mainFields,
			}),
		);
		return config;
	},
};
