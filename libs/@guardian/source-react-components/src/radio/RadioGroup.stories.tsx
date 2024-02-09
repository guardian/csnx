import type { Meta, StoryFn } from '@storybook/react';
import { Radio } from './Radio';
import RadioStories from './Radio.stories';
import { RadioGroup } from './RadioGroup';
import { ThemeRadio, themeRadioBrand, themeRadioGroupBrand } from './theme';
import { palette } from '@guardian/source-foundations';

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

type RadioGroupPropsAndCustomArgs = React.ComponentProps<typeof RadioGroup> & {
	themeRadio?: Partial<ThemeRadio>;
};

const Template: StoryFn<RadioGroupPropsAndCustomArgs> = (
	args: RadioGroupPropsAndCustomArgs,
) => (
	<RadioGroup {...args}>
		<Radio {...RadioStories.args} theme={args.themeRadio} key="radio-1" />
		<Radio label="Blue" value="blue" theme={args.themeRadio} key="radio-2" />
	</RadioGroup>
);

export const DefaultDefaultTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
DefaultBrandTheme.args = {
	theme: themeRadioGroupBrand,
	themeRadio: themeRadioBrand,
};

// *****************************************************************************

export const HorizontalDefaultTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
HorizontalDefaultTheme.args = {
	orientation: 'horizontal',
};

// *****************************************************************************

export const VisuallyHideLegendDefaultTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
VisuallyHideLegendDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'You can always change it later',
};

// *****************************************************************************

export const SupportingTextBrandTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
SupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
SupportingTextBrandTheme.args = {
	supporting: 'You can always change it later',
	theme: themeRadioGroupBrand,
	themeRadio: themeRadioBrand,
};

// *****************************************************************************

export const SupportingMediaDefaultTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
SupportingMediaDefaultTheme.args = {
	supporting: <Image />,
};

// *****************************************************************************

export const ErrorDefaultTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
ErrorDefaultTheme.args = {
	error: 'The selected colour is out of stock',
};

// *****************************************************************************

export const ErrorBrandTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
ErrorBrandTheme.args = {
	error: 'The selected colour is out of stock',
	theme: themeRadioGroupBrand,
	themeRadio: themeRadioBrand,
};
ErrorBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const SupportingMediaWithErrorDefaultTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
SupportingMediaWithErrorDefaultTheme.args = {
	error: 'Please select a colour',
	supporting: <Image />,
};

// *****************************************************************************

export const DefaultCustomTheme: StoryFn<RadioGroupPropsAndCustomArgs> =
	Template.bind({});
DefaultCustomTheme.args = {
	theme: { textLabel: palette.neutral[86] },
	themeRadio: {
		fillSelected: palette.brand[800],
		fillUnselected: palette.neutral[20],
		borderSelected: palette.brand[800],
		borderUnselected: palette.neutral[60],
		borderHover: palette.brand[800],
		textLabel: palette.neutral[86],
	},
};
DefaultCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
