import type { Meta, StoryObj } from '@storybook/react';
import { Byline } from './Byline';

const meta: Meta<typeof Byline> = {
	title: 'Byline',
	component: Byline,
};

type Story = StoryObj<typeof Byline>;

export const Default: Story = {};

export default meta;
