---
'@guardian/source-foundations': patch
---

Make media queries `max-width` much closer to the breakpoint value.

As media queries can report fractional values, they can currently fall between entire pixels.
For example, `479.5px` is matching neither `max-width: 479px` nor `min-width: 480px`

The media range syntax would be more expressive, but [support is still sparse at ~80%](https://caniuse.com/css-media-range-syntax).
