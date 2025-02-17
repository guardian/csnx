---
'@guardian/libs': major
---

#### Changes to enable consent or pay in the CMP

- Add the ability by hiding it behind a query param flag, CORP_FLAG, for consent or pay by adding two new params, useNonAdvertisingList and isUsedSignedIn to cmp.init
- Using Sourcepoint Subdomain property if useNonAdvertisedList is true
- Merging user consent from Advertising to Non-Advertising vendor list will reload the page if a user has not previously consented to the non-advertising list.
- The CMP will now redirect to https://support.theguardian.com/guardian-ad-lite when clicking Reject for Consent or Pay users
- Extending \_\_tcfapi to postCustomConsent as part of merging user consent process.
