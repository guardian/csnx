import type { Meta, StoryObj } from '@storybook/react';
import { breakpoints, palette } from '../../foundations';
import { InlineError } from './InlineError';
import { themeUserFeedbackBrand } from './theme';

const meta: Meta<typeof InlineError> = {
	title: 'React Components/InlineError',
	component: InlineError,
	args: {
		size: 'medium',
	},
};

export default meta;
type Story = StoryObj<typeof InlineError>;

const InlineErrorTemplate: Story = {
	render: (args) => (
		<InlineError {...args}>
			{args.children ?? 'Please enter your name'}
		</InlineError>
	),
};

export const InlineErrorDefaultTheme: Story = {
	...InlineErrorTemplate,
};

export const InlineErrorBrandTheme: Story = {
	...InlineErrorTemplate,
	args: {
		theme: themeUserFeedbackBrand,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const LongInlineErrorDefaultThemeMobile: Story = {
	...InlineErrorTemplate,
	args: {
		children: 'Please pick a date in the future, but not a leap year',
	},
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobileMedium],
		},
	},
};

export const InlineErrorSmallDefaultTheme: Story = {
	...InlineErrorTemplate,
	args: {
		size: 'small',
	},
};

export const InlineErrorSmallBrandTheme: Story = {
	...InlineErrorTemplate,
	args: {
		size: 'small',
		theme: themeUserFeedbackBrand,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const InlineErrorCustomTheme: Story = {
	...InlineErrorTemplate,
	args: {
		theme: { textError: palette.error[500] },
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
