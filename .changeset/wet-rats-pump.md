---
'@guardian/libs': minor
---

#### Stop banner flashing due to reload by using sp.executeMessage

Using http request instead of postCustomConsent from \_\_tcfapi
Update SP Config to include isSPA parameter
Using window.sp.executeMessaging to trigger the banner after the merging from advertising to non-advertising vendor list.
Removed window.location.reload after merging consent
