---
'@guardian/source': major
---

Removes `SvgSpinner` from icon library and replaces with dedicated `Spinner` component. The `size` prop supports the existing set of named icon sizes for backwards compatibility, but also allows setting a custom size in pixels. The default colour scheme can be overridden with the `theme` prop.

```tsx
<>
	<Spinner size="small" />
	<Spinner size={40} />
	<Spinner theme={{ background: 'transparent', color: 'currentColor' }} />
</>
```
