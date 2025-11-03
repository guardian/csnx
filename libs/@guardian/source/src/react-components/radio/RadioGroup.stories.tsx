import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette } from '../../foundations';
import { Radio } from './Radio';
import * as RadioStories from './Radio.stories';
import { RadioGroup } from './RadioGroup';
import type { ThemeRadio } from './theme';
import { themeRadioBrand, themeRadioGroupBrand } from './theme';

const meta: Meta<typeof RadioGroup> = {
	title: 'React Components/RadioGroup',
	component: RadioGroup,
	argTypes: {
		// Override the control so that users can try entering a string in the Storybook canvas
		supporting: {
			control: {
				type: 'text',
			},
		},
		id: { control: { disable: true } },
		className: { control: { disable: true } },
		cssOverrides: { control: { disable: true } },
	},
};

export default meta;
type Story = StoryObj<
	React.ComponentProps<typeof RadioGroup> & {
		themeChild?: Partial<ThemeRadio>;
	}
>;

const Image = () => (
	<img
		style={{ padding: `8px 0` }}
		alt="test"
		src="https://i.guim.co.uk/img/media/9bd896505173dcf4adadd02e5f40a03414c50bdc/172_201_2329_1397/master/2329.jpg?width=620&quality=85&auto=format&fit=max&s=133b7c6ce78a0780e99e605bb3ae7479"
	/>
);

const Template: Story = {
	render: (args) => (
		<RadioGroup {...args}>
			<Radio
				{...RadioStories.DefaultDefaultTheme.args}
				theme={args.themeChild}
				key="radio-1"
			/>
			<Radio label="Blue" value="blue" theme={args.themeChild} key="radio-2" />
		</RadioGroup>
	),
};

export const DefaultDefaultTheme: Story = {
	...Template,
	args: {
		name: 'colours',
		label: 'Select your preferred colour',
		supporting: '',
		hideLabel: false,
		orientation: 'vertical',
		error: '',
	},
};

export const DefaultBrandTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		theme: themeRadioGroupBrand,
		themeChild: themeRadioBrand,
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const HorizontalDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		orientation: 'horizontal',
	},
};

export const VisuallyHideLegendDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const SupportingTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'You can always change it later',
	},
};

export const SupportingTextBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'You can always change it later',
	},
	globals: {
		...DefaultBrandTheme.globals,
	},
};

export const SupportingMediaDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: <Image />,
	},
};

export const ErrorDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		error: 'The selected colour is out of stock',
	},
};

export const ErrorBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		error: 'The selected colour is out of stock',
	},
	globals: {
		...DefaultBrandTheme.globals,
	},
};

export const SupportingMediaWithErrorDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		error: 'Please select a colour',
		supporting: <Image />,
	},
};

export const DefaultCustomTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		theme: { textLabel: palette.neutral[86] },
		themeChild: {
			fillSelected: palette.brand[800],
			fillUnselected: palette.neutral[20],
			borderSelected: palette.brand[800],
			borderUnselected: palette.neutral[60],
			borderHover: palette.brand[800],
			textLabel: palette.neutral[86],
		},
	},
	globals: {
		backgrounds: {
			value: 'palette.neutral[10]',
		},
	},
};
