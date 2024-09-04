import base from '../../../../configs/storybook/main';
import type { StorybookConfig } from '../../../../configs/storybook/main';

const config: StorybookConfig = {
	...base,
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
};

export default config;
