import guardian from '@guardian/eslint-config';

export default [
	...guardian.configs.recommended,
	{
		ignores: ['node_modules', '.wireit'],
	},
];
