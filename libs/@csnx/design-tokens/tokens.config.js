import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';

export default {
	tokens: [
		'./src/breakpoint.tokens.json',
		'./src/colour.tokens.json',
		'./src/palette.tokens.json',
		'./src/size.tokens.json',
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
