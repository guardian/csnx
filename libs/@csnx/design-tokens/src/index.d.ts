import { tokens } from './build';

export declare const palette: typeof tokens.palette;
export declare const space: { [K in keyof typeof tokens.space]: number };
export declare const remSpace: { [K in keyof typeof tokens.space]: string };
