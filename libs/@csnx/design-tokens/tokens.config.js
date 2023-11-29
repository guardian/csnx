import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';

const prefixName = (variableId) => {
	return defaultNameGenerator(`source.${variableId}`);
};

const pxToRem = (token) => {
	if (token.$type === 'dimension' && token.$value.slice(-2) === 'px') {
		return token.$value.slice(0, -2) / 16 + 'rem';
	}
};

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
			generateName: prefixName,
			transform: pxToRem,
		}),
	],
};
