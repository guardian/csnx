import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { Dispatch, FormEvent, KeyboardEvent, SetStateAction } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import type { AnagramHelperProgress } from '../utils/getAnagramHelperProgressForGroup';
import { SolutionDisplayCell } from './SolutionDisplayCell';

type SolutionDisplayProps = {
	shuffled: boolean;
	setProgressLetters: Dispatch<SetStateAction<AnagramHelperProgress[]>>;
	progressLetters: AnagramHelperProgress[];
	setCandidateLetters: Dispatch<SetStateAction<string[]>>;
	candidateLetters: string[];
};
export const SolutionDisplay = ({
	shuffled,
	setProgressLetters,
	progressLetters,
	setCandidateLetters,
	candidateLetters,
}: SolutionDisplayProps) => {
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const [dragItemIndex, setDragItemIndex] = useState<number>();
	const [dragOverItemIndex, setDragOverItemIndex] = useState<number>();

	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, progressLetters.length);
	}, [progressLetters]);

	const updateCandidateLetter = (event: KeyboardEvent<HTMLInputElement>) => {
		const index = Number(event.currentTarget.getAttribute('data-index'));
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight'];
		if (
			isNaN(index) ||
			(event.key.length !== 1 && !allowedKeys.includes(event.key))
		) {
			return;
		}
		// todo - replace with keydown regex
		if (event.key.length === 1 && !/^[A-Za-zÀ-ÿ0-9]$/.test(event.key)) {
			return;
		}
		setCandidateLetters((prevState) => {
			const newCandidateLetters = [...prevState];
			if (event.key.length === 1) {
				newCandidateLetters[index] = event.key.toUpperCase();
				inputRefs.current[index + 1]?.focus();
			}
			if (event.key === 'Backspace') {
				newCandidateLetters[index] = '';
				inputRefs.current[index - 1]?.focus();
			}
			if (event.key === 'ArrowLeft') {
				inputRefs.current[index - 1]?.focus();
			}
			if (event.key === 'ArrowRight') {
				inputRefs.current[index + 1]?.focus();
			}
			return newCandidateLetters;
		});
	};

	const updateProgressLetter = (event: FormEvent<HTMLButtonElement>) => {
		const index = Number(event.currentTarget.getAttribute('data-index'));
		const newProgressLetters = [...progressLetters];
		const currentProgressLetter = progressLetters[index];
		if (isUndefined(currentProgressLetter)) {
			return;
		}
		if (currentProgressLetter.progress !== candidateLetters[index]) {
			currentProgressLetter.isSaved = false;
			currentProgressLetter.progress = candidateLetters[index] ?? '';
		}

		//Any other letters with the same coords (crossing letters) need the same value
		const coords = currentProgressLetter.coords;
		for (const progressLetter of newProgressLetters) {
			if (
				progressLetter.coords.x === coords.x &&
				progressLetter.coords.y === coords.y &&
				progressLetter.progress !== candidateLetters[index]
			) {
				progressLetter.progress = candidateLetters[index] ?? '';
				progressLetter.isSaved = false;
			}
		}
		setProgressLetters(newProgressLetters);
	};

	return (
		<div
			css={css`
				display: flex;
				justify-content: center;
				flex-direction: row;
				flex-wrap: wrap;
				max-width: 90%;
				margin-top: ${space[4]}px;
			`}
			onDragOver={(event) => event.preventDefault()}
		>
			{progressLetters.map((progressLetter, index) => {
				return (
					<SolutionDisplayCell
						key={index}
						shuffled={shuffled}
						setDragItemIndex={setDragItemIndex}
						setDragOverItemIndex={setDragOverItemIndex}
						dragItemIndex={dragItemIndex}
						dragOverItemIndex={dragOverItemIndex}
						index={index}
						progressLetter={progressLetter}
						candidateLetter={candidateLetters[index] ?? ''}
						setCandidateLetters={setCandidateLetters}
						onKeyDown={updateCandidateLetter}
						onSubmit={updateProgressLetter}
						ref={(element: HTMLInputElement) =>
							(inputRefs.current[index] = element)
						}
					/>
				);
			})}
		</div>
	);
};
