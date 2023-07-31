# @guardian/atoms-rendering

## 33.0.0

### Major Changes

- Use latest Guardian packages

## 32.3.0

### Minor Changes

- 3c15ecb: Extend YoutubeAtom API to allow conditional rendering of a text overlay and autopausing on scroll functionality

## 32.2.3

### Patch Changes

- 28054ad: Fix YoutubeAtom play icon shifting after hover, and optically centre the icon within the circle

## 32.2.2

### Patch Changes

- 5364a4c: Use latest package versions

## 32.2.1

### Patch Changes

- 1e15445: Pass valid ad targeting to YoutubeAtom stories

## 32.2.0

### Minor Changes

- 61657a6: Delay initialisation of the Youtube player until we have ad targeting in place.

## 32.1.0

### Minor Changes

- 7d933a5: Update the YoutubeAtom's duration pill to include the videoCategory, if provided
- 4fafa9e: Updates the design of the youtube atom overlay

## 32.0.1

### Patch Changes

- Update build output config

## 32.0.0

### Major Changes

- a83c7a8: Update TS to v5.1.3 and all other packages to latest versions

## 31.0.0

### Major Changes

- dbbbc58: Switch atoms dep from commercial-core to commercial and bump cmp

## 30.0.0

### Major Changes

- 177e104: Update atoms-rendering commercial and cmp deps

## 29.1.2

### Patch Changes

- 833d562: Move youtube window types to window.d.ts

## 29.1.1

### Major Changes

- 313f8c0: Update form component border styles. This breaking change will only affect consumers not using `box-sizing: border-box`. In these circumstances consumers may need to adjust their styling to account for thinner borders.

### Minor Changes

- ad05205: Add new ad targeting logic for YoutubeAtomPlayer

### Patch Changes

- Updated dependencies [313f8c0]
  - @guardian/source-foundations@11.0.0
  - @guardian/source-react-components@14.0.0

## 28.0.0

### Major Changes

- Update React to v18

### Patch Changes

- Updated dependencies
  - @guardian/source-react-components@13.0.0

## 27.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

### Patch Changes

- Updated dependencies
  - @guardian/libs@14.0.0
  - @guardian/source-foundations@10.0.0
  - @guardian/source-react-components@12.0.0
  - @guardian/eslint-plugin-source-foundations@11.0.0
  - @guardian/eslint-plugin-source-react-components@14.0.0

## 26.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

### Patch Changes

- Updated dependencies [c6366dd]
- Updated dependencies [b4104c1]
- Updated dependencies [05a5836]
  - @guardian/source-foundations@9.0.0
  - @guardian/source-react-components@11.0.0
  - @guardian/libs@13.0.0

## 25.1.6

### Patch Changes

- Bump package versions

## 25.1.5

### Patch Changes

- 677568c: Analysis Guide Atoms should have a different background

## 25.1.4

### Patch Changes

- efda2c7: Update @guardian packages

## 25.1.3

### Patch Changes

- cf437f9: Bump @guardian/source-foundations to v8
- Updated dependencies [cf437f9]
  - @guardian/source-react-components@10.0.1

## 25.1.2

### Patch Changes

- d742b50: Bump @guardian/libs to 12.0.0

## 25.1.1

### Patch Changes

- 0e19d91: Adding data-ignore attribute to KnowledgeQuiz atom ordered lists to remove duplicate list numbers

## 25.1.0

### Minor Changes

- 90e0b9b: Explicitly export atoms-rendering types

## 25.0.4

### Patch Changes

- d509306: Noop to test releasing from CSNX

## 25.0.2

### Patch Changes

- f48dc07: Fix YoutubeAtom.test TypeScript errors

## 25.0.1

### Patch Changes

- b757712: Make commercial core and CMP optional peer deps

## 25.0.0

### Major Changes

- dc53b19: Bumps commercial core and CMP versions

### Minor Changes

