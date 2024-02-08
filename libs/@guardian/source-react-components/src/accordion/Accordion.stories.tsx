import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import type { AccordionProps } from './Accordion';
import { Accordion } from './Accordion';
import { AccordionRow } from './AccordionRow';

const meta: Meta<typeof Accordion> = {
	title: 'Accordion',
	component: Accordion,
	args: {
		hideToggleLabel: false,
	},
};

export default meta;

const Template: StoryFn<typeof Accordion> = (args: AccordionProps) => (
	<Accordion {...args}>
		<AccordionRow {...args} label="Collecting from multiple newsagents">
			Present your card to a newsagent each time you collect the paper. The
			newsagent will scan your card and will be reimbursed for each transaction
			automatically.
		</AccordionRow>
		<AccordionRow {...args} label="Delivery from your retailer">
			Simply give your preferred store / retailer the barcode printed on your
			subscription letter.
		</AccordionRow>
	</Accordion>
);

export const WithCTALabelsDefaultTheme: StoryFn<typeof Accordion> =
	Template.bind({});

// *****************************************************************************

export const WithoutCTALabelsDefaultTheme: StoryFn<typeof Accordion> =
	Template.bind({});
WithoutCTALabelsDefaultTheme.args = {
	hideToggleLabel: true,
};

// *****************************************************************************

export const WithCTALabelsCustomTheme: StoryFn<typeof Accordion> =
	Template.bind({});
WithCTALabelsCustomTheme.args = {
	theme: {
		border: palette.neutral[60],
		text: palette.neutral[86],
		label: palette.neutral[86],
		ctaText: palette.neutral[86],
	},
};
WithCTALabelsCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
// *****************************************************************************

export const WithoutCTALabelsCustomTheme: StoryFn<typeof Accordion> =
	Template.bind({});
WithoutCTALabelsCustomTheme.args = {
	hideToggleLabel: true,
	theme: {
		border: palette.neutral[60],
		text: palette.neutral[86],
		label: palette.neutral[86],
	},
};
WithoutCTALabelsCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
