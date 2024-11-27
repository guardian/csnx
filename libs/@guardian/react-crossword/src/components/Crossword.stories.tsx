import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { quick as quickData } from '../../stories/formats/quick';
import { Crossword } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Components/Crossword',
	args: {
		progress,
		data,
	},
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const Default: Story = {};

export const ShortContainer: StoryFn = () => {
	return (
		<>
			<div style={{ height: 400 }}>
				<Crossword data={data} progress={[]} />
			</div>
		</>
	);
};

export const MultiplePlayersColumn: StoryFn = () => {
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
				<Crossword data={data} progress={[]} />
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
				<Crossword data={data} progress={[]} />
				<div style={{ width: 1, borderLeft: '1px dotted black' }} />
				<Crossword data={quickData} progress={[]} />
			</div>
		</>
	);
};

export const CustomLayout: StoryFn = () => {
	const Header = (props: { children: ReactNode }) => (
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
			{...props}
		/>
	);
	return (
		<Crossword data={data} progress={[]}>
			<div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
				<div style={{ flex: 1, minWidth: '15em' }}>
					<Crossword.Clues direction="across" header={<Header>👉</Header>} />
				</div>
				<div style={{ flexBasis: 496, minWidth: '15em' }}>
					<Crossword.Grid />
					<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
						<Crossword.Controls />
					</div>
					<div
						style={{
							fontFamily: 'cursive',
							transform: 'rotate(5deg)',
							transformOrigin: 'top left',
						}}
					>
						<Crossword.SavedMessage />
					</div>
				</div>
				<div style={{ flex: 1, minWidth: '15em' }}>
					<Crossword.Clues direction="down" header={<Header>👇</Header>} />
				</div>
			</div>
		</Crossword>
	);
};

export const Themed: Story = {
	args: {
		background:
			'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
		foreground: 'blue',
		text: 'limegreen',
		gutter: 0,
		highlight: 'yellow',
		focus: 'black',
		active: 'orange',
		cellSize: 30,
		buttonBackground: 'cyan',
		buttonBackgroundHover: 'magenta',
		border: 'lightpink',
	},
};
