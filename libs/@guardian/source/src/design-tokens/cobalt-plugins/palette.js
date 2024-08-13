/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer, serializeJS } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { template } from '../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginPalette(options) {
	return {
		name: 'plugin-palette',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			// this is where we'll store the transformed tokens
			/** @type {Object.<string, string>} */
			const transformedTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};

			const paletteTokens = tokens.filter((token) =>
				token.id.startsWith('palette.'),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of paletteTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
				if (token.$description) {
					jsDoc[token.id] = token.$description;
				}
			}

			let typescriptSource = '';

			for (const tokenGroup of Object.keys(transformedTokens)) {
				const serialisedJS = serializeJS(transformedTokens[tokenGroup], {
					comments: jsDoc,
				}).trim();

				// create a typescript source string containing the transformed tokens
				typescriptSource += `export const ${tokenGroup} = ${serialisedJS.replace(/;$/, '')} as const;`;
			}

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, typescriptSource),
				},
			];
		},
	};
}