- 4719724: Improve accessibility of Quiz atoms

## 24.0.0

### Major Changes

- 511780d: Bump Source versions and fix peer deps

## 23.11.0

### Minor Changes

- a54e806: YouTube player is passed client side participations for targeting

## 23.10.0

### Minor Changes

- 0f8547f: Full targeting for YouTubeAtomPlayer

## 23.9.0

### Minor Changes

- d79bf55: Full targeting for YouTube IMA integration

## 23.8.1

### Patch Changes

- 4cf9547: Fix YouTube IMA ad label

## 23.8.0

### Minor Changes

- ad472ee: Use buildImaTagUrl from commercial-core

### Patch Changes

- e4268d0: Upgrade TypeScript and Storybook

## 23.7.2

### Patch Changes

- 855a650: Bump `@guardian/libs@^9.0.1`

## 23.7.1

### Patch Changes

- 0e3fae1: Bump `@guardian/libs@^7.1.0`

## 23.7.0

### Minor Changes

- 57d3ff1: Add ad label to YouTube IMA integration

## 23.6.0

### Minor Changes

- 2572865: Integrate Interactive Media Ads to YoutubePlayer

## 23.5.0

### Minor Changes

- 8e7e15c: Fixes an accessibility problem with the legend element & Adds support for image alts on quizes

## 23.4.0

### Minor Changes

- b01c028: YoutubeAtom - Pause video rather than stop

### Patch Changes

- 9931bf5: YoutubeAtomPlayer removes YouTube event listeners before unmount
- 67d04bb: Fix potential race in loadYouTubeAPI

## 23.3.1

### Patch Changes

- 39dd4f4: Update readme with correct name for changesets auto generated PR

## 23.3.0

### Minor Changes

- e440d44: Remove youtube-player library

## 23.2.2

### Patch Changes

- 317ecad: Don't display a 0 if we're unable to get the duration of a youtube video.

## 23.2.1

### Patch Changes

- 9a0c753: Adding improved labels to like & dislike button for Q&A atom

## 23.2.0

### Minor Changes

- 9b5f618: Adds a barebones recipe schema atom

## 23.1.2

### Patch Changes

- eb92aa7: Move isMobile dependency

## 23.1.1

### Patch Changes

- fe87e3d: Add storybook viewport addon
- 3bcfe75: Add transparent overlay for touch events on mobile
- 608d633: Add missing tablet flag to isMobile check in YoutubeAtomSticky
- 3295bcf: Remove pause and resume events from playerState

## 23.1.0

### Minor Changes

- 2fb4e42: Upgrade Source and ESlint
- 803d814: Move 'stick' and 'close' component tracking into YoutubeAtomSticky

## 23.0.2

### Patch Changes

- f5351c5: Bump prettier version and fix prettier errors
- 897234b: fix dispatch play event on duplicate videos

## 23.0.1

### Patch Changes

- c33ed2f: Handle multiple videos

## 23.0.0

### Major Changes

- 30fa8f2: YoutubeAtom duplicate video fix

## 22.6.3

### Patch Changes

- 2f7a06a: Untsick YoutubeAtom on pause event
- b401b29: fix: content jump on sticky video close

## 22.6.2

### Patch Changes

- 6e01504: Make YoutubeAtom controls keyboard accesible
- db94fa1: Add title to YoutubeAtom iframe and aria-label
- 934cc67: Close sticky video on ESC key press
- a988893: Add isMainMedia prop to YoutubeAtom

## 22.6.1

### Patch Changes

- 987e88d: Fix rerender bug when sticking and unsticking

## 22.6.0

### Minor Changes

- 2c6217d: Add sticky videos to YoutubeAtom

## 22.5.3

### Patch Changes

- 442a8a3: Test

## 22.5.2

### Patch Changes

- 2860c90: Test

## 22.5.1

### Patch Changes

- ee8cab5: Just a test
