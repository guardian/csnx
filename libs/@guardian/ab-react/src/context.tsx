import type { ABTestAPI, AbTestConfig } from '@guardian/ab-core';
import { AB as ABConstructor } from '@guardian/ab-core';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

/**
 * ABContext is the global context container for the AB object
 *
 * CoreAPI = Is the AB API as exported from ab-rendering
 */
const ABContext = createContext<ABTestAPI | undefined>(undefined);

/**
 * ABProvider sets an instance of ABContext
 *
 * Each instance of AB has its own config.
 *
 * @example
 * import { ABProvider, useAB } from './ab';
 *
 * const Example = () => {
 *   const AB = useAB();
 *   if (AB.isUserInVariant('DummyTest', 'variant')) return <p>InTheTest</p>;
 *   return <p>NotInTest</p>;
 * };
 *
 * export const WithProvider = (abConfig) => (
 *   <ABProvider { ...abConfig } >
 *     <Example />
 *   </ABProvider>
 * )
 */
export const ABProvider = ({
	arrayOfTestObjects,
	abTestSwitches,
	pageIsSensitive,
	mvtMaxValue,
	mvtId,
	forcedTestVariants,
	forcedTestException,
	errorReporter,
	ophanRecord,
	serverSideTests,
	children,
}: AbTestConfig & { children: ReactNode }) => (
	<ABContext.Provider
		value={
			new ABConstructor({
				mvtId,
				mvtMaxValue,
				pageIsSensitive,
				abTestSwitches,
				arrayOfTestObjects,
				forcedTestVariants,
				forcedTestException,
				errorReporter,
				ophanRecord,
				serverSideTests,
			})
		}
	>
		{children}
	</ABContext.Provider>
);

/**
 * useAB is a wrapper around React.useContext(ABContext) to provide a
 * check to make sure there is a ABProvider parent and throw a useful
 * message if not
 */
export const useAB = () => {
	const context = useContext(ABContext);
	if (context === undefined) {
		throw new Error('useAB must be used within the ABProvider');
	}
	return context;
};
