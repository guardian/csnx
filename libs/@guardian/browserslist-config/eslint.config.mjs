import guardian from '@guardian/eslint-config';

/** @type {import('eslint').Linter.Config} */
const config = [
	...guardian.configs.recommended,
	{
		ignores: ['.wireit'],
	},
];

export default config;
