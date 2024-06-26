# Storybook

Source uses [Storybook][storybook] for its API documentation as well as for visual regression testing.

[storybook]: https://storybook.js.org/

The Source are created within the CSNX storybooks, which can be run locally using `make storybooks` and built using `make build-storybook`.

## Story Configuration

Source has a standard way of writing stories:

### Example

```tsx
// MyComponent.tsx

export interface MyComponentProps {
    /**
     * A string to label the value
     */
    label: string;
    /**
     * An optional boolean to hide the label value
     */
    hideLabel?: boolean;
    /**
     * An optional string value to display. Will show `No value set` if not provided
     */
    value?: string;
    /**
     * An optional id to give the component
     */
    id?: string;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/${MY_COMPONENT_PACKAGE}-${MY_COMPONENT}) •
 * [Design System](https://theguardian.design/${MY_COMPONENT_PATH}) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/${MY_COMPONENT_PACKAGE}/${MY_COMPONENT}) •
 * [NPM](https://www.npmjs.com/package/@guardian/${MY_COMPONENT_PACKAGE})
 *
 * My Component is a nifty way of showing key -> value data
 *
 * The following themes are supported: `default`, `brand`
 */
export MyComponent = ({}: MyComponentProps) => (
    <div id={id}>
        {!hideLabel ? <div className="my-component-label">{label}</div> : null}
        <div className="my-component-value">{value ?? "No value set"}</div>
    </div>
)
```

```tsx
// MyComponent.stories.tsx

import { MyComponent } from './MyComponent';
import type { MyComponentProps } from './MyComponent';
import { myComponentBrand } from './index';
import { ThemeProvider } from '@emotion/react';
import type { Story } from '@storybook/react';

export default {
	title: 'Source/src-my-component/MyComponent',
	component: MyComponent,
	argTypes: {
		id: { control: { disable: true } },
	},
	args: {
		label: 'Label',
		hideLabel: false,
		value: 'Value',
	},
};

const Template: Story = (args: MyComponentProps) => <MyComponent {...args} />;

export const Default = Template.bind({});

// *****************************************************************************

export const DefaultBrandTheme = (args: MyComponentProps) => (
	<ThemeProvider theme={myComponentBrand}>
		<Template {...args} />
	</ThemeProvider>
);
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const HideLabel = Template.bind({});
HideLabel.args = {
	hideLabel: true,
};

// *****************************************************************************

export const HideLabelBrandTheme = (args: MyComponentProps) => (
	<ThemeProvider theme={myComponentBrand}>
		<Template {...args} />
	</ThemeProvider>
);
HideLabelLightTheme.args = {
	hideLabel: true,
};
HideLabelBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
```

### Files and Naming

1. Name story files following the pattern `${Component}.stories.tsx` e.g. `MyComponent.stories.tsx`
1. Each exported component should have its own `stories.tsx`
1. Story titles should follow the pattern `${Source | Editorial}/${package}/${component}` e.g. `Source/src-radio/RadioGroup`
1. Use PascalCase names for stories

### Story Structure

1. Define a template for each set of stories

   ```ts
   const Template: Story = (args: ComponentProps) => <Component {...args} />;
   ```

2. Set the default [story args][story-args] and [argTypes][argtypes] on the [default export][default-export]

   ```ts
       export default {
           title: 'MyComponent',
           component: MyComponent,
           argTypes: { ... },
           args: { ... },
       };
   ```

3. Define a series of stories detailing all possible states of each component for visual regression testing

4. Separate stories with the following delimiter

   ```ts
   // *****************************************************************************
   ```

5. Disable controls for deprecated props and for args that won't have any effect in storybook

   ```ts
    export default {
       title: 'MyComponent',
       component: MyComponent,
       argTypes: {
           arg2: {
               control: {
                   disable: true
               }
           }
       },
       args: { ... },
   };
   ```

6. (Optional) If you want a viewport to be reflected in Chromatic, you need to explicitly add it as a `chromatic` parameter

