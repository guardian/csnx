---
'@guardian/source': patch
---

Moves design tokens into `@guardian/source` itself.

Allows us to calculate `@guardian/source/foundations` values during build, rather than at the point of consumption, which relieves user's devices of this overhead and means the design tokens JSON will no longer be included in consumer's bundles.
