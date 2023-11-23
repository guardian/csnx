---
'@guardian/ab-core': major
'@guardian/ab-react': major
---

Members of the `OphanAPIConfig` are now **required**. Consumers must pass a
record function, an error reporter and an object of server-side tests.

With the previously optional members, failure to record tests to Ophan would
fail silently. This has been the case in `dotcom-rendering` since Oct 2023.

In order to update your code to work identically, you must now provide the
following keys to the constructor’s argument. They are listed here along with
the fallbacks previously applied:

- `serverSideTests` &rarr; `{}`
- `errorReporter` &rarr; `() => undefined`
- `ophanRecord` &rarr; `() => undefined`

Note that `errorReporter` has also been narrowed and it now receives a single
parameter, which is still `unknown` due to the fact than anything can be thrown.
