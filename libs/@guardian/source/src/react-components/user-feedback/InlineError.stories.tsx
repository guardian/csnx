import { breakpoints, palette } from '../../foundations';
import type { Meta, StoryObj } from '@csnx/storybooks/react';
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

export const InlineErrorDefaultTheme: Story = {
	args: {
		children: 'Please enter your name',
	},
};

export const InlineErrorBrandTheme: Story = {
	args: {
		...InlineErrorDefaultTheme.args,
		theme: themeUserFeedbackBrand,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const LongInlineErrorDefaultThemeMobile: Story = {
	args: {
		...InlineErrorDefaultTheme.args,
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
	args: {
		...InlineErrorDefaultTheme.args,
		size: 'small',
	},
};

export const InlineErrorSmallBrandTheme: Story = {
	args: {
		...InlineErrorBrandTheme.args,
		size: 'small',
	},
	parameters: {
		...InlineErrorBrandTheme.parameters,
	},
};

export const InlineErrorCustomTheme: Story = {
	args: {
		...InlineErrorDefaultTheme.args,
		theme: { textError: palette.error[500] },
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
