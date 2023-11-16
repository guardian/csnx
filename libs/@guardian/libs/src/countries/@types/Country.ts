import type { countries } from '../countries';

export type Country = (typeof countries)[keyof typeof countries];
