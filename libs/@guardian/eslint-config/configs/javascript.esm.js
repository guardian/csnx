import globals from 'globals';
import js from './javascript.base.js';

export default {
	...js,
	name: '@guardian/esm',
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.nodeBuiltin,
		},
		parserOptions: {
			sourceType: 'module',
			ecmaVersion: 'latest',
		},
	},
};
