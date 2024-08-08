/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { fontArrayToString, pxStringToRem } from '../lib/convert-value.js';
import { template } from '../lib/template.js';

const STRIP_TABS = /^\t{3}|\t{2}/gm;

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginBreakpoints(options) {
	return {
		name: 'plugin-typography',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			// this is where we'll store the transformed tokens
			/** @type {Object.<string, string>} */
			const transformedTokens = {};

			/** @type {Object.<string, string>} */
			const jsDoc = {};

			const typographyTokens = tokens.filter((token) =>
				token.id.startsWith('typographyPresets.'),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of typographyTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
				if (token.$description) {
					jsDoc[token.id] = token.$description;
				}
			}

			/**
			 * TODO: Output any comments from `$description` fields
			 * TODO: Generate `--source-text-decoration-thickness` custom property
			 */

			/** @type {Object.<!string, string>} */
			const typographyPresets = transformedTokens.typographyPresets;
			const typescriptSource = Object.entries(typographyPresets)
				.map(
					([preset, properties]) => `
					export const ${preset} = \`
						font-family: ${fontArrayToString(properties.fontFamily)};
						font-size: ${pxStringToRem(properties.fontSize)}rem;
						line-height: ${properties.lineHeight};
						font-weight: ${properties.fontWeight};
						font-style: ${properties.fontStyle};
					\`;
				`,
				)
				.join('')
				.replace(STRIP_TABS, '');

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, typescriptSource),
				},
			];
		},
	};
}
