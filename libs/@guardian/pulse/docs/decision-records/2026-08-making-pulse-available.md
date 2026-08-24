# Making Pulse Tokens Available

Date: August 2026

## Status

Accepted

## Context

Pulse provides design tokens to products with different rendering and styling approaches. Consumers need a stable, browser-facing entry point for generated tokens; a way to select theming (e.g. brand and colour-mode) values at runtime; and the ability to use the same values from CSS and CSS-in-JS.

## Options considered

### JavaScript token objects

**Advantages**

- Token values can be imported directly into JavaScript and TypeScript.
- Works natively in CSS-in-JS libraries (e.g. Emotion)

**Disadvantages**

- Consumers must translate token values into CSS.
- CSS and CSS-in-JS do not share a runtime theming mechanism.
- The primary API is limited to JavaScript-capable consumers.

### CSS custom properties with CSS classes

**Advantages**

- Token values are available to all web styling approaches.

**Disadvantages**

- Consumers must add Pulse-specific class names.
- Class names can conflict with application naming and composition conventions.
- Class and custom-property names become public API and must remain stable once adopted.

### CSS custom properties with data attributes

**Advantages**

- Token values are available to all web styling approaches.
- The context API is explicit and separate from application class name and other styling conventions.
- CSS and CSS-in-JS can use the same custom properties.

**Disadvantages**

- Consumers must add and maintain Pulse-specific attributes at token-context boundaries.
- Attribute and custom-property names become public API and must remain stable once adopted.

## Decision

Pulse will publish one generated stylesheet at `@guardian/pulse/pulse.css`. The package root is not an entry point.

The stylesheet exposes tokens as CSS custom properties. Primitive tokens are declared on `:root`. Theme tokens are selected with data attributes:

```css
[data-pulse-brand='core'] {
	/* Brand custom properties */
}

[data-pulse-mode='dark'] {
	/* Colour-mode custom properties */
}
```

Component tokens are selected with a named attribute, for example `data-pulse-component="button"`. Apply it to the component element.

Data attributes are Pulse's public mechanism for selecting theming contexts. Consumers do not need to add or depend on Pulse CSS classes.

### CSS-in-JS usage

Import the stylesheet once, then render the appropriate attributes on an ordinary DOM element. CSS-in-JS rules reference Pulse custom properties; the browser resolves them from the closest matching scope.

```tsx
import { css } from '@emotion/react';
import '@guardian/pulse/pulse.css';

const button = css`
	background: var(--components-button-color-fill-primary);
	color: var(--components-button-color-text-primary);
`;

export const Example = () => (
	<div data-pulse-brand="core" data-pulse-mode="light">
		<button css={button} data-pulse-component="button">
			Continue
		</button>
		<div data-pulse-brand="core" data-pulse-mode="dark">
			<button css={button} data-pulse-component="button">
				Continue
			</button>
		</div>
	</div>
);
```

The nested dark-mode scope changes the values used by its descendants without changing the Emotion rule. Emotion does not need a JavaScript token runtime or `ThemeProvider` to use Pulse.

### Managing context boundaries

Consumers should establish contexts at application or feature boundaries, rather than on every component. A framework integration can provide a small provider component that renders the scope element and applies the relevant `data-pulse-*` attributes. Nested providers can override an inherited brand or mode for a subtree.

#### Caveat: nested theme contexts

When a nested scope changes a theming dimension, it must declare every relevant dimension, including those whose value has not changed. CSS custom properties are computed where they are declared and inherited as computed values. A derived property inherited from a parent does not re-evaluate against a source property overridden by a child.

For example, a nested element that changes `data-pulse-brand` must also declare its intended `data-pulse-mode`. Attributes are not inherited, so the nested element would otherwise not match the mode selector. Re-declaring the complete context ensures that brand and mode custom properties are calculated together on the nested scope. A future provider should merge inherited context with local overrides and render the complete attribute set.

Pulse may add an encapsulated, framework-specific provider in future. It will be a convenience API, not a prerequisite for using Pulse CSS or Emotion.

### API stability

The attribute and custom-property naming conventions are not yet final. The names in this record describe the current implementation and may change before Pulse has a stable public API.

Before a stable release, Pulse must finalise and document the naming conventions. Once stable, they will follow normal semantic-versioning rules: retain them for compatible releases, deprecate names before removal, and provide aliases where a migration cannot be avoided.

## Consequences

- Web consumers can import a single CSS entry point without adopting a JavaScript framework or CSS-in-JS library.
- CSS and Emotion use the same custom-property names and resolved values, avoiding duplicate token representations.
- Brand, mode, and component contexts compose through normal CSS inheritance and selector matching.
- Consumers must import `@guardian/pulse/pulse.css` before using Pulse properties and apply the required `data-pulse-*` attributes.
- Once naming conventions are agreed, attribute and custom-property names become part of Pulse's public API.
