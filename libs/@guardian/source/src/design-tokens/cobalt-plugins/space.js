/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer, serializeJS } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { template } from '../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginSpace(options) {
	return {
		name: 'plugin-space',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			/** @type {Object.<string, string>} */
			let numberTokens = {};
			/** @type {Object.<string, string>} */
			let remTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of tokens) {
				if (token._group.id === 'space') {
					const value = Number(
						defaultTransformer(token).replace(/([0-9]{1,3})px/gm, `$1`),
					);
					const remValue = (value / 16).toString() + 'rem';
					set(numberTokens, token.id, value);
					set(remTokens, token.id, remValue);
					if (token.$description) {
						jsDoc[token.id] = token.$description;
					}
				}
			}

			let typescriptSource = '';
			const exports = [
				{ varName: 'space', tokens: numberTokens },
				{ varName: 'remSpace', tokens: remTokens },
			];
			for (const { varName, tokens } of exports) {
				const serialisedJS = serializeJS(tokens, {
					comments: jsDoc,
				}).trim();
				// create a typescript source string containing the transformed tokens
				typescriptSource += `export const ${varName} = ${serialisedJS.replace(/;$/, '')} as const; \r\n\r\n`;
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
