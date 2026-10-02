import StyleDictionary from 'style-dictionary';

const baseTokens = [
	'./src/tokens/base/base.json',
	'./src/tokens/radius/corner-radius.json',
	'./src/tokens/spacing/spacing.json',
	'./src/tokens/typography/fixed.json',
];

const themes = [
	'core',
	'core-alt',
	'core-support',
	'culture',
	'lifestyle',
	'news',
	'opinion',
	'sport',
];

const modes = ['light', 'dark'];

const baseConfig = {
	source: baseTokens,
	platforms: {
		web: {
			transformGroup: 'css',
			buildPath: 'dist',
			options: {
				outputReferences: true,
			},
			files: [
				{
					destination: 'base.css',
					format: 'css/variables',
				},
			],
		},
	},
};

const themeConfig = (theme) => ({
	source: [...baseTokens, `./src/tokens/theme/${theme}.json`],
	platforms: {
		web: {
			transformGroup: 'css',
			buildPath: 'dist/theme',
			options: {
				outputReferences: true,
				selector: `[data-pulse-theme='${theme}']`,
			},
			files: [
				{
					destination: `${theme}.css`,
					format: 'css/variables',
					filter: (token) => token.filePath.includes('tokens/theme/'),
				},
			],
		},
	},
});

const modeConfig = (mode) => ({
	source: [
		...baseTokens,
		`./src/tokens/theme/*.json`,
		`./src/tokens/mode/${mode}.json`,
	],
	platforms: {
		web: {
			transformGroup: 'css',
			buildPath: 'dist/mode',
			options: {
				outputReferences: true,
				selector: `[data-pulse-mode='${mode}']`,
			},
			files: [
				{
					destination: `${mode}.css`,
					format: 'css/variables',
					filter: (token) => token.filePath.includes('tokens/mode/'),
				},
			],
		},
	},
});

// Build base tokens
new StyleDictionary(baseConfig, { verbosity: 'verbose' }).buildAllPlatforms();

// Build theme tokens
themes.map((theme) => {
	new StyleDictionary(themeConfig(theme), {
		verbosity: 'verbose',
	}).buildAllPlatforms();
});

// Build mode tokens
modes.map((mode) => {
	new StyleDictionary(modeConfig(mode), {
		verbosity: 'verbose',
	}).buildAllPlatforms();
});
