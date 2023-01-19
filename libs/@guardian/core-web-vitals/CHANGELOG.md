# @guardian/core-web-vitals

## 2.0.2

### Patch Changes

- d742b50: Bump @guardian/libs to 12.0.0

## 2.0.1

### Patch Changes

- a4aa0bd: Update docs

## 2.0.0

### Major Changes

- eb65fde: Add `typescript@^4.3.2` to `peerDependecies` (`optional`).

  This should mean you get a warning if you're using an incompatible version of typescript, but not if you aren't using it at all.

### Patch Changes

- Updated dependencies [eb65fde]
  - @guardian/libs@11.0.0

## 1.0.1

### Patch Changes

- 3882dc1: peer dependency on `@guardian/libs` is now restricted to current major version (`^10.0.0`, rather than `<=10.0.0`)

## 1.0.0

### Major Changes

- 481e7a6: Create `@guardian/core-web-vitals`.

  This is drop-in, identical functionality to the exports that were removed in `@guardian/libs` in `v10.0.0`.
