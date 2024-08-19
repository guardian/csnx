import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import imports from './lib/imports.js';
import comments from './lib/comments.js';
// import importX from 'eslint-plugin-import-x';

// console.log(importConfig);

export default {
	recommended: [
		{
			files: ['**/*.cjs'],
			languageOptions: {
				globals: {
					...globals.commonjs,
					...globals.node,
				},
				parserOptions: {
					sourceType: 'commonjs',
				},
			},
		},
		{
			files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'],
			rules: js.configs.recommended.rules,
		},
		...ts.configs.recommended,
		...imports,
		comments,
		// {
		// 	files: ['**/*.jsx', '**/*.tsx'],
		// 	rules: {},
		// },
	],
	storybook: {
		files: [
			'**/*.stories.js',
			'**/*.stories.jsx',
			'**/*.stories.ts',
			'**/*.stories.tsx',
			'**/*.stories.mjs',
			'**/*.stories.cjs',
			'**/*.stories.mdx',
		],
		rules: {},
	},
	jest: {
		files: [
			'**/*.test.js',
			'**/*.test.ts',
			'**/*.test.jsx',
			'**/*.test.tsx',
			'**/*.test.mjs',
			'**/*.test.cjs',
		],
		rules: {},
	},
};

// export default [

// ...fixupConfigRules(
// 	compat.extends(
// 		'eslint:recommended',
// 		'plugin:import/errors',
// 		'plugin:import/warnings',
// 		'prettier',
// 	),
// ),
// {
// 	plugins: {
// 		'eslint-comments': eslintComments,
// 	},

// 	languageOptions: {
// 		globals: {
// 			...globals.browser,
// 			...globals.node,
// 		},
// 	},

// 	rules: {
// 		curly: ['error', 'all'],

// 		'eslint-comments/disable-enable-pair': [
// 			2,
// 			{
// 				allowWholeFile: true,
// 			},
// 		],

// 		'eslint-comments/no-duplicate-disable': 2,
// 		'eslint-comments/no-unused-disable': 2,
// 		'eslint-comments/no-unused-enable': 2,

// 		'eslint-comments/require-description': [
// 			2,
// 			{
// 				ignore: ['eslint-enable'],
// 			},
// 		],

// 		'no-underscore-dangle': 0,
// 		'import/no-default-export': 2,
// 		'import/prefer-default-export': 0,
// 		'import/first': 2,

// 		'sort-imports': [
// 			'error',
// 			{
// 				ignoreCase: true,
// 				ignoreDeclarationSort: true,
// 				ignoreMemberSort: false,
// 			},
// 		],

// 		'import/newline-after-import': 2,

// 		'import/order': [
// 			'error',
// 			{
// 				groups: [
// 					'builtin',
// 					'external',
// 					'internal',
// 					'parent',
// 					'sibling',
// 					'index',
// 					'object',
// 					'unknown',
// 				],

// 				'newlines-between': 'never',

// 				alphabetize: {
// 					order: 'asc',
// 					caseInsensitive: true,
// 				},
// 			},
// 		],

// 		'import/no-cycle': [
// 			'error',
// 			{
// 				ignoreExternal: true,
// 			},
// 		],
// 	},
// },
// ];
