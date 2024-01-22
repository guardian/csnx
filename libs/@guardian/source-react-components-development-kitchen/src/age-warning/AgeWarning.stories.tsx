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

export const ageWarning: StoryFn<typeof AgeWarning> = Template.bind({});
ageWarning.args = { age: '10 years old' };

export const smallWarning: StoryFn<typeof AgeWarning> = Template.bind({});
smallWarning.args = { age: '5 months old', size: 'small' };

export const screenReaderVersion: StoryFn<typeof AgeWarning> = Template.bind(
	{},
);
screenReaderVersion.args = {
	age: '20 million years old',
	isScreenReader: true,
};

export const missingOldText: StoryFn<typeof AgeWarning> = Template.bind({});
missingOldText.args = { age: '5 years' };

export const emptyWarningPrefix: StoryFn<typeof AgeWarning> = Template.bind({});
emptyWarningPrefix.args = { age: '5 years', warningPrefix: '' };

export const customWarningPrefix: StoryFn<typeof AgeWarning> = Template.bind(
	{},
);
customWarningPrefix.args = { age: '5 years', warningPrefix: 'This book is ' };

export const supportsDarkMode: StoryFn<typeof AgeWarning> = Template.bind({});
supportsDarkMode.args = { age: '10 years old', supportsDarkMode: true };
