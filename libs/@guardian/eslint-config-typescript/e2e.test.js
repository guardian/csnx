/**
 * This file makes sure no exports have been accidentally removed from the
 * package.
 */

const bundleExports = require('.');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(bundleExports).toEqual({
			extends: [
				'@guardian/eslint-config',
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:import/typescript',
			],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 'es2020',
				project: './tsconfig.json',
				sourceType: 'module',
			},
			plugins: ['@typescript-eslint'],
			rules: {
				'@typescript-eslint/array-type': [2, { default: 'array-simple' }],
				'@typescript-eslint/consistent-indexed-object-style': [2, 'record'],
				'@typescript-eslint/consistent-type-imports': [
					2,
					{ prefer: 'type-imports' },
				],
				'@typescript-eslint/member-delimiter-style': [
					2,
					{
						multiline: { delimiter: 'semi', requireLast: true },
						singleline: { delimiter: 'semi', requireLast: false },
					},
				],
				'@typescript-eslint/naming-convention': [
					2,
					{ format: ['PascalCase'], selector: ['typeLike', 'enumMember'] },
				],
				'@typescript-eslint/no-confusing-non-null-assertion': 2,
				'@typescript-eslint/no-explicit-any': 2,
				'@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
				'@typescript-eslint/no-unnecessary-condition': 2,
				'@typescript-eslint/no-unnecessary-qualifier': 2,
				'@typescript-eslint/no-unnecessary-type-arguments': 2,
				'@typescript-eslint/prefer-includes': 2,
				'@typescript-eslint/prefer-nullish-coalescing': 2,
				'@typescript-eslint/prefer-optional-chain': 2,
				'@typescript-eslint/prefer-reduce-type-parameter': 2,
				'@typescript-eslint/prefer-string-starts-ends-with': 2,
				'@typescript-eslint/prefer-ts-expect-error': 2,
			},
			settings: {
				'import/extensions': ['.ts', '.tsx'],
				'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
				'import/resolver': { typescript: { alwaysTryTypes: true } },
			},
		});
	});
});
