import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgCross, TextInput } from '@guardian/source/react-components';
import { useCallback, useEffect, useState } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { useUIState } from '../context/UI';
import { biasedShuffle } from '../utils/biasedShuffle';
import type { CellsWithProgress } from '../utils/getCellsWithProgressForGroup';
import { getCellsWithProgressForGroup } from '../utils/getCellsWithProgressForGroup';
import { Button } from './Button';
import { Clue } from './Clue';
import { SolutionDisplay } from './SolutionDisplay';
import { WordWheel } from './WordWheel';

export const AnagramHelper = () => {
	const [letters, setLetters] = useState<string>('');
	const [solving, setSolving] = useState(false);
	const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
	const theme = useTheme();
	const { setShowAnagramHelper } = useUIState();
	const { entries, cells } = useData();
	const { currentEntryId } = useCurrentClue();
	const { progress } = useProgress();
	const entry = currentEntryId ? entries.get(currentEntryId) : undefined;

	const [cellsWithProgress, setCellsWithProgress] = useState<CellsWithProgress>(
		getCellsWithProgressForGroup({
			entry,
			cells,
			entries,
			progress,
		}),
	);

	const back = useCallback(() => {
		setShuffledLetters([]);
		setSolving(false);
	}, []);

	const shuffle = useCallback(() => {
		setShuffledLetters(biasedShuffle(letters.split('')));
	}, [letters]);

	const start = useCallback(() => {
		shuffle();
		setSolving(true);
		const copyOfLetters = [...letters.split('')];
		setCellsWithProgress((cells) => {
			const newCells = [...cells];
			for (const [index, cellWithProgress] of cellsWithProgress.entries()) {
				const letterIndex = copyOfLetters.indexOf(cellWithProgress.progress);
				if (letterIndex !== -1 && newCells[index]) {
					newCells[index].candidate =
						copyOfLetters.splice(letterIndex, 1)[0] ?? '';
				}
			}
			return newCells;
		});
	}, [cellsWithProgress, letters, shuffle]);

	useEffect(() => {
		back();
	}, [back]);

	return (
		<div
			css={css`
				box-sizing: border-box;
				position: fixed;
				overflow: auto;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				background-color: ${theme.anagramHelperBackground};
				padding: 10px;
				min-height: fit-content;
				z-index: 2;
			`}
		>
			<div
				css={css`
					display: flex;
					width: 100%;
					justify-content: flex-end;
					margin-bottom: ${space[4]}px;
				`}
			>
				<Button
					onSuccess={() => setShowAnagramHelper(false)}
					size="small"
					priority="tertiary"
				>
					<SvgCross size="xsmall" />
				</Button>
			</div>
			<div
				css={css`
					display: flex;
					align-items: center;
					flex-direction: column;
				`}
			>
				{!solving && (
					<div
						css={css`
							box-sizing: border-box;
							display: grid;
							justify-items: center;
							grid-template-columns: 1fr auto;
						`}
					>
						<div>
							<TextInput
								hideLabel={true}
								label="Enter letters"
								spellCheck="false"
								onChange={(event) => {
									const letters = event.target.value.replace(
										/[^A-Za-zÀ-ÿ0-9]/g,
										'',
									);
									setLetters(letters.toUpperCase());
								}}
								value={letters}
								maxLength={cellsWithProgress.length}
							/>
						</div>
						<Button
							cssOverrides={css`
								margin: ${space[1]}px 0 0 ${space[1]}px;
							`}
							onSuccess={start}
							disabled={letters.length < 1}
							priority="primary"
							size="default"
						>
							Start
						</Button>
						<span>
							{letters.length}/{cellsWithProgress.length}
						</span>
					</div>
				)}
				{solving && (
					<>
						<WordWheel letters={shuffledLetters} />
						<div
							css={css`
								margin: ${space[4]}px ${space[1]}px;
								* {
									margin: 0 ${space[1]}px;
								}
							`}
						>
							<Button onSuccess={back} size={'default'} priority="secondary">
								Back
							</Button>
							<Button onSuccess={shuffle} size={'default'} priority="primary">
								Shuffle
							</Button>
						</div>
					</>
				)}
				<div
					css={css`
						width: 100%;
						margin: ${space[4]}px 0 ${space[4]}px;
						border-top: 1px solid ${theme.background};
					`}
				/>
				{entry && <Clue entry={entry} />}
				<SolutionDisplay
					cellsWithProgress={cellsWithProgress}
					setCellsWithProgress={setCellsWithProgress}
				/>
			</div>
		</div>
	);
};
