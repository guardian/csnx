---
'@guardian/source-react-components-development-kitchen': major
---

Refactor ExpandingWrapper so it can receive an optional theme. This will require
consumers to update their calls, but it should be compatible with the existing
exported light and dark themes.

```tsx
import {
	ExpandingWrapper,
	expandingWrapperDarkTheme,
} from '@guardian/source-react-components-development-kitchen';
<ExpandingWrapper
	name="Expanding Wrapper With Dark Theme"
	theme={expandingWrapperDarkTheme}
>
	{children}
</ExpandingWrapper>;
```

Uses CSS Custom Properties under the hood.
