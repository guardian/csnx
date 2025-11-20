import type { Meta, StoryObj } from '@storybook/react-vite';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import type { Theme } from '../@types/crossword';
import { ContextProvider } from '../context/ContextProvider';
import { useTheme } from '../context/Theme';
import { defaultTheme } from '../theme';
import type { BaseCellProps } from './Cell';
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
				<ContextProvider data={data} theme={parameters.theme as Theme}>
					<Story />
				</ContextProvider>
			);
		},
	],
};

const args: BaseCellProps = {
	x: 0,
	y: 0,
	data: {
		x: 0,
		y: 0,
		group: ['1-across'],
	},
	isBlackCell: false,
	handleInput: () => {},
	handleKeyDown: () => {},
};

export default meta;
type Story = StoryObj<typeof Cell>;

export const Default: Story = {
	args: {
		...args,
	},
};

export const Black: Story = {
	args: {
		...args,
		isBlackCell: true,
	},
};

export const Highlighted: Story = {
	args: {
		...args,
		isConnected: true,
	},
};

export const Active: Story = {
	args: {
		...args,
		isSelected: true,
		isConnected: true,
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
