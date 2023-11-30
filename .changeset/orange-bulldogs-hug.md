---
'@guardian/source-react-components-development-kitchen': patch
---

Internals rewritten as read-only. No change for consumers, they are still able
to provide a mutable data structure, but we guarantee that this component will
not modify it
