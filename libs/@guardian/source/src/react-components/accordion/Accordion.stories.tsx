import type { Meta, StoryObj } from '@storybook/react';
import { palette } from '../../foundations';
import { Accordion } from './Accordion';
import { AccordionRow } from './AccordionRow';

const meta: Meta<typeof Accordion> = {
	title: 'React Components/Accordion',
	component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const Template: Story = {
	render: (args) => (
		<Accordion hideToggleLabel={args.hideToggleLabel} theme={args.theme}>
			<AccordionRow
				label="Collecting from multiple newsagents"
				theme={args.theme}
			>
				Present your card to a newsagent each time you collect the paper. The
				newsagent will scan your card and will be reimbursed for each
				transaction automatically.
			</AccordionRow>
			<AccordionRow label="Delivery from your retailer" theme={args.theme}>
				Simply give your preferred store / retailer the barcode printed on your
				subscription letter.
			</AccordionRow>
		</Accordion>
	),
};

export const WithCTALabelsDefaultTheme: Story = {
	...Template,
	args: {
		hideToggleLabel: false,
	},
};

export const WithoutCTALabelsDefaultTheme: Story = {
	...Template,
	args: {
		hideToggleLabel: true,
	},
};

export const WithCTALabelsCustomTheme: Story = {
	...Template,
	args: {
		...WithCTALabelsDefaultTheme.args,
		theme: {
			textCta: palette.neutral[86],
			textLabel: palette.neutral[86],
			textBody: palette.neutral[86],
			border: palette.neutral[60],
			iconFill: palette.neutral[86],
		},
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};

export const WithoutCTALabelsCustomTheme: Story = {
	...Template,
	args: {
		...WithCTALabelsCustomTheme.args,
		hideToggleLabel: true,
	},
	parameters: {
		...WithCTALabelsCustomTheme.parameters,
	},
};
