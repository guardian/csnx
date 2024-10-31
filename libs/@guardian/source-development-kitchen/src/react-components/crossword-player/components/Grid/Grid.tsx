import { css } from '@emotion/react';
import * as React from 'react';
import { cellSize, GridCell, GridSeparators } from '../../components';
import { useCellsContext } from '../../context/CellsContext';
import { useCluesContext } from '../../context/CluesContext';
import { getDimensions } from '../GridCell/GridCell';
import GridInput from '../GridInput/GridInput';
import Spinner from '../Spinner/Spinner';
import { useDebounce } from './../../hooks';
import type {
	Cell,
	CellPosition,
	Char,
	Clue,
	GuardianClue,
	GuessGrid,
	CellChange,
	CellFocus,
} from './../../interfaces';
import { mergeCell } from './../../utils/cell';
import { isCluePopulated } from './../../utils/clue';
import { isValidChar } from './../../utils/general';
import { getGuessGrid } from './../../utils/guess';

// Base sizes and breakpoints
const gridBackground = '#000'; // vars.$grid-background
const gridSize = 10;
const breakpointXS = 576;
const breakpointSM = 768;

// Emotion CSS styles
const gridStyle = css`
	position: relative;

	&:focus {
		outline: none;
	}
`;

const loadingStyle = css`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${gridBackground};
`;

const backgroundStyle = css`
	fill: ${gridBackground};
`;

const inputContainerStyle = css`
	pointer-events: none;
	position: absolute;
`;

// Responsive styling
const responsiveStyle = css`
	@media (max-width: ${breakpointXS}px) {
		width: auto !important;
		height: auto !important;
		min-width: auto !important;
		min-height: auto !important;
		scroll-margin-top: ${gridSize * 5}px;
	}

	@media (min-width: ${breakpointXS}px) and (max-width: ${breakpointSM}px) {
		scroll-margin-top: ${gridSize * 5}px;
	}
`;

const cellPositionMatches = (
	cellPosA: CellPosition,
	cellPosB?: CellPosition,
) => {
	if (cellPosB === undefined) {
		return false;
	}
	return cellPosA.col === cellPosB.col && cellPosA.row === cellPosB.row;
};

interface GridProps {
	cellMatcher: RegExp;
	cells: Cell[];
	clues: Clue[];
	cols: number;
	guessGrid: GuessGrid;
	inputRef?: React.RefObject<HTMLInputElement>;
	isLoading?: boolean;
	onCellChange?: (cellChange: CellChange) => void;
	onCellFocus?: (cellFocus: CellFocus) => void;
	rawClues: GuardianClue[];
	rows: number;
	setGuessGrid: (value: GuessGrid | ((val: GuessGrid) => GuessGrid)) => void;
}

