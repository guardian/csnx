---
'@guardian/libs': major
---

CMP: Implement the Multi-State-Privacy-Agreement in the US
In this release, we are now providing the **gpp so third party vendors that have migrated will switch to this. The **uspapi will stay for a transitionary period for vendors yet to migrate.

- Adding the window.\_\_gpp stub function in the US region
- Updating the US framework to use usnat instead of ccpa as a framework
- Migrated ccpa types/functions to aus.
- The ConsentState type (returned by `getConsentFor`, `onConsentChange` and `onConsent`) now includes a `usnat` property. Note that both the`ccpa` and `usnat` properties will contain the ConsentState object for the US region. However, the `ccpa` property is now marked as deprecated. The `ccpa` property can be used temporarily but consumers who require the `ConsentState` from the US should use the `usnat` property.
