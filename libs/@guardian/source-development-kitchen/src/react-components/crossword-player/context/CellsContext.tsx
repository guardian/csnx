import React, {
	createContext,
	type ReactElement,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from 'react';
import { Cell, CellPosition } from '../interfaces';

// Define the initial state
const initialState = {
	cells: [],
};

// Define the CellsState type
export interface CellsState {
	cells: Cell[];
}

type CellsAction =
	| {
			type: 'CLEAR_GRID';
	  }
	| {
			type: 'REVEAL_GRID';
	  }
	| {
			type: 'SELECT_CELL';
			payload: CellPosition;
	  }
	| {
			type: 'UPDATE_GRID';
			payload: Cell[];
	  };
// Define action types
const CLEAR_GRID = 'CLEAR_GRID';
const REVEAL_GRID = 'REVEAL_GRID';
const SELECT_CELL = 'SELECT_CELL';
const UPDATE_GRID = 'UPDATE_GRID';

// Reducer function
function cellsReducer(state: CellsState, action: CellsAction): CellsState {
	switch (action.type) {
		case CLEAR_GRID:
			return {
				...state,
				cells: state.cells.map((cell) => ({
					...cell,
					guess: undefined,
				})),
			};
		case REVEAL_GRID:
			return {
				...state,
				cells: state.cells.map((cell) => ({
					...cell,
					guess: cell.val,
				})),
			};
		case SELECT_CELL:
			return {
				...state,
				cells: state.cells.map((cell) => ({
					...cell,
					selected:
						cell.pos.col === action.payload.col &&
						cell.pos.row === action.payload.row,
				})),
			};
		case UPDATE_GRID:
			return {
				...state,
				cells: action.payload,
			};
		default:
			return state;
	}
}

// Create the context
const CellsContext = createContext<{
	state: CellsState;
	clearGrid: () => void;
	revealGrid: () => void;
	select: (position: CellPosition) => void;
	updateGrid: (cells: Cell[]) => void;
} | null>(null);

// Context provider component
export const CellsProvider: React.FC<{ children: ReactElement }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(cellsReducer, initialState);

	// Memoize action functions with useCallback
	const clearGrid = useCallback(
		() => dispatch({ type: CLEAR_GRID }),
		[dispatch],
	);
	const revealGrid = useCallback(
		() => dispatch({ type: REVEAL_GRID }),
		[dispatch],
	);
	const select = useCallback(
		(position: CellPosition) =>
			dispatch({
				type: SELECT_CELL,
				payload: position,
			}),
		[dispatch],
	);
	const updateGrid = useCallback(
		(cells: Cell[]) => dispatch({ type: UPDATE_GRID, payload: cells }),
		[dispatch],
	);

	// Memoize context value to avoid unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			state,
			clearGrid,
			revealGrid,
			select,
			updateGrid,
		}),
		[state, clearGrid, revealGrid, select, updateGrid],
	);
	return (
		<CellsContext.Provider value={contextValue}>
			{children}
		</CellsContext.Provider>
	);
};

export const useCellsContext = () => {
	const context = useContext(CellsContext);
	if (!context) {
		throw new Error('useCluesContext must be used within a CluesProvider');
	}
	return context;
};
