import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
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
				${textSans12};
				font-size: ${theme.cellSize * 0.6}px;
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
						${textSans12};
						font-size: ${Math.max(9, Math.round(theme.cellSize * 0.2))}px;
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
