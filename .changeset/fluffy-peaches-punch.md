---
'@guardian/source': major
---

Removes deprecated typography API.

In `@guardian/source-foundations@14.2.0` (2024-04-07), we added new [web typography presets](https://guardian.github.io/storybooks/?path=/story/source_foundations-typography--presets) to standardise on the typographic language used by Design, and deprecated the old typography API.

This release removes that old API, in order to simplify the ongoing maintenance of the library.

The following exports have been removed:

- `titlepiece`
- `headline`
- `body`
- `textSans`
- `titlepieceSizes`
- `headlineSizes`
- `bodySizes`
- `textSansSizes`
- `remTitlepieceSizes`
- `remHeadlineSizes`
- `remBodySizes`
- `remTextSansSizes`
- `fonts`
- `fontWeights`
- `lineHeights`
- `bodyObjectStyles`
- `headlineObjectStyles`
- `textSansObjectStyles`
- `titlepieceObjectStyles`

along with the following `type` exports:

- `ScaleUnit`
- `Category`
- `LineHeight`
- `FontWeight`
- `FontStyle`
- `FontWeightDefinition`
- `Option`
- `TypographySizes`
- `TypographyStyles`
- `TitlepieceSizes`
- `HeadlineSizes`
- `BodySizes`
- `TextSansSizes`
- `Fs`
- `FontScaleFunction`
- `FontScaleFunctionStr`
- `FontScaleArgs`

_If you cannot map existing uses of the old API to the new presets, please check which preset you should use with a designer._
