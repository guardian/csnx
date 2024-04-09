import type { Meta, StoryFn } from '@storybook/react';
import type { AgeWarningProps } from './AgeWarning';
import { AgeWarning } from './AgeWarning';

const meta: Meta<typeof AgeWarning> = {
	component: AgeWarning,
	title: 'AgeWarning',
};

export default meta;

const Template: StoryFn<typeof AgeWarning> = (args: AgeWarningProps) => (
	<AgeWarning {...args} />
);

export const Default: StoryFn<typeof AgeWarning> = Template.bind({});
Default.args = { age: '10 years old' };

export const SmallWarning: StoryFn<typeof AgeWarning> = Template.bind({});
SmallWarning.args = { age: '5 months old', size: 'small' };

export const ScreenReaderVersion: StoryFn<typeof AgeWarning> = Template.bind(
	{},
);
ScreenReaderVersion.args = {
	age: '20 million years old',
	isScreenReader: true,
};

export const MissingOldText: StoryFn<typeof AgeWarning> = Template.bind({});
MissingOldText.args = { age: '5 years' };

export const EmptyWarningPrefix: StoryFn<typeof AgeWarning> = Template.bind({});
EmptyWarningPrefix.args = { age: '5 years', warningPrefix: '' };

export const CustomWarningPrefix: StoryFn<typeof AgeWarning> = Template.bind(
	{},
);
CustomWarningPrefix.args = { age: '5 years', warningPrefix: 'This book is ' };

export const SupportsDarkMode: StoryFn<typeof AgeWarning> = Template.bind({});
SupportsDarkMode.args = { age: '10 years old', supportsDarkMode: true };
