import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import cjs from './configs/cjs.js';
import comments from './configs/comments.js';
import imports from './configs/imports.js';

export default {
	configs: {
		recommended: [
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
		],
		jest: [
			{
				files: [
					'**/*.test.?(c|m)js',
					'**/*.spec.?(c|m)js',
					'**/__tests__/**',
					'**/jest.*.?(c|m)js',
				],
				languageOptions: {
					globals: {
						...globals.jest,
					},
				},
			},
		],
		commonJS: [
			{
				files: ['**/*.js'],
				...cjs,
			},
		],
	},
};
