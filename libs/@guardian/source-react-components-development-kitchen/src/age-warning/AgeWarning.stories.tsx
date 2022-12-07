import type { Story } from '@storybook/react';
import type { AgeWarningProps } from './AgeWarning';
import { AgeWarning } from './AgeWarning';

export default {
	component: AgeWarning,
	title: 'AgeWarning',
};

const Template: Story<AgeWarningProps> = (args: AgeWarningProps) => (
	<AgeWarning {...args} />
);

export const ageWarning = Template.bind({});
ageWarning.args = { age: '10 years old' };

export const smallWarning = Template.bind({});
smallWarning.args = { age: '5 months old', size: 'small' };

export const screenReaderVersion = Template.bind({});
screenReaderVersion.args = {
	age: '20 million years old',
	isScreenReader: true,
};

export const missingOldText = Template.bind({});
missingOldText.args = { age: '5 years' };

export const emptyWarningPrefix = Template.bind({});
emptyWarningPrefix.args = { age: '5 years', warningPrefix: '' };

export const customWarningPrefix = Template.bind({});
customWarningPrefix.args = { age: '5 years', warningPrefix: 'This book is ' };

export const supportsDarkMode = Template.bind({});
supportsDarkMode.args = { age: '10 years old', supportsDarkMode: true };
