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

### `getMeasures(teams)`

Returns: `GuardianMeasure[]`

Retrieve `PerformanceMeasure` generated with `startPerformanceMeasure`.
The type is narrowed to `GuardianMeasure` which contains relevant details

#### `teams`

Type:`TeamName[]`

Name of teams to get the measures for
