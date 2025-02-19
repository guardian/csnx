import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { separators as separatorData } from '../../stories/formats/separators';
import type { Progress as ProgressType } from '../@types/crossword';
import { ContextProvider } from '../context/ContextProvider';
import { defaultTheme } from '../theme';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
	component: Grid,
	title: 'Components/Grid',
	decorators: [
		(Story, { parameters }) => {
			localStorage.removeItem(`crosswords.${data.id}`);

			return (
				<ContextProvider
					data={data}
					theme={defaultTheme}
					userProgress={parameters.progress as ProgressType}
				>
					<Story />
				</ContextProvider>
			);
		},
	],
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {};

export const Progress: Story = {
	parameters: {
		progress,
	},
};

export const Separators: Story = {
	decorators: [
		(Story) => (
			<ContextProvider data={separatorData} theme={defaultTheme}>
				<Story />
			</ContextProvider>
		),
	],
};
