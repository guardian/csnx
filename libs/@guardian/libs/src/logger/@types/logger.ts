import type { commonStyle, subscriptionStyles } from '../subscriptions';

export type Subscriptions<K extends string> = Record<K, Record<string, string>>;
export type LogCall = (subscription: Subscription, ...args: unknown[]) => void;
export type ManageSubscription = (arg: Subscription) => void;
export type LogStyle = Subscription | keyof typeof commonStyle;
export type Subscription = keyof typeof subscriptionStyles;
