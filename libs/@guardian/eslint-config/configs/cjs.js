import globals from 'globals';
import js from './lib/javascript.js';

export default {
	...js,
	name: '@guardian/cjs',
	languageOptions: {
		globals: {
			...globals.commonjs,
			...globals.node,
		},
		parserOptions: {
			sourceType: 'commonjs',
		},
	},
};
