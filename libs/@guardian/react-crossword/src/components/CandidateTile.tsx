import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { css } from '@emotion/react';
import { palette, textSans17 } from '@guardian/source/foundations';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/Theme';

export const CandidateTile = ({
	candidate,
	index,
}: {
	candidate: string;
	index: number;
}) => {
	const theme = useTheme();
	const ref = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const el = ref.current;
		console.log(index);
		if (el) {
			draggable({
				// The element that will be draggable
				element: el,
				getInitialData: () => ({ candidate, index }),
				onDragStart: () => {
					setIsDragging(true);
				},
				onDrop: () => {
					setIsDragging(false);
				},
			});
		}
	}, [candidate, index]);

	return (
		<div
			ref={ref}
			key={`tile-${index}`}
			css={css`
				visibility: ${isDragging ? 'hidden' : 'visible'};
				position: absolute;
				top: 2px;
				left: 2px;
				${textSans17};
				text-align: center;
				align-content: center;
				width: ${theme.cellSize - 6}px;
				height: ${theme.cellSize - 6}px;
				border-radius: 5px;
				background-color: ${theme.candidateBackground};
				opacity: ${isDragging ? 0.5 : 1};
				// remove corners when dragging https://github.com/react-dnd/react-dnd/issues/788#issuecomment-367300464
				transform: translate(0, 0);
				${!isDragging
					? `box-shadow: 0 3px 2px -2px ${palette.neutral[46]};`
					: ''}
				color: ${theme.text};
				cursor: grab;
				:active {
					cursor: grabbing;
				}
			`}
		>
			{candidate}
		</div>
	);
};
