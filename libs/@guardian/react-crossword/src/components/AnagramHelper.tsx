import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { SvgCross } from '@guardian/source/react-components';
import { useContext, useRef, useState } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { Separators } from '../@types/crossword';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import type { AnagramHelperLetters } from '../utils/getProgressForEntry';
import { getAnagramHelperLetters } from '../utils/getProgressForEntry';
import { Button } from './Button';
import { Clue } from './Clue';
import { SolutionDisplay } from './SolutionDisplay';
import { WordWheel } from './WordWheel';

interface AnagramHelperProps {
	entry: CAPIEntry;
	separators: Separators;
	height: number;
	onClose: () => void;
}

export const AnagramHelper = ({
	entry,
	separators,
	onClose,
}: AnagramHelperProps) => {
	const theme = useContext(ThemeContext);
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
				background-color: ${theme.anagramHelperBackground};
				width: 100%;
				height: 0;
				padding-top: 100%;
				overflow: hidden;
				position: relative;
			`}
		>
			<div
				css={css`
					box-sizing: border-box;
					position: absolute;
					display: flex;
					flex-direction: column;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					min-height: 400px;
					padding: 10px;
				`}
			>
				<div
					css={css`
						display: flex;
						width: 100%;
						justify-content: flex-end;
					`}
				>
					<Button onSuccess={onClose} size="small">
						<SvgCross size="small" theme={{ fill: 'white' }} />
					</Button>
				</div>
				<div
					css={css`
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
					`}
				>
					{anagramHelperLetters ? (
						<div
							css={css`
								max-width: 60%;
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
									margin: 5px 0;
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
							display: flex;
							gap: 10px;
							height: clamp(30px, 45px, 60px);
							align-items: flex-end;
						`}
					>
						<Button onSuccess={reset}>reset</Button>
						<Button onSuccess={shuffle}>shuffle</Button>
					</div>
					<Clue entry={entry} />
					{anagramHelperLetters && (
						<SolutionDisplay anagramHelperLetters={anagramHelperLetters} />
					)}
				</div>
			</div>
		</div>
	);
};
