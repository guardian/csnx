import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgCross, TextInput } from '@guardian/source/react-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useShowAnagramHelper } from '../context/ShowAnagramHelper';
import { useTheme } from '../context/Theme';
import { biasedShuffle } from '../utils/biasedShuffle';
import { getCellsWithProgressForGroup } from '../utils/getCellsWithProgressForGroup';
import { Clue } from './Clue';
import { CrosswordButton } from './CrosswordButton';
import { SolutionDisplay } from './SolutionDisplay';
import { WordWheel } from './WordWheel';

const inputRegex = /[^A-Za-zÀ-ÿ0-9]/g;

export const AnagramHelper = () => {
	const [letters, setLetters] = useState('');
	const [solving, setSolving] = useState(false);
	const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
	const theme = useTheme();
	const { setShowAnagramHelper, showAnagramHelper } = useShowAnagramHelper();
	const { entries, cells } = useData();
	const { currentEntryId } = useCurrentClue();
	const { progress } = useProgress();

	const entry = useMemo(() => {
		return currentEntryId ? entries.get(currentEntryId) : undefined;
	}, [currentEntryId, entries]);

	const cellsWithProgress = useMemo(() => {
		return getCellsWithProgressForGroup({
			entry,
			cells,
			entries,
			progress,
		});
	}, [entry, cells, entries, progress]);

	const reset = useCallback(() => {
		setShuffledLetters([]);
		setSolving(false);
	}, []);

	const shuffle = useCallback(() => {
		setShuffledLetters(biasedShuffle(letters.split('')));
	}, [letters]);

	const start = useCallback(() => {
		shuffle();
		setSolving(true);
	}, [shuffle]);

	useEffect(() => {
		reset();
	}, [reset]);

	if (!showAnagramHelper) {
		return null;
	}

	return (
		<div
			css={css`
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				background-color: ${theme.anagramHelperBackgroundColor};
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
				<CrosswordButton
					onClick={() => setShowAnagramHelper(false)}
					size="small"
					priority="tertiary"
				>
					<SvgCross size="xsmall" />
				</CrosswordButton>
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
									const letters = event.target.value.replace(inputRegex, '');
									setLetters(letters.toUpperCase());
								}}
								value={letters}
								maxLength={cellsWithProgress.length}
							/>
						</div>
						<CrosswordButton
							cssOverrides={css`
								margin: ${space[1]}px 0 0 ${space[1]}px;
							`}
							onClick={start}
							disabled={letters.length < 1}
							priority="primary"
							size="default"
						>
							Start
						</CrosswordButton>
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
								margin: ${space[4]}px 0 0;
								> * {
									margin: 0 ${space[1]}px;
								}
							`}
						>
							<CrosswordButton
								onClick={reset}
								size={'default'}
								priority="secondary"
							>
								Back
							</CrosswordButton>
							<CrosswordButton
								onClick={shuffle}
								size={'default'}
								priority="primary"
							>
								Shuffle
							</CrosswordButton>
						</div>
					</>
				)}
				<div
					css={css`
						width: 100%;
						margin: ${space[4]}px 0 ${space[4]}px;
						border-top: 1px solid ${theme.gridBackgroundColor};
					`}
				/>
				{entry && <Clue entry={entry} />}
				<SolutionDisplay
					cellsWithProgress={cellsWithProgress}
					shuffledLetters={shuffledLetters}
				/>
			</div>
		</div>
	);
};
