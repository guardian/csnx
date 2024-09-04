import path from 'node:path';

export const projectRoot = path.resolve(import.meta.dirname, '..');

/**
 * @param {string} target
 */
export const pathFromRoot = (target) => path.relative(projectRoot, target);
