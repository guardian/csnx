# Decision Records

## 1. Use Nx

- Nx has very good js/ts support, but is not limited to it
- the plugin architecture should mean we can bend it to our needs while getting the benefits of giving Nx something it understands
- It's been great in Source so far (https://github.com/guardian/source/pull/1342)

## 2. Use a `Makefile` to run repo tasks

- It enables us to wrap common tasks so that they always run in the correct node version and package manager, without requiring user

## 3. Don't split tasks between `package.json` and `Makefile`

- Prevent users from unwittingly running tasks in the wrong environment
