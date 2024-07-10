---
'@guardian/source': major
---

Adds new icons to the icon library and applies updates to existing icons. In addition, some icons have been renamed and others deprecated. Icons that were previously deprecated have now been removed in this update.

#### Renamed icons

These icons have been renamed:

| Old name           | New name               |
| ------------------ | ---------------------- |
| `SvgBookMark`      | `SvgBookmarkFilled`    |
| `SvgBookMarkCross` | `SvgBookmarkCross`     |
| `SvgCrossRound`    | `SvgCrossRoundFilled`  |
| `SvgHouse`         | `SvgHomeHouseFilled`   |
| `SvgPersonRound`   | `SvgPersonRoundFilled` |
| `SvgShare`         | `SvgShareWeb`          |

#### Deprecated icons

These existing deprecated aliases have been removed:

| Removed           | Aliased to             |
| ----------------- | ---------------------- |
| `SvgOfflineCloud` | `SvgCrossedOutCloud`   |
| `SvgAlert`        | `SvgExclamation`       |
| `SvgMessenger`    | `SvgFacebookMessenger` |
| `SvgInfo`         | `SvgInfoRound`         |
| `SvgPlay`         | `SvgMediaControlsPlay` |
| `SvgPayPal`       | `SvgPayPalBrand`       |

eg. if you are importing `SvgOfflineCloud` this is aliased to `SvgCrossedOutCloud`. The alias has now been removed so you should import `SvgCrossedOutCloud` directly.

The following icons have been deprecated and are still available, but will be removed in a future release:

| Don't use          | Use instead            |
| ------------------ | ---------------------- |
| `SvgAlertTriangle` | `SvgAlertRound`        |
| `SvgFilter`        | `SvgFilterOutlinedWeb` |
| `SvgShareCallout`  | `SvgShareWeb`          |
