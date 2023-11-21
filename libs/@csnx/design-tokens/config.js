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
	name: 'name/item/camel',
	type: 'name',
	transformer: (token) => token.path.slice(token.path.length - 1),
});

module.exports = {
	source: ['src/tokens/**/*.json'],
	platforms: {
		typescript: {
			transforms: ['attribute/cti', 'name/item/camel', 'size/px'],
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
			transforms: ['attribute/cti', 'name/cti/kebab', 'size/px'],
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
