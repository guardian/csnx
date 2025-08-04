import guardian from '@guardian/eslint-config';

export default [
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
