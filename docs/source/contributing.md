# Contributing to Source

> How to contribute to the Source Design System for developers.

## Local development

Install dependencies using Yarn:

```shell
$ yarn
```

Develop using Storybook:

```shell
$ yarn storybook
```

## Guidelines

### Creating new components

- New components should be added to the [Development Kitchen](https://github.com/guardian/csnx/tree/main/libs/%40guardian/source-react-components-development-kitchen).
- New components must have a CODEOWNER.

### Using Emotion

- First familiarise yourself with Emotion's documentation – we use [the React flavour](https://emotion.sh/docs/introduction#react)
- Prefer composing styles using the `css` tag and the `css` prop.
- Avoid using `styled` to create or extend components.
  - Every styled component rendered creates an additional `Context.Consumer` component, which can lead to [performance issues](https://calendar.perfplanet.com/2019/the-unseen-performance-costs-of-css-in-js-in-react-apps/).
- <em>Avoid dynamic styles</em>. Prefer using conditional logic in the component
  to compose numerous small chunks of CSS using the `css` prop.
- One example of unavoidable dynamic styles is Theming.

### Documentation

- Source uses [storybook](https://guardian.github.io/csnx) for its API documentation as well as for visual regression testing.

### Testing

- Ensure you test your changes against our [accessibility testing guide](./pull-request-template.md#accessibility).
- Ensure your component works against the following browsers (you can [ask for access to Browserstack](mailto:divx@theguardian.com?subject=Browserstack)):
  - **Chrome 77+**
  - **Firefox 68+**
  - **Edge 17+**
  - **Safari 12+**
- Ensure your component can be imported and server-rendered on a project running **Node.js v14**.
- Ensure your component works on touchscreen devices.

### Commits

- Before raising a pull request, squash your commits. Fewer commits makes the [CHANGELOG](https://github.com/guardian/source/blob/main/CHANGELOG.md) (slightly) more readable.
- Each commit should contain changes to exactly one package. If you need to edit multiple packages as part of a change, please divide these into separate commits. Again, this is for CHANGELOG readability.
- Commit messages should read as if you are instructing someone else what to do. It usually helps to start with a verb. For example, "Increase the line height of the body text".

### Raising a pull request

- Generate a changeset describing your work by running `make changeset` and following the prompts.
- Test that your component can be used in a real project (e.g. [dotcom-rendering](https://github.com/guardian/dotcom-rendering)). Use [`pnpm link`](https://pnpm.io/cli/link) to avoid having to perform a real publish, and [TODO: PNPM equivalent to `yarn pack`](#) to see exactly which files would be published.

### TODO: merging Source PRs

### Versioning

- `make changeset` will prompt you to choose a [semver](https://semver.org/) change type for your changes (major/minor/patch).
- This should include visual changes, not just changes to the API e.g.
  - A slight colour tweak could break contrast ratio guidlines, and comsumers would need to account for this, meaning it's not a drop-in change i.e. major/breaking.
  - A new font-size will only affect consumers who want to use it, making it a new feature i.e. a minor change.
  - Giving different text-sizes custom underline heights improves accessibility but doesn't require further changes, and all current consumers get the benefit i.e. a patch.

## Publishing

Publishing is triggered by merging the auto-generated _Release Package Updates_ PR that changesets manages.

### Force publishing unchanged packages

There are times when you want to publish a new version of a package even
when the package source code hasn't changed. In these cases, you should:

- create a new changeset
- create a PR explaining why the package needs to be bumped
