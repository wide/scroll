import observe from '@wide/dom-observer'
import { emit } from '@wide/emitter'
import jump from 'jump.js'
import uos from 'uos'


/**
 * Jump default config
 * @type {Object}
 */
export let JUMP_CONFIG = {
  duration: 800,
  offset: -80,
  a11y: true
}


/**
 * Observe element [data-scrollto] in DOM to add effect
 */
observe('[data-scrollto]', {
  bind: el => el.addEventListener('click', e => to(e.dataset.scrollto))
})


/**
 * Smooth scroll to an element
 * @param {HTMLElement} target 
 * @param {Object} options 
 */
export function scrollTo(target, options = {}) {
  const opts = Object.assign({}, JUMP_CONFIG, options)
  jump(target, opts)
}


/**
 * Expose range progress handler
 * @param {Number} from
 * @param {Number} to
 * @param {Function} handler
 */
export function range(from, to, handler) {
  return uos(from, to, handler)
}


/**
 * Expose scroll values
 * @type {Object}
 */
const scroll = {
  up: false,
  down: true,
  value: 0,
  progress: 0
}

export default scroll


/**
 * Observe scroll and compute state
 */
let lastScrollY = 0
range(0, 100, progress => {
  scroll.up = (window.scrollY < lastScrollY)
  scroll.down = !scroll.up
  scroll.value = window.scrollY
  scroll.progress = progress
  emit('scroll', scroll)
  emit(scroll.up ? 'scroll.up' : 'scroll.down', scroll)
  lastScrollY = window.scrollY
})