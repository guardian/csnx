---
'@guardian/source': minor
---

Add automatic hover colour calculation for Button themes

`backgroundPrimaryHover`, `backgroundSecondaryHover` and `backgroundTertiaryHover` are now optional properties of `ThemeButton`. If supplied these hover colours will be used, if not then the following rules will be used to create a hover colour based on the lightness of the other colours.

| Background colour:             |                          |
| ------------------------------ | ------------------------ |
| Very Dark (Luminosity: 0–10)   | Lighten by 20% on hover. |
| Dark (Luminosity: 11–20)       | Darken by 4% on hover.   |
| Medium (Luminosity: 21–80)     | Darken by 5% on hover.   |
| Light (Luminosity: 81-90)      | Darken by 7% on hover.   |
| Very Light (Luminosity 91-100) | Darken by 10% on hover.  |

| Borders with transparent backgrounds: |                                   |
| ------------------------------------- | --------------------------------- |
| Luminosity 0–50                       | Set border colour opacity to 10%. |
| Luminosity 51–100                     | Set border colour opacity to 20%. |
