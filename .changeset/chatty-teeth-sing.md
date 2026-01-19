---
'@guardian/libs': major
---

Removes `ArticleFormat` and its sub-types `ArticleDesign`, `ArticleDisplay`, `ArticleTheme`, `ArticleSpecial` and `Pillar` from `guardian/libs`. These types were primarily used by DCAR and AR, but we moved them into DCAR a long time ago and have now deleted AR, so they can now be removed from here. This also reduces confusion when developing in DCAR, as two versions of these types are currently available for import there: the local version and the `guardian/libs` version.

This is a breaking change, but there should not be any consumers now using the `guardian/libs` version of these types, as they were deprecated some time ago. If for some reason there is a consumer still using these types, when upgrading to this version of `guardian/libs` the TypeScript build in that project should fail and surface those usages.
