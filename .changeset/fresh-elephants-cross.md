---
'@guardian/source-react-components': major
---

- Added new Theming to component props
- Deprecated Emotion themes

new theme prop example usage

```tsx
const myTheme: Partial<ChoiceCardTheme> = {backgroundSelected: palette.brand[500]}
<ChoiceCard theme={myTheme}>
  Select
</ChoiceCard>
```
