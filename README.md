# csnx

> Monorepo for Guardian UIs

![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/guardian/csnx)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/guardian/csnx)

## Projects in the monorepo

### Packages

The following packages live in `libs/@guardian/*` and are published to NPM:

<!-- START PUBLISHED_PACKAGES -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

- [@guardian/ab-core](libs/@guardian/ab-core)
- [@guardian/ab-react](libs/@guardian/ab-react)
- [@guardian/browserslist-config](libs/@guardian/browserslist-config)
- [@guardian/core-web-vitals](libs/@guardian/core-web-vitals)
- [@guardian/eslint-config](libs/@guardian/eslint-config)
- [@guardian/eslint-config-typescript](libs/@guardian/eslint-config-typescript)
- [@guardian/eslint-plugin-source-foundations](libs/@guardian/eslint-plugin-source-foundations)
- [@guardian/eslint-plugin-source-react-components](libs/@guardian/eslint-plugin-source-react-components)
- [@guardian/identity-auth](libs/@guardian/identity-auth)
- [@guardian/identity-auth-frontend](libs/@guardian/identity-auth-frontend)
- [@guardian/libs](libs/@guardian/libs)
- [@guardian/newsletter-types](libs/@guardian/newsletter-types)
- [@guardian/prettier](libs/@guardian/prettier)
- [@guardian/source](libs/@guardian/source)
- [@guardian/source-foundations](libs/@guardian/source-foundations)
- [@guardian/source-react-components](libs/@guardian/source-react-components)
- [@guardian/source-react-components-development-kitchen](libs/@guardian/source-react-components-development-kitchen)
- [@guardian/tsconfig](libs/@guardian/tsconfig)

<!-- END PUBLISHED_PACKAGES -->

### Deprecated Packages

- [@guardian/atoms-rendering](libs/@guardian/atoms-rendering)

## Development

1. Clone the repo
2. Run a task.

_You'll be prompted to install any missing requirements if they are needed..._

## Tasks

### Cross-project tasks

Tasks that apply to all projects are defined in the [`Makefile`](./Makefile):

<!-- START TASKS -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

- `make build` _builds all projects_
- `make build-storybooks` _builds all storybooks_
- `make changeset` _creates a new [changeset](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)_
- `make check-formatting` _check repo for formatting errors_
- `make clean` _removes all build artifacts_
- `make dev` _runs the dev targets for all projects in single instance_
- `make e2e` _runs the e2e tests for all projects_
- `make fix` _attemps to fix lint errors across all projects_
- `make lint` _checks all projects for lint errors_
- `make ls` _lists available `make` targets_
- `make storybooks` _runs storybook for all projects in single instance_
- `make test` _runs the unit tests for all projects_
- `make validate` _makes sure absolutely everything is working_
- `make verify-dist` _runs unit tests against dist for all projects_

### Project-specific tasks

Project-specific are defined in their `project.json`, and can be run with `make <project>:<task>`:

#### github-pages

- `make github-pages:build`
- `make github-pages:dev`

#### storybooks

- `make storybooks:dev`

#### @guardian/ab-core

- `make @guardian/ab-core:build`
- `make @guardian/ab-core:dev`
- `make @guardian/ab-core:fix`
- `make @guardian/ab-core:lint`
- `make @guardian/ab-core:test`
- `make @guardian/ab-core:verify-dist`

#### @guardian/ab-react

- `make @guardian/ab-react:build`
- `make @guardian/ab-react:dev`
- `make @guardian/ab-react:fix`
- `make @guardian/ab-react:lint`
- `make @guardian/ab-react:test`
- `make @guardian/ab-react:verify-dist`

#### @guardian/browserslist-config

- `make @guardian/browserslist-config:build`
- `make @guardian/browserslist-config:verify-dist`

#### @guardian/cobalt-plugin-ts

- `make @guardian/cobalt-plugin-ts:build`

#### @guardian/core-web-vitals

- `make @guardian/core-web-vitals:build`
- `make @guardian/core-web-vitals:dev`
- `make @guardian/core-web-vitals:fix`
- `make @guardian/core-web-vitals:lint`
- `make @guardian/core-web-vitals:test`
- `make @guardian/core-web-vitals:verify-dist`

#### @guardian/design-tokens

