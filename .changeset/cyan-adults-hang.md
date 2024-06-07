---
'@guardian/source': major
---

Removes `SvgSpinner` from icon library and replaces with dedicated `Spinner` component. The new component supports the same named icon sizes via the `size` prop, but additionally also allows a custom size to be specified in pixels.Default colours can be overridden using the `theme` prop.

```tsx
<>
	<Spinner size="small" />
	<Spinner size={40} />
	<Spinner theme={{ background: 'transparent', color: 'currentColor' }} />
</>
```
