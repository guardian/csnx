---
'@guardian/eslint-config': major
---

- Peer Dependency: Update `eslint` to `9.39.1`
- Add storybook configuration from `eslint-plugin-storybook` to config

```ts
import guardian from '@guardian/eslint-config';

const config = [
	// other eslint configuration

	...guardian.configs.storybook,
];

export default config;
```
