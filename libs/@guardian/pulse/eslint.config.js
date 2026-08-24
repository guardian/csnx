import guardian from '@guardian/eslint-config';

/** @type {import('eslint').Linter.Config} */
const config = [
	{
		ignores: [
			'dist',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
		],
	},
	...guardian.configs.recommended,
	...guardian.configs.jest,
	...guardian.configs.react,
];

export default config;
