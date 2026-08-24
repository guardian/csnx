# Why use Terrazzo to process design tokens?

Date: August 2026

## Status

Accepted

## Context

Pulse's design tokens need to be converted from [DTCG format JSON](https://www.designtokens.org/tr/2025.10/) into code that can be imported and used by engineers working on user-facing products and features. These tokens encapsulate individual design decisions such as colour, spacing and typography. Whilst we primarily work with React and Emotion on the web, we want to support as many technologies and platforms as possible, including native iOS and Android apps.

## Options

- Use Style Dictionary
  - This is a longstanding project that is widely used by numerous other design systems, meaning there are a wealth of examples and resources to draw on
  - It supports numerous web technologies and platforms out of the box, including iOS and Android
  - Extremely extensible with support for custom transforms and formats
  - We're already using it to process and transform design tokens in [Stand](https://github.com/guardian/stand)
  - Was originally built to support its own token format and does not yet fully support the [stable DTCG 2025.10 specification](https://github.com/style-dictionary/style-dictionary/issues/1590).
- Use Terrazzo
  - Built from the ground up to support the DTCG token specification and has full support for the 2025.10 specification and the [resolver module](https://www.designtokens.org/tr/2025.10/resolver/)
  - Easily extensible via modern plugin architecture
  - Supports multiple technologies and platforms out of the box
  - Outputs references rather than raw values when generating custom properties, making it easier to handle modes and theming
  - Can import variables and styles from Figma
  - Includes token linting to help catch errors and ensure consistency
  - Relatively new project and not as widely used as Style Dictionary so fewer resources and examples
- Use Token Studio's export functionality
  - Can export tokens as CSS custom properties and JS
  - Limited customisation options
- Build own tooling
  - Would provide maximum flexibility and allow us to customise the output to exactly what we need
  - DTCG specification is relatively complex (particular with the addition of resolvers) so would not be straightforward to build
  - Another project to maintain
  - Other projects have already done the hard work

## Decision

Use [Terrazzo](https://terrazzo.app) to process and generate code from our design tokens.

## Consequences

- Pulse's design tokens will be made available as code in multiple formats and automatically updated when the underlying tokens are updated
- We're not taking on the burden of building and maintaining a new tool
- We're adding a dependency on Terrazzo, but by using an open format for the tokens we have the option of swapping out tooling as required
