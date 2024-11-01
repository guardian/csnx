// @ts-nocheck

import type GuardianClue from './GuardianClue';

export default interface GuardianCrossword {
	creator?: {
		name: string;
		webUrl: string;
	};
	crosswordType:
		| 'cryptic'
		| 'quick'
		| 'quiptic'
		| 'speedy'
		| 'prize'
		| 'everyman';
	date: number;
	dateSolutionAvailable?: number;
	dimensions: {
		cols: number;
		rows: number;
	};
	entries: GuardianClue[];
	id: string;
	name: string;
	number: number;
	pdf?: string;
	solutionAvailable: boolean;
	webPublicationDate?: number;
}
