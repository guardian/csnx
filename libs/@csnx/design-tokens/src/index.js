import { tokens } from './build';
import { addRem, removePx } from './utils/value-conversions.js';

const palette = tokens.palette;
const breakpoint = tokens.breakpoint;
const space = removePx(tokens.space);
const remSpace = addRem(space);

export { palette, space, remSpace, breakpoint };
