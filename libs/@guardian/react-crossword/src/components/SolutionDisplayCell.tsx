import { css } from '@emotion/react';
import { useTheme } from '../context/Theme';
import type { AnagramHelperProgress } from '../utils/getAnagramHelperProgressForGroup';

export const SolutionDisplayCell = ({
	progressLetter,
	progressValid,
}: {
	progressLetter: AnagramHelperProgress;
	progressValid: boolean;
}) => {
	const theme = useTheme();
	return (
		<div
			css={css`
				box-sizing: border-box;
				background-color: ${!progressLetter.isSaved
					? theme.unsavedBackground
					: theme.foreground};
				border: 1px solid ${theme.background};
				border-right: ${progressLetter.separator === ','
					? `3px solid ${theme.background}`
					: `1px solid ${theme.background}`};
				width: ${theme.cellSize}px;
				height: ${theme.cellSize}px;
				color: ${progressValid ? theme.text : theme.errorText};
				text-align: center;
				align-content: center;
				position: relative;
			`}
		>
			{progressLetter.separator === '-' && (
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
			{progressLetter.number && (
				<div
					css={css`
						font-size: 0.625rem;
						position: absolute;
						top: 0;
						left: 0;
					`}
				>
					{progressLetter.number}
				</div>
			)}
			{progressLetter.progress}
		</div>
	);
};
