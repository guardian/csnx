# `@guardian/eslint-plugin-source-foundations`

> ESLint plugin for Guardian projects using the `@guardian/source-foundations` package.

This package is part of the [Source design system](/docs/source/README.md).

## Installation

```bash
yarn add -D @guardian/eslint-plugin-source-foundations
```

or

```bash
npm install --save-dev @guardian/eslint-plugin-source-foundations
```

## Usage

```js
// ESLint configuration file
{
    "extends": "plugin:@guardian/source-foundations/recommended"
}
```

## Rules

### Valid import path

This rules errors for imports from `@guardian/src-foundations` or any sub module. If possible, it will autofix the import to the new location.

Some breaking changes can not be autofixed, for example, in cases where the export has been removed from Source. Developers must manually provide an alternative.

### No \* imports or exports

This rule errors for import or export `*` statements from any `src-*` or `source-*` package as this pattern is not recommended.

### No duplicate imports

This rule, from [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import), errors when multiple import statements import from the same pacakge. These issues can be autofixed. This rule is included as, due to the remove of sub modules and the consolidation of component packages, many import statements are fixed by the `valid-import-path` rule to import from the same location in v4.

## Known Issues

- New theme names not always updated automatically

  The theme variables have changed both name and location in the v4. The plugin should automatically update both but sometimes this does not work.
