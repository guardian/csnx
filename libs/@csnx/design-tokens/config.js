const StyleDictionary = require('style-dictionary');
const _ = require('lodash');

StyleDictionary.registerFormat({
	name: 'typescript/object',
	formatter: function ({ dictionary }) {
		const tokens = dictionary.allTokens
			.map((token) => {
				const value = JSON.stringify(token.value);
				if (dictionary.usesReference(token.original.value)) {
					const refs = dictionary.getReferences(token.original.value);
					refs.forEach((ref) => {
						value = value.replace(ref.value, () => `${ref.name}`);
					});
				}
				return `${token.name}: ${value},`;
			})
			.join('\n');
		// TODO: get object variable name from token
		return `export const space = { ${tokens} } as const;`;
	},
});

StyleDictionary.registerTransform({
	name: 'name/i/camel',
	type: 'name',
	transformer: (token, options) => {
		const path = token.path.slice(token.path.length - 1);
		return _.kebabCase([options.prefix].concat(path).join(' '));
	},
});

StyleDictionary.registerTransform({
	name: 'name/ti/kebab',
	type: 'name',
	transformer: (token, options) => {
		const path = token.path.slice(token.path.length - 2);
		return _.kebabCase([options.prefix].concat(path).join(' '));
	},
});

module.exports = {
	source: ['src/tokens/**/*.json'],
	platforms: {
		typescript: {
			transforms: ['attribute/cti', 'name/i/camel', 'size/px'],
			buildPath: 'dist/',
			files: [
				{
					filter: (token) => token.attributes.category === 'size',
					format: 'typescript/object',
					destination: 'space.ts',
				},
			],
		},
		css: {
			transforms: ['attribute/cti', 'name/ti/kebab', 'size/px'],
			buildPath: 'dist/',
			prefix: 'source',
			files: [
				{
					format: 'css/variables',
					destination: 'source.css',
				},
			],
		},
	},
};
