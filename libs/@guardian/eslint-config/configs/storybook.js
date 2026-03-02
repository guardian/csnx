// eslint-plugin-storybook is an optional peer dependency.
// It also has its own peer dependency on Storybook which can cause it
// to crash eslint when imported if Storybook is not installed.
const loadStorybookRecommended = async () => {
	try {
		// eslint-disable-next-line import/no-unresolved -- We're checking if Storybook is resolvable
		await import('storybook');
		// Check that plugin is also available
		const storybook = await import('eslint-plugin-storybook');
		return storybook.configs['flat/recommended'];
	} catch {
		return [];
	}
};

export default [
	{
		name: '@guardian/storybook',
		files: ['**/*.stories.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx,mdx}'],
	},
	...(await loadStorybookRecommended()),
];
