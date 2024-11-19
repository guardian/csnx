import type { Direction } from './Direction';

export type EntryID<Number extends number = number> = `${Number}-${Direction}`;

export type Entry<Number extends number> = {
	id: EntryID<Number>;
	group: [EntryID<Number>, ...EntryID[]];
	number: Number;
};
