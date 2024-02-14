---
'@guardian/source-react-components': major
---

- Added `theme` prop to support applying custom colour schemes to components with a complete or partial theme, avoiding the need for style overrides
- Deprecated existing `ThemeProvider` themes

`theme` prop example usage:

```tsx
const myTheme: Partial<ThemeChoiceCard> = {
	backgroundSelected: palette.brand[500],
};

<ChoiceCard theme={myTheme}>Select</ChoiceCard>;
```
