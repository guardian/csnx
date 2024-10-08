/**
 * Config file for cobalt.
 * https://cobalt-ui.pages.dev/guides/getting-started
 */

/* eslint-disable import/no-default-export -- cobalt configs do this */

// @ts-check

import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';
import breakpoints from './cobalt-plugins/breakpoints.js';
import palette from './cobalt-plugins/palette.js';
import size from './cobalt-plugins/size.js';
import space from './cobalt-plugins/space.js';
import typography from './cobalt-plugins/typography.js';

/**
 * @param {string} variableId
 */
const prefixCustomProperty = (variableId) => {
	return defaultNameGenerator(`source.${variableId}`);
};

/**
 * @param {import('@cobalt-ui/core').Token} token
 */
const pxToRem = (token) => {
	if (token.$type === 'dimension' && token.$value.endsWith('px')) {
		return Number(token.$value.slice(0, -2)) / 16 + 'rem';
	}
	return undefined;
};

/** @type {import('@cobalt-ui/core').Config} */
export default {
	tokens: 'tokens.json',
	outDir: '../foundations/__generated__',
	plugins: [
		palette({ filename: 'palette.ts' }),
		breakpoints({ filename: 'breakpoints.ts' }),
		typography({ filename: 'typography.ts' }),
		space({ filename: 'space.ts' }),
		size({ filename: 'size.ts' }),
		pluginCSS({
			p3: false,
			generateName: prefixCustomProperty,
			transform: pxToRem,
			filename: 'variables.css',
		}),
	],
};