- `make @guardian/design-tokens:build`
- `make @guardian/design-tokens:generate-tokens`

#### @guardian/eslint-config

- `make @guardian/eslint-config:build`
- `make @guardian/eslint-config:verify-dist`

#### @guardian/eslint-config-typescript

- `make @guardian/eslint-config-typescript:build`
- `make @guardian/eslint-config-typescript:verify-dist`

#### @guardian/eslint-plugin-source-foundations

- `make @guardian/eslint-plugin-source-foundations:build`
- `make @guardian/eslint-plugin-source-foundations:dev`
- `make @guardian/eslint-plugin-source-foundations:fix`
- `make @guardian/eslint-plugin-source-foundations:lint`
- `make @guardian/eslint-plugin-source-foundations:test`
- `make @guardian/eslint-plugin-source-foundations:verify-dist`

#### @guardian/eslint-plugin-source-react-components

- `make @guardian/eslint-plugin-source-react-components:build`
- `make @guardian/eslint-plugin-source-react-components:dev`
- `make @guardian/eslint-plugin-source-react-components:fix`
- `make @guardian/eslint-plugin-source-react-components:lint`
- `make @guardian/eslint-plugin-source-react-components:test`
- `make @guardian/eslint-plugin-source-react-components:verify-dist`

#### @guardian/identity-auth

- `make @guardian/identity-auth:build`
- `make @guardian/identity-auth:dev`
- `make @guardian/identity-auth:fix`
- `make @guardian/identity-auth:lint`
- `make @guardian/identity-auth:test`
- `make @guardian/identity-auth:verify-dist`

#### @guardian/identity-auth-frontend

- `make @guardian/identity-auth-frontend:build`
- `make @guardian/identity-auth-frontend:dev`
- `make @guardian/identity-auth-frontend:fix`
- `make @guardian/identity-auth-frontend:lint`
- `make @guardian/identity-auth-frontend:test`
- `make @guardian/identity-auth-frontend:verify-dist`

#### @guardian/libs

- `make @guardian/libs:build`
- `make @guardian/libs:dev`
- `make @guardian/libs:fix`
- `make @guardian/libs:lint`
- `make @guardian/libs:test`
- `make @guardian/libs:verify-dist`

#### @guardian/newsletter-types

- `make @guardian/newsletter-types:build`
- `make @guardian/newsletter-types:dev`
- `make @guardian/newsletter-types:fix`
- `make @guardian/newsletter-types:lint`
- `make @guardian/newsletter-types:test`

#### @guardian/prettier

- `make @guardian/prettier:build`
- `make @guardian/prettier:verify-dist`

#### @guardian/source

- `make @guardian/source:build`

#### @guardian/source-foundations

- `make @guardian/source-foundations:build`
- `make @guardian/source-foundations:build-storybook`
- `make @guardian/source-foundations:build-type-presets`
- `make @guardian/source-foundations:dev`
- `make @guardian/source-foundations:fix`
- `make @guardian/source-foundations:lint`
- `make @guardian/source-foundations:storybook`
- `make @guardian/source-foundations:test`
- `make @guardian/source-foundations:verify-dist`

#### @guardian/source-react-components

- `make @guardian/source-react-components:build`
- `make @guardian/source-react-components:build-storybook`
- `make @guardian/source-react-components:dev`
- `make @guardian/source-react-components:fix`
- `make @guardian/source-react-components:lint`
- `make @guardian/source-react-components:storybook`
- `make @guardian/source-react-components:test`
- `make @guardian/source-react-components:verify-dist`

#### @guardian/source-react-components-development-kitchen

- `make @guardian/source-react-components-development-kitchen:build`
- `make @guardian/source-react-components-development-kitchen:build-storybook`
- `make @guardian/source-react-components-development-kitchen:dev`
- `make @guardian/source-react-components-development-kitchen:fix`
- `make @guardian/source-react-components-development-kitchen:lint`
- `make @guardian/source-react-components-development-kitchen:storybook`
- `make @guardian/source-react-components-development-kitchen:test`
- `make @guardian/source-react-components-development-kitchen:verify-dist`

#### @guardian/tsconfig

- `make @guardian/tsconfig:build`
- `make @guardian/tsconfig:verify-dist`

