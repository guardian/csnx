import * as React from 'react';
import { cellSize } from '../../components';
import { Direction, GuardianClue } from './../../interfaces';

function getPos(val: number) {
	return val * (cellSize + 1) + 1;
}

interface GridSeparatorProps {
	char: ',' | '-';
	col: number;
	row: number;
	direction: Direction;
}

function GridSeparator({ char, col, row, direction }: GridSeparatorProps) {
	const top = getPos(row);
	const left = getPos(col);
	const across = direction === 'across';

	if (char === ',') {
		const width = across ? 1 : cellSize;
		const height = across ? cellSize : 1;
		const x = across ? left - 2 : left;
		const y = across ? top : top - 2;

		return <rect width={width} height={height} x={x} y={y} />;
	}

	if (char === '-') {
		const width = across ? cellSize * 0.25 : 1;
		const height = across ? 1 : cellSize * 0.25;
		const x = across
			? left - 0.5 - width * 0.5
			: left + cellSize * 0.5 + width * 0.5;
		const y = across
			? top + cellSize * 0.5 + height * 0.5
			: top - 0.5 - height * 0.5;

		return <rect width={width} height={height} x={x} y={y} />;
	}

	return <></>;
}

function getGridSeparator(char: ',' | '-', pos: number, clue: GuardianClue) {
	// don't show separators between split words i.e. in a group
	if (pos <= 0 || pos >= clue.length) {
		return null;
	}

	const x = clue.position.x + (clue.direction === 'across' ? pos : 0);
	const y = clue.position.y + (clue.direction === 'across' ? 0 : pos);
	return (
		<GridSeparator
			key={[x, y, clue.direction].join(',')}
			char={char}
			direction={clue.direction}
			col={x}
			row={y}
		/>
	);
}

interface GridSeparatorsProps {
	clues: GuardianClue[];
}

function GridSeparators({ clues }: GridSeparatorsProps) {
	return (
		<svg className="GridSeparators">
			{clues
				.filter((clue) => Object.keys(clue.separatorLocations).length > 0)
				.map((clue) => {
					const separators = [];
					const commas = clue.separatorLocations[','];
					const hyphens = clue.separatorLocations['-'];

					if (commas !== undefined) {
						separators.push(
							commas.map((pos) => getGridSeparator(',', pos, clue)),
						);
					}

					if (hyphens !== undefined) {
						separators.push(
							hyphens.map((pos) => getGridSeparator('-', pos, clue)),
						);
					}

					return separators;
				})}
		</svg>
	);
}

export default React.memo(GridSeparators);
