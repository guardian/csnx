/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { camelToKebab } from '../../lib/case.js';
import { fontArrayToString, pxStringToRem } from '../../lib/convert-value.js';
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
 * Converts eg. "headlineBold24" to "src-headline-bold-24"
 *
 * @param {string} presetName
 */
const classNameFromPreset = (presetName) => {
	return `.src-${camelToKebab(presetName).replace(/(\d+)$/, '-$1')}`;
};

/**
 *
 * @param {string} preset
 * @param {TypographyPreset} properties
 */
const presetClass = (preset, properties) => `${classNameFromPreset(preset)} {
	font-family: ${fontArrayToString(properties.fontFamily)};
	font-size: ${pxStringToRem(properties.fontSize)};
	line-height: ${properties.lineHeight};
	font-weight: ${properties.fontWeight};
	font-style: ${properties.fontStyle};
	--source-text-decoration-thickness: ${textDecorationThickness(properties.fontSize)};
}`;

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginTypographyCss(options) {
	return {
		name: 'plugin-typography-css',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			/** @type {Object.<string, string>} */
			const transformedTokens = {};

			const typographyTokens = tokens.filter((token) =>
				token.id.startsWith(GROUP_PREFIX),
			);

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of typographyTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
			}

			/** @type {Object.<!string, TypographyPreset>} */
			const typographyPresets = transformedTokens.typographyPresets;

			const cssClasses = Object.entries(typographyPresets)
				.map(([preset, properties]) => presetClass(preset, properties))
				.join('\n\n');

			const cssSource = cssClasses;

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, cssSource),
				},
			];
		},
	};
}
