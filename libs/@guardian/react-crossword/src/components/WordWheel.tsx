import { css } from '@emotion/react';
import { textSans17, textSansBold17 } from '@guardian/source/foundations';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import type { AnagramHelperLetters } from '../utils/getProgressForEntry';

export type WordWheelProps = {
	anagramHelperLetters: AnagramHelperLetters;
};

type WordWheelLetter = {
	letter: string;
	isGuess: boolean;
};

export const WordWheel = ({ anagramHelperLetters }: WordWheelProps) => {
	const letters = anagramHelperLetters
		.map(
			(anagramHelperLetter): WordWheelLetter =>
				anagramHelperLetter.isGuess && anagramHelperLetter.backupLetter
					? { letter: anagramHelperLetter.backupLetter, isGuess: false }
					: {
							letter: anagramHelperLetter.value,
							isGuess: anagramHelperLetter.isGuess,
						},
		)
		.filter((wordWheelLetter) => wordWheelLetter.letter !== '')
		.sort(() => 0.5 - Math.random());

	const theme = useContext(ThemeContext);
	const outerLetters = letters; // Remaining letters go around the circle
	const centerLetter = letters.length > 4 ? outerLetters.shift() : undefined; // First letter is the center
	const radius = 70; // Radius for the circle of outer letters
	const centerX = 100; // Center X of the SVG
	const centerY = 100; // Center Y of the SVG

	// Predefined angles for up to 4 outer letters

	// Calculate the position of a letter based on the angle
	const calculatePosition = (angle: number): { x: number; y: number } => {
		const radian = (angle * Math.PI) / 180; // Convert degrees to radians
		return {
			x: centerX + radius * Math.cos(radian),
			y: centerY + radius * Math.sin(radian),
		};
	};

	const getPosition = (index: number) => {
		return calculatePosition((360 / outerLetters.length) * index);
	};

	const renderOuterLetters = (): JSX.Element[] => {
		return outerLetters.map((wordWheelLetter, index) => {
			const { x, y } = getPosition(index);
			return (
				<text
					key={index}
					x={x}
					y={y}
					textAnchor="middle"
					dominantBaseline="middle"
					css={css`
						${textSans17}
					`}
					fill={wordWheelLetter.isGuess ? theme.highlight : theme.text}
				>
					{wordWheelLetter.letter}
				</text>
			);
		});
	};

	return (
		<svg width="200" height="200">
			{centerLetter && (
				<text
					x={centerX}
					y={centerY}
					textAnchor="middle"
					dominantBaseline="middle"
					css={css`
						${textSansBold17}
					`}
					fill={centerLetter.isGuess ? theme.highlight : theme.text}
				>
					{centerLetter.letter}
				</text>
			)}
			{renderOuterLetters()}
		</svg>
	);
};
