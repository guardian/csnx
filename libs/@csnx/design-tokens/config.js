const StyleDictionary = require('style-dictionary');
const _ = require('lodash');

StyleDictionary.registerFormat({
	name: 'es6Object',
	formatter: function ({ dictionary }) {
		const tokens = dictionary.allTokens
			.map((token) => {
				let value = JSON.stringify(token.value);
				// the `dictionary` object now has `usesReference()` and
				// `getReferences()` methods. `usesReference()` will return true if
				// the value has a reference in it. `getReferences()` will return
				// an array of references to the whole tokens so that you can access their
				// names or any other attributes.
				if (dictionary.usesReference(token.original.value)) {
					// Note: make sure to use `token.original.value` because
					// `token.value` is already resolved at this point.
					const refs = dictionary.getReferences(token.original.value);
					refs.forEach((ref) => {
						value = value.replace(ref.value, function () {
							return `${ref.name}`;
						});
					});
				}
				return `${token.name}: ${value},`;
			})
			.join('\n');

		return `export const space = { ${tokens} } as const;`;
	},
});

StyleDictionary.registerTransform({
	name: 'name/item/camel',
	type: 'name',
	// transformer: (token, options) => _.camelCase( [options.prefix].concat(token.path.slice(token.path.length - 1).join(' ')) ),
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
					format: 'es6Object',
					destination: 'space.ts',
				},
			],
		},
	},
};
