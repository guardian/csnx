/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { template } from '../../lib/template.js';

/**
 * @param {{ filename: string; }} options
 * @returns {import('@cobalt-ui/core').Plugin}
 */
export default function pluginBreakpointsScss(options) {
	return {
		name: 'plugin-breakpoints-scss',

		config(/* config */) {},
		async build({ tokens /*, rawSchema, metadata */ }) {
			const TOKEN_GROUP = 'breakpoint';

			const breakpointTokens = tokens.filter((token) =>
				token.id.startsWith(TOKEN_GROUP),
			);

			/**
			 * @type {Object.<string, string>}
			 */
			const transformedTokens = {};

			// we can re-use the default transformer from `@cobalt-ui/plugin-js`
			for (const token of breakpointTokens) {
				set(transformedTokens, token.id, defaultTransformer(token));
			}

			const breakpointPairs = [];

			for (const breakpoints of Object.values(transformedTokens)) {
				for (const [name, value] of Object.entries(breakpoints)) {
					breakpointPairs.push({ name, value });
				}
			}

			breakpointPairs.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

			const breakpointEntries = breakpointPairs.map(
				({ name, value }) => `\t${name}: ${value},`,
			);

			const scssSource = `$breakpoints: (\n${breakpointEntries.join('\n')}\n);`;

			return [
				{
					filename: options.filename,
					contents: template(import.meta.filename, scssSource),
				},
			];
		},
	};
}
