---
'@guardian/source-react-components-development-kitchen': patch
'@guardian/source-react-components': patch
---

Components are no longer explicitly typed as `JSX.Element`, which may be too wide. The TypeScript compiler will now be able to infer the correct type itself.
