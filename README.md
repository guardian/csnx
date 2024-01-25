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

### Editor setup

#### [VS Code](https://code.visualstudio.com/)

You will be prompted to install the recommended extensions when you open the repo.

There is also a suggested settings file (./.vscode/settings.json.default) with some defaults you may useful. It covers project-specific enhancements, useful settings for common extensions etc.

If you want to use any/all of them, create a copy of the file and remove the `.default` extension.

> n.b. these are your personal settings for this repo, so add anything else you find useful and remove/change anything you don't like.

## Running tasks

Root-level tasks are defined in the [`Makefile`](./Makefile).

<!-- START TASKS -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

- `make build` _builds all projects_
- `make build-storybooks` _builds all storybooks_
- `make changeset` _creates a new [changeset](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)_
- `make check-formatting` _check repo for formatting errors_
- `make clean` _removes all build artifacts_
- `make e2e` _runs the e2e tests for all projects_
- `make fix` _attemps to fix lint errors across all projects_
- `make lint` _checks all projects for lint errors_
- `make ls` _lists available `make` targets_
- `make storybooks` _runs storybook for all projects in single instance_
- `make test` _runs the unit tests for all projects_
- `make validate` _makes sure absolutely everything is working_

You can also run individual project's Nx targets by running `make <target>`. <details><summary>Nx targets</summary>

- `make csnx:build-storybook`
- `make csnx:composed-storybooks`
- `make csnx:project-storybooks`
- `make csnx:storybooks`
- `make @guardian/ab-core:build`
- `make @guardian/ab-core:e2e`
- `make @guardian/ab-core:fix`
- `make @guardian/ab-core:lint`
- `make @guardian/ab-core:test`
- `make @guardian/ab-react:build`
- `make @guardian/ab-react:e2e`
- `make @guardian/ab-react:fix`
- `make @guardian/ab-react:lint`
- `make @guardian/ab-react:test`
- `make @guardian/browserslist-config:build`
- `make @guardian/browserslist-config:e2e`
- `make @guardian/cobalt-plugin-ts:build`
- `make @guardian/core-web-vitals:build`
- `make @guardian/core-web-vitals:e2e`
- `make @guardian/core-web-vitals:fix`
- `make @guardian/core-web-vitals:lint`
- `make @guardian/core-web-vitals:test`
- `make @guardian/design-tokens:build`
- `make @guardian/design-tokens:generate-tokens`
- `make @guardian/eslint-config:build`
- `make @guardian/eslint-config:e2e`
- `make @guardian/eslint-config-typescript:build`
- `make @guardian/eslint-config-typescript:e2e`
- `make @guardian/eslint-plugin-source-foundations:build`
- `make @guardian/eslint-plugin-source-foundations:e2e`
- `make @guardian/eslint-plugin-source-foundations:fix`
- `make @guardian/eslint-plugin-source-foundations:lint`
- `make @guardian/eslint-plugin-source-foundations:test`
- `make @guardian/eslint-plugin-source-react-components:build`
- `make @guardian/eslint-plugin-source-react-components:e2e`
- `make @guardian/eslint-plugin-source-react-components:fix`
- `make @guardian/eslint-plugin-source-react-components:lint`
- `make @guardian/eslint-plugin-source-react-components:test`
- `make @guardian/identity-auth:build`
- `make @guardian/identity-auth:e2e`
- `make @guardian/identity-auth:fix`
- `make @guardian/identity-auth:lint`
- `make @guardian/identity-auth:test`
- `make @guardian/identity-auth-frontend:build`
- `make @guardian/identity-auth-frontend:e2e`
- `make @guardian/identity-auth-frontend:fix`
- `make @guardian/identity-auth-frontend:lint`
- `make @guardian/identity-auth-frontend:test`
- `make @guardian/libs:build`
- `make @guardian/libs:e2e`
- `make @guardian/libs:fix`
- `make @guardian/libs:lint`
- `make @guardian/libs:test`
- `make @guardian/newsletter-types:build`
- `make @guardian/newsletter-types:fix`
- `make @guardian/newsletter-types:lint`
- `make @guardian/newsletter-types:test`
- `make @guardian/prettier:build`
- `make @guardian/prettier:e2e`
- `make @guardian/source-foundations:build`
- `make @guardian/source-foundations:build-storybook`
- `make @guardian/source-foundations:e2e`
- `make @guardian/source-foundations:fix`
- `make @guardian/source-foundations:lint`
- `make @guardian/source-foundations:storybook`
- `make @guardian/source-foundations:test`
- `make @guardian/source-react-components:build`
- `make @guardian/source-react-components:build-storybook`
- `make @guardian/source-react-components:e2e`
- `make @guardian/source-react-components:fix`
- `make @guardian/source-react-components:lint`
- `make @guardian/source-react-components:storybook`
- `make @guardian/source-react-components:test`
- `make @guardian/source-react-components-development-kitchen:build`
- `make @guardian/source-react-components-development-kitchen:build-storybook`
- `make @guardian/source-react-components-development-kitchen:e2e`
- `make @guardian/source-react-components-development-kitchen:fix`
- `make @guardian/source-react-components-development-kitchen:lint`
- `make @guardian/source-react-components-development-kitchen:storybook`
- `make @guardian/source-react-components-development-kitchen:test`
- `make @guardian/tsconfig:build`
- `make @guardian/tsconfig:e2e`
</details>

