---
'@guardian/identity-auth': patch
---

Remove `GU_U` cookie if we fail to get tokens with it, as it's likely invalid
