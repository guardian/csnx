import guardian from '@guardian/eslint-config';

export default [
	...guardian.configs.recommended,
	{
		ignores: ['dist', '.wireit'],
	},
];
