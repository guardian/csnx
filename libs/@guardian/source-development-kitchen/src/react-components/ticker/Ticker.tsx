import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSansBold17,
	textSansBold20,
	textSansBold24,
} from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { useIsInView } from './useIsInView';
import { useTicker } from './useTicker';

interface TickerCopy {
	headline?: string;
}

export interface TickerData {
	total: number;
	goal: number;
}

export interface TickerStylingSettings {
	headlineColour: string;
	totalColour: string;
	goalColour: string;
	filledProgressColour: string;
	progressBarBackgroundColour: string;
}

type TickerSize = 'small' | 'medium' | 'large';

export interface TickerSettings {
	currencySymbol: string;
	copy: TickerCopy;
	tickerData: TickerData;
	tickerStylingSettings: TickerStylingSettings;
	size: TickerSize;
}

const tickerSizeSettings = {
	small: {
		barHeight: 10,
		totalFont: textSansBold17,
	},
	medium: {
		barHeight: 14,
		totalFont: textSansBold20,
	},
	large: {
		barHeight: 16,
		totalFont: textSansBold24,
	},
};

//styles for the container that holds the ticker
const tickerContainerStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-bottom: ${space[5]}px;
	padding-top: ${space[1]}px;
`;

//styles for headline text (which is optional)
const headlineStyles = (headlineColour: string) => css`
	${textSansBold17};
	color: ${headlineColour};
	padding-bottom: ${space[1]}px;
`;

//styles for the total and the goal text
const goalLabelStyles = (goalColour: string) => css`
	${textSans15};
	color: ${goalColour};
`;

const totalLabelStyles = (totalColour: string, totalFont: string) => css`
	${totalFont};
	color: ${totalColour};
`;

const labelContainerStyles = css`
	padding-top: 7px;
`;

//styles for the progress bar background
const progressBarBackgroundStyles = (
	progressBarBackgroundColour: string,
	barHeight: number,
) => css`
	height: ${barHeight}px;
	align-self: stretch;
	align-items: center;
	display: flex;
	border-radius: 8px;
	background: ${progressBarBackgroundColour};
	overflow-x: hidden;
	width: 100%;
	position: relative;
`;

const progressBarTransform = (goal: number, runningTotal: number): string => {
	const haveStartedAnimating = runningTotal >= 0;

	if (!haveStartedAnimating) {
		return 'translateX(-100%)';
	}

	const percentage = (runningTotal / goal) * 100 - 100;
	return `translate3d(${percentage > 0 ? 0 : percentage}%, 0, 0)`;
};

const filledProgressStyles = (
	goal: number,
	runningTotal: number,
	progressBarColour: string,
	barHeight: number,
): SerializedStyles => css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transform: ${progressBarTransform(goal, runningTotal)};
	transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
	background-color: ${progressBarColour};
	height: ${barHeight}px;
`;

export const Ticker = ({
	tickerData,
	currencySymbol,
	copy,
	tickerStylingSettings,
	size,
}: TickerSettings) => {
	//state to track if the component is ready to animate
	const [readyToAnimate, setReadyToAnimate] = useState(false);
	const [hasBeenSeen, setNode] = useIsInView({
		rootMargin: '-18px',
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			setTimeout(() => setReadyToAnimate(true), 1000);
		}
	}, [hasBeenSeen]);

	const runningTotal = useTicker(tickerData.total, readyToAnimate);
	const {
		progressBarBackgroundColour,
		filledProgressColour,
		headlineColour,
		totalColour,
		goalColour,
	} = tickerStylingSettings;

	const { barHeight, totalFont } = tickerSizeSettings[size];

	return (
		<div ref={setNode}>
			<div>
				<div css={tickerContainerStyles}>
					{copy.headline && (
						<div css={headlineStyles(headlineColour)}>{copy.headline}</div>
					)}
					<div
						css={progressBarBackgroundStyles(
							progressBarBackgroundColour,
							barHeight,
						)}
					>
						<div
							css={filledProgressStyles(
								tickerData.goal,
								runningTotal,
								filledProgressColour,
								barHeight,
							)}
						/>
					</div>
					<div css={labelContainerStyles}>
						<div css={goalLabelStyles(goalColour)}>
							<span css={totalLabelStyles(totalColour, totalFont)}>
								{currencySymbol}
								{runningTotal.toLocaleString()}
							</span>{' '}
							of {currencySymbol}
							{tickerData.goal.toLocaleString()} goal
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
