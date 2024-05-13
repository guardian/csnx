import { success as successColors } from '@guardian/source/foundations';
import { SvgTickRound } from '@guardian/source/react-components';
import {
	contextStyles,
	iconStyles,
	messageStyles,
	messageWrapperStyles,
	wrapperStyles,
} from './styles';
import type { SummaryProps } from './types';

export type SuccessSummaryProps = SummaryProps;

export const SuccessSummary = ({
	message,
	context,
	cssOverrides,
	...props
}: SuccessSummaryProps) => (
	<div css={[wrapperStyles(successColors[400]), cssOverrides]} {...props}>
		<div css={iconStyles(successColors[400])}>
			<SvgTickRound />
		</div>
		<div css={messageWrapperStyles}>
			<div css={messageStyles(successColors[400])}>{message}</div>
			{context && <div css={contextStyles}>{context}</div>}
		</div>
	</div>
);
