/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer, serializeJS } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { capitalise } from '../lib/capitalise.js';
import { numberToRem, pxStringToNumber } from '../lib/convert-value.js';
import { template } from '../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginSpace(options) {
	return {
		name: 'plugin-size',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			/** @type {Object.<string, string>} */
			let numberTokens = {};
			/** @type {Object.<string, string>} */
			let remTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};
			const sizeTokens = tokens.filter(
				(token) =>
					token.id.startsWith('size.') ||
					token.id.startsWith('height.') ||
					token.id.startsWith('width.') ||
					token.id.startsWith('iconSize.'),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of sizeTokens) {
				const value = Number(
					pxStringToNumber(defaultTransformer(token).toString()),
				);
				set(numberTokens, token.id, value);
				set(remTokens, token.id, numberToRem(value));
				if (token.$description) {
					jsDoc[token.id] = token.$description;
				}
			}

			let typescriptSource = '';

			for (const tokenGroup of Object.keys(numberTokens)) {
				const serialisedJS = serializeJS(numberTokens[tokenGroup], {
					comments: jsDoc,
				}).trim();

				// create a typescript source string containing the transformed tokens
				typescriptSource += `export const ${tokenGroup} = ${serialisedJS.replace(/;$/, '')} as const;`;
			}

			for (const tokenGroup of Object.keys(remTokens)) {
				const serialisedJS = serializeJS(remTokens[tokenGroup], {
					comments: jsDoc,
				}).trim();

				// create a typescript source string containing the transformed tokens
				typescriptSource += `export const rem${capitalise(tokenGroup)} = ${serialisedJS.replace(/;$/, '')} as const;`;
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
