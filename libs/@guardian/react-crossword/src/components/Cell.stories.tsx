import type { Meta, StoryObj } from '@storybook/react';
import { useContext } from 'react';
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
	decorators: [
		(Story) => (
			<ThemeContext.Provider value={defaultTheme}>
				<Story />
			</ThemeContext.Provider>
		),
		(Story) => {
			const theme = useContext(ThemeContext);

			return (
				<svg
					style={{
						border: `5px solid green`,
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

export const ActiveAndFocused: Story = {
	args: {
		data: {
			x: 0,
			y: 0,
			group: ['1-across'],
		},
		isActive: true,
		isHighlighted: true,
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
	},
	decorators: [
		(Story) => (
			<ThemeContext.Provider
				value={{
					...defaultTheme,
					cellSize: 50,
				}}
			>
				<Story />
			</ThemeContext.Provider>
		),
	],
};
