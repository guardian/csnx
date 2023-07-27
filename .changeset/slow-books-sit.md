---
'@guardian/identity-auth': minor
---

Add functionality to refresh the user's Okta and Identity session, if required, once every 30 days. Controlled through the new `idCookieSessionRefresh` option, which defaults to `false`.
