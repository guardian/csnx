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
				width: args.cellSize,
				height: args.cellSize,
				backgroundColor: defaultTheme.background,
			}}
			viewBox={`0 0 ${args.cellSize} ${args.cellSize}`}
		>
			<Cell {...args} theme={defaultTheme} cellSize={args.cellSize} />
		</svg>
	);
};

export const Default: StoryFn<typeof Cell> = Template.bind({});
Default.args = {
	data: {
		x: 0,
		y: 0,
	},
	cellSize: 16,
};

export const Empty: StoryFn<typeof Cell> = Template.bind({});
Empty.args = {
	data: {
		x: 0,
		y: 0,
		group: ['1-across'],
	},
	cellSize: 16,
};

export const WithNumber: StoryFn<typeof Cell> = Template.bind({});
WithNumber.args = {
	data: {
		x: 0,
		y: 0,
		number: 1,
		group: ['1-across'],
	},
	cellSize: 16,
};

export const Guessed: StoryFn<typeof Cell> = Template.bind({});
Guessed.args = {
	data: {
		x: 0,
		y: 0,
		group: ['1-across'],
	},
	guess: 'A',
	cellSize: 16,
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
	cellSize: 16,
};

export const BigCellGuessedWithNumber: StoryFn<typeof Cell> = Template.bind({});
BigCellGuessedWithNumber.args = {
	data: {
		x: 0,
		y: 0,
		number: 1,
		group: ['1-across'],
	},
	guess: 'A',
	cellSize: 50,
};
