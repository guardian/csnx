---
'@guardian/source-react-components-development-kitchen': major
'@guardian/atoms-rendering': major
'@guardian/libs': major
---

Renamed `ArticlePillar` to `Pillar` to reflect the fact that it's used in more places than just articles. This is a breaking change because it alters the public API of `guardian/libs`, `guardian/atoms-rendering` and `guardian/source-react-components-development-kitchen`. Consumers will have to update their code to use the new name in their imports.
