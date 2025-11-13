import guardian from '@guardian/eslint-config';

/** @type {import('eslint').Linter.Config} */
const config = [
	...guardian.configs.recommended,
	...guardian.configs.jest,
	{
		ignores: [
			'dist',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
		],
	},
];

export default config;
