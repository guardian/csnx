/**
 * Config file for cobalt.
 * https://cobalt-ui.pages.dev/guides/getting-started
 */

/* eslint-disable import/no-default-export -- cobalt configs do this */

// @ts-check

import pluginCSS, { defaultNameGenerator } from '@cobalt-ui/plugin-css';
import breakpointsScss from './cobalt-plugins/breakpoints/scss.js';
import breakpoints from './cobalt-plugins/breakpoints/typescript.js';
import paletteCss from './cobalt-plugins/palette/css.js';
import palette from './cobalt-plugins/palette/typescript.js';
import size from './cobalt-plugins/size.js';
import space from './cobalt-plugins/space.js';
import typographyClassesCss from './cobalt-plugins/typography/css-classes.js';
import typographyMixinsScss from './cobalt-plugins/typography/scss-mixins.js';
import typography from './cobalt-plugins/typography/typescript.js';

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
		paletteCss({ filename: 'palette.css' }),

		breakpoints({ filename: 'breakpoints.ts' }),
		breakpointsScss({ filename: 'breakpoints.scss' }),

		typography({ filename: 'typography.ts' }),
		typographyClassesCss({ filename: 'typography-classes.css' }),
		typographyMixinsScss({ filename: 'typography-mixins.scss' }),

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
