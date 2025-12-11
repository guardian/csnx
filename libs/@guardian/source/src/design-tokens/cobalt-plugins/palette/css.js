/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { camelToKebab } from '../../lib/case.js';
import { template } from '../../lib/template.js';

/**
 * @param {string[]} variableDecls eg. ["--src-brand-100: #001536;", "--src-brand-300: #041F4A;"]
 *
 * NOTE: we don't bother with proper indentation here, prettier will sort that out at build
 */
const cssTemplate = (variableDecls) => `:root { ${variableDecls.join('\n')} }
`;

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginPaletteCss(options) {
	return {
		name: 'plugin-palette-css',

		config(/* config */) {},
		async build({ tokens /*, rawSchema, metadata */ }) {
			const TOKEN_GROUP = 'palette';

			/** @type {Object.<string, string>} */
			const transformedTokens = {};

			const paletteTokens = tokens.filter((token) =>
				token.id.startsWith(TOKEN_GROUP),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of paletteTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
			}

			const cssVariablesDecls = [];

			for (const tokens of Object.values(transformedTokens)) {
				// eg. [ "brand", { "100": "#001536", "300": "#041F4A", ... } ]
				for (const [category, shades] of Object.entries(tokens)) {
					// eg. [ "100", "#001536" ]
					for (const [shade, color] of Object.entries(shades)) {
						const varName = `--src-${camelToKebab(category)}-${shade}`;
						cssVariablesDecls.push(`\t${varName}: ${color};`);
					}
				}
			}

			return [
				{
					filename: options.filename,
					contents: template(
						import.meta.filename,
						cssTemplate(cssVariablesDecls),
					),
				},
			];
		},
	};
}
