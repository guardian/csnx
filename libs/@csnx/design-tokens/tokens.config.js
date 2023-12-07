import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';
import pluginJS from '@cobalt-ui/plugin-js';

const prefixCustomProperty = (variableId) => {
	return defaultNameGenerator(`source.${variableId}`);
};

const pxToRem = (token) => {
	if (token.$type === 'dimension' && token.$value.slice(-2) === 'px') {
		return token.$value.slice(0, -2) / 16 + 'rem';
	}
};

export default {
	tokens: [
		'./src/tokens/breakpoint.tokens.json',
		'./src/tokens/colour.tokens.json',
		'./src/tokens/palette.tokens.json',
		'./src/tokens/size.tokens.json',
		'./src/tokens/space.tokens.json',
		'./src/tokens/typography.tokens.json',
	],
	outDir: 'dist',
	plugins: [
		pluginCSS({
			p3: false,
			generateName: prefixCustomProperty,
			transform: pxToRem,
		}),
		pluginJS({
			js: true,
			meta: false,
			deep: true,
		}),
	],
};
