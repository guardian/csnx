// eslint-plugin-storybook has a dependency on on Storybook which causes it
// to crash eslint when it is imported if Storybook is not installed.
const loadStorybookRecommended = async () => {
	// eslint-disable-next-line import/no-unresolved -- We're checking if Storybook is resolveable
	if (await import('storybook').then(() => true).catch(() => false)) {
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
