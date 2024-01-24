import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';
import pluginTS from '@guardian/cobalt-plugin-ts';

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
		pluginTS({
			filename: 'index.js',
		}),
	],
};
