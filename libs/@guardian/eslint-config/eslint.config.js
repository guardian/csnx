import guardian from './index.js';

export default [
	...guardian.configs.esm,
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
