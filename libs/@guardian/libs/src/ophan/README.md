# Ophan

Types related to Ophan.

Ophan has an official type system described in [thrift](https://github.com/guardian/ophan/tree/abb022b43a1fa3922a6cf24478c4a8982cd13b79/event-model/src/main/thrift). In particular, updates in [componentevent.thrift](https://github.com/guardian/ophan/blob/abb022b43a1fa3922a6cf24478c4a8982cd13b79/event-model/src/main/thrift/componentevent.thrift) should be mirrored in this repository.

## Example

```js
import type {
    OphanABEvent,
    OphanABPayload,
    OphanAction,
    OphanComponent,
    OphanComponentEvent,
    OphanComponentType,
    OphanProduct,
    OphanABTestMeta,
} from '@guardian/libs';
```

## `OphanABEvent`

An individual A/B test, structured for Ophan.

## `OphanABPayload`

The payload we send to Ophan: an object of `OphanABEvents` with test IDs as keys.