<!-- END TASKS -->

### Task caching

Tasks are managed by [Nx](https://nx.dev/).

<!-- START CACHED_TASKS -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

[Nx remotely caches the output](https://nx.dev/using-nx/mental-model#computation-hashing-and-caching) of `build`, `build-storybook`, `e2e`, `lint`, `test`, and `verify-dist`.

<!-- END CACHED_TASKS -->

This means only one full iteration of these tasks runs for a given state of a project – _ever_ – which makes them extremely fast to re-run.

For example, you're working on something, run the tests and they pass. Nx remotely caches the result. You push your changes to CI. When CI runs the tests, nothing has changed, so Nx fetches the (passing) cached results, the build goes green and you can merge.

When I pull your changes, my copy of the code is identical to what you pushed and merged, so I _also_ get the cached results. If I then change the code, Nx re-runs the tests and, again, caches the results.

This happens _per project_. So if you change `project-a` but not `project-b`, Nx will get the cached results for `project-b`, but still run the tests for `project-a`. From then on, until `project-a` changes again, Nx will always use the cached results for both.

This includes between development and CI, between machines, pulls etc.

#### Skipping the cache

To force the tasks in the [`Makefile`](./Makefile) to skip the Nx cache, set `SKIP_NX_CACHE=true`, e.g.

```sh
SKIP_NX_CACHE=true make test
```

## Chromatic

CSNX uses [Chromatic](https://www.chromatic.com/) for visual regression testing, and all PRs require the Chromatic checks to pass before merging.

However, each run costs money, so we only want to run Chromatic when a PR is ready to merge (rather than for every push, for example).

Therefore, initially, Chromatic checks _will not run_.

When your PR is ready, add the `run_chromatic` label. This will starts Chromatic checks.

> [!NOTE]
> Each push while the label is applied will trigger new checks, so you may want to remove the label if you're making more changes.

Once all checks pass, you're good to merge.

## Releasing a package update

Libs within CSNX are available as NPM packages. We use [Changesets](<[url](https://github.com/changesets/changesets)>) to automate this release process.

To publish your changes to NPM, run `make changeset`. This will open the Changesets CLI, and you will be offered a list of packages to release. Once you've selected the changed package/s you'll be given the option of `major`, `minor` or `patch` release. Select one of these and add a description.

This will create a "changeset": a `.md` file containing the release information. When you merge your branch, the changeset will be picked up by the Changests GHA, which will in turn create a release PR. To complete the NPM release merge this second PR.

## Troubleshooting

### Editor setup

#### [VS Code](https://code.visualstudio.com/)

You will be prompted to install the recommended extensions when you open the repo.

There is also a suggested settings file (./.vscode/settings.json.default) with some defaults you may useful. It covers project-specific enhancements, useful settings for common extensions etc.

If you want to use any/all of them, create a copy of the file and remove the `.default` extension.

> n.b. these are your personal settings for this repo, so add anything else you find useful and remove/change anything you don't like.

### Unable to commit

If you get a `command not found` error or a message saying you're using the wrong version of Node when commiting using a GUI (VSCode, GitHub desktop etc), add a `~/.config/husky/init.sh` file and load your Node version manager there.

> [!NOTE]
> This used be located in `~/.huskyrc`. If you set that up before, you will need to recreate it at `~/.config/husky/init.sh`.
>
> ```sh
> mkdir -p ~/.config/husky && cp ~/.huskyrc $_/init.sh
> ```

For example, if you use [`fnm`](https://github.com/Schniz/fnm):

```sh
# ~/.config/husky/init.sh
eval "$(fnm env)"
fnm use
```

Or for [`asdf`](https://asdf-vm.com/):

```sh
# ~/.config/husky/init.sh (installed with git)
. $HOME/.asdf/asdf.sh
```

```sh
# ~/.config/husky/init.sh (installed with brew on intel macs)
. /usr/local/opt/asdf/libexec/asdf.sh
```

```sh
# ~/.config/husky/init.sh (installed with brew on apple silicon)
. /opt/homebrew/opt/asdf/asdf.sh
```

Or for [`nvm`](https://github.com/nvm-sh/nvm):

```sh
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use
```

See https://typicode.github.io/husky/how-to.html for more info.
