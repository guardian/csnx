# csnx

> Monorepo for Guardian UIs

![GitHub branch checks state](https://img.shields.io/github/checks-status/guardian/csnx/main)

_This project is in a prototype/alpha stage. [Feedback is extremely welcome](https://github.com/guardian/csnx/issues/new/choose), but things are likely to change quickly and possibly on a whim._

_For now, only projects owned by CSTI are being added._

## Projects in the monorepo

### Packages

The following packages from `packages/*` are published to NPM:

<!-- START PACKAGES -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

- [@guardian/browserslist-config](packages/browserslist-config)
- [@guardian/eslint-config](packages/eslint-config)
- [@guardian/eslint-config-typescript](packages/eslint-config-typescript)
- [@guardian/prettier](packages/prettier)
- [@guardian/tsconfig](packages/tsconfig)

<!-- END PACKAGES -->

## Development

1. Clone the repo
2. Run a task.

_You'll be prompted to install any missing requirements if they are needed..._

## Running tasks

Tasks are defined in the [`Makefile`](./Makefile).

<!-- START TASKS -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

- `make test` _runs the test for all projects_
- `make lint` _checks all projects for lint errors_
- `make fix` _attemps to fix lint errors across all projects_
- `make validate` _makes sure absolutely everything is working_
- `make clean` _builds all projects_
- `make build` _builds all projects_
- `make changeset` _creates a new [changeset](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)_

<!-- END TASKS -->

## Task caching

The repo is managed by [Nx](https://nx.dev/).

<!-- START CACHED_TASKS -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

[Nx remotely caches the output](https://nx.dev/using-nx/mental-model#computation-hashing-and-caching) of `build`, `lint`, and `test`.

<!-- END CACHED_TASKS -->

This means only one iteration of these tasks runs for a given state of a project – _ever_ – which makes them extremely fast to run.

For example, you're working on something, run the tests and they pass. Nx remotely caches the result. You push your changes to CI. When CI runs the tests, nothing has changed, so Nx fetches the (passing) cached results, the build goes green and you can merge.

When I pull your changes, my copy of the code is identical to what you pushed and merged, so I _also_ get the cached results. If I then change the code, Nx re-runs the tests and, again, caches the results.

This happens _per project_. So if you change `project-a` but not `project-b`, Nx will get the cached results for `project-b`, but still run the tests for `project-a`. From then on, until `project-a` changes again, Nx will always use the cached results for both.

This includes between development and CI, between machines, pulls etc.

## Troubleshooting

### Unable to commit

If you get a `command not found` error when commiting using a GUI (VSCode, GitHub desktop etc), add a `~/.huskyrc` file and load your Node version manager there.

For example, if you use [`fnm`](https://github.com/Schniz/fnm):

```sh
# ~/.huskyrc
eval "$(fnm env)"
fnm use
```

Or for [`asdf`](https://asdf-vm.com/):

```sh
# ~/.huskyrc (installed with git)
. $HOME/.asdf/asdf.sh
```

```sh
# ~/.huskyrc (installed with brew on intel macs)
. /usr/local/opt/asdf/libexec/asdf.sh
```

```sh
# ~/.huskyrc (installed with brew on apple silicon)
. /opt/homebrew/opt/asdf/asdf.sh
```

See https://typicode.github.io/husky/#/?id=command-not-found for more info.
