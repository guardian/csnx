import type { StorybookConfig } from '../../../../configs/storybook/main';
import rootMain from '../../../../configs/storybook/main';

const config: StorybookConfig = {
	...rootMain,
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
};

export default config;
