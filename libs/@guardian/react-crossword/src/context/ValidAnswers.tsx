import type { Dispatch, SetStateAction } from 'react';
import { createContext, type ReactNode, useContext, useState } from 'react';
import type { EntryID } from '../@types/Entry';

type ValidAnswers = Set<EntryID>;

type ValidAnswersContext = {
	validAnswers: ValidAnswers;
	setValidAnswers: Dispatch<SetStateAction<ValidAnswers>>;
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
	const [validAnswers, setValidAnswers] = useState<ValidAnswers>(
		userValidAnswers ?? new Set(),
	);

	return (
		<validAnswersContext.Provider value={{ validAnswers, setValidAnswers }}>
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
