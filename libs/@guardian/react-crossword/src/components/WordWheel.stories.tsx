import type { Meta } from '@storybook/react';
import { type StoryObj } from '@storybook/react';
import { WordWheel } from './WordWheel';

const meta: Meta<typeof WordWheel> = {
	component: WordWheel,
	title: 'Components/WordWheel',
	args: {},
};

export default meta;

type Story = StoryObj<typeof WordWheel>;

export const Default: Story = {
	args: {
		candidateLetters: ['A'],
	},
};

export const TenLetters: Story = {
	args: {
		candidateLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
	},
};

export const TwentyLetters: Story = {
	args: {
		candidateLetters: [
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
