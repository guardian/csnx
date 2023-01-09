import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import {
	body,
	headline,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import { pillarPalette } from '../lib/pillarPalette';

/// SUMMARY ELEMENT

const titleStyling = css`
	${headline.xxxsmall({
		fontWeight: 'medium',
	})};
	margin: 0;
	line-height: 22px;
`;

const plusStyling = css`
	margin-right: 12px;
	margin-bottom: 6px;
	width: 33px;
	fill: white;
	height: 28px;
`;

const minusStyling = css`
	margin-right: 14px;
	margin-bottom: 6px;
	width: 30px;
	fill: white;
	height: 25px;
	padding-left: 4px;
`;

const iconSpacing = css`
	display: inline-flex;
	align-items: center;
	${textSans.small()};
`;

export const Summary = ({
	sectionTitle,
	title,
	pillar,
	expandCallback,
}: {
	pillar: ArticleTheme;
	sectionTitle: string;
	title: string;
	expandCallback: () => void;
}): JSX.Element => {
	const atomTitleStyling = css`
		display: block;
		${body.medium({
			lineHeight: 'tight',
			fontWeight: 'bold',
		})};
		color: ${pillarPalette[pillar][400]};
	`;

	const showHideStyling = css`
		background: ${neutral[7]};
		color: ${neutral[100]};
		height: 2rem;
		position: absolute;
		bottom: 0;
		transform: translate(0, 50%);
		padding: 0 15px 0 7px;
		border-radius: 100em;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		border: 0;
		margin: 0;
		:hover {
			background: ${pillarPalette[pillar][400]};
		}
	`;
	const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
	const [expandEventSent, setExpandEventFired] = useState(false);
	return (
		<summary
			onClick={() => {
				if (!expandEventSent) {
					expandCallback();
					setExpandEventFired(true);
				}
				setHasBeenExpanded(!hasBeenExpanded);
			}}
		>
			<span css={atomTitleStyling}>{sectionTitle}</span>
			<h4 css={titleStyling}>{title}</h4>
			<span css={showHideStyling}>
				{!hasBeenExpanded ? (
					<span css={iconSpacing}>
						<span css={plusStyling}>
							<SvgPlus />
						</span>
						Show
					</span>
				) : (
					<span css={iconSpacing}>
						<span css={minusStyling}>
							<SvgMinus />
						</span>
						Hide
					</span>
				)}
			</span>
		</summary>
	);
};
