---
'@guardian/eslint-config': major
---

Make `eslint-plugin-storybook` into an optional peer dependency

tl;dr if using the `storybook` config from `@guardian/eslint-config`, then you must have both `eslint-plugin-storybook` and `storybook` installed. If you are not using the `storybook` config, then you do not need to have either of these installed.

- Issue was found that since `eslint-plugin-storybook` is a direct dependency of `@guardian/eslint-config`, and that `storybook` is a peer dependency of `eslint-plugin-storybook`, then `storybook` is always installed as a transitive dependency of `@guardian/eslint-config`. This causes issues for projects that use `@guardian/eslint-config` but do not use Storybook, as they will have an unnecessary dependency on Storybook and may encounter issues if they have a different version of Storybook installed.
- Now we've moved `eslint-plugin-storybook` from `dependencies` to `peerDependencies` and mark it as optional via `peerDependenciesMeta`. This means that projects that use `@guardian/eslint-config` but do not use Storybook will not have `eslint-plugin-storybook` or `storybook` installed, and will not encounter any issues. Projects that do use the `storybook` config from `@guardian/eslint-config` will need to have both `eslint-plugin-storybook` and `storybook` installed as direct dependencies.
