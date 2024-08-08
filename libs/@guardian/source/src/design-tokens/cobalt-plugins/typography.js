/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { fontArrayToString, pxStringToRem } from '../lib/convert-value.js';
import { template } from '../lib/template.js';

const GROUP_PREFIX = 'typographyPresets.';

/** @param {string} fontSize */
const textDecorationThickness = (fontSize) => {
	switch (fontSize) {
		case '34px':
			return '4px';
		case '42px':
			return '5px';
		case '50px':
		case '70px':
			return '6px';
		default:
			return '2px';
	}
};

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
			const descriptions = {};

			const typographyTokens = tokens.filter((token) =>
				token.id.startsWith(GROUP_PREFIX),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of typographyTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
				if (token.$description) {
					descriptions[token.id.replace(GROUP_PREFIX, '')] = token.$description;
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
	--source-text-decoration-thickness: ${textDecorationThickness(properties.fontSize)};
\`;
`,
				)
				.join('');

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, typescriptSource),
				},
			];
		},
	};
}
