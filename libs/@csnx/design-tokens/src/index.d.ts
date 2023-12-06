import { tokens } from './build';

export declare const breakpoints: Readonly<{
	[K in keyof typeof tokens.breakpoint]: number;
}>;
export declare const palette: Readonly<typeof tokens.palette>;

export declare const space: Readonly<{
	[K in keyof typeof tokens.space]: number;
}>;
export declare const remSpace: Readonly<{
	[K in keyof typeof tokens.space]: string;
}>;
