/**
 * This file makes sure no exports have been accidentally removed from the
 * package.
 */

const bundleExports = require('.');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(bundleExports).toEqual({
			env: { browser: true, es6: true, node: true },
			extends: [
				'eslint:recommended',
				'plugin:import/errors',
				'plugin:import/warnings',
				'prettier',
			],
			plugins: ['eslint-comments'],
			rules: {
				curly: ['error', 'multi-line'],
				'eslint-comments/disable-enable-pair': [2, { allowWholeFile: true }],
				'eslint-comments/no-duplicate-disable': 2,
				'eslint-comments/no-unused-disable': 2,
				'eslint-comments/no-unused-enable': 2,
				'eslint-comments/require-description': [
					2,
					{ ignore: ['eslint-enable'] },
				],
				'import/first': 2,
				'import/newline-after-import': 2,
				'import/no-cycle': ['error', { ignoreExternal: true }],
				'import/no-default-export': 2,
				'import/order': [
					'error',
					{
						alphabetize: { caseInsensitive: true, order: 'asc' },
						groups: [
							'builtin',
							'external',
							'internal',
							'parent',
							'sibling',
							'index',
							'object',
							'unknown',
						],
						'newlines-between': 'never',
					},
				],
				'import/prefer-default-export': 0,
				'no-underscore-dangle': 0,
				'sort-imports': [
					'error',
					{
						ignoreCase: true,
						ignoreDeclarationSort: true,
						ignoreMemberSort: false,
					},
				],
			},
		});
	});
});
