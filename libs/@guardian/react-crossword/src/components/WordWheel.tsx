import { css } from '@emotion/react';
import { textSans17, textSansBold17 } from '@guardian/source/foundations';
import { memo } from 'react';
import { useTheme } from '../context/Theme';

const centerX = 100;
const centerY = 100;
const radius = 70;

const getPosition = ({
	index,
	letters,
}: {
	index: number;
	letters: string[];
}): { x: number; y: number } => {
	const angle = (360 / letters.length) * index;
	const radian = (angle * Math.PI) / 180; // Convert degrees to radians
	return {
		x: centerX + radius * Math.cos(radian),
		y: centerY + radius * Math.sin(radian),
	};
};

const renderOuterLetters = ({
	letters,
	fill,
}: {
	letters: string[];
	fill?: string;
}): JSX.Element[] => {
	return letters.map((letter, index) => {
		const { x, y } = getPosition({ letters: letters, index });
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
				fill={fill}
			>
				{letter}
			</text>
		);
	});
};

const WordWheelComponent = ({ letters }: { letters: string[] }) => {
	const theme = useTheme();

	// Copy array to avoid mutating the original
	const wordWheelLetters = [...letters];

	const centerLetter =
		letters.length > 4 ? wordWheelLetters.shift() : undefined;

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
					fill={theme.textColor}
				>
					{centerLetter}
				</text>
			)}
			{renderOuterLetters({ letters: wordWheelLetters, fill: theme.textColor })}
		</svg>
	);
};

export const WordWheel = memo(WordWheelComponent);
