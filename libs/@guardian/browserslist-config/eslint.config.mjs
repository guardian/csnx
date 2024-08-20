import guardian from '@guardian/eslint-config';

export default [
	guardian.configs.cjs,
	{
		ignores: ['node_modules', '.wireit'],
	},
];
