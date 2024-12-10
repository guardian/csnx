import {
	dropTargetForElements,
	monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/Theme';
import type {
	CellsWithProgress,
	CellWithProgress,
} from '../utils/getCellsWithProgressForGroup';
import { CandidateTile } from './CandidateTile';

type SolutionDisplayProps = {
	cellsWithProgress: CellsWithProgress;
	setCellsWithProgress: Dispatch<SetStateAction<CellsWithProgress>>;
};

export const SolutionDisplayCell = ({
	cellWithProgress,
	index,
}: {
	cellWithProgress: CellWithProgress;
	index: number;
}) => {
	const theme = useTheme();
	const ref = useRef<HTMLDivElement>(null);
	const [isDraggedOver, setIsDraggedOver] = useState(false);
	const [isDroppable, setIsDroppable] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (el) {
			dropTargetForElements({
				element: el,
				getData: () => ({ index }),
				onDragEnter: ({ source }) => {
					if (source.data.index === index) {
						setIsDroppable(true);
					} else {
						setIsDroppable(false);
					}
					setIsDraggedOver(true);
				},
				onDragLeave: () => setIsDraggedOver(false),
				onDrop: () => setIsDraggedOver(false),
			});
		}
	}, [index]);

	return (
		<div
			ref={ref}
			key={`drop-${index}`}
			css={css`
				box-sizing: border-box;
				${textSans12};
				font-size: ${theme.cellSize * 0.6}px;
				background-color: ${!isDraggedOver
					? theme.foreground
					: isDroppable || cellWithProgress.candidate === ''
						? theme.dropTargetBackground
						: theme.dropTargetInvalidBackground};
				border: 1px solid ${theme.provisionalText};
				border-right: ${cellWithProgress.separator === ','
					? `3px solid ${theme.provisionalText}`
					: `1px solid ${theme.provisionalText}`};
				width: ${theme.cellSize}px;
				height: ${theme.cellSize}px;
				text-align: center;
				align-content: center;
				position: relative;
				color: ${theme.provisionalText};
			`}
		>
			{cellWithProgress.separator === '-' && (
				<div
					css={css`
						position: absolute;
						height: 2px;
						top: ${theme.cellSize / 2 - 0.5}px;
						left: ${theme.cellSize - 5}px;
						width: 7px;
						background-color: ${theme.background};
						z-index: 1;
					`}
				></div>
			)}
			{cellWithProgress.number && (
				<div
					css={css`
						${textSans12};
						font-size: ${Math.max(9, Math.round(theme.cellSize * 0.2))}px;
						position: absolute;
						top: 0;
						left: 0;
					`}
				>
					{cellWithProgress.number}
				</div>
			)}
			{cellWithProgress.candidate && (
				<CandidateTile candidate={cellWithProgress.candidate} index={index} />
			)}
			{cellWithProgress.progress}
		</div>
	);
};

export const SolutionDisplay = ({
	cellsWithProgress,
	setCellsWithProgress,
}: SolutionDisplayProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();

	useEffect(() => {
		return monitorForElements({
			onDrop({ source, location }) {
				const { clientX, clientY } = location.current.input;
				console.log(clientX, clientY);
				const destination = location.current.dropTargets[0];
				if (!destination) {
					return;
				}
				const destinationIndex = destination.data.index;
				const sourceIndex = source.data.index;
				const candidate = source.data.candidate;
				setCellsWithProgress((cells) => {
					const newCells = [...cells];
					if (
						typeof sourceIndex === 'number' &&
						typeof destinationIndex === 'number' &&
						typeof candidate === 'string' &&
						!isUndefined(newCells[destinationIndex]) &&
						!isUndefined(newCells[sourceIndex]) &&
						newCells[destinationIndex].candidate === ''
					) {
						newCells[destinationIndex].candidate = candidate;
						newCells[sourceIndex].candidate = '';
					}
					return newCells;
				});
			},
		});
	}, [cellsWithProgress, setCellsWithProgress]);

	return (
		<div
			ref={containerRef}
			css={css`
				display: flex;
				justify-content: center;
				flex-direction: row;
				flex-wrap: wrap;
				max-width: 90%;
			`}
		>
			{cellsWithProgress.map((cellWithProgress, index) => {
				return (
					<div
						key={index}
						css={css`
							display: flex;
							flex-direction: column;
							width: ${theme.cellSize}px;
							margin-right: -1px;
							position: relative;
						`}
					>
						<SolutionDisplayCell
							cellWithProgress={cellWithProgress}
							index={index}
						/>
					</div>
				);
			})}
		</div>
	);
};
