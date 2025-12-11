---
'@guardian/libs': minor
---

#### Return consent opt out status

Updated CCPA regulations (i.e. affecting US), taking effect 1 January 2026, require businesses to display the status of a consumer's opt-out preference and whether it has processed the consumer's opt-out preference signal as a valid request to opt out.

Sourcepoint automatically updates the value of `doNotSell` to reflect the GPC signal, because "Respect Global Privacy Control" is turned on in the Sourcepoint portal. Thus we do not need to check the value of the GPC signal explicitly.

This release provides a new function `getConsentOptOutStatus` which returns a string that can be displayed on the website:

- if the jurisdiction is not US, returns an empty string
- if the jurisdiction is US and the consumer has opted out via the CMP UI or via the GPC signal, returns a string indicating that the consumer has opted out
- if the jurisdiction is US and the consumer has not opted out via the CMP UI or via the GPC signal, returns a string indicating that the consumer has not opted out

Consumers of this library should call the `getConsentOptOutStatus` function in order to generate an appropriate string, which should then be displayed on any page that displays advertising or collects user information.
