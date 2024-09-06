import guardian from './index.js';

export default [
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
