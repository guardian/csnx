import type { Meta, StoryObj } from '@storybook/react';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { SolutionDisplayCell } from './SolutionDisplayCell';

const meta: Meta<typeof SolutionDisplayCell> = {
	component: SolutionDisplayCell,
	title: 'Components/SolutionDisplayCell',

	args: {},
	decorators: [
		(Story) => (
			<ThemeContext.Provider value={defaultTheme}>
				<Story />
			</ThemeContext.Provider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof SolutionDisplayCell>;

export const Default: Story = {
	args: {
		progressLetter: {
			coords: { x: 0, y: 0 },
			progress: 'T',
			isTemporary: false,
		},
		candidateLetter: 'T',
		index: 0,
		onKeyDown: () => {},
		onSubmit: () => {},
	},
};

export const Temporary: Story = {
	args: {
		progressLetter: {
			coords: { x: 0, y: 0 },
			progress: 'T',
			isTemporary: true,
		},
		candidateLetter: 'T',
		index: 0,
		onKeyDown: () => {},
		onSubmit: () => {},
	},
};
