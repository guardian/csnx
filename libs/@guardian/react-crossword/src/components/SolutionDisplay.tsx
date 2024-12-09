import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import { useRef } from 'react';
import { useTheme } from '../context/Theme';
import type {
	CellsWithProgress,
	CellWithProgress,
} from '../utils/getCellsWithProgressForGroup';

type SolutionDisplayProps = {
	shuffledLetters: string[];
	cellsWithProgress: CellsWithProgress;
};

const getMatchedAndShuffledLetters = ({
	shuffledLetters,
	cellsWithProgress,
}: SolutionDisplayProps): string[] => {
	// Make copy of shuffled letters so we can mutate it without affecting the original
	const shuffledLettersCopy = [...shuffledLetters];

	const matchedLetters = Array.from(
		{ length: cellsWithProgress.length },
		() => '',
	);

	// Match the letters in the cells with the shuffled letters
	for (const [index, cellWithProgress] of cellsWithProgress.entries()) {
		const shuffleLetterIndex = shuffledLettersCopy.indexOf(
			cellWithProgress.progress,
		);
		if (shuffleLetterIndex !== -1) {
			matchedLetters[index] =
				shuffledLettersCopy.splice(shuffleLetterIndex, 1)[0] ?? '';
		}
	}

	// Fill in the remaining cells with the shuffled letters
	return matchedLetters.map((letter) => {
		if (letter === '') {
			return shuffledLettersCopy.pop() ?? '';
		}
		return letter;
	});
};

export const SolutionDisplayCell = ({
	cellWithProgress,
	shuffledLetter,
}: {
	cellWithProgress: CellWithProgress;
	shuffledLetter: string;
}) => {
	const theme = useTheme();
	return (
		<div
			css={css`
				box-sizing: border-box;
				${textSans12};
				font-size: ${theme.cellSize * 0.6}px;
				background-color: ${theme.foreground};
				border: 1px solid ${theme.background};
				border-right: ${cellWithProgress.separator === ','
					? `3px solid ${theme.background}`
					: `1px solid ${theme.background}`};
				width: ${theme.cellSize}px;
				height: ${theme.cellSize}px;
				text-align: center;
				align-content: center;
				position: relative;
				color: ${cellWithProgress.progress
					? theme.text
					: theme.provisionalText};
			`}
		>
			{cellWithProgress.separator === '-' && (
				<div
					css={css`
						position: absolute;
						height: 2px;
						top: ${theme.cellSize / 2 - 0.5}px;
						left: ${theme.cellSize - 5}px;
						width: 7px;
						background-color: ${theme.background};
						z-index: 1;
					`}
				></div>
			)}
			{cellWithProgress.number && (
				<div
					css={css`
						${textSans12};
						font-size: ${Math.max(9, Math.round(theme.cellSize * 0.2))}px;
						position: absolute;
						top: 0;
						left: 0;
					`}
				>
					{cellWithProgress.number}
				</div>
			)}
			{cellWithProgress.progress === ''
				? shuffledLetter
				: cellWithProgress.progress}
		</div>
	);
};

export const SolutionDisplay = ({
	cellsWithProgress,
	shuffledLetters,
}: SolutionDisplayProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();
	const solutionDisplayLetters = getMatchedAndShuffledLetters({
		shuffledLetters,
		cellsWithProgress,
	});
	return (
		<div
			ref={containerRef}
			css={css`
				display: flex;
				justify-content: center;
				flex-direction: row;
				flex-wrap: wrap;
				max-width: 90%;
			`}
		>
			{cellsWithProgress.map((cellWithProgress, index) => {
				return (
					<div
						key={index}
						css={css`
							display: flex;
							flex-direction: column;
							width: ${theme.cellSize}px;
							margin-right: -1px;
							position: relative;
						`}
					>
						<SolutionDisplayCell
							cellWithProgress={cellWithProgress}
							shuffledLetter={solutionDisplayLetters[index] ?? ''}
						/>
					</div>
				);
			})}
		</div>
	);
};
