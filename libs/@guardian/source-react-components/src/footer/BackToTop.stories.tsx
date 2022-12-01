import type { Story } from '@storybook/react';
import { BackToTop } from './BackToTop';

export default {
	component: BackToTop,
	title: 'BackToTop',
};

const Template: Story = () => BackToTop;

export const Default = Template.bind({});
