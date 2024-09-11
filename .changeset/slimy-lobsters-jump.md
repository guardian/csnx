---
'@guardian/libs': major
---

CMP: Implement Multi-State Privacy Agreement for US Compliance

This release introduces support for the Global Privacy Platform (GPP) for third-party vendors who have completed migration. The legacy \*\*uspapi will remain available temporarily for vendors still in transition.

Key updates:

    Added window.__gpp stub function for the US region.
    Updated the US framework to use "usnat" instead of "ccpa".
    Migrated CCPA-related types and functions to the "aus" namespace.
    The ConsentState type, returned by getConsentFor, onConsentChange, and onConsent, now includes a usnat property, replacing the previous ccpa property.
