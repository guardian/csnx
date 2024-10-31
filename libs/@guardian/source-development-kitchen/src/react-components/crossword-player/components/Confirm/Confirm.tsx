import { css } from '@emotion/react';
import * as React from 'react';
import { Button } from '../../components';

const gridSize = 10;

const confirmContainerStyle = css`
	display: flex;
	flex-direction: column;
	margin: 0 ${gridSize * 0.5}px;
`;

const buttonContainerStyle = css`
	display: inline-flex;
	margin: 0 ${gridSize * -0.5}px;
`;

const confirmButtonStyle = css`
	background-color: #1976d2; // Confirm button background color
	color: #fff; // Confirm button text color

	&:not(:disabled):hover {
		background-color: #115293; // Confirm button hover color
	}
`;

const timeoutStyle = css`
	font-size: ${gridSize * 1.2}px; // Font size caption
	font-weight: 400;
	letter-spacing: ${gridSize * 0.04}px;
	margin-top: ${gridSize}px;
`;

interface ConfirmProps {
	buttonText: string;
	onCancel: () => void;
	onConfirm: () => void;
	timeout?: number;
}

export const defaultTimeout = 10;

export default function Confirm({
	buttonText,
	onCancel,
	onConfirm,
	timeout = defaultTimeout,
}: ConfirmProps) {
	if (timeout <= 0) {
		throw new Error('Confirm should have a timeout greater than zero');
	}
	const [seconds, setSeconds] = React.useState(timeout);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			if (seconds <= 1) {
				onCancel();
			} else {
				setSeconds((secs) => secs - 1);
			}
		}, 1000);

		return function cleanup() {
			clearTimeout(timer);
		};
	}, [seconds]);

	return (
		<div css={confirmContainerStyle}>
			<div css={buttonContainerStyle}>
				<Button onClick={onCancel} variant="outlined">
					Cancel
				</Button>
				<Button css={confirmButtonStyle} onClick={onConfirm}>
					{buttonText}
				</Button>
			</div>
			<span css={timeoutStyle}>
				This will automatically cancel in {seconds}
			</span>
		</div>
	);
}
