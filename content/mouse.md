---
date: 2025-03-28
title: 'Cursory Whimsy'
description: 'Adding whimisical mouse effects'
---

# {{ $doc.title }}

The internet, before it was 5 social media sites in a trenchcoat, used to be filled to the absolute brim with custom cursors. For a variety of reasons, too many website designs stay in narrow lanes and never bother with silly user interactions.


## Implementation

Pretty straightforward implemenation from [cursor-effects](https://github.com/tholman/cursor-effects)

```js
// helpers/mouse_effects.js
import { rainbowCursor, fairyDustCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";

const colors = [
  "#FE0000",
  "#FD8C00",
  "#FFE500",
  "#119F0B",
  "#0644B3",
  "#C22EDC",
];

export function mouseEffects() {
  new fairyDustCursor({ colors });
  new rainbowCursor({ colors });
}
```

then

```js
// app.vue or any page really
import { mouseEffects } from './helpers/mouse_effects.js';

mouseEffects();
```

Notably I am using the rainbow color pallete from the `rainbowCursor` defaults and sharing it between both cursors.

Since this project uses [vite](https://vite.dev), we can import the module directly from [unpkg](https://unpkg.com).

## Why not write it yourself?

I had a few toy implementations, but honestly, using a library handles some scenarios I hadn't even properly considered.

For instance:

> The cursor won't display if the user's system accessibility settings have [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) enabled.
> - [cursor-effects/readme.md](https://github.com/tholman/cursor-effects/blob/master/readme.md#accessibility)

Naturally, having a community supported FOSS implemenation results in a better outcome for everyone.