import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { SvgCross } from '@guardian/source/react-components';
import { useContext, useRef, useState } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { Separators } from '../@types/crossword';
import { ThemeContext } from '../context/ThemeContext';
import { Button } from './Button';
import { Clue } from './Clue';
import { SolutionDisplay } from './SolutionDisplay';

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
	const inputRef = useRef<HTMLInputElement>(null);
	const [letters, setLetters] = useState('');

	const reset = () => {
		setLetters('');
	};

	const shuffle = () => {
		if (letters !== '') {
			const shuffledLetters = letters
				.split('')
				.sort(() => 0.5 - Math.random())
				.join('');
			setLetters(shuffledLetters);
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
					<SolutionDisplay letters={letters} entry={entry} />
				</div>
			</div>
		</div>
	);
};
