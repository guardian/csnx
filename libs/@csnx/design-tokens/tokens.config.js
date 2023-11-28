import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';

export default {
	tokens: [
		'./src/colour.tokens.json',
		'./src/palette.tokens.json',
		'./src/space.tokens.json',
	],
	outDir: './dist/',
	plugins: [
		pluginCSS({
			generateName: (variableId) =>
				defaultNameGenerator(`source.${variableId}`),
		}),
	],
};
