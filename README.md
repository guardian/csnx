# csnx

> Monorepo for Guardian UIs

Managed by [Nx](https://nx.dev/).

## Development

1. Clone the repo
1. Run a task.

## Running tasks

Tasks are defined in the [`Makefile`](./Makefile).

- `make build` builds all projects
- `make test` runs all tests

The [output of tasks are remotely cached by Nx](https://nx.dev/using-nx/mental-model#computation-hashing-and-caching). This means re-running a task will be instant if no code has changed.

### Requirements

_You'll be prompted to install any missing requirements when needed..._

- [`fnm`](https://github.com/Schniz/fnm) is used behind the scenes to ensure all user tasks are run with the correct Node version.

### When migrating an existing project into CSNX

- remove the current `.git` file from your existing project using `rm -rf .git` within the project root dir.
