import { css } from '@emotion/react';
import { textSans17, textSansBold17 } from '@guardian/source/foundations';
import { useContext } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { ThemeContext } from '../context/ThemeContext';

export type WordWheelProps = {
	letters: string;
	entry: CAPIEntry;
};

export const WordWheel = ({ letters }: WordWheelProps) => {
	const theme = useContext(ThemeContext);

	const letterArray = letters.split('').sort(() => Math.random() - 0.5);

	const outerLetters = letterArray;
	const centerLetter =
		letterArray.length > 4 ? outerLetters.shift() : undefined;
	const radius = 70;
	const centerX = 100;
	const centerY = 100;

	const getPosition = (index: number): { x: number; y: number } => {
		const angle = (360 / outerLetters.length) * index;
		const radian = (angle * Math.PI) / 180; // Convert degrees to radians
		return {
			x: centerX + radius * Math.cos(radian),
			y: centerY + radius * Math.sin(radian),
		};
	};

	const renderOuterLetters = (): JSX.Element[] => {
		return outerLetters.map((letter, index) => {
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
					fill={theme.text}
				>
					{letter}
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
					fill={theme.text}
				>
					{centerLetter}
				</text>
			)}
			{renderOuterLetters()}
		</svg>
	);
};
