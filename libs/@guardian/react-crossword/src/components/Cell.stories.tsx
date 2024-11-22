import type { Meta, StoryObj } from '@storybook/react';
import { useContext } from 'react';
import type { Theme } from '../@types/crossword';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { Cell } from './Cell';

const meta: Meta<typeof Cell> = {
	component: Cell,
	title: 'Components/Cell',
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
	},
	parameters: {
		theme: defaultTheme,
	},
	decorators: [
		(Story) => {
			const theme = useContext(ThemeContext);

			return (
				<svg
					style={{
						padding: theme.gutter,
						width: theme.cellSize,
						height: theme.cellSize,
						backgroundColor: theme.background,
					}}
					viewBox={`0 0 ${theme.cellSize} ${theme.cellSize}`}
				>
					<Story />
				</svg>
			);
		},
		(Story, { parameters }) => {
			return (
				<ThemeContext.Provider value={parameters.theme as Theme}>
					<Story />
				</ThemeContext.Provider>
			);
		},
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

export const Highlighted: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		isHighlighted: true,
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
		isHighlighted: true,
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
	},
	parameters: {
		theme: {
			...defaultTheme,
			cellSize: 50,
		},
	},
};
