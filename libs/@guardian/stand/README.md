# `@guardian/stand`

_Find what you need at the (news)stand!_

A work in progress collection of shared components for the Guardian's internal editorial tools.

Currently built with React, but this may be subject to change.

[![npm](https://img.shields.io/npm/v/@guardian/stand)](https://www.npmjs.com/package/@guardian/stand)

## Install

```sh
$ pnpm add @guardian/stand
```

or

```sh
$ yarn add @guardian/stand
```

or

```sh
$ npm install @guardian/stand
```

## Usage

### `Byline`

A component for managing bylines in a ProseMirror editor.

It uses an internal model, `BylineModel`, to represent the byline structure. In order to use the `Byline` component within your project, you must provide methods to convert between the `BylineModel` and your own data structures.

```ts
import { BylineModel } from '@guardian/stand/byline';

const byline: BylineModel = [
	{
		type: 'contributor', // Represents a contributor (i.e in a chip)
		value: 'Mahesh Makani', // String value of the contributor
		tagId: '12345', // Optional tag ID for the contributor, if this is provided it will be a "tagged" contributor
		path: 'profile/mahesh-makani', // Optional path to the contributor's profile
		meta: {
			// optional additional metadata e.g. the tag object from tag manager/capi
			// this allows us to persist the meta data back to the consumer
			// so it makes it possible to avoid additional network requests
			// to load the full tag object
			// use type guards, validation library (like zod), or an `as` assertion when using this
		},
	},
	{
		type: 'text', // Represents a text part of the byline
		value: ' and ', // String value of the text
	},
	{
		type: 'contributor', // Another contributor (i.e in a chip)
		value: 'Andrew Howe-Ely', // String value of the contributor
		// since this does not have a tagId, it will be an "untagged" contributor and presented differently
	},
];
```

#### Example

You'll also need to install the specific prosemirror packages if they're not already included in your project.

```sh
# pnpm
$ pnpm add @guardian/prosemirror-invisibles prosemirror-dropcursor prosemirror-history prosemirror-keymap prosemirror-model prosemirror-state prosemirror-view
# npm
$ npm install @guardian/prosemirror-invisibles prosemirror-dropcursor prosemirror-history prosemirror-keymap prosemirror-model prosemirror-state prosemirror-view
# yarn
$ yarn add @guardian/prosemirror-invisibles prosemirror-dropcursor prosemirror-history prosemirror-keymap prosemirror-model prosemirror-state prosemirror-view
```

```jsx
import { Byline } from '@guardian/stand/byline';

...

const MyComponent = () => {
	...
	return (
		// Basic usage of the Byline component
		// with a required handleSave function to manage the byline model.
		<Byline
			handleSave={(newValue) => {
				// Handle save
				console.log('New byline value:', newValue);
			}}
		/>
	)
}
...

const AnotherComponent = () => {
	...
	return (
		// Usage with an initial value
		<Byline
			handleSave={(newValue) => {
				// Handle save
				console.log('Updated byline value:', newValue);
			}}
			searchContributors={(selectedText) => {
				... // Function to search for contributors based on selected text

				return [
					{
						tagId: '12345',
						label: 'Mahesh Makani',
						path: 'profile/mahesh-makani', // optional path to the contributor's profile
						meta: {...} // optional additional metadata
					}
					...
				]
			}}
			initialValue={byline}
			theme={{
				editor: {
					background: '#f0f0f0', // Example background color for the editor
					color: '#333', // Example text color for the editor
					...
					// see libs/@guardian/stand/src/byline/theme.ts for more theme options
				}
			}}
			allowUntaggedContributors={true} // Allow untagged contributors
			contributorLimit={5} // Limit the number of contributors
			enablePreview={true} // Enable preview mode
			placeholder="Add contributors..." // Placeholder text for the editor
		/>
	)
}
```
