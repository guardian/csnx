---
'@guardian/source-react-components-development-kitchen': major
'@guardian/eslint-plugin-source-react-components': major
'@guardian/eslint-plugin-source-foundations': major
'@guardian/source-react-components': major
'@guardian/source-foundations': major
'@guardian/atoms-rendering': major
'@guardian/core-web-vitals': major
'@guardian/identity-auth': minor
'@guardian/ab-react': major
'@guardian/ab-core': major
'@guardian/libs': major
---

- removes CommonJS exports
- requires Node >= 16 (if you're using it with Node)

Since [`@guardian/*` packages should be transpiled by consumers](https://github.com/guardian/recommendations/blob/main/npm-packages.md#using-guardian-npm-packages), and all current versions of Node support ES modules, this _shouldn't_ cause any issues.

See [Sindre Sorhus' guide to consuming ESM modules](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) if it does.
