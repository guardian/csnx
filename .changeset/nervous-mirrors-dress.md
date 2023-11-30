---
'@guardian/source-react-components-development-kitchen': major
---

Refactor `Tabs` so it can receive an optional theme. This will require consumers
relying on `cssOverrides` to use the `theme` prop instead. The exported exported
light (default) and dark themes are compatible with this API

```tsx
import { css } from '@emotion/react';
import {
	Tabs,
	tabsThemeDefault,
} from '@guardian/source-react-components-development-kitchen';

const Before = () => (
	<Tabs
		tabs={tabs}
		cssOverride={css`
			border-color: darkbrown;
		`}
	/>
);

const After = () => (
	<Tabs tabs={tabs} theme={{ ...tabsThemeDefault, '--border': 'darkbrown' }} />
);
```

Uses CSS Custom Properties under the hood.
