/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { camelToKebab } from '../../lib/case.js';
import { template } from '../../lib/template.js';
import { collectPresetProperties, presetClassDecl } from './common.js';

/**
 * Converts eg. "headlineBold24" to "src-headline-bold-24"
 *
 * @param {string} presetName
 */
const mixinNameFromPreset = (presetName) => {
	return `@mixin src-${camelToKebab(presetName).replace(/(\d+)$/, '-$1')}`;
};

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginTypographyMixinsScss(options) {
	return {
		name: 'plugin-typography-mixins-scss',

		config(/* config */) {},
		async build({ tokens /* metadata, rawSchema */ }) {
			const typographyPresets = collectPresetProperties(tokens);

			const cssClasses = Object.entries(typographyPresets)
				.map(([preset, properties]) =>
					presetClassDecl(mixinNameFromPreset(preset), properties),
				)
				.join('\n\n');

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, cssClasses),
				},
			];
		},
	};
}
