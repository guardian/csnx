import type { Meta } from '@storybook/react';
import { type StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { defaultTheme } from '../theme';
import { WordWheel } from './WordWheel';

const meta: Meta<typeof WordWheel> = {
	component: WordWheel,
	title: 'Components/WordWheel',
	args: {},
	decorators: [
		(Story) => (
			<ContextProvider data={data} theme={defaultTheme}>
				<Story />
			</ContextProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof WordWheel>;

export const Default: Story = {
	args: {
		letters: ['A', 'B', 'C', 'D', 'E'],
	},
};

export const TenLetters: Story = {
	args: {
		letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
	},
};

export const TwentyLetters: Story = {
	args: {
		letters: [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
		],
	},
};
