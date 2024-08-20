import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { textSans15, textSansBold17 } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { useIsInView } from './useIsInView';
import { useTicker } from './useTicker';

interface TickerCopy {
	countLabel: string;
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

export interface TickerSettings {
	currencySymbol: string;
	copy: TickerCopy;
	tickerData: TickerData;
	tickerStylingSettings: TickerStylingSettings;
}

//styles for the container that holds the ticker
const tickerContainerStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 20px 8px 20px 8px;
`;

//styles for headline text (which is optional)
const headlineStyles = (headlineColour: string) => css`
	${textSansBold17};
	color: ${headlineColour};
	padding-bottom: 4px;
`;

//styles for the numerical count (total raised so far) and the goal text
const goalLabelStyles = (goalContributionsColour: string) => css`
	${textSans15};
	color: ${goalContributionsColour};
`;

const countLabelStyles = (countColour: string) => css`
	${textSansBold17};
	color: ${countColour};
`;

//styles for the progress bar background
const progressBarBackgroundStyles = (
	progressBarBackgroundColour: string,
) => css`
	height: 10px;
	align-self: stretch;
	align-items: center;
	display: flex;
	border-radius: 8px;
	background: ${progressBarBackgroundColour};
	overflow-x: hidden;
	width: 100%;
	position: relative;
	padding-bottom: 7px;
`;

//styles for the moving part of the progress bar
const progressBarStyles = css`
	overflow: hidden;
	width: 100%;
	height: 10px;
	position: absolute;
	border-radius: 8px;
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
): SerializedStyles => css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transform: ${progressBarTransform(goal, runningTotal)};
	transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
	background-color: ${progressBarColour};
	height: 10px;
	padding-top: 3px;
`;

export const Ticker = ({
	tickerData,
	currencySymbol,
	copy,
	tickerStylingSettings,
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

	return (
		<div ref={setNode}>
			<div>
				<div css={tickerContainerStyles}>
					<div css={headlineStyles(headlineColour)}>{copy.countLabel}</div>
					<div css={progressBarBackgroundStyles(progressBarBackgroundColour)}>
						<div css={progressBarStyles}>
							<div
								css={filledProgressStyles(
									tickerData.goal,
									runningTotal,
									filledProgressColour,
								)}
							/>
						</div>
					</div>
					<div css={goalLabelStyles(goalColour)}>
						<span css={countLabelStyles(totalColour)}>
							{currencySymbol}
							{runningTotal.toLocaleString()}
						</span>{' '}
						of {currencySymbol}
						{tickerData.goal.toLocaleString()} goal
					</div>
				</div>
			</div>
		</div>
	);
};
