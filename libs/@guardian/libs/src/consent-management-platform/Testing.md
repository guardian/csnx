# Testing Banner changes

This guide describes how to test changes to the CMP logic in Dotcom Rendering and Frontend, both manually and automatically using the monitoring tool.

## Test locally

1. In this repo, @guardian/csnx, run `make github-pages:dev`. This spins up a test page where you can interact with each banner and check the relevant consent state.

## Test in CODE/PROD

1. Create beta version by adding the `Canaries` label to your PR and wait for the beta version of @guardian/libs to be posted.
2. Install the latest beta version in dotcom-rendering and frontend. Deploy branches of dotcom-rendering and frontend to CODE.

### Automatic Tests using monitoring tool

1. Setup the monitoring tool in https://github.com/guardian/consent-management-platform
2. Use a vpn to test the different frameworks
   - GB for `tcfv2_corp_gb` (Consent or Pay TCFV2 in GB)
   - Ireland (or other European country) for `tcfv2_corp_eu` (Consent or Pay TCFV2 in Europe)
   - Canada (other other non-European ROW country) for `tcfv2_row`
   - US for `usnat`
   - AUS for `aus`
3. Execute `make synthetics-start-debug` in the @guardian/consent-management-platform and select the appropriate settings for the CODE environment and relevant framework. Please note: you can also select the Sourcepoint stage.

### Manual checks to the website

1. Use a vpn to test the different frameworks
   - GB for `tcfv2_corp_gb` (Consent or Pay TCFV2 in GB)
   - Ireland (or other European country) for `tcfv2_corp_eu` (Consent or Pay TCFV2 in Europe)
   - Canada (other other non-European ROW country) for `tcfv2_row`
   - US for `usnat`
   - AUS for `aus`
2. Load the CODE environment: https://m.code.dev-theguardian.com
3. Check the correct banner is shown depending on the region
4. Open the browser console and check if the appropriate stub is loaded or not. https://github.com/guardian/transparency-consent-docs/blob/main/docs/testing-cmp-locally.md#tools-to-test-cmp
   - US should load **gpp but no **tcfapi. Note: this is present from page load.
   - UK/ROW should load **tcfapi but no **gpp. Note: this is only present after interacting with the banner.
   - AUS shouldn't have a stub.
5. Check Google Ad Requests
   - Open the Network tab in Developer tools
   - Filter by `securepubads`
   - Confirm if there are requests to `https://securepubads.g.doubleclick.net/gampad/ads`. Please note: for AUS and US this will be there without interacting with the banner. For GDPR (UK, Europe and ROW), this will show only after interacting with the banner.
   - Copy the full request url to the commercial request parser (https://guardian.github.io/commercial-request-parser/)
     - Check the rdp and pa values

   - | Framework | RDP for Accept All |  RDP for Reject All  | PA for Accept All |  PA for Reject All   |
     | :-------- | :----------------: | :------------------: | :---------------: | :------------------: |
     | UK        |         na         | No requests are made |       t\*\*       | No requests are made |
     | US        |         f          |          t           |         t         |          f           |
     | AUS       |         na         |          na          |         t         |          f           |
     | ROW       |         na         | No requests are made |         t         | No requests are made |

   \*\* This is only true for non-subscribed users.
   - Scroll the page and check if you see ads loading on the page.
