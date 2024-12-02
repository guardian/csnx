import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { SvgPadlock } from '@guardian/source/react-components';
import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useTheme } from '../context/Theme';
import type { AnagramHelperProgress } from '../utils/getAnagramHelperProgressForGroup';
import { keyDownRegex } from '../utils/keydownRegex';
import { Button } from './Button';
import { SolutionDisplayCell } from './SolutionDisplayCell';

type SolutionDisplayProps = {
	shuffled: boolean;
	setShuffled: Dispatch<SetStateAction<boolean>>;
	setProgressLetters: Dispatch<SetStateAction<AnagramHelperProgress[]>>;
	progressLetters: AnagramHelperProgress[];
	setCandidateLetters: Dispatch<SetStateAction<string[]>>;
	candidateLetters: string[];
};
export const SolutionDisplay = ({
	shuffled,
	setShuffled,
	setProgressLetters,
	progressLetters,
	setCandidateLetters,
	candidateLetters,
}: SolutionDisplayProps) => {
	const [dragItemIndex, setDragItemIndex] = useState<number>();
	const [dragOverItemIndex, setDragOverItemIndex] = useState<number>();
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const theme = useTheme();

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
		if (event.key.length === 1 && !keyDownRegex.test(event.key)) {
			return;
		}
		if (event.key === 'ArrowLeft') {
			inputRefs.current[index - 1]?.focus();
			return;
		}
		if (event.key === 'ArrowRight') {
			inputRefs.current[index + 1]?.focus();
			return;
		}
		if (keyDownRegex.test(event.key)) {
			setCandidateLetters((prevState) => {
				const newCandidateLetters = [...prevState];
				newCandidateLetters[index] = event.key.toUpperCase();
				return newCandidateLetters;
			});
			inputRefs.current[index + 1]?.focus();
		}
		if (event.key === 'Backspace') {
			setCandidateLetters((prevState) => {
				const newCandidateLetters = [...prevState];
				newCandidateLetters[index] = '';
				return newCandidateLetters;
			});
			inputRefs.current[index - 1]?.focus();
		}
	};

	const onDragEnd = useCallback(() => {
		if (
			!isUndefined(dragItemIndex) &&
			!isUndefined(dragOverItemIndex) &&
			dragOverItemIndex !== dragItemIndex
		) {
			setCandidateLetters((prev) => {
				const newCandidateLetters = [...prev];
				const dragCandidate = newCandidateLetters[dragItemIndex];
				const dropCandidate = newCandidateLetters[dragOverItemIndex];
				if (!isUndefined(dropCandidate) && !isUndefined(dragCandidate)) {
					newCandidateLetters[dragItemIndex] = dropCandidate;
					newCandidateLetters[dragOverItemIndex] = dragCandidate;
				}
				return newCandidateLetters;
			});
			setShuffled(true);
		}
		setDragOverItemIndex(undefined);
		setDragItemIndex(undefined);
	}, [dragItemIndex, dragOverItemIndex, setCandidateLetters, setShuffled]);

	const updateProgressLetter = (index: number) => {
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
				const progressValid =
					progressLetter.progress === candidateLetters[index] ||
					progressLetter.progress === '' ||
					!shuffled;
				const candidateLetter = candidateLetters[index];
				return (
					<div
						key={index}
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
							ref={(el) => (inputRefs.current[index] = el)}
							draggable={true}
							value={candidateLetters[index]}
							onDragStart={() => setDragItemIndex(index)}
							onDragEnter={() => setDragOverItemIndex(index)}
							onDragEnd={onDragEnd}
							onChange={() => {}} // TODO: remove the need for this
							onKeyDown={updateCandidateLetter}
							maxLength={1}
							tabIndex={index + 1}
							data-index={index}
							css={css`
								box-sizing: border-box;
								border: 1px solid ${theme.background};
								border-radius: 4px;
								width: ${theme.cellSize - 1}px;
								height: ${theme.cellSize - 1}px;
								margin-left: 1px;
								text-align: center;
								align-content: center;
								caret-color: transparent;
								:active {
									cursor: grabbing;
								}
							`}
						/>
						{progressLetter.progress !== candidateLetter && shuffled && (
							<Button
								onSuccess={() => updateProgressLetter(index)}
								priority="tertiary"
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
						<SolutionDisplayCell
							progressLetter={progressLetter}
							progressValid={progressValid}
						/>
					</div>
				);
			})}
		</div>
	);
};
