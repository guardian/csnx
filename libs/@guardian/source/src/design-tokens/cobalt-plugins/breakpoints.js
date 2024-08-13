/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer, serializeJS } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { pxStringToNumber } from '../lib/convert-value.js';
import { getCommentId } from '../lib/get-comment-id.js';
import { template } from '../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginBreakpoints(options) {
	return {
		name: 'plugin-breakpoints',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			const breakpointTokens = tokens.filter((token) =>
				token.id.startsWith('breakpoint.'),
			);

			/**
			 * this is where we'll store the transformed tokens
			 * @type {Object.<string, string>}
			 */
			const transformedTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of breakpointTokens) {
				set(
					transformedTokens,
					token.id,
					pxStringToNumber(defaultTransformer(token).toString()),
				);
				if (token.$description) {
					jsDoc[getCommentId(token.id)] = token.$description;
				}
			}

			const serialisedJS = Object.values(transformedTokens)
				.map((breakpointToken) =>
					serializeJS(breakpointToken, { comments: jsDoc }),
				)
				.join('')
				.replace(/;$/, '');

			let typescriptSource = `
				export const breakpoints = ${serialisedJS} as const;
				export type Breakpoint = keyof typeof breakpoints;
			`;

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, typescriptSource),
				},
			];
		},
	};
}
