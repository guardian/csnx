import { Direction, SeparatorLocationsOptional } from '.';

export default interface GuardianClue {
	clue: string;
	direction: Direction;
	group: string[];
	humanNumber: string;
	id: string;
	length: number;
	number: number;
	position: { x: number; y: number };
	separatorLocations: SeparatorLocationsOptional;
	solution?: string;
}
