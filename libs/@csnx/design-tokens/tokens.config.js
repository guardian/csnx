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
	tokens: './tokens.json',
	outDir: './tokens',
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
