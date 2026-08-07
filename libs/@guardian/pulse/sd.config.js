// eslint-disable-next-line import/no-default-export -- required by Style Dictionary
export default {
	source: ['tokens/primitive/**/*.json'],
	// hooks: {
	// 	formats: {
	// 		'pulse/palette': ({ dictionary }) =>
	// 			dictionary.allTokens
	// 				.map((token) => `export const ${token.name} = '${token.$value}';`)
	// 				.join('\n'),
	// 	},
	// },
	platforms: {
		typescript: {
			buildPath: 'dist/sd/',
			transforms: ['attribute/cti', 'name/camel', 'color/hex'],
			files: [
				{
					destination: 'tokens.css',
					filter: (token) => token.path[0] === 'typography',
					format: 'css/variables',
					options: {
						minify: true,
					},
				},
				{
					destination: 'tokens.js',
					filter: (token) => token.path[0] === 'typography',
					format: 'javascript/esm',
					options: {
						minify: true,
					},
				},
			],
		},
	},
};
