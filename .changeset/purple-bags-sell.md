---
'@guardian/source': major
---

Brings `remSize`, `remIconSize`, `remHeight` and `remWidth` into line with `remSpace`, by changing their values from a `number` (of rems) to a `string` that ends with `rem` units.

`pxToRem` also now returns a string with `rem` units, rather than a `number` of rems.

_The sizes haven't changed, only the way they are exported._

### Before

```js
const style = `
	top: ${pxToRem(10)}rem;
	bottom: ${remHeight.ctaSmall}rem;
`;
```

### After

```js
const style = `
	top: ${pxToRem(10)};
	bottom: ${remHeight.ctaSmall};
`;
```

If you have been performing calculations with the old number values in JS, you can use the [CSS `calc` function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) instead:

### Before

```js
const style = `
	bottom: -${remHeight.ctaSmall / 2}rem;
`;
```

### After

```js
const style = `
	bottom: calc(-${remHeight.ctaSmall} / 2);
`;
```
