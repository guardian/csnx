# The Guardian's AB Testing Library

## Getting Started

1. Install the package with your manager of choice. e.g.
   `pnpm add @guardian/ab-core`
2. [Initialise the AB Class](#initialising) in your project
3. Consume [the API](#the-api)

> **Note** There use to be a (P)React framework-specific implementation, but it
> was not used in many context and has been removed. See
> [@guardian/ab-react](https://www.npmjs.com/package/@guardian/ab-react)

## What does this client-side A/B testing library do?

This library:

- Is initialised with an multivariate identifier (MVT ID)
  - This can be set by the server for fast user bucketing, e.g. as a cookie
- Is built upon the A/B testing code
  [from frontend](https://github.com/guardian/frontend)
- Has the ability to force variants for testing
- Has simple integration with Ophan, with impression and success methods built
  in to the library
- Can be integrated into a Typescript or Javascript project

There’s some background to the
[early requirements to the library and some documentation in Frontend](https://github.com/guardian/frontend/blob/master/docs/03-dev-howtos/01-ab-testing.md),
there’s some
[notes about the migration of A/B tests](https://docs.google.com/document/d/1-_koo-DK9n7pRT_74nP72lq9o4RVl-RytUOZKqPVf4A/edit).

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

```ts
import { AB } from '@guardian/ab-core';
import type { AbTestConfig } from '@guardian/ab-core';

const config: AbTestConfig = {
	mvtId: 999_999,
	pageIsSensitive: false,
	abTestSwitches: {},
	arrayOfTestObjects: [],
};

const abTests = new AB(config);

// Must be performed in the platform after initialisation to ensure tracking defined in ABTests is setup
// [tests] being an array of *runnable* ab tests
abTest.registerCompleteEvents([tests]);
abTest.registerImpressionEvents([tests]);
abTest.trackABTests([tests]);

// The API then provides access to the utility methods for use within modules
abTests.runnableTest(test);
abTests.firstRunnableTest([tests]);
abTests.isUserInVariant(testId, variantId);
```

### The initialisation config object

| Config              | Type                                              | Example                                                                           |
| ------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| mvtMaxValue         | number                                            | `10_000`                                                                          |
| mvtCookieId         | number                                            | getCookie('mvt_id')                                                               |
| pageIsSensitive     | boolean                                           | guardian.config.page.isSensitive                                                  |
| abTestSwitches      | Record                                            | {'TestOne': true}                                                                 |
| forcedTestVariants  | Optional: { [key: string]: { variant: string } }; | { TestOne: { variant: 'myCoolVariant' }, TestTwo: { variant: 'myCoolVariant' } }; |
| forcedTestException | Optional: ABTest['id']                            |                                                                                   |
| arrayOfTestObjects  | ABTest[]                                          |                                                                                   |
| ServerSideTets      | ServerSideTests                                   |                                                                                   |
| errorReporter       | ErrorReporterFunc                                 |                                                                                   |
| ophanRecord         | OphanRecordFunction                               |                                                                                   |

### The API

```ts
type CoreAPI = {
	allRunnableTests: (
		tests: ReadonlyArray<ABTest>,
	) => ReadonlyArray<Runnable<ABTest>> | [];
	runnableTest: (
		test: ABTest,
	) => Runnable<ABTest & { variantToRun: Variant }> | null;
	firstRunnableTest: (tests: ReadonlyArray<ABTest>) => Runnable<ABTest> | null;
	isUserInVariant: (testId: ABTest['id'], variantId?: Variant['id']) => boolean;
};
```

| API Method        | Params                         | Returns                                                                                    |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| allRunnableTests  | Array of ab tests              | Array of Runnable tests or empty array                                                     |
| runnableTest      | A single AB test               | A runnable ab test object with variantToRun property containing the variant to run or null |
| firstRunnableTest | Array of AB Tests              | A runnable ab test object or null                                                          |
| isUserInVariant   | A AB test ID, and a Variant ID | A boolean                                                                                  |

### Ab Test Definition

Within your platforms, you should define the test this way. If the test needs to
run across platforms, then the test definition needs to be the same (as well as
the initialisation config).

```ts
import { ABTest } from '@guardian/ab-core';

export const abTestTest: ABTest = {
    id: 'AbTestTest', // This ID must match the Server Side AB Test
    start: '2020-05-20',
    expiry: '2020-12-01', // Remember that the server side test expiry can be different
    author: 'anemailaddress@theguardian.com',
    description: 'This Test'
    audience: 0.0001, // 0.01% (1 is 100%)
    audienceOffset: 0.5, // 50% (1 is 100%). Prevent overlapping with other tests.
    successMeasure: 'It works',
    audienceCriteria: 'Everyone',
    idealOutcome: 'It works',
    showForSensitive: true, // Should this A/B test run on sensitive articles?
    canRun: () => true, // Check for things like user or page sections
    variants: [
        {
            id: 'control',
            test: (): void => {}, // You can define what you want your variant to do in here or use the isUserInVariant API
            impression: (impression) => {
                // This will be immediate.
                // You could also use eventListeners as below
                // Make sure abTest.registerCompleteEvents([tests]); and abTest.registerImpressionEvents([tests]); have been called
                impression();
            },
            success: (success) => {
                // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
                window.addEventListener('guAbTestEvent', (e) => {
                    const detail = e?.detail;
                    if (
                        detail?.abTest === 'abTestTest' &&
                        detail?.variant === 'control' &&
                        detail?.event === 'success') {
                            success();
                        }
                });

            },
        },
        {
            id: 'variant',
            test: (): void => {},
            impression: (impression) => {
                impression();
            },
            success: (success) => {
                //...
            },
        },
    ],
};

// If you're using event listeners for the impression and success events you can call them with CustomEvents
// Say a user clicked something
window.dispatchEvent(new CustomEvent('guAbTestEvent', {
  detail: {
    abTest: 'abTestTest',
    variant: 'control'
    event: 'success'
  }
}))
```

### Example of the AB Test config in Frontend and DCR

The initialisation values are populated on these platforms like so:

| Config              | Note                                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| mvtMaxValue         | MVT % is calculated from 0 to mvtMaxValue                                                                                         |
| mvtCookieId         | The user's MVT ID to calculate what tests and variants they fall into                                                             |
| pageIsSensitive     | Sensitive pages must have explicit settings in AB tests                                                                           |
| abTestSwitches      | An object containing all of the boolean values of abTestSwitches, in Frontend from page.config.switches.abTests                   |
| forcedTestVariants  | In Frontend this might be set by the URL override, but otherwise can be used to force a user into a test and variant at init time |
| forcedTestException | Can be used to force a user out of a test (in Frontend, again with url override)                                                  |
| arrayOfTestObjects  | Pass all tests definitions into the config                                                                                        |
| ServerSideTets      | ServerSideTests are accessed via client-side config in Frontend and DCR                                                           |
| errorReporter       | Pass an error reporter, probably Sentry                                                                                           |
| ophanRecord         | Probably Ophan's 'record' function                                                                                                |

## Frontend: Difference and Integration with DCR

### Integration between Frontend and DCR

- There is currently a requirement to copy and paste the AB test definitions
  between the two platforms. Each platform has an `experiments` folder
  ([Frontend](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/experiment),
  [DCR](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/experiments))
  and the test definition and structure of those folders should match. The
  difference will be where to import - in Frontend in
  [ab-test.ts](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts)
  and in DCR in
  [ab-tests.ts](https://github.com/guardian/dotcom-rendering/blob/main/src/web/experiments/ab-tests.ts).
- For Frontend and DCR, you will need to have a switch as you would usually do
  in Frontend. This will be passed through to DCR in the backend and be
  accessible to the client-side code.

### Differences of this library vs Frontend implementation

- There is no local storage functionality in this library, unlike previously
  where you could store the A/B test in Frontend. To persist an opted-in test,
  the MVT cookie will need to be set to the correct value.
- _Forced Tests_ - used by the url-opt-in mechanism **ignores** canRun on both
  the test _and_ the variant, so it will always run when forced. Previously on
  Frontend it still listened to the variant's canRun.
- Handles only concurrent tests, this library does not concern itself with epics
  or banner tests. There is no mechanism for A/B tests to interact or wait for
  one another outside of audience size and offsets.
- The public API is reduced to only what was used in Frontend
- Some public methods have been renamed like `isUserInVariant` (this does make
  it difficult to copy and paste an implementation between Frontend and DCR
  right now until this library is integrated with Frontend)

## MVTId calculator

[Use this simple calculator](https://ab-tests.netlify.app/) to see what MVT ID
your test variant will fall into.

### Testing with Jest

Uses Jest, see `.test.ts` files.

### Constructor and Provider Patterns

The ab testing library uses the constructor pattern in
[`ab-core`](packages/ab-core/src/ab.ts). It uses the Provider pattern in
[`ab-react`](packages/ab-react/src/ab-react.tsx). We expose the types to public
in [index.tsx](packages/ab-core/src/index.ts).

## What's Next

- [x] Integrate into Frontend
- [ ] Review usability across other platforms and required APIs
- [ ] Investigate tree-shakeable-ness of methods
- [ ] Investigate exposing API methods outside of the configuration, to allow
      usage inside of modules without passing a prop
