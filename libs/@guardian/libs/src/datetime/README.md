
# `timeAgo`

Takes an absolute date in [epoch format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#description) and returns a string representing relative time ago.

## Usage
`timeAgo(epoch, opts)`

Returns: `string | false`

Converts an absolute epoch to a relative time ago string

`epoch`

Type: `number`

The date when an event happened in epoch format

`opts`

Type:
```typescript
type Opts = {
    verbose?: boolean, // Return a longer, more descriptive string when true
    daysUntilAbsolute?: number = 7,  // The cutoff for when dates are returned in absolute format
}
```

Options to control the response

## Examples
```ts
timeAgo(twoSecondsAgoAsEpoch) // 'now'
timeAgo(fiveMinutesAgoAsEpoch) // '5m ago'
timeAgo(twoDaysAgoAsEpoch) // '2d ago'
timeAgo(sixDaysAgoAsEpoch, { verbose: true }) // '6 days ago'
timeAgo(sixDaysAgoAsEpoch, { daysUntilAbsolute: 4 }) // '12 Mar 2021'
