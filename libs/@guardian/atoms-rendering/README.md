# Atoms Rendering

## Atoms

![Atoms Web Architecture](./docs/atomswebarchitecture.png)

An Atom is a self contained piece of content that can be inserted into multiple articles. This repository implements atom definitions as part of a library which can be imported into the appropriate rendering service ([dotcom-rendering](https://github.com/guardian/dotcom-rendering) or [apps-rendering](https://github.com/guardian/apps-rendering)). Once imported, you can configure your rendering service to render the atom component for the atom data passed from your backend ([frontend](https://github.com/guardian/frontend) in the case of web).

## Usage

### import

To import an atom in your project use `yarn add @guardian/atoms-rendering` then

```
import { TheAtomYouWant } from '@guardian/atoms-rendering';

<TheAtomYouWant someProp={localData.someProp} />
```

### Naming conventions

There is mostly a one to one correspondance between atoms as named by CAPI/frontend and their names in atoms-rendering, with the notable exception that the Media atom is named YoutubeAtom here.

### dev-nginx setup

Some of the storybook stories need to fetch YouTube scripts that are only available to clients with an allow-listed domain. YouTube has allow-listed `dev-gutools.co.uk` (along with dotcom code and prod domains).
In order for these stories to run as expected locally, you'll need to use [dev-nginx](https://github.com/guardian/dev-nginx) to proxy `atoms-rendering.local.dev-gutools.co.uk` to localhost. This can be set up by going to the CSNX root dir and:

- Running `make atoms-rendering-nginx-setup`
- Running `make storybook` then opening https://atoms-rendering.local.dev-gutools.co.uk/ in your browser

## Testing locally

If you want to test a change before publishing to NPM, you will need to point to this repository. For instance, you might want to check in dotcom-rendering on local that a change you make in this library is correct. For this do the following

- In CSNX root run `make build`,
- Cd into the atoms-rendering dist dir `cd dist/libs/@guardian/atoms-rendering`
- Run `yarn link`
- In dotcom-rendering run `yarn link "@guardian/atoms-rendering"`.

Then you will notice that your

```
dotcom-rendering/node_modules/@guardian/atoms-rendering
```

is a symlink to the atoms-rendering repository.

When you are done, you should

- In dotcom-rendering run `yarn unlink "@guardian/atoms-rendering"`.
- In atoms-rendering run `yarn unlink`

And in dotcom-rendering you might also want to run

- `yarn install --force`, to get the regular package re-installed.

## Adding a new atom

Adding a new atom in `atoms-rendering` involves

1. Adding the component, eg. MyComponent.tsx - Make sure the outer component of the atom contains `data-atom-id` and `data-atom-type` in order to be picked up by teleporter. [Here is an example](https://github.com/guardian/atoms-rendering/blob/16b72b5e82101f30771aa823668fff632143ffa0/src/ChartAtom.tsx#L10)
2. Adding stories, eg. MyComponent.stories.tsx
3. Adding a line to `index.ts` to export the component
4. Publishing a new version of the library to Npm (see below)

An example PR for adding the Profile Atom can be found [here](https://github.com/guardian/atoms-rendering/pull/35/files). The component is defined in [/src/ProfileAtom.tsx](https://github.com/guardian/atoms-rendering/blob/main/src/ProfileAtom.tsx), with the supporting type ProfileAtomType in [src/types.tsx](https://github.com/guardian/atoms-rendering/blob/main/src/types.ts). Types are transpiled when this project is built, and are made available to your rendering project when you include the published library as a dependency.

## Releasing a new version / Publishing to NPM

`atoms-rendering` is now published to NPM using [changesets](https://github.com/changesets/changesets)

Generate a changeset describing your work by running `make changeset` in the CSNX root dir and following the prompts.

Publishing is triggered by merging the auto-generated Bump Version PR that changesets manages.

Once complete, you can update the version of `@guardian/atoms-rendering` in any consuming project to see the changes.
