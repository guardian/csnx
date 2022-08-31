# `getLocale`

Returns: `Promise<CountryCode | null>`

> See [`CountryCode`](../countries#countrycode-1) docs for more info.

Fetches the user's current location as an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Decoding_table) string e.g. `'GB'`, `'AU'` etc.

Lookups are cached, so you can call this function as many times as you want without worrying about performance.

## Example

```js
import { getLocale } from '@guardian/libs';

getLocale().then((locale) => {
    console.log(locale); // UK, AU etc
});
```

### Overrides

If you want to override the actual locale (e.g. in CI or development), set a `localStorage` item of `gu.geo.override` to the country code you need.
