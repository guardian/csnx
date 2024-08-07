import { brand as brandColors, text } from '@guardian/source/foundations';
import { SvgInfoRound } from '@guardian/source/react-components';
import {
	contextStyles,
	iconStyles,
	messageStyles,
	messageWrapperStyles,
	wrapperStyles,
} from './styles';
import type { SummaryProps } from './types';

export type InfoSummaryProps = SummaryProps;

export const InfoSummary = ({
	message,
	context,
	cssOverrides,
	...props
}: InfoSummaryProps) => (
	<div css={[wrapperStyles(brandColors[500]), cssOverrides]} {...props}>
		<div css={iconStyles(brandColors[500])}>
			<SvgInfoRound />
		</div>
		<div css={messageWrapperStyles}>
			<div css={messageStyles(text.primary)}>{message}</div>
			{context && <div css={contextStyles}>{context}</div>}
		</div>
	</div>
);
