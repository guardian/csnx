---
'@guardian/libs': major
---

#### Changes to enable consent or pay in Europe

Extends existing Consent or Pay functionality to include European countries

Within the gdpr framework, uses the jurisdiction to populate a new corPCurrency parameter with:

- GBP for GB
- EUR for all other Consent or Pay jursidictions

The corPCurrency is used by the Sourcepoint Scenario to determine which cookie banner is displayed
