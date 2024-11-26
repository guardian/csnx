import { css } from '@emotion/react';
import { SvgArrowDownStraight } from '@guardian/source/react-components';
import type { FormEvent, KeyboardEvent } from 'react';
import { forwardRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import type { GroupProgress } from '../utils/getProgressForEntry';
import { Button } from './Button';

export type SolutionDisplayCellProps = {
	progressLetter: GroupProgress;
	candidateLetter: string;
	index: number;
	separator?: ',' | '-';
	onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
	onLock: (event: FormEvent<HTMLButtonElement>) => void;
};
export const SolutionDisplayCell = forwardRef<
	HTMLInputElement,
	SolutionDisplayCellProps
>(
	(
		{ progressLetter, candidateLetter, separator, onLock, index, onKeyDown },
		ref,
	) => {
		const theme = useContext(ThemeContext);

		return (
			<div
				css={css`
					display: flex;
					flex-direction: column;
				`}
			>
				<input
					ref={ref}
					onKeyDown={onKeyDown}
					maxLength={1}
					tabIndex={index + 1}
					data-index={index}
					css={css`
						border: 1px solid
							${progressLetter.progress === candidateLetter ||
							!progressLetter.progress
								? '#ccc'
								: 'red'};
						width: ${theme.cellSize}px;
						height: ${theme.cellSize}px;
						text-align: center;
						align-content: center;
					`}
					value={candidateLetter}
				></input>
				<Button onSuccess={onLock} data-index={index}>
					<SvgArrowDownStraight theme={{ fill: 'white' }} />
				</Button>
				<span
					css={css`
						border: 1px solid
							${progressLetter.progress === candidateLetter ||
							!progressLetter.progress
								? '#ccc'
								: 'red'};
						width: ${theme.cellSize}px;
						height: ${theme.cellSize}px;
						text-align: center;
						align-content: center;
					`}
				>
					{progressLetter.progress}
				</span>
			</div>
		);
	},
);
