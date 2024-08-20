import guardian from '@guardian/eslint-config';

export default [
	...guardian.configs.esm,
	{
		ignores: ['node_modules', '.wireit'],
	},
];
