/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer, serializeJS } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { numberToRem, pxStringToNumber } from '../lib/convert-value.js';
import { getCommentId } from '../lib/get-comment-id.js';
import { template } from '../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginSpace(options) {
	return {
		name: 'plugin-space',
		config(/* config */) {},
		async build({ tokens, rawSchema /*, metadata */ }) {
			const TOKEN_GROUP = 'space';

			const description = rawSchema[TOKEN_GROUP]?.$description ?? '';

			const spaceTokens = tokens.filter((token) =>
				token.id.startsWith(TOKEN_GROUP),
			);

			/** @type {Object.<string, string>} */
			const numberTokens = {};

			/** @type {Object.<string, string>} */
			const remTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of spaceTokens) {
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

			const exports = [
				{ varName: 'space', tokens: numberTokens },
				{ varName: 'remSpace', tokens: remTokens },
			];
			for (const { varName, tokens } of exports) {
				const serialisedJS = serializeJS(tokens['space'], {
					comments: jsDoc,
				}).trim();

				if (description) {
					typescriptSource.push(`/** ${description} */`);
				}

				typescriptSource.push(
					`export const ${varName} = ${serialisedJS.replace(/;$/, '').replace(/'([0-9]{1,3})'/gm, '$1')} as const;`,
					'',
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
