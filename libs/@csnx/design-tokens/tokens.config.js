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

const pxToNumeric = (token) => {
	const tokenGroup = token.id.split('.')[0];

	if (
		token.$type === 'dimension' &&
		token.$value.slice(-2) === 'px' &&
		tokenGroup === 'space'
	) {
		return Number(token.$value.slice(0, -2));
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
	outDir: './tokens/',
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
			transform: pxToNumeric,
		}),
	],
};
