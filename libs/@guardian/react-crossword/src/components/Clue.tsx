import { css } from '@emotion/react';
import { isString } from '@guardian/libs';
import { visuallyHidden } from '@guardian/source/foundations';
import { SvgTickRound } from '@guardian/source/react-components';
import type { HTMLAttributes } from 'react';
import { memo, useEffect, useRef } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { useTheme } from '../context/Theme';

const punctuateString = (string: string) => {
	const trimmed = string.trim();
	return /[!?.…]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

const formatClueForScreenReader = (clueString: string) => {
	const [, clue, lengths] = /(.+)\((.+?)\)$/gm.exec(clueString) ?? [];

	// If we can't find the clue or lengths, just return the original string
	if (!isString(clue) || !isString(lengths)) {
		return punctuateString(clueString);
	}

	const [last, ...rest] = lengths
		.split(',')
		.map((_) => _.trim() + ' letters')
		.reverse();

	const lengthsToSentence = [rest.reverse().join(', '), last?.trim()]
		.filter(Boolean)
		.join(' and ');

	const clueWithPunctuation = punctuateString(clue);

	return `${clueWithPunctuation} ${lengthsToSentence}.`;
};

const formatNumberForScreenReader = (
	humanNumber: string,
	direction: string,
) => {
	return (
		humanNumber
			.split(',')
			.map((number) => `${number.trim()} ${direction}`)
			.join(', ') + '.'
	);
};

type Props = {
	entry: CAPIEntry;
	isConnected?: boolean;
	isSelected?: boolean;
	isComplete?: boolean;
	isValid?: boolean;
	scrollToSelected?: boolean;
	selectClue: (entry: CAPIEntry) => void;
} & HTMLAttributes<HTMLDivElement>;

const ClueComponent = ({
	entry,
	isConnected,
	isSelected,
	isComplete,
	isValid,
	scrollToSelected,
	selectClue,
	...props
}: Props) => {
	const theme = useTheme();
	const clueRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clue = clueRef.current;

		if (!clue) {
			return;
		}

		if (isSelected && scrollToSelected) {
			clue.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [isSelected, scrollToSelected]);

	return (
		<div
			data-entry-id={entry.id}
			css={css`
				background-color: ${isSelected
					? theme.selectedBackgroundColor
					: isConnected
						? theme.connectedBackgroundColor
						: 'transparent'};
				cursor: ${isConnected ? 'default' : 'pointer'};
				opacity: ${isComplete ? 0.5 : 1};

				padding: 0.5em 0;
				color: currentColor;

				@media print {
					padding: 0.125em 0;
					background-color: transparent;
					opacity: 1;
				}
			`}
			onClick={() => selectClue(entry)}
			ref={clueRef}
			{...props}
		>
			<span
				aria-hidden="true"
				css={css`
					font-weight: bold;
					display: table-cell;
					width: 1.25em;
					padding-right: 0.625em;
				`}
			>
				{entry.humanNumber}
			</span>
			<span
				aria-hidden="true"
				css={css`
					display: table-cell;
				`}
				dangerouslySetInnerHTML={{
					__html: entry.clue,
				}}
			></span>
			<span css={css(visuallyHidden)}>
				{`${isValid ? 'Answer correct.' : ''} ${formatNumberForScreenReader(entry.humanNumber, entry.direction)} ${formatClueForScreenReader(entry.clue)}`}
			</span>
			{isValid && (
				<span
					css={css`
						display: table-cell;
						min-width: 1.25em;
						vertical-align: middle;
					`}
				>
					<SvgTickRound />
				</span>
			)}
		</div>
	);
};

export const Clue = memo(ClueComponent);
