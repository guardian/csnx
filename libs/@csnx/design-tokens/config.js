const StyleDictionary = require('style-dictionary');
const _ = require('lodash');

StyleDictionary.registerFormat({
	name: 'typescript/object',
	formatter: function ({ dictionary, file }) {
		const tokens = dictionary.allTokens
			.map((token) => `${token.name}: "${token.value}",`)
			.join('\n');

		return `export const ${file.name} = { ${tokens} } as const;`;
	},
});

StyleDictionary.registerTransform({
	name: 'name/i/camel',
	type: 'name',
	transformer: (token, options) => {
		const path = token.path.slice(2);
		return _.kebabCase([options.prefix].concat(path).join(' '));
	},
});

StyleDictionary.registerTransform({
	name: 'name/ti/kebab',
	type: 'name',
	transformer: (token, options) => {
		const path = token.path.slice(1);
		return _.kebabCase([options.prefix].concat(path).join(' '));
	},
});

StyleDictionary.registerTransform({
	name: 'font/pxToRem',
	type: 'value',
	transformer: (token, options) => {
		if (token.attributes.type === 'fontSize') {
			return `${token.original.value / 16}rem`;
		}

		return token.original.value;
	},
});

module.exports = {
	source: ['src/tokens/**/*.json'],
	platforms: {
		typescript: {
			transforms: ['attribute/cti', 'name/i/camel', 'size/pxToRem'],
			buildPath: 'dist/',
			files: [
				{
					filter: (token) =>
						token.attributes.category === 'size' &&
						token.attributes.type === 'space',
					format: 'typescript/object',
					name: 'space',
					destination: 'space.ts',
				},
			],
		},
		css: {
			transforms: ['attribute/cti', 'name/ti/kebab', 'size/px', 'font/pxToRem'],
			buildPath: 'dist/',
			prefix: 'source',
			files: [
				{
					format: 'css/variables',
					options: { outputReferences: true },
					destination: 'source.css',
				},
			],
		},
	},
};
