import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { quick as quickData } from '../../stories/formats/quick';
import type { Direction } from '../@types/Direction';
import type { LayoutProps } from '../@types/Layout';
import { Crossword } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Components/Crossword',
	args: {
		progress,
		data,
	},
	decorators: [
		(Story) => {
			localStorage.removeItem(data.id);
			localStorage.removeItem(quickData.id);

			return <Story />;
		},
	],
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const Default: Story = {};

export const ShortContainer: StoryFn = () => {
	return (
		<>
			<div style={{ height: 400 }}>
				<Crossword data={data} progress={progress} />
			</div>
		</>
	);
};

export const MultiplePlayersColumn: StoryFn = () => {
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
				<Crossword data={data} progress={progress} />
				<div style={{ height: 1, borderTop: '1px dotted black' }} />
				<Crossword data={quickData} progress={[]} />
			</div>
		</>
	);
};

export const MultiplePlayersRow: StoryFn = () => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: 20,
				}}
			>
				<Crossword data={data} progress={progress} />
				<div style={{ width: 1, borderLeft: '1px dotted black' }} />
				<Crossword data={quickData} progress={[]} />
			</div>
		</>
	);
};

export const CustomLayoutRaw: StoryFn = () => {
	const Layout = ({ Clues, Grid, Controls, SavedMessage }: LayoutProps) => {
		return (
			<>
				<Grid />
				<Controls />
				<SavedMessage />
				<Clues direction="across" />
				<Clues direction="down" />
			</>
		);
	};
	return <Crossword data={data} progress={progress} Layout={Layout} />;
};

export const CustomisedLayout: StoryFn = () => {
	const CluesHeader = (props: { direction: Direction }) => (
		<h2
			style={{
				fontFamily: 'monospace',
				border: `3px solid lightgrey`,
				backgroundColor: 'black',
				borderRadius: 100,
				aspectRatio: 1,
				width: '2em',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: '0.5em',
			}}
		>
			{props.direction === 'across' ? '👉' : '👇'}
		</h2>
	);

	const Layout = ({ Clues, Grid, Controls, SavedMessage }: LayoutProps) => {
		return (
			<div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
				<div style={{ flex: 1, minWidth: '15em' }}>
					<Clues direction="across" Header={CluesHeader} />
				</div>
				<div style={{ flexBasis: 496, minWidth: '15em' }}>
					<Grid />
					<Controls />
					<div
						style={{
							fontFamily: 'cursive',
							transform: 'rotate(5deg)',
							transformOrigin: 'top left',
						}}
					>
						<SavedMessage />
					</div>
				</div>
				<div style={{ flex: 1, minWidth: '15em' }}>
					<Clues direction="down" Header={CluesHeader} />
				</div>
			</div>
		);
	};

	return <Crossword data={data} progress={progress} Layout={Layout} />;
};

export const Themed: Story = {
	args: {
		gridBackgroundColor:
			'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
		gridForegroundColor: 'blue',
		textColor: 'limegreen',
		gridGutterSize: 0,
		relatedColor: 'yellow',
		focusColor: 'black',
		selectedColor: 'orange',
		gridCellSize: 30,
		buttonBackgroundColor: 'cyan',
		buttonBackgroundHoverColor: 'magenta',
		borderColor: 'lightpink',
	},
};
