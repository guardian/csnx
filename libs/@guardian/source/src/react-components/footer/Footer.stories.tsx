import type { StoryObj, Meta } from '@storybook/react';
import { breakpoints } from '../../foundations';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
	component: Footer,
	title: 'React Components/Footer',
	argTypes: {
		children: {
			options: ['with', 'without'],
			mapping: {
				without: undefined,
				with: (
					<p>
						<strong>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</strong>
						<br />
						Ut proverbia non nulla veriora sint quam vestra dogmata. Ampulla
						enim sit necne sit, quis non iure optimo irrideatur, si laboret?
						Quae quo sunt excelsiores, eo dant clariora indicia naturae.
					</p>
				),
			},
			control: { type: 'radio' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const DefaultDefaultTheme: Story = {
	args: { children: 'with' },
};

export const DefaultTabletDefaultTheme: StoryObj<typeof Footer> = {
	args: { ...DefaultDefaultTheme.args },
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};

export const DefaultMobileDefaultTheme: Story = {
	args: { ...DefaultDefaultTheme.args },
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobileMedium],
		},
	},
};

export const WithBackToTopDefaultTheme: Story = {
	args: { ...DefaultDefaultTheme.args, showBackToTop: true },
};

export const WithBackToTopTabletDefaultTheme: Story = {
	args: {
		...WithBackToTopDefaultTheme.args,
	},
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};

export const WithBackToTopMobileDefaultTheme: StoryObj<typeof Footer> = {
	args: {
		...WithBackToTopDefaultTheme.args,
	},
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobileMedium],
		},
	},
};

export const WithoutChildrenDefaultTheme: Story = {
	args: { children: 'without' },
};

export const WithoutChildrenTabletDefaultTheme: Story = {
	args: { ...WithoutChildrenDefaultTheme.args },
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};

export const WithoutChildrenMobileDefaultTheme: Story = {
	args: { ...WithoutChildrenDefaultTheme.args },
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobileMedium],
		},
	},
};

export const WithoutChildrenWithBackToTopDefaultTheme: Story = {
	args: {
		...WithoutChildrenDefaultTheme.args,
		showBackToTop: true,
	},
};

export const WithoutChildrenWithBackToTopTabletDefaultTheme: Story = {
	args: {
		...WithoutChildrenDefaultTheme.args,
		showBackToTop: true,
	},
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};

export const WithoutChildrenWithBackToTopMobileDefaultTheme: Story = {
	args: {
		...WithoutChildrenDefaultTheme.args,
		showBackToTop: true,
	},
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobileMedium],
		},
	},
};
