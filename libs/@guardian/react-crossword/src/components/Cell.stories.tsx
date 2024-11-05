import type { Meta, StoryFn } from '@storybook/react';
import { defaultTheme } from '../theme';
import type { CellProps } from './Cell';
import { Cell } from './Cell';

const meta: Meta<typeof Cell> = {
	component: Cell,
	title: 'Cell',
};

export default meta;

const Template: StoryFn<typeof Cell> = (args: CellProps) => {
	return (
		<svg
			style={{
				border: `5px solid green`,
				width: 16,
				height: 16,
				backgroundColor: defaultTheme.background,
			}}
			viewBox={`0 0 16 16`}
		>
			<Cell {...args} theme={defaultTheme} />
		</svg>
	);
};

export const Default: StoryFn<typeof Cell> = Template.bind({});
Default.args = {
	data: {
		x: 0,
		y: 0,
	},
};

export const Empty: StoryFn<typeof Cell> = Template.bind({});
Empty.args = {
	data: {
		x: 0,
		y: 0,
		group: ['1-across'],
	},
};

export const WithNumber: StoryFn<typeof Cell> = Template.bind({});
WithNumber.args = {
	data: {
		x: 0,
		y: 0,
		number: 1,
		group: ['1-across'],
	},
};

export const Guessed: StoryFn<typeof Cell> = Template.bind({});
Guessed.args = {
	data: {
		x: 0,
		y: 0,
		group: ['1-across'],
	},
	guess: 'A',
};

export const GuessedWithNumber: StoryFn<typeof Cell> = Template.bind({});
GuessedWithNumber.args = {
	data: {
		x: 0,
		y: 0,
		number: 1,
		group: ['1-across'],
	},
	guess: 'A',
};
