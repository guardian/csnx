import guardian from '@guardian/eslint-config';

/** @type {import('eslint').Linter.Config} */
const config = [
	...guardian.configs.recommended,
	{
		ignores: ['dist', '.wireit'],
	},
];

export default config;
