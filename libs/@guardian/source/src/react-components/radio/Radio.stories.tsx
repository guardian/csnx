import type { Meta, StoryObj } from '@storybook/react';
import { breakpoints, palette } from '../../foundations';
import { Radio } from './Radio';
import { themeRadioBrand } from './theme';

const meta: Meta<typeof Radio> = {
	title: 'React Components/Radio',
	component: Radio,
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
		},
		supporting: {
			control: {
				type: 'text',
			},
		},
		cssOverrides: { control: { disable: true } },
	},
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const DefaultDefaultTheme: Story = {
	args: {
		label: 'Red',
		value: 'red',
		supporting: '',
		defaultChecked: true,
	},
};

export const DefaultBrandTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		theme: themeRadioBrand,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const SupportingTextDefaultTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Hex colour code: #ff0000',
	},
};

export const SupportingTextBrandTheme: Story = {
	args: {
		...DefaultBrandTheme.args,
		supporting: 'Hex colour code: #ff0000',
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const SupportingTextOnlyDefaultTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Hex colour code: #ff0000',
		label: null,
	},
};

export const SupportingTextOnlyBrandTheme: Story = {
	args: {
		...DefaultBrandTheme.args,
		supporting: 'Hex colour code: #ff0000',
		label: null,
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const UnlabelledDefaultTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		label: undefined,
	},
};

export const LongLabelMobileDefaultTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		label:
			'Circulation / Visitors / Audience (for News media, Magazine and Exhibition requests)',
	},
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const DefaultCustomTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		theme: {
			fillSelected: palette.brand[800],
			fillUnselected: palette.neutral[20],
			borderSelected: palette.brand[800],
			borderUnselected: palette.neutral[60],
			borderHover: palette.brand[800],
			textLabel: palette.neutral[86],
		},
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