```ts
MyStory.parameters = {
	viewport: { defaultViewport: 'tablet' },
	chromatic: {
		viewports: [breakpoints.tablet],
	},
	layout: 'fullscreen',
};
```

[story-args]: https://storybook.js.org/docs/react/writing-stories/args
[argtypes]: https://storybook.js.org/docs/react/api/argtypes
[default-export]: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

### Documentation / Comments

1. Document component props using [doc blocks](https://storybook.js.org/docs/react/writing-docs/doc-blocks)

   ```ts
   export interface MyComponentProps {
   	/**
   	 * A label to display alongside the component
   	 */
   	label: string;
   }
   ```

1. Document Components with JSDoc comments including links to online documentation

   ```ts
   /**
    * [Storybook](https://guardian.github.io/csnx/?path=/story/${MY_COMPONENT_PACKAGE}-${MY_COMPONENT}) •
   * [Design System](https://theguardian.design/${MY_COMPONENT_PATH}) •
   * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/${MY_COMPONENT_PACKAGE}/${MY_COMPONENT}) •
   * [NPM](https://www.npmjs.com/package/@guardian/${MY_COMPONENT_PACKAGE})
    *
    * My Component is a nifty way of showing key -> value data
    *
    * The following themes are supported: `default`, `brand`
    */
   export MyComponent = ({}: MyComponentProps) => {...}
   ```

1. Mark any props that should not be documented with the `@ignore` annotation and a comment explaining why

   ```tsx
   interface MyChildComponentProps {
   	/**
   	 * @ignore passed down by the parent <MyComponent />
   	 */
   	myProp?: boolean;
   }
   ```

### Sub-components

1. Set the `subcomponents` value in the default export for components that have [sub-components](https://storybook.js.org/docs/react/workflows/stories-for-multiple-components)

   ```ts
   export default {
       title: 'Source/src-package/Component',
       component: Component,
       subcomponents: { SubComponent },
       args: { ... },
       argTypes: { ... },
   };
   ```

1. Pass any sub-component's default story args through to the sub-component in the template of the component story

   ```tsx
   // SubComponent.stories.tsx

   export default {
       title: 'Source/src-package/SubComponent',
       component: SubComponent,
       argTypes: { ... },
       args: {
           arg0: 'test',
           arg1: 1,
       },
   };
   ```

   ```tsx
   // Component.stories.tsx

   ...

   import SubComponentStories from './SubComponent.stories';

   ...

   const Template: Story = (args: ComponentProps) => (
       <Component {...args}>
           <SubComponent {...SubComponentStories.args} />
       </Component>
   );

   ```

## Other Tips

### `string | JSX.Element` Controls

For props where the type is either a string or a JSX element, you can [provide options for the value][mapping-arg-values] that let the user see a possible value for either type.

```ts
interface StoryProps {
    label: string | JSX.Element;
}

export const Story = ({ label }: StoryProps) => ...

Story.story = {
    argTypes: {
        label: {
            options: ['string', 'JSX element'],
            mapping: {
                string: 'Option 1',
                'JSX element': <em>Option 1</em>,
            },
        },
    }
}
```

[mapping-arg-values]: https://storybook.js.org/docs/react/writing-stories/args#mapping-to-complex-arg-values

### Controls with `undefined`

For props whose behaviour depends on whether the value is defined or not, you can configure two options for the user to choose between to see the different states.

```tsx
export const Story = ({ error }: StoryProps) => ...

Story.argTypes = {
    error: {
        options: ['undefined', 'string'],
        mapping: {
            undefined: undefined,
            'string': "An error has occurred",
        },
        control: { type: 'radio' },
    }
}
```

### Theming

A decorator is available to simplify creating stories with different themes. To make use of it, simply pass the required theme in as a parameter.

```tsx
...

const MyComponentBrandTheme = Template.bind({})
MyComponentBrandTheme.parameters = {
    theme: myComponentBrand
}
```
