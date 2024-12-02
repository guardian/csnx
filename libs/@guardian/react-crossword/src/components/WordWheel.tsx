import { css } from '@emotion/react';
import { textSans17, textSansBold17 } from '@guardian/source/foundations';
import { memo } from 'react';
import { useTheme } from '../context/Theme';

const centerX = 100;
const centerY = 100;
const radius = 70;

const getPosition = ({
	index,
	letterArray,
}: {
	index: number;
	letterArray: string[];
}): { x: number; y: number } => {
	const angle = (360 / letterArray.length) * index;
	const radian = (angle * Math.PI) / 180; // Convert degrees to radians
	return {
		x: centerX + radius * Math.cos(radian),
		y: centerY + radius * Math.sin(radian),
	};
};

const renderOuterLetters = ({
	letterArray,
	fill,
}: {
	letterArray: string[];
	fill?: string;
}): JSX.Element[] => {
	return letterArray.map((letter, index) => {
		const { x, y } = getPosition({ letterArray: letterArray, index });
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

const WordWheelComponent = ({ letterArray }: { letterArray: string[] }) => {
	const theme = useTheme();

	const centerLetter = letterArray.length > 4 ? letterArray.shift() : undefined;

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
					fill={theme.text}
				>
					{centerLetter}
				</text>
			)}
			{renderOuterLetters({ letterArray, fill: theme.text })}
		</svg>
	);
};

export const WordWheel = memo(WordWheelComponent);
