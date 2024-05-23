# `Footer With Contents`

A footer component that can have content added inside of it, and a footer links component to be used to display links within the footer.

## Install

```sh
$ pnpm add @guardian/source-development-kitchen
```

or

```sh
$ npm i @guardian/source-development-kitchen
```

## Use

### API

The `<FooterLinks>` component can take a prop `links`, this prop is an array of `FooterLink` or `FooterButton` objects.

A `FooterLink` object can be used if you want to include an anchor tag with an href in the footer. A `FooterButton` object can be used to include a button with an `onClick` callback of your specification. The anchors and buttons will be styled to appear the same.

If your site uses the Guardian CMP `@guardian/consent-management-platform`, you should include a `FooterButton` object in the `links` prop with an `onClick` callback that launches the CMP and the text "Privacy Settings".

See [storybook](https://guardian.github.io/storybooks/?path=/story/source-development-kitchen_react-components-divider--default-divider) for examples.

### How to use

For context and visual guides relating to usage see the [Source Design System website](https://theguardian.design).
