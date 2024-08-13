---
'@guardian/source-development-kitchen': major
'@guardian/source': major
---

Brings `remSize`, `remIconSize`, `remHeight` and `remWidth` into line with `remSpace`, by changing their values from numbers (of rems) to strings with `rem` units.

_The sizes haven't changed, only the way they are exported._

### Before

```js
const style = `
	bottom: ${remHeight.ctaSmall}rem;
`;
```

### After

```js
const style = `
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
