# `@guardian/prettier`

> Prettier config for Guardian JavaScript projects.

## Installation

```bash
yarn add -D @guardian/prettier
```

or

```bash
npm install --save-dev @guardian/prettier
```

## Usage

Prettier can take two configuration files: 

- `.prettierignore` which works like git's `.gitignore`
- `.prettierrc.yml` (or [an equivalent](https://prettier.io/docs/en/configuration.html)) which provides settings to prettier

To use this package, your prettier config should [reference it directly](https://prettier.io/docs/en/sharing-configurations#using-a-shareable-config):

```yaml
# Prettier configuration file
'@guardian/prettier'
```
