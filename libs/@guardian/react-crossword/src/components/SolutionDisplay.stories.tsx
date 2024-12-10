import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import type { CellsWithProgress } from '../utils/getCellsWithProgressForGroup';
import { SolutionDisplay } from './SolutionDisplay';

const Template = () => {
	const [cellsWithProgress, setCellsWithProgress] = useState<CellsWithProgress>(
		[
			{
				x: 0,
				y: 0,
				progress: 'T',
				candidate: '',
			},
			{ x: 1, y: 0, progress: 'E', candidate: 'E' },
			{
				x: 2,
				y: 0,
				progress: 'S',
				candidate: 'S',
			},
			{ x: 3, y: 0, progress: '', candidate: '' },
		],
	);

	return (
		<SolutionDisplay
			cellsWithProgress={cellsWithProgress}
			setCellsWithProgress={setCellsWithProgress}
		/>
	);
};

const meta: Meta<typeof SolutionDisplay> = {
	component: SolutionDisplay,
	title: 'Components/SolutionDisplay',
	args: {},
	decorators: [
		(Story) => (
			<ContextProvider data={data}>
				<Story />
			</ContextProvider>
		),
	],
};

export default meta;

export const Default = Template.bind({});
