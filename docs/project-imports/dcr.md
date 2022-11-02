# Importing `dotcom-rendering` into `csnx`

## Glossary

- `dotcom-rendering` refers to the application that renders HTML for `frontend`
- _"the `dotcom-rendering` repo"_ refers to the repo that contains `dotcom-rendering`, `apps-rendering` and `common-rendering` codebases

## Intention

We want to relocate `dotcom-rendering` in the `csnx` monorepo.

### Why?

- to make it easier for Guardian product teams to ship by reducing the friction of interdependency between `dotcom-rendering` and other Guardian projects (Source, Libs, consent, commercial code etc)
- to reduce the time spent by dotcom on managing their infrastructure
- to standardise process: _best practice by default_

## Preparation

### Turn the `dotcom-rendering` repo into a single `yarn` workspace

the `dotcom-rendering` repo is currently managed by two different package managers:

1. A `yarn` workspace containing `dotcom-rendering` and `common-rendering`
2. An `npm`-managed package that contains the `apps-rendering` code.


#### Problem

- `apps-rendering` consumes some undeclared dependencies from the `yarn` workspace
- some `dotcom-rendering`-specific dependencies are installed in the root

#### Solution

- convert `apps-rendering` to `yarn`
- move all projects into a single `yarn` workspace
- move all possible deps to individual project's `package.json`

### Add Nx to the `dotcom-rendering` repo for use in `dotcom-rendering`

#### Problem

- `csnx` uses Nx to orchestrate the project
- we want the actual importing of `dotcom-rendering` code to require as few changes as possible

#### Solution

- we will add Nx to the existing the `dotcom-rendering` repo monorepo
- the setup will be as close as possible to `csnx`.

_n.b. `apps-rendering` and `common-rendering` will both be able to use Nx, although setting this up will not be CSTI's initial focus._

### Remove unused config from the `dotcom-rendering` repo

#### Problem

- there is a lot of config files in the `dotcom-rendering` repo
- we don't know how many are used still (e.g. `arkit.json`?)

#### Solution

- identify and remove unused config files

### Align dev dependency versions in the `dotcom-rendering` repo with `csnx`

#### Problem

- `csnx` tries to use a single version of dev dependencies (e.g. Jest, Storybook, ESLint, Prettier etc)
- this makes it easier to manage updates across projects

#### Solution

- align `dotcom-rendering` dev dependencies with `csnx`

### Align Node version in the `dotcom-rendering` repo with `csnx`

#### Problem

- projects in a monorepo cannot use different versions of Node

#### Solution

- align the `dotcom-rendering` repo `.nvmrc` with `csnx`

### Align the Storybook setup in the `dotcom-rendering` repo with `csnx`

#### Problem

- `csnx` has a per-project Storybook setup, with a root Storybook that composes them all
- the `dotcom-rendering` repo has a single Storybook that contains stories from all projects

#### Solution

- set up per-project storybooks in the `dotcom-rendering` repo
- standardise on idiomatic storybook code/structure (if needed)

## Questions

### What happens to `apps-rendering` and `common-rendering`?

`apps-rendering` and `common-rendering` will remain in the `dotcom-rendering` repo for now.

### Whats processes/services/workflows do `dotcom-rendering` and `apps-rendering` currently share?

For example:

- github actions
- Riff raff
- Cypress

### How do manage the final switch over?

This is not clear yet.

- run a mirror of `dotcom-rendering` in `csnx` that automatically keeps in sync?
- stagger the switch over from inside Frontend (eg 10% > 50% > 100% of requests go to `csnx` instance of `dotcom-rendering`)?
