---
'@guardian/libs': minor
---

Temporarily switching to use Sourcepoint geolocation

- Load all stubs (tcfv2, usnat, ccpa) regardless of location
- Loading all jurisdiction config objects to allow Sourcepoint to choose depending on their geolocation
- Sending jurisdiction mismatch to Ophan using CONSENT_GEOLOCATION_MISMATCH
- Australia will use our current geolocation as SP's framework doesn't allow us to load both ccpa and usnat config objects.
