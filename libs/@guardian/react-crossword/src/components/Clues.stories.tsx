import type { Meta, StoryObj } from '@storybook/react-vite';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { ContextProvider } from '../context/ContextProvider';
import { ValidAnswersProvider } from '../context/ValidAnswers';
import { defaultTheme } from '../theme';
import { Clues } from './Clues';

const meta: Meta<typeof Clues> = {
	component: Clues,
	title: 'Components/Clues',
	args: {
		direction: 'across',
	},
	decorators: [
		(Story) => {
			localStorage.removeItem(`crosswords.${data.id}`);

			return (
				<ContextProvider
					data={data}
					userProgress={progress}
					theme={defaultTheme}
				>
					<Story />
				</ContextProvider>
			);
		},
		(Story) => (
			<div role="application">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Clues>;

export const Default: Story = {};

export const WithSuccess: Story = {
	decorators: [
		(Story) => (
			<ContextProvider data={data} userProgress={progress} theme={defaultTheme}>
				<ValidAnswersProvider validAnswers={new Set(['7-across'])}>
					<Story />
				</ValidAnswersProvider>
			</ContextProvider>
		),
	],
};
