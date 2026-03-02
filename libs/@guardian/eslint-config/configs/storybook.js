// eslint-plugin-storybook is an optional peer dependency.
// It also has its own peer dependency on Storybook which can cause it
// to crash eslint when imported if Storybook is not installed.
const loadStorybookRecommended = async () => {
	try {
		// Check that both the plugin and storybook itself are available
		await import('eslint-plugin-storybook');
		// eslint-disable-next-line import/no-unresolved -- We're checking if Storybook is resolveable
		await import('storybook');
	} catch {
		return [];
	}

	const storybook = await import('eslint-plugin-storybook');
	return storybook.configs['flat/recommended'];
};

export default [
	{
		name: '@guardian/storybook',
		files: ['**/*.stories.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx,mdx}'],
	},
	...(await loadStorybookRecommended()),
];
