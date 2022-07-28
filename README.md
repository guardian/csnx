# csnx

> Monorepo for Guardian UIs

Managed by [Nx](https://nx.dev/).

## Requirements

- Package manager: [`pnpm`](https://pnpm.io/cli/install)
- Node version manager: [`fnm`](https://github.com/Schniz/fnm) (recommended), [`nvm`](https://github.com/nvm-sh/nvm) or [`asdf`](https://asdf-vm.com/)

## Development

1. Clone the repo
1. `pnpm install`
1. Run a task.

## User tasks

Tasks are run using [`pnpm`](https://pnpm.io).

The following predefined tasks are available:

- `pnpm build` builds all projects
- `pnpm test` runs all tests

The repo uses Nx, which means you can also use any of its commands with your project e.g.

```shell
pnpm nx my-special-task my-application
```

_This is what the tasks in the `npm-scripts` do too._

### Performance

The [output of tasks are remotely cached by Nx](https://nx.dev/using-nx/mental-model#computation-hashing-and-caching). This means re-running a task will be instant if no code has changed since it was last run, anywhere on earth!

Nx also breaks tasks down by project, so we can run all tasks across the repo every time, and only tasks in the projects that have changed will need to do anything.
