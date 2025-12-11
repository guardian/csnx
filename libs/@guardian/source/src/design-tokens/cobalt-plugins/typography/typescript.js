/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { fontArrayToString, pxStringToRem } from '../../lib/convert-value.js';
import { getCommentId } from '../../lib/get-comment-id.js';
import { template } from '../../lib/template.js';
import { textDecorationThickness } from './common.js';

/**
 * @typedef {Object} TypographyPreset
 * @property {string[]} fontFamily
 * @property {string} fontSize
 * @property {number} lineHeight
 * @property {number} fontWeight
 * @property {string} fontStyle
 */

const GROUP_PREFIX = 'typographyPresets.';

/**
 *
 * @param {string} preset
 * @param {TypographyPreset} properties
 */
const presetTemplate = (preset, properties) => `
export const ${preset} = \`
	font-family: ${fontArrayToString(properties.fontFamily)};
	font-size: ${pxStringToRem(properties.fontSize)};
	line-height: ${properties.lineHeight};
	font-weight: ${properties.fontWeight};
	font-style: ${properties.fontStyle};
	--source-text-decoration-thickness: ${textDecorationThickness(properties.fontSize)};
\`;

export const ${preset}Object = {
	fontFamily: '${fontArrayToString(properties.fontFamily)}',
	fontSize: '${pxStringToRem(properties.fontSize)}',
	lineHeight: ${properties.lineHeight},
	fontWeight: ${properties.fontWeight},
	fontStyle: '${properties.fontStyle}',
} as const;
`;

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginBreakpoints(options) {
	return {
		name: 'plugin-typography-typescript',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			// this is where we'll store the transformed tokens
			/** @type {Object.<string, string>} */
			const transformedTokens = {};

			/** @type {Object.<string, string>} */
			const comments = {};

			const typographyTokens = tokens.filter((token) =>
				token.id.startsWith(GROUP_PREFIX),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of typographyTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
				if (token.$description) {
					comments[getCommentId(token.id)] = token.$description;
				}
			}

			/** @type {Object.<!string, TypographyPreset>} */
			const typographyPresets = transformedTokens.typographyPresets;
			const typescriptSource = Object.entries(typographyPresets)
				.map(([preset, properties]) => {
					const output = presetTemplate(preset, properties);
					return comments[preset]
						? `\n/** ${comments[preset]} */${output}`
						: output;
				})
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
