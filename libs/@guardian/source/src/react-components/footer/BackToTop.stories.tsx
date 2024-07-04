import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from './BackToTop';

const meta: Meta<typeof BackToTop> = {
	title: 'React Components/BackToTop',
	component: () => BackToTop,
};

export default meta;
type Story = StoryObj<typeof BackToTop>;

export const Default: Story = {};
