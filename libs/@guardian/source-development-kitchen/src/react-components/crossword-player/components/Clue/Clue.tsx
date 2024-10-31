import { css } from '@emotion/react';
import * as React from 'react';
import { useCellsContext } from '../../context/CellsContext';
import { useCluesContext } from '../../context/CluesContext';
import { decodeHtmlEntities, isInPerimeterRect } from '../../utils/general';
import { CellFocus, CellPosition } from './../../interfaces';

// Define styles
const clueStyle = css`
	cursor: pointer;
	display: flex;
	line-height: 22px;
	color: #000;
	padding: 4px 12px 4px 7px;
	user-select: none;

	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
`;

const answeredStyle = css`
	opacity: 0.6;
`;

const highlightedStyle = css`
	background-color: #bbdefb;

	&:hover {
		background-color: #bbdefb;
	}
`;

const clueNumStyle = css`
	flex: 0 0 20px;
	font-weight: bold;
	margin-right: 20px;
`;

const clueTextStyle = css`
	&::before {
		display: block;
		content: attr(data-text);
		font-weight: bold;
		height: 0;
		overflow: hidden;
		visibility: hidden;
	}
`;

interface ClueProps {
	allowedHtmlTags: string[];
	answered: boolean;
	breakpoint: string;
	col: number;
	containerRef?: React.RefObject<HTMLDivElement>;
	id: string;
	inputRef?: React.RefObject<HTMLInputElement>;
	isHighlighted: boolean;
	num: string;
	onCellFocus?: (cellFocus: CellFocus) => void;
	row: number;
	scrollTo?: boolean;
	text: string;
}

function Clue({
	allowedHtmlTags,
	answered,
	breakpoint,
	col,
	containerRef,
	id,
	inputRef,
	isHighlighted,
	num,
	onCellFocus,
	row,
	scrollTo,
	text,
}: ClueProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { select: cellsActionSelect } = useCellsContext();
	const { select: cluesActionSelect } = useCluesContext();

	React.useEffect(() => {
		if (
			scrollTo &&
			ref.current !== null &&
			containerRef !== undefined &&
			containerRef.current !== null
		) {
			const rect = ref.current.getBoundingClientRect();
			const perimeterRect = containerRef.current.getBoundingClientRect();
			const inView = isInPerimeterRect(rect, perimeterRect);

			if (!inView) {
				ref.current.scrollIntoView({
					behavior: 'auto',
					block: 'nearest',
					inline: 'nearest',
				});
			}
		}
	}, [scrollTo]);

	const cellFocus = (pos: CellPosition, clueId: string) => {
		onCellFocus?.({
			pos,
			clueId,
		});
	};

	const updateSelectedClue = React.useCallback(() => {
		const pos = { col, row };
		cluesActionSelect(id);
		cellsActionSelect(pos);
		cellFocus(pos, id);
		inputRef?.current?.focus({ preventScroll: true });
	}, [breakpoint, inputRef]);

	return (
		<div
			css={[
				clueStyle,
				answered && answeredStyle,
				isHighlighted && highlightedStyle,
			]}
			onClick={updateSelectedClue}
			onKeyPress={(event) => {
				if (event.key === 'Enter') {
					updateSelectedClue();
				}
			}}
			role="button"
			ref={ref}
			tabIndex={0}
		>
			<span css={clueNumStyle}>{num}</span>
			<span
				css={clueTextStyle}
				dangerouslySetInnerHTML={{
					__html: text,
				}}
				data-text={decodeHtmlEntities(text)}
			/>
		</div>
	);
}

export default React.memo(Clue);
