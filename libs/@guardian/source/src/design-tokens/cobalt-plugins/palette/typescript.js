/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer, serializeJS } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { getCommentId } from '../../lib/get-comment-id.js';
import { template } from '../../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginPalette(options) {
	return {
		name: 'plugin-palette-typescript',

		config(/* config */) {},
		async build({ tokens, rawSchema /*, metadata */ }) {
			const TOKEN_GROUP = 'palette';

			const description = rawSchema[TOKEN_GROUP]?.$description;

			// this is where we'll store the transformed tokens
			/** @type {Object.<string, string>} */
			const transformedTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};

			const paletteTokens = tokens.filter((token) =>
				token.id.startsWith(TOKEN_GROUP),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of paletteTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
				if (token.$description) {
					jsDoc[getCommentId(token.id)] = token.$description;
				}
			}

			const typescriptSource = [];

			for (const [group, tokens] of Object.entries(transformedTokens)) {
				const serialisedJS = serializeJS(tokens, {
					comments: jsDoc,
				}).trim();

				if (description) {
					typescriptSource.push(`/** ${description} */`);
				}

				typescriptSource.push(
					`\nexport const ${group} = ${serialisedJS.replace(/;$/, '')} as const;`,
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
