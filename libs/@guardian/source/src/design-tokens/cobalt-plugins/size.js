/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer, serializeJS } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { capitalise } from '../lib/capitalise.js';
import { numberToRem, pxStringToNumber } from '../lib/convert-value.js';
import { getCommentId } from '../lib/get-comment-id.js';
import { template } from '../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginSpace(options) {
	return {
		name: 'plugin-size',

		config(/* config */) {},
		async build({ tokens, rawSchema /*, metadata */ }) {
			const TOKEN_GROUP = ['size', 'height', 'width', 'iconSize'];

			/** @type {Object.<string, string | undefined>} */
			const description = {};

			for (const group of TOKEN_GROUP) {
				description[group] = rawSchema[group]?.$description ?? '';
			}

			/** @type {Object.<string, string>} */
			let numberTokens = {};

			/** @type {Object.<string, string>} */
			let remTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};

			const sizeTokens = tokens.filter((token) => {
				const [group] = token.id.split('.');
				return TOKEN_GROUP.includes(group ?? '');
			});

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of sizeTokens) {
				const value = Number(
					pxStringToNumber(defaultTransformer(token).toString()),
				);
				set(numberTokens, token.id, value);
				set(remTokens, token.id, numberToRem(value));
				if (token.$description) {
					jsDoc[getCommentId(token.id)] = token.$description;
				}
			}

			const typescriptSource = [];

			for (const tokenGroup of Object.keys(numberTokens)) {
				const serialisedJS = serializeJS(numberTokens[tokenGroup], {
					comments: jsDoc,
				}).trim();

				if (description[tokenGroup]) {
					typescriptSource.push(`/** ${description[tokenGroup]} */`);
				}

				typescriptSource.push(
					`export const ${tokenGroup} = ${serialisedJS.replace(/;$/, '')} as const;`,
				);
			}

			for (const tokenGroup of Object.keys(remTokens)) {
				const serialisedJS = serializeJS(remTokens[tokenGroup], {
					comments: jsDoc,
				}).trim();

				if (description[tokenGroup]) {
					typescriptSource.push(`/** ${description[tokenGroup]} */`);
				}

				typescriptSource.push(
					`export const rem${capitalise(tokenGroup)} = ${serialisedJS.replace(/;$/, '')} as const;`,
				);
			}

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, typescriptSource.join('\n')),
				},
			];
		},
	};
}
