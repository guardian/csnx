import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme } from '../theme';
import { Cell } from './Cell';

const meta: Meta<typeof Cell> = {
	component: Cell,
	title: 'Components/Cell',
	args: {
		theme: defaultTheme,
	},
	decorators: [
		(Story, { args }) => (
			<svg
				style={{
					border: `5px solid green`,
					width: args.theme.cellSize,
					height: args.theme.cellSize,
					backgroundColor: args.theme.background,
				}}
				viewBox={`0 0 ${args.theme.cellSize} ${args.theme.cellSize}`}
			>
				<Story />
			</svg>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Cell>;

export const Default: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
		},
	},
};

export const Empty: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
	},
};

export const WithNumber: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			number: 1,
			group: ['1-across'],
		},
	},
};

export const Guessed: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		guess: 'A',
	},
};

export const GuessedWithNumber: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			number: 1,
			group: ['1-across'],
		},
		guess: 'A',
	},
};

export const BigCellGuessedWithNumber: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			number: 1,
			group: ['1-across'],
		},
		guess: 'A',
		theme: {
			...defaultTheme,
			cellSize: 50,
		},
	},
};
