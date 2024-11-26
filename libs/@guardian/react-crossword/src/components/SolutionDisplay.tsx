import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { Dispatch, FormEvent, KeyboardEvent, SetStateAction } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { GroupProgress } from '../utils/getProgressForEntry';
import { getSeparatorFromEntry } from '../utils/getProgressForEntry';
import { SolutionDisplayCell } from './SolutionDisplayCell';

type SolutionDisplayProps = {
	entry: CAPIEntry;
	setProgressLetters: Dispatch<SetStateAction<GroupProgress[]>>;
	progressLetters: GroupProgress[];
	setCandidateLetters: Dispatch<SetStateAction<string[]>>;
	candidateLetters: string[];
};
export const SolutionDisplay = ({
	entry,
	setProgressLetters,
	progressLetters,
	setCandidateLetters,
	candidateLetters,
}: SolutionDisplayProps) => {
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, progressLetters.length);
	}, [progressLetters]);

	const updateCandidateLetter = (event: KeyboardEvent<HTMLInputElement>) => {
		const index = Number(event.currentTarget.getAttribute('data-index'));
		if (isNaN(index) || (event.key.length !== 1 && event.key !== 'Backspace')) {
			return;
		}
		setCandidateLetters((prevState) => {
			const newCandidateLetters = [...prevState];
			if (event.key.length === 1 && !isNaN(index)) {
				newCandidateLetters[index] = event.key.toUpperCase();
				inputRefs.current[index + 1]?.focus();
			}
			if (event.key === 'Backspace' && !isNaN(index)) {
				newCandidateLetters[index] = '';
				inputRefs.current[index - 1]?.focus();
			}
			return newCandidateLetters;
		});
	};

	const updateProgressLetter = (event: FormEvent<HTMLButtonElement>) => {
		const index = Number(event.currentTarget.getAttribute('data-index'));
		const newProgressLetters = [...progressLetters];
		if (!isUndefined(newProgressLetters[index])) {
			newProgressLetters[index].progress = candidateLetters[index] ?? '';
		}
		setProgressLetters(newProgressLetters);
	};

	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				max-width: 90%;
				margin-top: ${space[4]}px;
			`}
		>
			{progressLetters.map((progressLetter, index) => {
				return (
					<SolutionDisplayCell
						index={index}
						progressLetter={progressLetter}
						candidateLetter={candidateLetters[index] ?? ''}
						onKeyDown={updateCandidateLetter}
						onLock={updateProgressLetter}
						ref={(element: HTMLInputElement) =>
							(inputRefs.current[index] = element)
						}
						separator={getSeparatorFromEntry(entry, index)}
					/>
				);
			})}
		</div>
	);
};