<!-- END TASKS -->

## Task caching

The repo is managed by [Nx](https://nx.dev/).

<!-- START CACHED_TASKS -->
<!-- THIS CONTENT IS AUTOGENERATED BY tools/scripts/maintain-readme/index.mjs -->

[Nx remotely caches the output](https://nx.dev/using-nx/mental-model#computation-hashing-and-caching) of `build`, `lint`, `test`, `e2e`, and `build-storybook`.

<!-- END CACHED_TASKS -->

This means only one full iteration of these tasks runs for a given state of a project – _ever_ – which makes them extremely fast to re-run.

For example, you're working on something, run the tests and they pass. Nx remotely caches the result. You push your changes to CI. When CI runs the tests, nothing has changed, so Nx fetches the (passing) cached results, the build goes green and you can merge.

When I pull your changes, my copy of the code is identical to what you pushed and merged, so I _also_ get the cached results. If I then change the code, Nx re-runs the tests and, again, caches the results.

This happens _per project_. So if you change `project-a` but not `project-b`, Nx will get the cached results for `project-b`, but still run the tests for `project-a`. From then on, until `project-a` changes again, Nx will always use the cached results for both.

This includes between development and CI, between machines, pulls etc.

### Skipping the cache

To force the tasks in the [`Makefile`](./Makefile) to skip the Nx cache, set `SKIP_NX_CACHE=true`, e.g.

```sh
SKIP_NX_CACHE=true make test
```

### Chromatic

To run Chromatic (for visual regression testing) on a PR, add the `run_chromatic` label to the PR in Github. The Chromatic tests are required to pass by CI, so this will _need_ to be done at least once before a PR is merged. We recommend you only add the label once you are happy with any changes made and have checked for visual regressions manually first.

### Releasing a package

Libs within CSNX are available as NPM packages. We use [Changesets](<[url](https://github.com/changesets/changesets)>) to automate this release process.

To publish your changes to NPM, run `make changeset`. This will open the Changesets CLI, and you will be offered a list of packages to release. Once you've selected the changed package/s you'll be given the option of `major`, `minor` or `patch` release. Select one of these and add a description.

This will create a "changeset": a `.md` file containing the release information. When you merge your branch, the changeset will be picked up by the Changests GHA, which will in turn create a release PR. To complete the NPM release merge this second PR.

## Troubleshooting

### Unable to commit

If you get a `command not found` error or a message saying you're using the wrong version of Node when commiting using a GUI (VSCode, GitHub desktop etc), add a `~/.huskyrc` file and load your Node version manager there.

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

Or for [`nvm`](https://github.com/nvm-sh/nvm):

```sh
# ~/.huskyrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use
```

See https://typicode.github.io/husky/#/?id=command-not-found for more info.