---
'@guardian/core-web-vitals': major
---

This major change adds attribution data on 3 core web vital metrics; CLS, INP, and LCP. It also updates the endpoint so that this data will now be sent to a new table in big query. We now send the stage as a value to big query, rather than using separate endpoints. In addition, null values have been removed in favour of undefined.
