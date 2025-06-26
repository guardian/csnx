---
'@guardian/libs': major
---

Temporarily use Sourcepoint geo location to log mismatch

- Load all stubs (tcfv2, usnat, ccpa) regardless of location except for Australia
- Loading all jurisdiction config objects to allow Sourcepoint to choose depending on their geolocation except for Australia
- Australia will use our current geolocation as SP's framework doesn't allow us to load both ccpa and usnat config objects.
