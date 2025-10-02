/* eslint-disable import/no-default-export -- cobalt plugins do this */

// @ts-check

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { defaultTransformer } from '@cobalt-ui/plugin-js';
import { set } from '@cobalt-ui/utils';
import { template } from '../../lib/template.js';

const require = createRequire(import.meta.url);

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

			const breakpointEntries = [];

			for (const breakpoints of Object.values(transformedTokens)) {
				for (const [name, value] of Object.entries(breakpoints)) {
					breakpointEntries.push(`\t${name}: ${value},`);
				}
			}

			// Inline the `mq` mixin provided by sass-mq, and offer that as a tool for accessing breakpoints, eg. `@include mq($from: desktop)`
			const sassMqPackagePath = require.resolve('sass-mq/package.json');
			const sassMqPath = join(dirname(sassMqPackagePath), '_mq.scss');
			let sassMqContent = readFileSync(sassMqPath, 'utf-8');

			// Remove the "Name your breakpoints..." paragraph from the comment
			sassMqContent = sassMqContent.replace(
				/\/\/\/ Name your breakpoints.*?\/\/\/\n\/\/\/ @type Map\n/s,
				'/// @type Map\n',
			);

			// Replace just the contents of $breakpoints map with Source breakpoints
			sassMqContent = sassMqContent.replace(
				/(\$breakpoints:\s*\()\s*mobile:.*?\)/s,
				`$1\n${breakpointEntries.join('\n')}\n)`,
			);

			const scssSource = sassMqContent;

			return [
				{
					filename: options.filename,
					contents: template(
						import.meta.filename,
						scssSource,
						'This file copies the media query mixins provided by https://github.com/sass-mq/sass-mq, configured with Source breakpoints.',
					),
				},
			];
		},
	};
}
