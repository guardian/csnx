import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';

export default {
	tokens: [
		'./src/breakpoint.tokens.json',
		'./src/colour.tokens.json',
		'./src/palette.tokens.json',
		'./src/size.tokens.json',
		'./src/space.tokens.json',
		'./src/typography.tokens.json',
	],
	outDir: './dist/',
	plugins: [
		pluginCSS({
			p3: false,
			generateName: (variableId) =>
				defaultNameGenerator(`source.${variableId}`),
			transform: (token) => {
				if (token.$type === 'dimension' && token.$value.slice(-2) === 'px') {
					return token.$value.slice(0, -2) / 16 + 'rem';
				}
			},
		}),
	],
};
