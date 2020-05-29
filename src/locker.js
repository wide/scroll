import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { on } from '@wide/emitter'


/**
 * Listen global events to lock/unlock
 */
on('scroll.lock', el => lock(el))
on('scroll.unlock', () => unlock())


/**
 * Lock scroll
 * @param {HTMLElement} el 
 */
export function lock(el) {
  document.body.classList.add('-locked')
  document.documentElement.style.overflowY = 'hidden'
  disableBodyScroll(el)
}


/**
 * Unlock scroll
 * @param {HTMLElement} el 
 */
export function unlock() {
  document.body.classList.remove('-locked')
  document.documentElement.style.overflowY = 'scroll'
  clearAllBodyScrollLocks()
}


/**
 * Export all
 */
export default { lock, unlock }