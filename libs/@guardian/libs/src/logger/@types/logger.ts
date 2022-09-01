import type { commonStyle, teamStyles } from '../teamStyles';

export type Teams<K extends string> = Record<K, Record<string, string>>;
export type LogCall = (team: TeamName, ...args: unknown[]) => void;
export type TeamSubscription = (arg: TeamName) => void;
export type TeamStyle = TeamName | keyof typeof commonStyle;
export type TeamName = keyof typeof teamStyles;
