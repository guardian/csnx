# `storage`

Robust API over `localStorage` and `sessionStorage`.

### Example

```js
import { storage } from '@guardian/libs';

// the following are now available:
// - storage.local
// - storage.session
```

Has a few advantages over the native API:

-   fails gracefully if storage is not available
-   you can save and retrieve any JSONable data
-   stored items can expire

_n.b. the examples below use `storage.local`, but all methods are available for both `storage.local` and `storage.session`._

## Methods

-   [`get(key)`](#getkey)
-   [`set(key, value, expires?)`](#setkey-value-expires)
-   [`remove(key)`](#removekey)
-   [`clear()`](#clear)
-   [`isAvailable()`](#isavailable)

## `get(key)`

Returns: `unknown`

Retrieves an item from storage.

#### `key`

Type: `string`<br>

Name of the stored item.

### Example

```js
storage.local.get('my-item');
```

## `set(key, value, expires?)`

Returns: `void`

Saves a value to storage.

#### `key`

Type: `string`

Name of the item to store the value in.

#### `value`

Type: `string` | `number` | `boolean` | `null` | `object` | `array`

The value to store.

#### `expires?`

Type: `string` | `number` | `Date`

Optional expiry date for this item.

### Example

```js
storage.local.set('my-item', {
    prop1: 'abc',
    prop2: 123,
});

storage.local.set(
    'my-expiring-item',
    {
        prop1: 'abc',
        prop2: 123,
    },
    // expires 24 hours from now
    Date.now() + 60 * 60 * 24 * 1000,
);
```

## `remove(key)`

Returns: `void`

Removes an item from storage.

#### `key`

Type: `string`

Name of the stored item to remove.

### Example

```js
storage.local.remove('my-item');
```

## `clear()`

Returns: `void`

Removes all items from storage.

### Example

```js
storage.local.clear();
```

## `isAvailable()`

Returns: `boolean`

Check whether the storage type is available.

### Example

```js
storage.local.isAvailable(); // true or false
```