export default function Grid({
	cellMatcher,
	cells,
	clues,
	cols,
	guessGrid,
	inputRef,
	isLoading = false,
	onCellChange,
	onCellFocus,
	rawClues,
	rows,
	setGuessGrid,
}: GridProps) {
	const { updateGrid: cellsActionUpdateGrid, select: cellsActionSelect } =
		useCellsContext();
	const {
		answerOne: cluesActionAnswerOne,
		select: cluesActionSelect,
		unanswerOne: cluesActionUnanswerOne,
	} = useCluesContext();

	const selectedCell = cells.find((cell) => cell.selected);
	const selectedClue = clues.find((clue) => clue.selected);
	const width = cols * cellSize + cols + 1;
	const height = rows * cellSize + rows + 1;
	const [guesses, setGuesses] = React.useState<GuessGrid>(guessGrid);
	const debouncedGuesses: GuessGrid = useDebounce<GuessGrid>(guesses, 1000);
	const svgRef = React.useRef<SVGSVGElement>(null);
	const [viewBoxScale, setViewBoxScale] = React.useState<number>(1);

	const updateViewBoxScale = React.useCallback(() => {
		if (svgRef.current !== null) {
			const svgWidth = svgRef.current.clientWidth;
			const svgHeight = svgRef.current.clientHeight;
			const scaleX = svgWidth / width;
			const scaleY = svgHeight / height;
			const minScale = Math.min(scaleX, scaleY);

			setViewBoxScale(minScale);
		}
	}, [svgRef.current]);

	React.useEffect(() => {
		window.addEventListener('resize', updateViewBoxScale);
		updateViewBoxScale();

		return function cleanup() {
			window.removeEventListener('resize', updateViewBoxScale);
		};
	}, [updateViewBoxScale]);

	React.useEffect(() => {
		// only update local storage after debounce delay
		setGuessGrid(debouncedGuesses);
	}, [debouncedGuesses]);

	const cellChange = (cell: Cell, newGuess: Char | undefined) => {
		if (onCellChange !== undefined && cell.guess !== newGuess) {
			onCellChange({
				pos: cell.pos,
				guess: newGuess,
				previousGuess: cell.guess,
			});
		}
	};

	const cellFocus = (pos: CellPosition, clueId: string) => {
		if (onCellFocus !== undefined) {
			onCellFocus({
				pos,
				clueId,
			});
		}
	};

	const updateGuesses = (updatedCells: Cell[]) => {
		setGuesses(getGuessGrid(cols, rows, updatedCells));
	};

	const movePrev = () => {
		if (selectedClue === undefined || selectedCell === undefined) {
			return;
		}

		const atTheStart =
			(selectedClue.direction === 'across' &&
				selectedCell.pos.col === selectedClue.position.x) ||
			(selectedClue.direction === 'down' &&
				selectedCell.pos.row === selectedClue.position.y);

		if (atTheStart) {
			// if we're at the start of the clue, try to move to the previous
			// one in the group if it exists
			const groupIndex = selectedClue.group.indexOf(selectedClue.id);
			if (groupIndex > 0) {
				const prevClueId = selectedClue.group[groupIndex - 1];
				const prevClue = clues.find((clue) => clue.id === prevClueId);

				if (prevClue !== undefined && prevClueId) {
					const prevCluePos = {
						col:
							prevClue.position.x +
							(prevClue.direction === 'across' ? prevClue.length - 1 : 0),
						row:
							prevClue.position.y +
							(prevClue.direction === 'down' ? prevClue.length - 1 : 0),
					};

					cluesActionSelect(prevClueId);
					cellsActionSelect(prevCluePos);

					cellFocus(prevCluePos, prevClueId);
				}
			}
		} else {
			// move to the previous cell in the clue
			const cellPos: CellPosition =
				selectedClue.direction === 'across'
					? { col: selectedCell.pos.col - 1, row: selectedCell.pos.row }
					: { col: selectedCell.pos.col, row: selectedCell.pos.row - 1 };
			cellsActionSelect(cellPos);

			cellFocus(cellPos, selectedClue.id);
		}
	};

	const moveNext = () => {
		if (selectedClue === undefined || selectedCell === undefined) {
			return;
		}

		const atTheEnd =
			(selectedClue.direction === 'across' &&
				selectedCell.pos.col ===
					selectedClue.position.x + selectedClue.length - 1) ||
			(selectedClue.direction === 'down' &&
				selectedCell.pos.row ===
					selectedClue.position.y + selectedClue.length - 1);

		if (atTheEnd) {
			// if we're at the end of the clue, try to move onto the next
			// one in the group if it exists
			const groupIndex = selectedClue.group.indexOf(selectedClue.id);
			if (selectedClue.group.length - 1 > groupIndex) {
				const nextClueId = selectedClue.group[groupIndex + 1];
				const nextClue = clues.find((clue) => clue.id === nextClueId);

				if (nextClue !== undefined && nextClueId) {
					const nextCluePos = {
						col: nextClue.position.x,
						row: nextClue.position.y,
					};

					cluesActionSelect(nextClueId);
					cellsActionSelect(nextCluePos);

					cellFocus(nextCluePos, nextClueId);
				}
			}
		} else {
			// move onto the next cell in the clue
			const cellPos: CellPosition =
				selectedClue.direction === 'across'
					? { col: selectedCell.pos.col + 1, row: selectedCell.pos.row }
					: { col: selectedCell.pos.col, row: selectedCell.pos.row + 1 };
			cellsActionSelect(cellPos);

			cellFocus(cellPos, selectedClue.id);
		}
	};

	/**
	 * Find the next cell on the current row/column (wrap on grid overflow)
	 * @param {number} colDelta - Horizontal delta (-1, 0, 1)
	 * @param {number} rowDelta - Vertical delta (-1, 0, 1)
	 */
	const findNextCell = (colDelta: number, rowDelta: number) => {
		const nextPos = (i: number, amount: number, max: number) => {
			const j = i + amount;

			if (j === -1) {
				return max - 1;
			}
			if (j === max) {
				return 0;
			}

			return j;
		};

		let { col, row } = selectedCell?.pos!;

		// loop won't be infinite as it will always wrap and find the selected cell on the same row/col
		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (colDelta === 1 || colDelta === -1) {
				col = nextPos(col, colDelta, cols);
			} else if (rowDelta === 1 || rowDelta === -1) {
				row = nextPos(row, rowDelta, rows);
			}

			const tempCell = cells.find(
				(cell) => cell.pos.col === col && cell.pos.row === row,
			);

			if (tempCell !== undefined) {
				return tempCell;
			}
		}
	};

	const moveDirection = (direction: string) => {
		if (selectedClue === undefined || selectedCell === undefined) {
			return;
		}
		let nextCell: Cell | undefined;

		switch (direction) {
			case 'Up':
				nextCell = findNextCell(0, -1);
				break;
			case 'Down':
				nextCell = findNextCell(0, 1);
				break;
			case 'Left':
				nextCell = findNextCell(-1, 0);
				break;
			case 'Right':
				nextCell = findNextCell(1, 0);
				break;
			default:
				nextCell = undefined;
		}

		if (nextCell !== undefined) {
			cellsActionSelect(nextCell.pos);

			// update the selected clue
			if (!nextCell.clueIds.includes(selectedClue.id) && nextCell.clueIds[0]) {
				cluesActionSelect(nextCell.clueIds[0]);

				cellFocus(nextCell.pos, nextCell.clueIds[0]);
			} else {
				cellFocus(nextCell.pos, selectedClue.id);
			}
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (selectedClue === undefined || selectedCell === undefined) {
			return;
		}

		// whitelist keys
		if (
			![
				'ArrowUp',
				'ArrowDown',
				'ArrowLeft',
				'ArrowRight',
				'Backspace',
				'Delete',
				'Tab',
			].includes(event.key)
		) {
			return;
		}

		// prevent keys scrolling page
		event.preventDefault();

		// prevent arrow keys propagating to window
		event.stopPropagation();

		if (
			['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
		) {
			// move to the next cell
			moveDirection(event.key.replace('Arrow', ''));
		} else if (['Backspace', 'Delete'].includes(event.key)) {
			cellChange(selectedCell, undefined);

			// clear the cell's value
			const updatedCell: Cell = {
				...selectedCell,
				guess: undefined,
			};

			const updatedCells = mergeCell(updatedCell, cells);
			cellsActionUpdateGrid(updatedCells);

			// mark clue(s) as unanswered (ones in group and crossing)
			selectedCell.clueIds.forEach((clueId) => {
				const clue = clues.find((c) => c.id === clueId);

				if (clue) {
					if (isCluePopulated(clue, updatedCells)) {
						cluesActionAnswerOne(clue.group);
					} else {
						cluesActionUnanswerOne(clue.group);
					}
				}
			});

			if (event.key === 'Backspace') {
				movePrev();
			}

			updateGuesses(updatedCells);
		} else if (event.key === 'Tab') {
			// cycle through the clues
			const index = clues.findIndex((clue) => clue.selected);
			let nextIndex = 0;

			// forwards or backwards
			if (event.shiftKey) {
				nextIndex = index > 0 ? index - 1 : clues.length - 1;
			} else {
				nextIndex = index < clues.length - 1 ? index + 1 : 0;
			}
			const nextClue = clues[nextIndex];
			if (nextClue) {
				const nextCluePos = {
					col: nextClue.position.x,
					row: nextClue.position.y,
				};

				cluesActionSelect(nextClue.id);
				cellsActionSelect(nextCluePos);

				cellFocus(nextCluePos, nextClue.id);
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedClue === undefined || selectedCell === undefined) {
			return;
		}

		const key = event.target.value.toUpperCase();

		if (isValidChar(key, cellMatcher)) {
			cellChange(selectedCell, key as Char);

			const updatedCell: Cell = {
				...selectedCell,
				guess: key as Char,
			};

			const updatedCells = mergeCell(updatedCell, cells);

			// overwrite the cell's value
			cellsActionUpdateGrid(updatedCells);

			// if all cells are populated, mark clue as answered
			selectedCell.clueIds.forEach((clueId) => {
				const clue = clues.find((c) => c.id === clueId)!;
				const populated = isCluePopulated(clue, updatedCells);

				if (populated) {
					cluesActionAnswerOne(clue.group);
				}
			});

			moveNext();

			updateGuesses(updatedCells);
		} else {
			// prevent keys scrolling page
			event.preventDefault();
		}
	};

	const dimensions =
		selectedCell !== undefined ? getDimensions(selectedCell?.pos) : undefined;

	return (
		<div
			css={[gridStyle, isLoading && loadingStyle, responsiveStyle]}
			data-testid="grid"
			style={{ minWidth: width, minHeight: height, width, height }}
		>
			{isLoading ? (
				<Spinner size="standard" />
			) : (
				<>
					<svg
						preserveAspectRatio="xMinYMin"
						ref={svgRef}
						viewBox={`0 0 ${width} ${height}`}
					>
						<rect
							css={backgroundStyle}
							onMouseDown={(event) => {
								event.preventDefault();
								document.querySelectorAll<HTMLElement>('.Grid')?.[0]?.blur();
							}}
							width={width}
							height={height}
							x="0"
							y="0"
						/>
						{cells.map(({ clueIds, guess, num, pos }) => {
							const isSelected = cellPositionMatches(pos, selectedCell?.pos);
							const isHighlighted = clueIds.some((clueId) =>
								selectedClue?.group.includes(clueId),
							);

							const selectedClueIndex =
								selectedClue !== undefined
									? clueIds.indexOf(selectedClue.id)
									: -1;

							return (
								<GridCell
									clueIds={clueIds}
									guess={guess}
									inputRef={inputRef}
									isHighlighted={isHighlighted}
									isSelected={isSelected}
									key={`${pos.col},${pos.row}`}
									num={num}
									onCellFocus={onCellFocus}
									pos={pos}
									selectedClueIndex={selectedClueIndex}
								/>
							);
						})}
						<GridSeparators clues={rawClues} />
					</svg>
					<div
						css={inputContainerStyle}
						style={{
							width:
								selectedCell !== undefined
									? cellSize * viewBoxScale
									: undefined,
							height:
								selectedCell !== undefined
									? cellSize * viewBoxScale
									: undefined,
							top:
								dimensions?.yRect !== undefined
									? dimensions.yRect * viewBoxScale
									: undefined,
							left:
								dimensions?.xRect !== undefined
									? dimensions.xRect * viewBoxScale
									: undefined,
						}}
					>
						<GridInput
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							ref={inputRef}
							visible={selectedCell !== undefined}
						/>
					</div>
				</>
			)}
		</div>
	);
}
