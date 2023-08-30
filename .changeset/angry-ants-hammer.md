---
'@guardian/libs': patch
---

Uses a local cache for `logger` subscriptions, instead of hitting `localStorage` every time `log` was called (even when the console was closed).
