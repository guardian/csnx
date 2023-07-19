---
'@guardian/identity-auth': minor
---

- Add `decodeTokens` method to `Token` class
- Refactor library so that we only store required values in `verifyTokens` local storage, and now derive other values from decoding the token
- Rename `verifyToken` method to `verifyTokens` in `Token` class to better reflect functionality
- Use access token to verify timestamps, instead of id tokens
