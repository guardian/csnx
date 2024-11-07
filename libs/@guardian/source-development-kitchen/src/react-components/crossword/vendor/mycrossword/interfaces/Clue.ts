// @ts-nocheck

import GuardianClue from './GuardianClue';

export default interface Clue extends GuardianClue {
	answered: boolean;
	selected: boolean;
}
