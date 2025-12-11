import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { fontArrayToString, pxStringToRem } from '../../lib/convert-value.js';

/**
 * @typedef {Object} TypographyPreset
 * @property {string[]} fontFamily
 * @property {string} fontSize
 * @property {number} lineHeight
 * @property {number} fontWeight
 * @property {string} fontStyle
 */

/** @param {string} fontSize */
export const textDecorationThickness = (fontSize) => {
	switch (fontSize) {
		case '20px':
		case '24px':
		case '28px':
			return '3px';
		case '34px':
			return '4px';
		case '42px':
			return '5px';
		case '50px':
		case '64px':
		case '70px':
			return '6px';
		default:
			return '2px';
	}
};

/**
 * @param {string} selector
 * @param {TypographyPreset} properties
 */
export const presetClassDecl = (selector, properties) => `${selector} {
	font-family: ${fontArrayToString(properties.fontFamily)};
	font-size: ${pxStringToRem(properties.fontSize)};
	line-height: ${properties.lineHeight};
	font-weight: ${properties.fontWeight};
	font-style: ${properties.fontStyle};
	--source-text-decoration-thickness: ${textDecorationThickness(properties.fontSize)};
}`;

/**
 *
 */
export const collectPresetProperties = (tokens) => {
	/** @type {Object.<string, string>} */
	const transformedTokens = {};

	const typographyTokens = tokens.filter((token) =>
		token.id.startsWith('typographyPresets.'),
	);

	for (const token of typographyTokens) {
		set(transformedTokens, token.id, defaultTransformer(token));
	}

	return /** @type {Object.<!string, import("./common.js").TypographyPreset>} */ (
		transformedTokens.typographyPresets
	);
};
