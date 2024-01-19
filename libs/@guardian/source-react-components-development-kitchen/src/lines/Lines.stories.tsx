import type { Meta, StoryFn } from '@storybook/react';
import { DashedLines as DashedLinesComponent } from './DashedLines';
import { DottedLines as DottedLinesComponent } from './DottedLines';
import type { LinesProps } from './Lines';
import { SquigglyLines as SquigglyLinesComponent } from './SquigglyLines';
import { StraightLines as StraightLinesComponent } from './StraightLines';

const meta: Meta<LinesProps> = {
	title: 'Lines',
	component: StraightLinesComponent,
	args: {
		count: 4,
	},
};

export default meta;

const Template: StoryFn<LinesProps> = (args: LinesProps) => {
	switch (args.effect) {
		case 'dotted':
			return <DottedLinesComponent {...args} />;
		case 'dashed':
			return <DashedLinesComponent {...args} />;
		case 'squiggly':
			return <SquigglyLinesComponent {...args} />;
		case 'straight':
		default:
			return <StraightLinesComponent {...args} />;
	}
};

export const DefaultLines: StoryFn<LinesProps> = Template.bind({});

// *****************************************************************************

export const DottedLines: StoryFn<LinesProps> = Template.bind({});
DottedLines.args = {
	effect: 'dotted',
};

// *****************************************************************************

export const SquigglyLines: StoryFn<LinesProps> = Template.bind({});
SquigglyLines.args = {
	effect: 'squiggly',
};

// *****************************************************************************

export const DashedLines: StoryFn<LinesProps> = Template.bind({});
DashedLines.args = {
	effect: 'dashed',
};

// *****************************************************************************

export const SingleLine: StoryFn<LinesProps> = Template.bind({});
SingleLine.args = {
	count: 1,
};

// *****************************************************************************

export const FourLines: StoryFn<LinesProps> = Template.bind({});
FourLines.args = {
	count: 4,
};

// *****************************************************************************

export const EightLines: StoryFn<LinesProps> = Template.bind({});
EightLines.args = {
	count: 8,
};

// *****************************************************************************

export const BlueLines: StoryFn<LinesProps> = Template.bind({});
BlueLines.args = {
	color: 'blue',
};
