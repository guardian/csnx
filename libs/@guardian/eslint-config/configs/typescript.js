// https://typescript-eslint.io/getting-started/
import { defineConfig } from 'eslint/config';
import importX from 'eslint-plugin-import-x';
import { configs } from 'typescript-eslint';

export default defineConfig({
	files: ['**/*.{ts,tsx,mtsx,mts,cts}'],
	extends: [
		...configs.recommended,
		...configs.recommendedTypeChecked,
		importX.configs.typescript,
	],
	languageOptions: {
		parserOptions: {
			projectService: true,
		},
	},
	rules: {
		// Performance boost, as TypeScript provides the same checks as part
		// of standard type checking. See
		// https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting/#eslint-plugin-import
		'import/no-unresolved': 'off',
		'import/named': 'off',
		'import/namespace': 'off',
		'import/default': 'off',

		/*
			FIXABLE STYLISTIC CHOICES THAT DIFFER FROM THE DEFAULT The intention
			is to maximise clarity and consistency, not direct or inhibit what
			can be done with code.
			*/

		// use `string[]` for simple arrays, `Array<string>` for complex
		// ones
		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md#array-simple
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'array-simple',
			},
		],

		// use `Record<string, unknown>` instead of `{ [key: string]:
		// unknown }`
		'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],

		// be explicit when you only want to import a type: `import type {
		// Foo } from 'Foo';`
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
			},
		],

		// use `(1 + foo.num!) == 'error'` instead of `1 + foo.num! ==
		// 'error'`
		'@typescript-eslint/no-confusing-non-null-assertion': 'error',

		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unnecessary-type-arguments': 'error',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				caughtErrors: 'none',
			},
		],

		// use `str.includes(value)` instead of `str.indexOf(value) !== -1`
		'@typescript-eslint/prefer-includes': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
		'@typescript-eslint/prefer-reduce-type-parameter': 'error',

		// use String#startsWith or String#endsWith instead of
		// String#indexOf et al
		'@typescript-eslint/prefer-string-starts-ends-with': 'error',

		// require explanation for changing compiler behaviour
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				'ts-ignore': true,
				'ts-nocheck': true,
				'ts-check': false,
				minimumDescriptionLength: 3,
			},
		],

		/* NOT FIXABLE BUT USEFUL */

		// Enforce TypeScript naming conventions
		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
		'@typescript-eslint/naming-convention': [
			'error',

			// types are 'PascalCase'
			{
				selector: ['typeLike', 'enumMember'],
				format: ['PascalCase'],
			},

			// booleans are descriptive
			// {
			//  selector: 'variable', types: ['boolean'], format:
			//  ['PascalCase'], prefix: ['is', 'should', 'has', 'can',
			//  'did', 'will'],
			// },
		],

		// use `foo ?? 'a string'` instead of `foo !== null && foo !==
		// undefined ? foo : 'a string'`
		'@typescript-eslint/prefer-nullish-coalescing': 'error',

		// use `a?.b` instead of `a && a.b`
		'@typescript-eslint/prefer-optional-chain': 'error',
	},
});
