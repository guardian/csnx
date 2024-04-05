---
'@guardian/source-foundations': minor
---

Adds [web typography presets](https://guardian.github.io/storybooks/?path=/story/source-foundations_typography--presets) to unify typographic language in [designs](https://www.theguardian.design/2a1e5182b/p/01555f-typography-presets/b/830670) and code implementations.

From now on, these presets should be used instead of [the old typography API](https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography-api-deprecated--docs), which this release deprecates.

_A forthcoming update will provide a codemod to convert existing uses of the old API to the new presets._

For the curious, here is how the new presets map to the old API: https://github.com/guardian/csnx/commit/ab79273308f103fae10210f708e75254348dbc8f.
