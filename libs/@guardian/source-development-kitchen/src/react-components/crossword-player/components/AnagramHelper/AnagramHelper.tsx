import { css } from '@emotion/react';
import * as React from 'react';
import { Button } from '../../components';
import { Cell, Clue, SeparatorLocations } from './../../interfaces';
import ClueDisplay from './ClueDisplay';
import SolutionDisplay from './SolutionDisplay';
import WordWheel from './WordWheel';

interface CloseIconProps {
	className?: string;
}

function CloseIcon({ className }: CloseIconProps) {
	return (
		<svg className={className}>
			<g>
				<path d="M21 9.8l-.8-.8-5.2 4.8-5.2-4.8-.8.8 4.8 5.2-4.8 5.2.8.8 5.2-4.8 5.2 4.8.8-.8-4.8-5.2 4.8-5.2" />
			</g>
		</svg>
	);
}

interface AnagramHelperProps {
	clue: Clue;
	groupCells: Cell[];
	groupSeparators: SeparatorLocations;
	onClose: () => void;
	style?: React.CSSProperties;
}

export default function AnagramHelper({
	clue,
	groupCells,
	groupSeparators,
	onClose,
	style,
}: AnagramHelperProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const [letters, setLetters] = React.useState('');
	const [shuffling, setShuffling] = React.useState(false);
	const enableButtons = letters !== '' || shuffling;
	const solutionLength = groupCells.length;

	React.useEffect(() => {
		if (!shuffling) {
			inputRef.current?.focus({ preventScroll: true });
		}
	}, [shuffling]);

	const reset = () => {
		setLetters('');
		setShuffling(false);
	};

	const shuffle = () => {
		if (letters !== '') {
			const shuffledLetters = letters
				.split('')
				.sort(() => 0.5 - Math.random())
				.join('');
			setLetters(shuffledLetters);
			setShuffling(true);
			buttonRef.current?.focus({ preventScroll: true });
		}
	};

	const appendWord = (word: string) => {
		const newLetters = letters + word;
		setLetters(newLetters.substr(0, solutionLength));
		inputRef.current?.focus({ preventScroll: true });
	};

	React.useEffect(() => {
		reset();
	}, [clue.id]);

	return (
		<div css={anagramHelperStyle} style={style}>
			<Button
				ariaLabel="Close"
				css={closeButtonStyle}
				onClick={onClose}
				variant="outlined"
			>
				<CloseIcon css={closeButtonIconStyle} />
			</Button>
			<div css={topSectionStyle}>
				{shuffling ? (
					<WordWheel
						letters={letters}
						populatedLetters={groupCells.map((cell) => cell.guess).join('')}
					/>
				) : (
					<>
						<input
							autoComplete="off"
							css={inputStyle}
							maxLength={solutionLength}
							onChange={(event) => setLetters(event.target.value)}
							onKeyDown={(event) => {
								if (['Enter', 'NumpadEnter'].includes(event.code)) {
									event.preventDefault();
									shuffle();
								} else if (event.code === 'Escape') {
									if (letters === '') {
										onClose();
									} else {
										reset();
									}
								}
							}}
							placeholder="Enter letters..."
							ref={inputRef}
							spellCheck="false"
							value={letters}
						/>
						<span>
							{letters.length}/{solutionLength}
						</span>
					</>
				)}
			</div>

			<div css={bottomSectionStyle}>
				<div css={buttonsContainerStyle}>
					<Button disabled={!enableButtons} onClick={reset} variant="outlined">
						Reset
					</Button>
					<Button
						disabled={!enableButtons}
						onClick={shuffle}
						onKeyDown={(event) => {
							if (event.code === 'Escape') {
								reset();
							}
						}}
						ref={buttonRef}
					>
						Shuffle
					</Button>
				</div>
				<p css={clueStyle}>
					<span css={clueNumStyle}>{`${clue.number} ${clue.direction}`}</span>
					<ClueDisplay
						css={clickableWordStyle}
						clue={clue.clue}
						onClick={(word) => appendWord(word)}
						splitWords={!shuffling}
					/>
				</p>
				<SolutionDisplay
					cells={groupCells}
					letters={letters}
					separators={groupSeparators}
					shuffling={shuffling}
				/>
			</div>
		</div>
	);
}

/** Styles **/

const anagramHelperStyle = css`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.02);
	box-sizing: border-box;
	border: 1px solid rgba(0, 0, 0, 0.23);
	text-align: center;
	overflow: hidden;
	// Breakpoint for xs screen
	@media (max-width: 576px) {
		width: auto !important;
		min-width: auto !important;
	}
`;

const topSectionStyle = css`
	display: flex;
	flex: 50%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const inputStyle = css`
	font-size: 24px;
	background: none;
	border: 1px solid rgba(0, 0, 0, 0.87);
	padding: 10px 5px;
	margin: 5px 0;
	text-align: center;
	border-radius: 2px;
	max-width: 100%;

	&::placeholder {
		color: rgba(0, 0, 0, 0.23);
	}
`;

const closeButtonStyle = css`
	position: absolute;
	top: 10px;
	right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 35px;
	height: 35px;
	padding: 0;
	z-index: 1;
`;

const closeButtonIconStyle = css`
	width: 30px;
	height: 30px;
`;

const bottomSectionStyle = css`
	flex: 50%;
`;

const buttonsContainerStyle = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const clueStyle = css`
	line-height: 22px;
`;

const clueNumStyle = css`
	font-weight: bold;
	margin-right: 10px;
	text-transform: capitalize;
`;

const clickableWordStyle = css`
	cursor: pointer;
	user-select: none;

	&:hover {
		text-decoration: underline;
	}
`;
