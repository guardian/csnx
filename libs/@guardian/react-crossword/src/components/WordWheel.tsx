import { css } from '@emotion/react';
import { textSans17, textSansBold17 } from '@guardian/source/foundations';
import { useContext } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { getProgressForEntry } from '../utils/getProgressForEntry';

export type WordWheelProps = {
	letters: string;
	entry: CAPIEntry;
};

type WordWheelLetter = {
	letter: string;
	matchingProgress: boolean;
};

export const WordWheel = ({ letters, entry }: WordWheelProps) => {
	const { progress } = useContext(ProgressContext);
	const theme = useContext(ThemeContext);
	const entryProgress = getProgressForEntry(entry, progress);

	const letterArray: WordWheelLetter[] = letters
		.toUpperCase()
		.split('')
		.map((letter) => {
			const matchingProgress = entryProgress.includes(letter);
			if (matchingProgress) {
				entryProgress.splice(entryProgress.indexOf(letter), 1);
			}
			return {
				letter,
				matchingProgress,
			};
		});

	const outerLetters = letterArray;
	const centerLetter =
		letterArray.length > 4 ? outerLetters.shift() : undefined;
	const radius = 70;
	const centerX = 100;
	const centerY = 100;

	const getPosition = (index: number): { x: number; y: number } => {
		const angle = (360 / outerLetters.length) * index;
		const radian = (angle * Math.PI) / 180; // Convert degrees to radians
		return {
			x: centerX + radius * Math.cos(radian),
			y: centerY + radius * Math.sin(radian),
		};
	};

	const renderOuterLetters = (): JSX.Element[] => {
		return outerLetters.map((wordWheelLetter, index) => {
			const { x, y } = getPosition(index);
			return (
				<text
					key={index}
					x={x}
					y={y}
					textAnchor="middle"
					dominantBaseline="middle"
					css={css`
						${textSans17}
					`}
					fill={wordWheelLetter.matchingProgress ? theme.highlight : theme.text}
				>
					{wordWheelLetter.letter}
				</text>
			);
		});
	};

	return (
		<svg width="200" height="200">
			{centerLetter && (
				<text
					x={centerX}
					y={centerY}
					textAnchor="middle"
					dominantBaseline="middle"
					css={css`
						${textSansBold17}
					`}
					fill={centerLetter.matchingProgress ? theme.highlight : theme.text}
				>
					{centerLetter.letter}
				</text>
			)}
			{renderOuterLetters()}
		</svg>
	);
};
