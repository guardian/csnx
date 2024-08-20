// import { fixupConfigRules } from '@eslint/compat';
// import tsParser from '@typescript-eslint/parser';
// import js from '@eslint/js';
// import { FlatCompat } from '@eslint/eslintrc';
import guardian from '@guardian/eslint-config';

// const compat = new FlatCompat({
// 	baseDirectory: import.meta.dirname,
// 	recommendedConfig: js.configs.recommended,
// 	allConfig: js.configs.all,
// });

export default [
	...guardian.configs.recommended,

	// ...fixupConfigRules(
	// 	compat.extends(
	// 		'plugin:storybook/recommended',
	// 		'plugin:react/recommended',
	// 		'plugin:react/jsx-runtime',
	// 		'plugin:react-hooks/recommended',
	// 	),
	// ),
	// {
	// 	languageOptions: {
	// 		parser: tsParser,
	// 		ecmaVersion: 2020,
	// 		sourceType: 'module',
	// 	},

	// 	settings: {
	// 		react: {
	// 			version: 'detect',
	// 		},
	// 	},

	// 	rules: {
	// 		'react/no-unknown-property': [
	// 			'error',
	// 			{
	// 				ignore: ['css'],
	// 			},
	// 		],
	// 	},
	// },
	// {
	// {
	// 	rules: guardian.recommended.rules,
	// 	files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
	// },
	// files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
	// },
	// ...compat.extends('@guardian/eslint-config-typescript').map((config) => ({
	// 	...config,
	// 	files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.d.ts'],
	// })),
	// {
	// 	files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.d.ts'],

	// 	settings: {
	// 		'import/resolver': {
	// 			typescript: {
	// 				project: 'tsconfig.base.json',
	// 			},
	// 		},
	// 	},
	// },
];
