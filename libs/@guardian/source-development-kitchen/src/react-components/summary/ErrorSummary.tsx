import { error as errorColors } from '@guardian/source/foundations';
import { SvgAlertRound } from '@guardian/source/react-components';
import {
	contextStyles,
	iconStyles,
	messageStyles,
	messageWrapperStyles,
	wrapperStyles,
} from './styles';
import type { SummaryProps } from './types';

export interface ErrorSummaryProps extends SummaryProps {
	/**
	 * The error report link URL
	 */
	errorReportUrl?: string;
}

export const ErrorSummary = ({
	message,
	errorReportUrl,
	context,
	cssOverrides,
	...props
}: ErrorSummaryProps) => (
	<div css={[wrapperStyles(errorColors[400]), cssOverrides]} {...props}>
		<div css={iconStyles(errorColors[400])}>
			<SvgAlertRound />
		</div>
		<div css={messageWrapperStyles}>
			<div css={messageStyles(errorColors[400])}>{message}</div>
			{errorReportUrl && (
				<a css={messageStyles(errorColors[400], false)} href={errorReportUrl}>
					Report this error
				</a>
			)}
			{context && <div css={contextStyles}>{context}</div>}
		</div>
	</div>
);
