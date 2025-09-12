import { fileHeader, minifyDictionary } from 'style-dictionary/utils';

// eslint-disable-next-line import/no-default-export -- required by Style Dictionary
export default {
	source: ['src/design-tokens/tokens.json'],
	hooks: {
		formats: {
			'typescript/const': async ({ dictionary, file }) => {
				const { tokens } = dictionary;
				const header = await fileHeader({ file });
				const module = JSON.stringify(minifyDictionary(tokens, true), null, 2);
				return `${header}export default ${module} as const;\n`;
			},
		},
	},
	platforms: {
		typescript: {
			buildPath: 'src/design-tokens/build/',
			transforms: ['attribute/cti', 'name/camel', 'color/hex'],
			files: [
				{
					destination: 'tokens.ts',
					format: 'typescript/const',
				},
			],
		},
	},
};
