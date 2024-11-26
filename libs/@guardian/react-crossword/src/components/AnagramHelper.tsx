import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgCross } from '@guardian/source/react-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { Entries } from '../@types/crossword';
import { ProgressContext } from '../context/ProgressContext';
import { getProgressForGroup } from '../utils/getProgressForEntry';
import { Button } from './Button';
import { Clue } from './Clue';
import { SolutionDisplay } from './SolutionDisplay';
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
	const { progress } = useContext(ProgressContext);
	const [progressLetters, setProgressLetters] = useState<string[]>(
		getProgressForGroup(entry, entries, progress),
	);
	const [candidateLetters, setCandidateLetters] = useState<string[]>(
		Array.from({ length: progressLetters.length }, () => ''),
	);

	useEffect(() => {
		setProgressLetters(getProgressForGroup(entry, entries, progress));
		setCandidateLetters(
			Array.from({ length: progressLetters.length }, () => ''),
		);
	}, [entries, entry, progress, progressLetters.length]);

	const shuffle = useCallback(() => {
		setCandidateLetters((prevState) => {
			const shuffleLetters = [...prevState];
			const matchedLetters = Array.from(
				{ length: progressLetters.length },
				() => '',
			);
			// remove letters that exist in progressLetters but only the number of times they exist
			progressLetters.forEach((letter, index) => {
				const shuffleLetterIndex = shuffleLetters.indexOf(letter);
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
					<WordWheel letters={candidateLetters.join('')} entry={entry} />
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
				</div>
				<div
					css={css`
						margin-top: 10px;
					`}
				>
					<Clue entry={entry} />
				</div>
				<SolutionDisplay
					entry={entry}
					candidateLetters={candidateLetters}
					setCandidateLetters={setCandidateLetters}
					setProgressLetters={setProgressLetters}
					progressLetters={progressLetters}
				/>
			</div>
		</div>
	);
};
