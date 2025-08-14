---
'@guardian/libs': major
---

#### Sourcepoint Australia Migration

Migration from CCPA to Sourcepoint Global Enterprise as the privacy framework for Australia

To use this new version in a consumer:

- update the version of @guardian/libs
- if any tests use the ConsentState interface, add a new property `signalStatus: 'ready'`
