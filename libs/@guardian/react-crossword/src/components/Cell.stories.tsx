import type { Meta, StoryObj } from '@storybook/react';
import type { Theme } from '../@types/crossword';
import { ThemeProvider, useTheme } from '../context/Theme';
import { defaultTheme } from '../theme';
import type { CellProps } from './Cell';
import { Cell } from './Cell';

const meta: Meta<typeof Cell> = {
	component: Cell,
	title: 'Components/Cell',
	parameters: {
		theme: defaultTheme,
	},
	decorators: [
		(Story) => {
			const theme = useTheme();

			return (
				<svg
					style={{
						padding: theme.gridGutterSize,
						width: theme.gridCellSize,
						height: theme.gridCellSize,
						backgroundColor: theme.gridBackgroundColor,
					}}
					viewBox={`0 0 ${theme.gridCellSize} ${theme.gridCellSize}`}
				>
					<Story />
				</svg>
			);
		},
		(Story, { parameters }) => {
			return (
				<ThemeProvider theme={parameters.theme as Theme}>
					<Story />
				</ThemeProvider>
			);
		},
	],
};

const args: CellProps = {
	x: 0,
	y: 0,
	data: {
		x: 0,
		y: 0,
		group: ['1-across'],
	},
};

export default meta;
type Story = StoryObj<typeof Cell>;

export const Default: Story = { args };

export const Black: Story = {
	args: {
		...args,
		data: {
			...args.data,
			group: undefined,
		},
	},
};

export const Highlighted: Story = {
	args: {
		...args,
		isHighlighted: true,
	},
};

export const Active: Story = {
	args: {
		...args,
		isActive: true,
		isHighlighted: true,
	},
};

export const WithNumber: Story = {
	args: {
		...args,
		data: {
			...args.data,
			number: 1,
		},
	},
};

export const Progress: Story = {
	args: {
		...args,
		guess: 'A',
	},
};

export const DiacriticProgress: Story = {
	args: {
		...args,
		guess: 'Å',
	},
};

export const ProgressWithNumber: Story = {
	args: {
		...args,
		data: {
			...args.data,
			number: 1,
		},
		guess: 'A',
	},
};

export const BigCellProgressWithNumber: Story = {
	args: {
		...args,
		data: {
			...args.data,
			number: 1,
		},
		guess: 'A',
	},
	parameters: {
		theme: {
			...defaultTheme,
			gridCellSize: 50,
		},
	},
};

export const HugeCellProgressWithNumber: Story = {
	args: {
		...args,
		data: {
			...args.data,
			number: 1,
		},
		guess: 'A',
	},
	parameters: {
		theme: {
			...defaultTheme,
			gridCellSize: 100,
		},
	},
};
