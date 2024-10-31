import React, {
	createContext,
	type ReactElement,
	useContext,
	useMemo,
	useReducer,
} from 'react';
import { Clue } from '../interfaces';

// Define the initial state
const initialState = {
	clues: [],
};

// Define CluesState type
export interface CluesState {
	clues: Clue[];
}

type CluesAction =
	| {
			type: 'ANSWER_GRID';
	  }
	| {
			type: 'ANSWER_ONE';
			payload: string[];
	  }
	| {
			type: 'SELECT_CLUE';
			payload: string;
	  }
	| {
			type: 'UNANSWER_GRID';
	  }
	| {
			type: 'UNANSWER_ONE';
			payload: string[];
	  }
	| {
			type: 'UPDATE_GRID';
			payload: Clue[];
	  };

const ANSWER_GRID = 'ANSWER_GRID';
const ANSWER_ONE = 'ANSWER_ONE';
const SELECT_CLUE = 'SELECT_CLUE';
const UNANSWER_GRID = 'UNANSWER_GRID';
const UNANSWER_ONE = 'UNANSWER_ONE';
const UPDATE_GRID = 'UPDATE_GRID';

// Reducer function
function cluesReducer(state: CluesState, action: CluesAction): CluesState {
	switch (action.type) {
		case ANSWER_GRID:
			return {
				...state,
				clues: state.clues.map((clue) => ({
					...clue,
					answered: true,
				})),
			};
		case ANSWER_ONE:
			return {
				...state,
				clues: state.clues.map((clue) =>
					action.payload.includes(clue.id) ? { ...clue, answered: true } : clue,
				),
			};
		case SELECT_CLUE:
			// Update URL
			window.history.replaceState(null, '', `#${action.payload}`);
			return {
				...state,
				clues: state.clues.map((clue) => ({
					...clue,
					selected: clue.id === action.payload,
				})),
			};
		case UNANSWER_GRID:
			return {
				...state,
				clues: state.clues.map((clue) => ({
					...clue,
					answered: false,
				})),
			};
		case UNANSWER_ONE:
			return {
				...state,
				clues: state.clues.map((clue) =>
					action.payload.includes(clue.id)
						? { ...clue, answered: false }
						: clue,
				),
			};
		case UPDATE_GRID:
			return {
				...state,
				clues: action.payload,
			};
		default:
			return state;
	}
}

// Create Context
const CluesContext = createContext<{
	state: CluesState;
	answerGrid: () => void;
	answerOne: (ids: string[]) => void;
	select: (id: string) => void;
	unanswerGrid: () => void;
	unanswerOne: (ids: string[]) => void;
	updateGrid: (clues: Clue[]) => void;
} | null>(null);

// Context Provider Component
export const CluesProvider: React.FC<{ children: ReactElement }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(cluesReducer, initialState);

	// Action functions using useCallback to memoize
	const answerGrid = React.useCallback(
		() => dispatch({ type: ANSWER_GRID }),
		[],
	);
	const answerOne = React.useCallback(
		(ids: string[]) => dispatch({ type: ANSWER_ONE, payload: ids }),
		[],
	);
	const select = React.useCallback(
		(id: string) => dispatch({ type: SELECT_CLUE, payload: id }),
		[],
	);
	const unanswerGrid = React.useCallback(
		() => dispatch({ type: UNANSWER_GRID }),
		[],
	);
	const unanswerOne = React.useCallback(
		(ids: string[]) => dispatch({ type: UNANSWER_ONE, payload: ids }),
		[],
	);
	const updateGrid = React.useCallback(
		(clues: Clue[]) => dispatch({ type: UPDATE_GRID, payload: clues }),
		[],
	);

	// Memoize context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			state,
			answerGrid,
			answerOne,
			select,
			unanswerGrid,
			unanswerOne,
			updateGrid,
		}),
		[
			state,
			answerGrid,
			answerOne,
			select,
			unanswerGrid,
			unanswerOne,
			updateGrid,
		],
	);

	return (
		<CluesContext.Provider value={contextValue}>
			{children}
		</CluesContext.Provider>
	);
};

export const useCluesContext = () => {
	const context = useContext(CluesContext);
	if (!context) {
		throw new Error('useCluesContext must be used within a CluesProvider');
	}
	return context;
};
