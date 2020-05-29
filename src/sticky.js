import observe from '@wide/dom-observer'
import stickybits from 'stickybits'


/**
 * Stickybits default config
 * @type {Object}
 */
const STICKY_CONFIG = {
  stickyBitStickyOffset: 0,
  useStickyClasses: true,
  parentClass: '-sticky-parent',
  stickyClass: '-sticky',
  stuckClass: '-sticky-stuck',
  stickyChangeClass: '-sticky'
}


/**
 * Observe element [data-sticky] in DOM to add effect
 */
observe('[data-sticky]', {
  bind: el => {
    const offset = parseInt(el.dataset['sticky.offset']) || 0
    el.__sticky = sticky(el, { stickyBitStickyOffset: offset })
  },
  unbind: el => el.__sticky.cleanup()
})


/**
 * Add sticky position to element
 * @param {HTMLElement} el
 * @param {Object} options
 */
export default function sticky(el, options = {}) {
  const opts = Object.assign({}, STICKY_CONFIG, options)
  return stickybits(el, opts)
}