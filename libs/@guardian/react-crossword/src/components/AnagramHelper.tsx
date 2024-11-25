import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { SvgCross } from '@guardian/source/react-components';
import { useRef, useState } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { Button } from './Button';
import { Clue } from './Clue';
import { SolutionDisplay } from './SolutionDisplay';
import { WordWheel } from './WordWheel';

interface AnagramHelperProps {
	entry: CAPIEntry;
	gridHeight: number;
	gridWidth: number;
	onClose: () => void;
}

export const AnagramHelper = ({
	entry,
	onClose,
	gridHeight,
	gridWidth,
}: AnagramHelperProps) => {
	const [letters, setLetters] = useState('');
	const [shuffledLetters, setShuffledLetters] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const reset = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
		}
		setShuffledLetters('');
	};

	const shuffle = () => {
		if (letters !== '') {
			const shuffledLetters = letters
				.split('')
				.sort(() => 0.5 - Math.random())
				.join('');
			setShuffledLetters(shuffledLetters);
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
				{shuffledLetters ? (
					<div
						css={css`
							display: flex;
							width: 100%;
							justify-content: center;
						`}
					>
						<WordWheel letters={shuffledLetters} entry={entry} />
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
				{shuffledLetters && (
					<SolutionDisplay letters={shuffledLetters} entry={entry} />
				)}
			</div>
		</div>
	);
};
