import StyleDictionary from 'style-dictionary';

const BASE_TOKENS = [
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
	source: BASE_TOKENS,
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
	source: [...BASE_TOKENS, `./src/tokens/theme/${theme}.json`],
	platforms: {
		web: {
			transformGroup: 'css',
			buildPath: 'dist/theme',
			options: {
				outputReferences: true,
				selector: `[data-pulse-theme='${theme}']`,
			},
			log: {
				warnings: 'disabled',
				verbosity: 'silent',
				errors: {
					brokenReferences: 'throw',
				},
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
		...BASE_TOKENS,
		`./src/tokens/theme/core.json`,
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
			log: {
				warnings: 'disabled',
				verbosity: 'silent',
				errors: {
					brokenReferences: 'throw',
				},
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
const sd = new StyleDictionary(baseConfig);
sd.buildAllPlatforms();

// Build theme tokens
themes.map((theme) => {
	const sd = new StyleDictionary(themeConfig(theme));
	sd.buildAllPlatforms();
});

// Build mode tokens
modes.map((mode) => {
	const sd = new StyleDictionary(modeConfig(mode));
	sd.buildAllPlatforms();
});
