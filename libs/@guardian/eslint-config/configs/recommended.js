import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import cjs from './cjs.js';
import comments from './comments.js';
import imports from './imports.js';

export default [
	js.configs.recommended,
	{
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
		linterOptions: {
			reportUnusedDisableDirectives: 'error',
		},
		rules: {
			// prevent dangling returns without braces
			curly: ['error', 'all'],

			// this doesn't catch bugs or make things more readable
			// and sometimes tools or 3rd parties require it
			'no-underscore-dangle': 0,
		},
	},
	{
		files: ['**/*.cjs'],
		...cjs,
	},
	...imports,
	comments,
	eslintConfigPrettier,
];
