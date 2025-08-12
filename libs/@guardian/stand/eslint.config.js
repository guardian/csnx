import guardian from '@guardian/eslint-config';

/** @type {import('eslint').Linter.Config} */
const config = [
	...guardian.configs.recommended,
	...guardian.configs.jest,
	...guardian.configs.react,
	...guardian.configs.storybook,
	{
		ignores: [
			'dist',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
			'storybook-static',
		],
	},
	{
		// storybook is in a world of its own
		files: ['.storybook/main.js'],
		...guardian.configs.cjs,
	},
];

export default config;
