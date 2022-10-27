import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Test } from './Test';

export default {
	component: Test,
} as ComponentMeta<typeof Test>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	foo: 'tsx',
};
