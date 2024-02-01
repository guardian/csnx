import type { Meta, StoryFn } from '@storybook/react';
import { Radio } from './Radio';
import RadioStories from './Radio.stories';
import type { RadioGroupProps } from './RadioGroup';
import { RadioGroup } from './RadioGroup';
import { themeRadioBrand } from './theme';

const meta: Meta<typeof RadioGroup> = {
	title: 'RadioGroup',
	component: RadioGroup,
	args: {
		name: 'colours',
		label: 'Select your preferred colour',
		supporting: '',
		hideLabel: false,
		orientation: 'vertical',
		error: '',
	},
	argTypes: {
		// Override the control so that users can try entering a string in the Storybook canvas
		supporting: {
			control: {
				type: 'text',
			},
		},
		id: { control: null },
		className: { control: null },
		cssOverrides: { control: null },
	},
};

export default meta;

const Image = () => (
	<img
		style={{ padding: `8px 0` }}
		alt="test"
		src="https://i.guim.co.uk/img/media/9bd896505173dcf4adadd02e5f40a03414c50bdc/172_201_2329_1397/master/2329.jpg?width=620&quality=85&auto=format&fit=max&s=133b7c6ce78a0780e99e605bb3ae7479"
	/>
);

const Template: StoryFn<typeof RadioGroup> = (args: RadioGroupProps) => (
	<RadioGroup {...args}>
		<Radio {...RadioStories.args} theme={args.theme} key="radio-1" />
		<Radio label="Blue" value="blue" theme={args.theme} key="radio-2" />
	</RadioGroup>
);

export const DefaultDefaultTheme: StoryFn<typeof RadioGroup> = Template.bind(
	{},
);

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<typeof RadioGroup> = Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
DefaultBrandTheme.args = {
	theme: themeRadioBrand,
};

// *****************************************************************************

export const HorizontalDefaultTheme: StoryFn<typeof RadioGroup> = Template.bind(
	{},
);
HorizontalDefaultTheme.args = {
	orientation: 'horizontal',
};

// *****************************************************************************

export const VisuallyHideLegendDefaultTheme: StoryFn<typeof RadioGroup> =
	Template.bind({});
VisuallyHideLegendDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof RadioGroup> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'You can always change it later',
};

// *****************************************************************************

export const SupportingTextBrandTheme: StoryFn<typeof RadioGroup> =
	Template.bind({});
SupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
SupportingTextBrandTheme.args = {
	supporting: 'You can always change it later',
	theme: themeRadioBrand,
};

// *****************************************************************************

export const SupportingMediaDefaultTheme: StoryFn<typeof RadioGroup> =
	Template.bind({});
SupportingMediaDefaultTheme.args = {
	supporting: <Image />,
};

// *****************************************************************************

export const ErrorDefaultTheme: StoryFn<typeof RadioGroup> = Template.bind({});
ErrorDefaultTheme.args = {
	error: 'The selected colour is out of stock',
};

// *****************************************************************************

export const ErrorBrandTheme: StoryFn<typeof RadioGroup> = Template.bind({});
ErrorBrandTheme.args = {
	error: 'The selected colour is out of stock',
	theme: themeRadioBrand,
};
ErrorBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const SupportingMediaWithErrorDefaultTheme: StoryFn<typeof RadioGroup> =
	Template.bind({});
SupportingMediaWithErrorDefaultTheme.args = {
	error: 'Please select a colour',
	supporting: <Image />,
};
