# `isOneOf(literals)`

Returns: `(literal) => literal is (typeof literals)[number]`

Create
[type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
that narrow primitives to
[literal](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
[type unions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types).

### `literals`

Type: `readonly (string | number)[]`

Valid literal string and numbers to test against.

## Example

```js
import { isOneOf } from '@guardian/libs';

const stages = ["PROD", "CODE", "DEV"] as const;
const isStage = isOneOf(stages);

if(!isStage("NOT_A_STAGE")) throw new Error("Invalid stage");
```
