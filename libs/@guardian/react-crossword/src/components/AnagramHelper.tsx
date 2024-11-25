import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { SvgCross } from '@guardian/source/react-components';
import { useContext, useRef, useState } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { Separators } from '../@types/crossword';
import { ProgressContext } from '../context/ProgressContext';
import type { AnagramHelperLetters } from '../utils/getProgressForEntry';
import { getAnagramHelperLetters } from '../utils/getProgressForEntry';
import { Button } from './Button';
import { Clue } from './Clue';
import { SolutionDisplay } from './SolutionDisplay';
import { WordWheel } from './WordWheel';

interface AnagramHelperProps {
	entry: CAPIEntry;
	separators: Separators;
	gridHeight: number;
	gridWidth: number;
	onClose: () => void;
}

export const AnagramHelper = ({
	entry,
	separators,
	onClose,
	gridHeight,
	gridWidth,
}: AnagramHelperProps) => {
	const { progress } = useContext(ProgressContext);
	const [letters, setLetters] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const [anagramHelperLetters, setAnagramHelperLetters] = useState<
		AnagramHelperLetters | undefined
	>(undefined);

	const reset = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
		}
		setLetters('');
		setAnagramHelperLetters(undefined);
	};

	const shuffle = () => {
		if (letters !== '') {
			const shuffledLetters = letters
				.split('')
				.sort(() => 0.5 - Math.random())
				.join('');
			setAnagramHelperLetters(
				getAnagramHelperLetters(entry, progress, shuffledLetters),
			);
		}
	};

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
				{anagramHelperLetters ? (
					<div
						css={css`
							display: flex;
							width: 100%;
							justify-content: center;
						`}
					>
						<WordWheel anagramHelperLetters={anagramHelperLetters} />
					</div>
				) : (
					<>
						<input
							css={css`
								font-size: 24px;
								background: none;
								border: 1px solid ${palette.neutral[7]};
								padding: 10px 5px;
								text-align: center;
								border-radius: 2px;
								max-width: 100%;
								&::placeholder {
									color: ${palette.neutral[46]};
								}
							`}
							maxLength={entry.length}
							placeholder="Enter letters..."
							spellCheck="false"
							ref={inputRef}
							onChange={(e) => setLetters(e.target.value)}
						/>
						<span>
							{letters.length}/{entry.length}
						</span>
					</>
				)}
				<div
					css={css`
						> * {
							margin: 0 ${space[1]}px;
						}
					`}
				>
					<Button type="reset" onSuccess={reset} priority="secondary">
						reset
					</Button>
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
				{anagramHelperLetters && (
					<SolutionDisplay anagramHelperLetters={anagramHelperLetters} />
				)}
			</div>
		</div>
	);
};
