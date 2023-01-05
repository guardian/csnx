import type {
	ABTest as _ABTest,
	ABTestAPI as _ABTestAPI,
	AbTestConfig as _AbTestConfig,
	Participations as _Participations,
	Runnable as _Runnable,
	Variant as _Variant,
} from './@types';
import { AB } from './ab';

export { AB };
export declare type ABTest = _ABTest;
export declare type ABTestAPI = _ABTestAPI;
export declare type AbTestConfig = _AbTestConfig;
export declare type Runnable = _Runnable<_ABTest>;
export declare type Variant = _Variant;
export declare type Participations = _Participations;
