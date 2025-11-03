// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import guardian from '@guardian/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default [
	{
		ignores: [
			'dist',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
			'storybook-static',
		],
	},
	...guardian.configs.recommended,
	...guardian.configs.jest,
	...guardian.configs.react,
	// Investigating adding latest (storybook.configs['flat/recommended']) to @guardian/eslint-config
	//...guardian.configs.storybook,
	{
		// storybook is in a world of its own
		files: ['.storybook/main.js'],
		...guardian.configs.cjs,
	},
	...storybook.configs['flat/recommended'],
];
