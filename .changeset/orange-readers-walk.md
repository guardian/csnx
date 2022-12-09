---
'@guardian/core-web-vitals': major
'@guardian/eslint-plugin-source-foundations': major
'@guardian/eslint-plugin-source-react-components': major
'@guardian/libs': major
'@guardian/source-foundations': major
'@guardian/source-react-components-development-kitchen': major
'@guardian/source-react-components': major
---

Add `typescript@^4.3.2` to `peerDependecies` (`optional`).

This should mean you get a warning if you're using an incompatible version of typescript, but not if you aren't using it at all.
