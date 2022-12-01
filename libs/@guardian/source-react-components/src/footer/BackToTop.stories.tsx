import type { Story } from '@storybook/react';
import { BackToTop } from './BackToTop';

export default {
	component: BackToTop,
	title: 'source-react-components/BackToTop',
};

const Template: Story = () => BackToTop;

export const Default = Template.bind({});
