# Scroll

Observe scroll progression and provides helpers for parallax, locking and sticky effects.
- [Usage](#usage)
- [Events](#events)
- [Scroll to](#scroll-to)
- [Locker](#locker)
- [Parallax](#parallax)
- [Sticky](#sticky)


## Install

```
npm install @wide/scroll --save
```


## Usage

Internally use [`uos`](https://www.npmjs.com/package/uos) library.

Initialize scroll observer:
```js
import '@wide/scroll'
```


## Events

3 events `scroll`, `scroll.up` or `scroll.down` will be triggerd on each scroll step:
```js
import emitter from '@wide/emitter'

emitter.on('scroll', e => {
  e.value // progress in px
  e.progress // progress in %
  e.up // scrolling up
  e.down // scrolling down
})

emitter.on('scroll.up', e => {
  e.value // progress in px
  e.progress // progress in %
})

// or without emitter
document.onEvent('scroll.up', e => {})
```

Listen a specific range progression:
```js
import { range } from '@wide/scroll'

range(300, 600, val => console.log(val)) // progress between 300px and 600px
```


## Scroll to

Internally use [`jump.js`](https://www.npmjs.com/package/jump.js) library.

Listen jump link `[data-scrollto]` elements:
```html
<div data-scrollto="#top">content</div>
```

Jump programmaticaly to an element:
```js
import { scrollTo } from '@wide/scroll'

scrollTo('.something')
```

You can define global config applying to all links:
```js
import { JUMP_CONFIG } from '@wide/scroll'

JUMP_CONFIG.offset = -20 // top offset for all jump
```

You can aslo define config locally by adding HTML attributes:
```html
<button
  data-scrollto="#footer"
  data-scrollto.duration="1010"
  data-scrollto.offset="0"
  data-scrollto.a11y="false"
  data-scrollto.callback="scrollToCallback"
  data-scrollto.easing="scrollToEasing"
>
  Scroll to footer
</button>
```
```js
window.scrollToCallback = () => {
  // Do some stuffs when scroll has been completed
}

window.scrollToEasing = () => {
  // My custom easing animation code
}
```

> Note: Those parameters will override default (global) parameters.

### Parameters
| Name | Type | Description | Default value |
|---|---|---|---|
| `duration` | `number` | Pass the time the `scrollto()` takes, in milliseconds. | `800` |
| `offset` | `number` | Offset a `scrollto()`, only if to an element, by a number of pixels. | `-80` |
| `a11y` | `boolean` | If enabled, and scrolling to an element: add a tabindex to, and focus the element | `true` |
| `callback` | `function` | Pass a function that will be called after the `scrollto()` has been completed. | `null` |
| `easing` | `function` | Easing function used to transition the `scrollto()`. | `null` |

More informations on [`Jump.js` documentation](https://github.com/callmecavs/jump.js#options).

## Locker

Internally use [`body-scroll-lock`](https://www.npmjs.com/package/body-scroll-lock) library.

Lock page scroll, usefull when using a modal:
```js
import { lock } from '@wide/scroll/lib/locker'

lock(el) // pass an element to NOT lock, like the modal itself
```

And then unlock it:
```js
import { unlock } from '@wide/scroll/lib/locker'

unlock()
```

These methods can be called through the event dispatcher:
```js
import '@wide/scroll/lib/locker'
import { emit } from '@wide/emitter'

emit('scroll.lock', el)
emit('scroll.unlock')
```


## Parallax

Internally use [`rellax`](https://www.npmjs.com/package/rellax) library.

Add parallax effect to `[data-parallax]` elements:
```js
import '@wide/scroll/lib/parallax'
```
```html
<div data-parallax>content</div>
```

Or for an horizontal effect:
```html
<div data-parallax.x>content</div>
```

The moving speed can be customized (from `-10` to `10`):
```html
<div data-parallax="4">content</div>
```

Add programmaticaly parallax effect to an element (see [rellax docs](https://www.npmjs.com/package/rellax) for all params):
```js
import parallax from '@wide/scroll/lib/parallax'

const el = document.querySelector('.something')
parallax(el, { speed: .4 })
```

## Sticky

Internally use [`stickybits`](https://www.npmjs.com/package/stickybits) library.

Add sticky behavior to `[data-sticky]` elements:
```js
import '@wide/scroll/lib/sticky'
```
```html
<div data-sticky>content</div>
```

The offset can be customized:
- `[data-parallax.offset="20"]` to set top offset (default `0`)

Add programmaticaly sticky effect to element:
```js
import sticky from '@wide/scroll/lib/sticky'

const el = document.querySelector('.something')
sticky(el, { offset: 20 })
```


## Libraries

This package uses :
- [`uos`](https://www.npmjs.com/package/uos)
- [`jump.js`](https://www.npmjs.com/package/jump.js)
- [`body-scroll-lock`](https://www.npmjs.com/package/body-scroll-lock)
- [`rellax`](https://www.npmjs.com/package/rellax)
- [`stickybits`](https://www.npmjs.com/package/stickybits)


## Authors

- **Aymeric Assier** - [github.com/myeti](https://github.com/myeti)
- **Julien Martins Da Costa** - [github.com/jdacosta](https://github.com/jdacosta)


## License

This project is licensed under the MIT License - see the [licence](licence) file for details