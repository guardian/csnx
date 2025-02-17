import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';
import { createContext, type ReactNode, useContext, useState } from 'react';
import type { EntryID } from '../@types/Entry';

type ValidAnswers = Set<EntryID>;
type InvalidCellAnswers = Set<`x${number}y${number}`>;

type ValidAnswersContext = {
	validAnswers: ValidAnswers;
	invalidCellAnswers: InvalidCellAnswers;
	setValidAnswers: Dispatch<SetStateAction<ValidAnswers>>;
	setInvalidCellAnswers: Dispatch<SetStateAction<InvalidCellAnswers>>;
};

const validAnswersContext = createContext<ValidAnswersContext | undefined>(
	undefined,
);

export const ValidAnswersProvider = ({
	children,
	validAnswers: userValidAnswers,
}: {
	validAnswers?: ValidAnswers;
	children: ReactNode;
}) => {
	const [invalidCellAnswers, setInvalidCellAnswers] =
		useState<InvalidCellAnswers>(new Set());
	const [validAnswers, setValidAnswers] = useState<ValidAnswers>(
		userValidAnswers ?? new Set(),
	);

	const contextValue = useMemo(
		() => ({
			validAnswers,
			setValidAnswers,
			invalidCellAnswers,
			setInvalidCellAnswers,
		}),
		[invalidCellAnswers, validAnswers],
	);

	return (
		<validAnswersContext.Provider value={contextValue}>
			{children}
		</validAnswersContext.Provider>
	);
};

export const useValidAnswers = () => {
	const context = useContext(validAnswersContext);

	if (!context) {
		throw new Error(
			'ValidAnswersContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
