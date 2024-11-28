import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgCross } from '@guardian/source/react-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { Entries } from '../@types/crossword';
import { ProgressContext } from '../context/ProgressContext';
import type { AnagramHelperProgress } from '../utils/getAnagramHelperProgressForGroup';
import { getAnagramHelperProgressForGroup } from '../utils/getAnagramHelperProgressForGroup';
import { Button } from './Button';
import { Clue } from './Clue';
import { SolutionDisplay } from './SolutionDisplay';
import { SolutionDisplayKey } from './SolutionDisplayKey';
import { WordWheel } from './WordWheel';

interface AnagramHelperProps {
	entry: CAPIEntry;
	entries: Entries;
	gridHeight: number;
	gridWidth: number;
	onClose: () => void;
}

export const AnagramHelper = ({
	entry,
	entries,
	onClose,
	gridHeight,
	gridWidth,
}: AnagramHelperProps) => {
	const { progress, updateProgress } = useContext(ProgressContext);
	const [progressLetters, setProgressLetters] = useState<
		AnagramHelperProgress[]
	>([]);

	// initialise candidate letters to equal progress letters
	const [candidateLetters, setCandidateLetters] = useState<string[]>([]);

	useEffect(() => {
		const progressLetters = getAnagramHelperProgressForGroup({
			entry,
			entries,
			progress,
		});
		setProgressLetters(
			getAnagramHelperProgressForGroup({ entry, entries, progress }),
		);
		setCandidateLetters(
			progressLetters.map((progressLetter) => progressLetter.progress),
		);
	}, [entries, entry, progress]);

	const save = useCallback(() => {
		for (const progressLetter of progressLetters) {
			updateProgress({
				...progressLetter.coords,
				value: progressLetter.progress,
			});
		}
	}, [progressLetters, updateProgress]);

	const shuffle = useCallback(() => {
		setCandidateLetters((prevState) => {
			const shuffleLetters = [...prevState];
			const matchedLetters = Array.from(
				{ length: progressLetters.length },
				() => '',
			);
			// remove letters that exist in progressLetters but only the number of times they exist
			progressLetters.forEach((groupProgress, index) => {
				const shuffleLetterIndex = shuffleLetters.indexOf(
					groupProgress.progress,
				);
				if (shuffleLetterIndex !== -1) {
					matchedLetters[index] =
						shuffleLetters.splice(shuffleLetterIndex, 1)[0] ?? '';
				}
			});

			// shuffle the candidate letters and remove blanks
			shuffleLetters
				.sort(() => Math.random() - 0.5)
				.filter((shuffleLetter) => shuffleLetter !== '');

			return matchedLetters.map((letter) => {
				if (letter === '') {
					return shuffleLetters.pop() ?? '';
				}
				return letter;
			});
		});
	}, [progressLetters]);

	return (
		<div
			css={css`
				display: flex;
				box-sizing: border-box;
				flex-direction: column;
				background-color: floralwhite;
				padding: 10px;
				min-height: fit-content;
				height: ${gridHeight}px;
				max-width: ${gridWidth}px;
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
				<Button onSuccess={onClose} size="small">
					<SvgCross size="small" theme={{ fill: 'white' }} />
				</Button>
			</div>
			<div
				css={css`
					display: flex;
					align-items: center;
					flex-direction: column;

					> * {
						margin-bottom: ${space[4]}px;
					}
				`}
			>
				<div
					css={css`
						display: flex;
						width: 100%;
						justify-content: center;
					`}
				>
					<WordWheel candidateLetters={candidateLetters} />
				</div>
				<div
					css={css`
						> * {
							margin: 0 ${space[1]}px;
						}
					`}
				>
					<Button onSuccess={shuffle} priority="primary">
						shuffle
					</Button>
					<Button
						onSuccess={save}
						priority="secondary"
						requireConfirmation={true}
					>
						save
					</Button>
				</div>
				<div
					css={css`
						margin-top: 10px;
					`}
				>
					<Clue entry={entry} />
				</div>
				<SolutionDisplay
					candidateLetters={candidateLetters}
					setCandidateLetters={setCandidateLetters}
					setProgressLetters={setProgressLetters}
					progressLetters={progressLetters}
				/>
				<SolutionDisplayKey />
			</div>
		</div>
	);
};
