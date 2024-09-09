import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
	{
		name: '@guardian/react',
		files: ['**/*.{jsx,mjsx,tsx,mtsx}'],
		languageOptions: {
			...react.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		...react.configs.flat.recommended,
		...react.configs.flat['jsx-runtime'],
		plugins: {
			react,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			'react/no-unknown-property': [
				'error',
				{
					ignore: ['css'],
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
