import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme } from '../theme';
import { Cell } from './Cell';

const meta: Meta<typeof Cell> = {
	component: Cell,
	title: 'Components/Cell',
	args: {
		theme: defaultTheme,
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
	},
	decorators: [
		(Story, { args }) => (
			<svg
				style={{
					padding: args.theme.gutter,
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

export const Default: Story = {};

export const Black: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
		},
	},
};

export const Focussed: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		isFocused: true,
	},
};

export const Related: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		isRelated: true,
	},
};

export const Active: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		isActive: true,
		isRelated: true,
	},
};

export const ActiveAndFocused: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		isActive: true,
		isRelated: true,
		isFocused: true,
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

export const Progress: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		guess: 'A',
	},
};

export const ProgressWithNumber: Story = {
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

export const BigCellProgressWithNumber: Story = {
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
