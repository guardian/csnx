// eslint-disable-next-line import/no-default-export -- required by Style Dictionary
export default {
	source: ['src/design-tokens/tokens.json'],
	// hooks: {
	// 	formats: {
	// 		'source/palette': ({ dictionary }) =>
	// 			dictionary.allTokens
	// 				.map((token) => `export const ${token.name} = '${token.$value}';`)
	// 				.join('\n'),
	// 	},
	// },
	platforms: {
		typescript: {
			buildPath: 'src/design-tokens/build/',
			transforms: ['attribute/cti', 'name/camel', 'color/hex'],
			files: [
				{
					destination: 'tokens.ts',
					// filter: (token) => token.path[0] === 'palette',
					format: 'javascript/esm',
					options: {
						minify: true,
					},
				},
			],
		},
	},
};
