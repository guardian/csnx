import { tokens } from './build';
import { addRem, removePx } from './utils/value-conversions.js';

const palette = tokens.palette;
const breakpoints = removePx(tokens.breakpoint);
const space = removePx(tokens.space);
const remSpace = addRem(space);

export { palette, space, remSpace, breakpoints };
