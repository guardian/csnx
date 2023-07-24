# `startPerformanceMeasure`

Helper to measure the duration between two events.

Once ended, measures are appended to the list of `PerformanceMeasure` and can be
retrieved with `performance.getEntriesByType('measure')`

### Example

```js
// my-file.js
import { startPerformanceMeasure } from '@guardian/libs';

const { endPerformanceMeasure } = startPerformanceMeasure('dotcom', 'fetch');
// perform task
await fetch('https://www.theguardian.com/uk.json');
const duration = endPerformanceMeasure(); // duration of task in milliseconds
```

## Table of contents

- [Methods](#methods)
  - [`startPerformanceMeasure(team, name, action)`](#startperformancemeasureteam-name-action)

## Methods

### `startPerformanceMeasure(team, name, action)`

Returns: `{ endPerformanceMeasure: () => number }`

Start measuring a performance duration.

#### `team`

Type: `TeamName`<br>

Name of the team interested in this log.
Used for labelling `PerformanceMeasure`.

#### `name`

Type: `string`<br>

The performed task’s name.
Used for labelling `PerformanceMeasure`.

#### `action`

Type: `string | undefined`<br>

Optional action performed as part of a task.
Used for labelling `PerformanceMeasure`.

### `endPerformanceMeasure(team, name, action)`

Returns: `void`

Typically, the end of a measure should be marked by
invoking the return method of `startPerformanceMeasure`.

For measurements that span across module or functional boundaries,
call this method with the same arguments as `startPerformanceMeasure`
to record a `PerformanceMeasure`.

The following caveats should be noted with this usage:

- no measure are recorded without a matching `startPerformanceMeasure`
- recorded measure may have a negative duration

(see [`startPerformanceMeasure`](#startperformancemeasureteam-name-action) for arguments)
