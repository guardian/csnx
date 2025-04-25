import { format } from 'prettier';
import StyleDictionary from 'style-dictionary';
import { minifyDictionary } from 'style-dictionary/utils';

const prettify = async (code) => await format(code, { parser: 'typescript' });

const paletteFormat = async ({ dictionary }) => {
	const output = JSON.stringify(minifyDictionary(dictionary.tokens, true));
	return prettify(`export const palette = ${output} as const;`);
};

const styleDictionary = new StyleDictionary({
	source: ['src/design-tokens/tokens.json'],
	hooks: {
		formats: {
			'source/palette': paletteFormat,
		},
	},
	platforms: {
		typescript: {
			buildPath: 'src/design-tokens/build/',
			transforms: ['attribute/cti', 'name/camel', 'color/hex'],
			files: [
				{
					filter: (token) => token.path[0] === 'palette',
					destination: 'palette.ts',
					format: 'source/palette',
				},
			],
		},
	},
});

await styleDictionary.buildAllPlatforms();
