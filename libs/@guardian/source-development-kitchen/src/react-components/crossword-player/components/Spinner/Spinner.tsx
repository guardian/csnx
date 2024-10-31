/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import * as React from 'react';

interface SpinnerProps {
	size: 'small' | 'standard' | 'large';
}

const gridSize = 10;

const spinAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// Emotion CSS styles
const baseSpinnerStyle = css`
	border: ${gridSize * 0.4}px solid rgba(92, 112, 128, 0.2);
	border-radius: 50%;
	border-top: ${gridSize * 0.4}px solid rgba(92, 112, 128, 0.8);
	animation: ${spinAnimation} 0.5s linear infinite;
	box-sizing: border-box;
`;

// Size variants
const sizeStyles = {
	small: css`
		width: ${gridSize * 2}px;
		height: ${gridSize * 2}px;
		min-width: ${gridSize * 2}px;
		min-height: ${gridSize * 2}px;
	`,
	standard: css`
		width: ${gridSize * 5}px;
		height: ${gridSize * 5}px;
		min-width: ${gridSize * 5}px;
		min-height: ${gridSize * 5}px;
	`,
	large: css`
		width: ${gridSize * 10}px;
		height: ${gridSize * 10}px;
		min-width: ${gridSize * 10}px;
		min-height: ${gridSize * 10}px;
	`,
};

export default function Spinner({ size }: SpinnerProps) {
	return <div css={[baseSpinnerStyle, sizeStyles[size]]} role="status" />;
}
