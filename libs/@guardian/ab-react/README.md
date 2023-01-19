# The Guardian's AB Testing Library for React

## Getting Started

1. Install the package and its peer dependencies with your manager of choice.
   e.g. `pnpm add @guardian/ab-react @guardian/ab-core preact`
2. [Initialise the AB Class](#initialising) in your project
3. Consume the API [in your App](##consuming-in-app) or
   [in your Components](#consuming-in-components)

> **Note** Read more on the [@guardian/ab-core](../ab-core/README.md) docs

## How it works

1. **Define the AB test**: Each AB test and their variants are defined in code
   with configuration such as audience size & offset and impression & success
   listeners etc
2. **Initialise the library**: The AB Test library is initialised with
   configuration values such as a user's MVT ID, an array of the above defined
   A/B tests etc
3. **Use the AB Test API**: The intialisation returns an API that can be used to
   check if the current user is in a variant of a test along with a variety of
   other API methods

### Initialising

Initialise the config options with the ABProvider

```tsx
import { render } from 'react-dom';
import { ABProvider } from '@guardian/ab-react';

render(
	<ABProvider
		arrayOfTestObjects={tests}
		abTestSwitches={{
			...{ abAbTestTest: true },
			...CAPI.config.switches,
		}}
		pageIsSensitive={CAPI.config.isSensitive}
		mvtMaxValue={1_000_000}
		mvtId={mvtId}
		ophanRecord={ophanRecordFunc}
	>
		<App CAPI={CAPI} NAV={NAV} />
	</ABProvider>,
);
```

### Consuming in App

```tsx
import { useAB } from '@guardian/ab-react';

// Initialise all of the impression and completion events
const ABTestAPI = useAB();
useEffect(() => {
	const allRunnableTests = ABTestAPI.allRunnableTests(tests);
	ABTestAPI.registerImpressionEvents(allRunnableTests);
	ABTestAPI.registerCompleteEvents(allRunnableTests);
}, [ABTestAPI]);
```

### Consuming in Components

```tsx
import { useAB } from '@guardian/ab-react';

// Example usage of AB Tests
// Used in the Cypress tests as smoke test of the AB tests framework integration
const ABTestAPI = useAB();

// We can check if a user is in a variant, returns a boolean
// ABTestTest being an ab test that was passed in via the ab test array
const abTestDataAttr =
	(ABTestAPI.isUserInVariant('AbTestTest', 'control') && 'ab-test-control') ||
	(ABTestAPI.isUserInVariant('AbTestTest', 'variant') && 'ab-test-variant') ||
	'ab-test-not-in-test';

// We can get the variant straight from a check for
// whether the test is runnable
const runnableTest = ABTestAPI.runnableTest(abTestTest);
const variantFromRunnable =
	(runnableTest && runnableTest.variantToRun.id) || 'not-runnable';

<div
	data-ab-user-in-variant={abTestDataAttr}
	data-ab-runnable-test={variantFromRunnable}
>
	AB Test
</div>;
```
