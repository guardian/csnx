---
'@guardian/libs': major
---

- Add the ability for consent or pay by adding two new params, useNonAdvertisingList and isUsedSignedIn to cmp.init
- Using Sourcepoint Subdomain property if useNonAdvertisedList is true
- Merging user consent from Advertising to Non-Advertising vendor list
- Redirecting user to Support when clicking Reject for Consent or Pay users
- Extending \_\_tcfapi to postCustomConsent as part of merging user consent process.
