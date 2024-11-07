---
'@guardian/source': major
---

- `Select` component no longer accepts a `required` prop. Use `optional={false}` (the default) instead.
- Setting `optional={false}` will now add a `required` attribute to the `select` inside the component by default.
