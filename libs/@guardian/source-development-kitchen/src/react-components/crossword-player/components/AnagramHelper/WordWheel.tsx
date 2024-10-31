import { css } from '@emotion/react';

const round = (val: number) => Math.round(val * 100) / 100;

const getPosition = (diameter: number, angle: number, i: number) => {
	const theta = ((angle * Math.PI) / 180) * i;

	return {
		left: `${diameter + round(diameter * Math.sin(theta))}%`,
		top: `${diameter + round(diameter * Math.cos(theta))}%`,
	};
};

const getCentralPosition = (diameter: number) => ({
	left: `${diameter - 1}%`,
	top: `${diameter - 2}%`,
});

const getAngle = (letters: string, minForCentral: number = 5) => {
	if (letters.length === 0) {
		return 0;
	}

	if (letters.length < minForCentral) {
		return 360 / letters.length;
	}

	return 360 / (letters.length - 1);
};

// Define styles
const wordWheelStyle = css`
	position: relative;
	top: 0;
	left: 3.5%;
	width: 50%;
	height: 100%;
	margin: 0 auto;
	min-width: 200px; // 20 * grid-size (10px)
`;

const letterStyle = css`
	position: absolute;
	text-transform: uppercase;
	font-size: 16px; // font-size-large (1.6 * 10px)
	user-select: none;
`;

const centralLetterStyle = css`
	font-size: 24px; // font-size-xlarge (2.4 * 10px)
	min-width: 20px; // grid-size * 2 (2 * 10px)
`;

const populatedLetterStyle = css`
	color: #ccc; // light-grey
`;

interface WordWheelProps {
	letters: string;
	populatedLetters: string;
}

export default function WordWheel({
	letters,
	populatedLetters,
}: WordWheelProps) {
	const angle = getAngle(letters);
	const diameter = 40;
	let populated = populatedLetters.toUpperCase();

	return (
		<div css={wordWheelStyle}>
			{letters
				.toUpperCase()
				.split('')
				.map((letter, i) => {
					const isPopulated = populated.includes(letter);
					if (isPopulated) {
						populated = populated.replace(letter, '');
					}

					return (
						<span
							css={[
								letterStyle,
								i === 0 &&
									(letters.length === 1 || letters.length > 4) &&
									centralLetterStyle,
								isPopulated && populatedLetterStyle,
							]}
							style={
								i === 0 && (letters.length === 1 || letters.length > 4)
									? getCentralPosition(diameter)
									: getPosition(diameter, angle, i)
							}
							key={`${letter}-${i}`}
						>
							{letter}
						</span>
					);
				})}
		</div>
	);
}
