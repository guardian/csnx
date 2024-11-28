import { css } from '@emotion/react';
import { SvgPadlock } from '@guardian/source/react-components';
import type { FormEvent, KeyboardEvent } from 'react';
import { forwardRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import type { AnagramHelperProgress } from '../utils/getAnagramHelperProgressForGroup';
import { Button } from './Button';

export type SolutionDisplayCellProps = {
	shuffled: boolean;
	progressLetter: AnagramHelperProgress;
	candidateLetter: string;
	onDragEnd: () => void;
	onDragStart: () => void;
	onDragEnter: () => void;
	index: number;
	onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLButtonElement>) => void;
};

export const Cell = ({
	progressLetter,
	progressValid,
}: {
	progressLetter: AnagramHelperProgress;
	progressValid: boolean;
}) => {
	const theme = useContext(ThemeContext);
	return (
		<div
			css={css`
				box-sizing: border-box;
				background-color: ${!progressLetter.isSaved
					? theme.UnsavedBackground
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

export const SolutionDisplayCell = forwardRef<
	HTMLInputElement,
	SolutionDisplayCellProps
>(
	(
		{
			shuffled,
			progressLetter,
			candidateLetter,
			onDragStart,
			onDragEnter,
			onDragEnd,
			onSubmit,
			index,
			onKeyDown,
		},
		ref,
	) => {
		const progressValid =
			progressLetter.progress === candidateLetter ||
			progressLetter.progress === '' ||
			!shuffled;
		const theme = useContext(ThemeContext);
		return (
			<div
				css={css`
					display: flex;
					flex-direction: column;
					width: ${theme.cellSize}px;
					margin-right: -1px;
					margin-bottom: 10px;
				`}
			>
				<input
					aria-label={`cell ${index}`}
					ref={ref}
					draggable={true}
					value={candidateLetter}
					onDragStart={onDragStart}
					onDragEnter={onDragEnter}
					onDragEnd={onDragEnd}
					onChange={() => {}}
					onKeyDown={onKeyDown}
					maxLength={1}
					tabIndex={index + 1}
					data-index={index}
					css={css`
						cursor: ${candidateLetter !== '' ? 'grab' : 'auto'};
						box-sizing: border-box;
						border: 1px solid ${theme.background};
						border-radius: 4px;
						width: ${theme.cellSize - 1}px;
						height: ${theme.cellSize - 1}px;
						margin-left: 1px;
						text-align: center;
						align-content: center;
						caret-color: transparent;
					`}
				/>
				{progressLetter.progress !== candidateLetter && shuffled && (
					<Button
						onSuccess={onSubmit}
						data-index={index}
						size="xsmall"
						aria-label="lock"
						cssOverrides={css`
							padding: 0;
						`}
					>
						<SvgPadlock theme={{ fill: 'white' }} size="xsmall" />
					</Button>
				)}
				<Cell progressLetter={progressLetter} progressValid={progressValid} />
			</div>
		);
	},
);
