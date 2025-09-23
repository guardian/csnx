---
'@guardian/libs': major
---

#### Changes to enable consent or pay in Europe

Extends existing Consent or Pay functionality to include 34 additional European countries

Within the gdpr framework, uses the jurisdiction to populate a new corPCurrency parameter with:

- GBP for GB
- EUR for all other Consent or Pay jursidictions

The corPCurrency is used by the Sourcepoint Scenario to determine which cookie banner is displayed

The functionality is hidden behind a 0% A/B Test and Switch (defaulting to off), and will only be available where either a user has opted-in or the Switch has been turned on
