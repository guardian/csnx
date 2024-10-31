import { css } from '@emotion/react';
import { Cell, SeparatorLocations } from './../../interfaces';

// Define styles
const solutionDisplayStyle = css`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
`;

const letterStyle = css`
	color: #000; // vars.$grid-color
	border: 1px solid #ccc; // vars.$light-grey
	padding: 4px; // vars.$grid-size * 0.4
	margin-top: 4px; // vars.$grid-size * 0.4
	margin-right: 2px; // vars.$grid-size * 0.2
	min-width: 15px; // vars.$grid-size * 1.5
	height: 15px; // vars.$grid-size * 1.5
	text-transform: uppercase;
	user-select: none;
	box-sizing: content-box;
`;

const populatedStyle = css`
	background-color: rgba(0, 0, 0, 0.08); // vars.$faint-grey3
	border-color: #000; // vars.$grid-color
`;

const missingStyle = css`
	color: red;
	border-color: red;
	background-color: rgba(255, 0, 0, 0.1);
`;

const hasSpaceStyle = css`
	margin-right: 15px; // vars.$grid-size * 1.5
`;

const hasHyphenStyle = css`
	position: relative;

	&::after {
		position: absolute;
		content: '—';
		top: 5px; // vars.$grid-size * 0.5
		left: 20px; // vars.$grid-size * 2
		font-size: 10px; // vars.$font-size-small
		font-weight: bold;
	}
`;

// Utility function to determine separator style
function getSeparatorStyle(
	separators: SeparatorLocations,
	letterIndex: number,
) {
	const includesLetter = (seps: number[]) => seps.includes(letterIndex);

	const spaces = separators[','];
	if (includesLetter(spaces)) {
		return hasSpaceStyle;
	}

	const hyphens = separators['-'];
	if (includesLetter(hyphens)) {
		return hasHyphenStyle;
	}

	return undefined;
}

function filterLetters(letters: string, blacklist: string) {
	let filteredLetters = letters;

	blacklist.split('').forEach((badLetter) => {
		filteredLetters = filteredLetters.replace(badLetter, '');
	});

	return filteredLetters;
}

interface SolutionDisplayProps {
	cells: Cell[];
	letters?: string;
	separators: SeparatorLocations;
	shuffling: boolean;
}

export default function SolutionDisplay({
	cells,
	letters,
	separators,
	shuffling,
}: SolutionDisplayProps) {
	const flatCells = cells.map((cell) => cell.guess).join('');
	const filteredLetters =
		letters !== undefined
			? filterLetters(letters?.toUpperCase(), flatCells)
			: undefined;
	let upperLetters = letters?.toUpperCase();
	let j = 0;

	return (
		<div css={solutionDisplayStyle}>
			{cells.map((cell, i) => {
				const inLetters =
					cell.guess !== undefined && upperLetters?.includes(cell.guess);
				if (inLetters) {
					upperLetters = upperLetters?.replace(cell.guess!, '');
				}

				return (
					<span
						css={[
							letterStyle,
							cell.guess !== undefined && populatedStyle,
							shuffling &&
								cell.guess !== undefined &&
								letters !== undefined &&
								!inLetters &&
								missingStyle,
							getSeparatorStyle(separators, i + 1),
						]}
						key={`${cell.val}-${i}`}
					>
						{cell.guess ??
							(shuffling &&
							filteredLetters !== undefined &&
							filteredLetters[j] !== undefined
								? filteredLetters[j++]
								: null)}
					</span>
				);
			})}
		</div>
	);
}
