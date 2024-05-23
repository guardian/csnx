# @guardian/source

## 1.0.1

### Patch Changes

- be759ac: Improve README

## 0.3.0

### Minor Changes

- e60f79e: third attempt

## 1.0.0

### Major Changes

#### First production release of single Source package.

Combining `@guardian/source-foundations@16.0.0` and `@guardian/source-react-components@25.0.0` into single package.

#### Before

```
import { palette } from '@guardian/source-foundations'
import { Button } from '@guardian/source-react-components'
```

#### After

```
import { palette } from '@guardian/source/foundations'
import { Button } from '@guardian/source/react-components'
```

_There will be no more updates to the two separate packages. From now on, all updates to Source will come via this single package._
