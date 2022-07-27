# Decision Records

## 1. Use Nx

- Nx has very good js/ts support, but is not limited to it
- the plugin architecture should mean we can bend it to our needs while getting the benefits of giving Nx something it understands
- It's been great in Source so far (https://github.com/guardian/source/pull/1342)

## 2. Use a `Makefile` to run repo tasks, rather than `npm-scripts`

- It enables us to wrap common tasks so that they always run:
    - in the correct node version and package manager
    - with up-to-date dependencies
    - without requiring user intervention
- It abstracts away the complexity of the tooling

## 3. Put all user tasks in the `Makefile` - don't share them with `package.json`

- Prevent users from unwittingly running tasks in the wrong environment
