import globals from 'globals';
import js from './javascript.base.js';

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
			ecmaVersion: 'latest',
		},
	},
};
