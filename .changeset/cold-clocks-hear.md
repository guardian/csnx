---
'@guardian/source-react-components-development-kitchen': major
---

Refactor `ExpandingWrapper` so it can receive an optional theme. This will
require consumers relying on `cssOverrides` to use the `theme` prop instead. The
exported exported light (default) and dark themes are compatible with this API.

```jsx
import { css } from '@emotion/react';
import {
	ExpandingWrapper,
	expandingWrapperThemeDefault,
} from '@guardian/source-react-components-development-kitchen';

const Before = ({ children }) => (
	<ExpandingWrapper
		cssOverrides={css`
			color: aquamarine;
		`}
	>
		{children}
	</ExpandingWrapper>
);

const After = ({ children }) => (
	<ExpandingWrapper
		theme={{
			...expandingWrapperThemeDefault,
			'--text': 'aquamarine',
		}}
	>
		{children}
	</ExpandingWrapper>
);
```

Uses CSS Custom Properties under the hood.
