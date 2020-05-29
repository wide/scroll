import observe from '@wide/dom-observer'
import Rellax from 'rellax'


/**
 * Rellax default config
 * @type {Object}
 */
const RELLAX_CONFIG = {
  speed: 4,
  vertical: true,
  center: true
}


/**
 * Observe [data-parallax] and [data-parallax.x] in DOM to add effect
 */
observe('[data-parallax], [data-parallax\\.x]', {
  bind: el => el.__parallax = parallax(el, {
    speed: el.dataset['parallax.x'] || el.dataset.parallax,
    horizontal: el.hasAttribute('data-parallax.x')
  }),
  unbind: el => el.__parallax.destroy()
})


/**
 * Re-export Rellax as default parallax
 * @param {HTMLElement} el
 * @param {Object} options
 * @return {Rellax}
 */
export default function parallax(el, options = {}) {
  const opts = Object.assign({}, RELLAX_CONFIG, options)
  opts.speed = parseFloat(opts.speed)
  return new Rellax(el, opts)
}