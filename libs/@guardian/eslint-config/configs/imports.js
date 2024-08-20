// https://github.com/import-js/eslint-plugin-import/issues/2948#issuecomment-2119214365
import importX from 'eslint-plugin-import-x';

export default [
	{
		plugins: {
			import: importX,
		},
	},
	{
		rules: {
			// recommended defaults
			'import/no-unresolved': 'error',
			'import/named': 'error',
			'import/namespace': 'error',
			'import/default': 'error',
			'import/export': 'error',

			// encourages consistent token use across code bases
			// (you have to deliberately rename an import) and
			// makes the location of errors easier to discover:
			// https://twitter.com/addyosmani/status/1411233253948747777
			'import/no-default-export': 'error',
			'import/prefer-default-export': 'off',

			// less diff noise (they're hoisted anyway)
			'import/first': 'error',

			// fixable import formatting, designed to minimise diff noise
			'sort-imports': [
				'error',
				{
					ignoreCase: true,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
				},
			],
			'import/newline-after-import': 'error',
			'import/order': [
				'error',
				{
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
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],

			// prevent circular dependencies
			'import/no-cycle': ['error', { ignoreExternal: true }],
		},
	},
	{
		files: [
			'**/.lintstagedrc.*',
			'**/astro.config.*',
			'**/eslint.config.*',
			'**/jest.config.*',
			'**/rollup.config.*',
			'**/svelte.config.*',
		],
		rules: {
			'import/no-default-export': 'off',
		},
	},
];
