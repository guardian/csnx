# Newsletters

Types related to the guardian's editorial newsletters.

THe Newsletters API, and the UI for managing editorial newsletters, is served by https://github.com/guardian/newsletters-nx. That project has its own internal definitions of the types served by this package, but does not publish a type library.

The types exported by this libray contain a subset of the fields on the API data. The fields which are only relevant to the internal workflow of the newsletter tool are not included.

Some typescript projects obtain newsletters data via the identityAPI (https://github.com/guardian/identity). Identity injests the data from the newsletter API and serves it in a modified format. Types representing both formats are exported.

**TO DO** - add types representing the identity format, when identity is updated to use the current data model.
