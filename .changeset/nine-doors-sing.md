---
'@guardian/libs': major
---

Removes `ArticleDesign.PrintShop`, as we no longer intend to handle this as a separate `ArticleDesign`.

This is a breaking change because it removes this member from the `enum`. Therefore any code the depends on this member will need to be updated.

For example, in a `switch` the `case` will need to be removed:

```
switch (design) {
    case ArticleDesign.Standard:
      // Other code
    case ArticleDesign.PrintShop:
      // This case will need to be removed
}
```

Any code that stores the enum members directly, such as a fixture, will also need to be updated:

```
{
    ...
    format: {
        // With PrintShop removed, 20 will now refer to Obituary
        design: 20,
        ...
    }
}
```

Consideration will need to be given to what `ArticleDesign` will now be used for articles that were previously `PrintShop`. This is handled in the CAPI client for frontend/DCAR, and in AR itself for AR.
