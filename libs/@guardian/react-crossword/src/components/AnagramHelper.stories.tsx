import type { Meta, StoryObj } from '@storybook/react-vite';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress12Across } from '../../stories/formats/grouped-clues.progress';
import { ContextProvider } from '../context/ContextProvider';
import { ShowAnagramHelperProvider } from '../context/ShowAnagramHelper';
import { defaultTheme } from '../theme';
import { AnagramHelper } from './AnagramHelper';

const meta: Meta<typeof AnagramHelper> = {
	component: AnagramHelper,
	title: 'Components/Anagram Helper',
	decorators: [
		(Story) => (
			<ContextProvider
				data={data}
				theme={defaultTheme}
				selectedEntryId="12-across"
				userProgress={progress12Across}
			>
				<ShowAnagramHelperProvider userShowAnagramHelper={true}>
					<Story />
				</ShowAnagramHelperProvider>
			</ContextProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof AnagramHelper>;

export const Default: Story = {
	args: {},
};

export const LongClue: Story = {
	decorators: [
		(Story) => (
			<ContextProvider
				data={data}
				theme={defaultTheme}
				selectedEntryId="7-across"
			>
				<ShowAnagramHelperProvider userShowAnagramHelper={true}>
					<Story />
				</ShowAnagramHelperProvider>
			</ContextProvider>
		),
	],
};
