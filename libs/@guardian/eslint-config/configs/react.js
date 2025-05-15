import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const files = ['**/*.{js,ts,jsx,mjsx,tsx,mtsx}'];

export default [
	{
		files,
		...react.configs.flat.recommended,
	},
	{
		files,
		...react.configs.flat['jsx-runtime'],
	},
	{
		name: '@guardian/react',
		files,
		languageOptions: {
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		plugins: {
			react,
			'react-hooks': hooks,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			'react/no-unknown-property': [
				'error',
				{
					ignore: ['css'],
				},
			],
			...hooks.configs.recommended.rules,
			'react-hooks/exhaustive-deps': 'error',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
