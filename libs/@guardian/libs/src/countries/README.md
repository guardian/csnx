# Countries

Country data and methods to access it.

## Usage

```js
import { countries, getCountryByCountryCode } from '@guardian/libs';

const countryA = countries.afghanistan;
// { countryCode: 'AF', name: 'Afghanistan' }

const countryB = getCountryByCountryCode('AX');
// { countryCode: 'AX', name: 'Åland Islands' }
```

## `countries`

Type: `Record<string, Country>`

A config object of country metadata.

```typescript
{
    afghanistan: {
		countryCode: 'AF',
		name: 'Afghanistan',
	},
	åland_islands: {
		countryCode: 'AX',
		name: 'Åland Islands',
	},
    // etc
}
```

## `getCountryByCountryCode(countryCode)`

Returns: `Country`

Gets a country config object for the country with the passed country code.

### `countryCode`

Type: `CountryCode`

## Types

### `Country`

```typescript
type Country = {
    countryCode: CountryCode;
    name: string;
};
```

### `CountryCode`

ISO 3166-1 alpha-2 two-letter country code. See [the type definition](../@types/countries.ts) for the full list.

```typescript
type CountryCode = 'AF' | 'AX' /* etc */;
```
