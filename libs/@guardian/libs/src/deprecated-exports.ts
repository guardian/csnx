/**
 * DEPRECATED EXPORTS
 *
 * To be removed from the public interface in the next major version.
 */

import { Pillar } from './format/Pillar';
import { type Subscription } from './logger/@types/logger';

/** @deprecated Use `Pillar` instead. */
export const ArticlePillar = Pillar;

/** @deprecated Use `Subscription` instead. */
export type TeamName = Subscription;
