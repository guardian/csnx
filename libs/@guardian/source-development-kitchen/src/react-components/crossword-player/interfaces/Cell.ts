import { CellPosition, Char } from '.';

export default interface Cell {
	clueIds: string[];
	guess?: Char;
	num?: number;
	pos: CellPosition;
	selected: boolean;
	val: Char;
}
