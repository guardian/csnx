---
'@guardian/libs': minor
---

Add request to fetch Sourcepoint's geolocation and track location mismatches between Fastly.

- Fetch Sourcepoint's geolocation from `sourcepoint.theguardian.com/wrapper/v2/meta-data` to determine the Sourcepoint's applied framework.
- Send an Ophan event when Sourcepoint's geolocation framework differs from Fastly's.
