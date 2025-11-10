import storybook from 'eslint-plugin-storybook';

export default [
	{
		name: '@guardian/storybook',
		files: ['**/*.stories.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx,mdx}'],
	},
	...storybook.configs['flat/recommended'],
];
