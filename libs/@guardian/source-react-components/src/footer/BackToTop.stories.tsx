import type { Meta, StoryFn } from '@storybook/react';
import { BackToTop } from './BackToTop';

const meta: Meta<typeof BackToTop> = {
	component: BackToTop,
	title: 'BackToTop',
};

export default meta;

const Template: StoryFn<typeof BackToTop> = () => <BackToTop />;

export const Default: StoryFn<typeof BackToTop> = Template.bind({});
