# Decision Records

## 1. Use Nx

- Nx has very good js/ts support, but is not limited to it
- the plugin architecture should mean we can bend it to our needs while getting the benefits of giving Nx something it understands
- It's been great in Source so far (https://github.com/guardian/source/pull/1342)

## 2. Use a `Makefile` to run repo tasks, rather than `npm-scripts`

- It enables us to wrap common tasks so that they always run:
  - in the correct Node version and package manager
  - with up-to-date dependencies
  - without requiring user intervention
- It abstracts away the complexity of the tooling

## 3. Put all user tasks in the `Makefile` - don't share them with `package.json`

- Prevent users from unwittingly running tasks in the wrong environment

## 4. Use custom executor to bundle assets with Rollup

- We tried three methods of building and bundling assets:
  1.  Using the `@nrwl/workspace:run-commands`:
      - this didn't fit so well with the nx workflow of `project.json options` and `config`
      - there would be added complexity from having a rollup config in each project and the difficulty of having dynamic imports in these
  2.  Using the `@nrwl/web:rollup` plugin:
      - this required additional config to make it fit our needs
      - we didn't needs large parts of the functionality
  3.  Writing our own custom executor:
      - this allows us to have full control over building and bundling of each package
      - it fairly simple to build
      - it is fully customisable so we can make changes in the future, e.g. use something other than Rollup if that became preferable
  - We concluded that the custom executor was the preferred option for the reason above
