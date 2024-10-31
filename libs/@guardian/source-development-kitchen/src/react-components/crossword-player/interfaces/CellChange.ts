import type { CellPosition, Char } from '.';

export default interface CellChange {
	pos: CellPosition;
	guess?: Char;
	previousGuess?: Char;
}
