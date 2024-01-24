// @ts-check

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

/** @type {import('@cobalt-ui/core').Config} */
export default {
	tokens: 'src/tokens.json',
	outDir: '.',
	plugins: [
		pluginCSS({
			p3: false,
			generateName: prefixCustomProperty,
			transform: pxToRem,
			filename: './variables.css',
		}),
		pluginTS({
			filename: './tokens.js',
		}),
	],
};
