import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { quick as quickData } from '../../stories/formats/quick';
import { Crossword } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Components/Crossword Interaction',
	args: {
		progress,
		data,
	},
	decorators: [
		(Story) => {
			localStorage.removeItem(`crosswords.${data.id}`);
			localStorage.removeItem(`crosswords.${quickData.id}`);

			return <Story />;
		},
	],
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const ClickedCell: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Click Cell', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
		});
	},
};

export const EnteredClue: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Click Cell', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
			await userEvent.keyboard('BIGAPPLE');
		});
	},
};

export const EnteredClueWithSpaces: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Click Cell', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
			await userEvent.keyboard('BIG APPLE');
		});
	},
};

export const MultipleClues: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Click Cell', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
			await userEvent.keyboard('BIG APPLE');
		});

		await step('Click Cell', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-11-0-crosswords/prize/25220'),
			);
			await userEvent.keyboard('FRENCHLOAF');
		});
	},
};

export const CheckWordIncorrectLetter: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Check word', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
			await userEvent.keyboard('BIG APPEE');
			await userEvent.click(canvas.getByTestId('check-this'));
		});
	},
};

export const CheckWordAllCorrect: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Check word', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
			await userEvent.keyboard('BIG APPLE');
			await userEvent.click(canvas.getByTestId('check-this'));
		});
	},
};

export const ClearWord: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('clear word', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
			await userEvent.keyboard('BIG APPLE');
			await userEvent.click(canvas.getByTestId('clear-this'));
		});
	},
};

export const RevealWord: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('reveal word', async () => {
			await userEvent.click(
				canvas.getByTestId('cell-test-id-1-0-crosswords/prize/25220'),
			);
			await userEvent.click(canvas.getByTestId('reveal-this'));
		});
	},
};

export const RevealAll: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('reveal all', async () => {
			await userEvent.click(canvas.getByTestId('reveal-all'));
			// Confirm reveal all
			await userEvent.click(canvas.getByTestId('reveal-all'));
		});
	},
};

export const CheckAll: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('check all', async () => {
			await userEvent.click(canvas.getByTestId('check-all'));
			await userEvent.click(canvas.getByTestId('check-all'));
		});
	},
};

export const ClearAll: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('clear all', async () => {
			await userEvent.click(canvas.getByTestId('clear-all'));
			await userEvent.click(canvas.getByTestId('clear-all'));
		});
	},
};
