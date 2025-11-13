import guardian from './index.js';

/** @type {import('eslint').Linter.Config} */
const config = [
	...guardian.configs.recommended,
	{
		ignores: ['.wireit'],
	},
	{
		files: ['index.js', 'configs/**'],
		rules: {
			'import/no-default-export': 'off',
		},
	},
];

export default config;
