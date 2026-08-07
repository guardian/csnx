# `@guardian/pulse`

Pulse is the Guardian's design token powered product system

## Install

```sh
$ pnpm add @guardian/pulse
$ yarn add @guardian/pulse
$ npm install @guardian/pulse
```

## Usage

### Terrazzo

Building and linting design tokens:

```sh
$ make @guardian/pulse:build-tokens
$ make @guardian/pulse:lint-tokens
```

Generated CSS and JS artefacts are output to `/dist/terrazzo/`

### Style Dictionary

Building design tokens:

```sh
$ make @guardian/pulse:build-tokens-sd
```

Generated CSS and JS artefacts are output to `/dist/sd/`
