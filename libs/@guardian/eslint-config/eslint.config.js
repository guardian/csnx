import guardian from './index.js';

export default [
	...guardian.configs.recommended,
	{
		ignores: ['node_modules', '.wireit'],
	},
	{
		files: ['index.js', 'configs/**'],
		rules: {
			'import/no-default-export': 'off',
		},
	},
];
