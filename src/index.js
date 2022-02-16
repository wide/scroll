import observe from '@wide/dom-observer'
import { emit } from '@wide/emitter'
import jump from 'jump.js'
import uos from 'uos'


/**
 * Data attribute keyword
 * @type {string}
 */
const dataKeyword = 'scrollto'


/**
 * Data attribute option separator
 * @type {string}
 */
const dataSeparator = '.'


/**
 * Jump default config
 * @type {Object}
 * 
 * @tutorial https://github.com/callmecavs/jump.js/blob/master/src/jump.js#L88
 */
export const JUMP_CONFIG = {
  duration: 800,
  offset: -80,
  a11y: true,
  callback: null, // Global function
  easing: null // Global function
}


/**
 * Jump config variables type
 * @type {Object}
 * 
 * @tutorial https://github.com/callmecavs/jump.js/blob/master/src/jump.js#L88
 */
export const JUMP_CONFIG_TYPE = {
  duration: 'number',
  offset: 'number',
  a11y: 'boolean',
  callback: 'function',
  easing: 'function'
}


/**
 * Observe element [data-scrollto] in DOM to add effect
 */
observe(`[data-${dataKeyword}]`, {
  bind: el => el.addEventListener('click', () => {
    if (el.dataset[dataKeyword]) {
      scrollTo(document.querySelector(el.dataset.scrollto), getOptions(el.dataset))
    }
  })
})


/**
 * Smooth scroll to an element
 * @param {HTMLElement} target 
 * @param {Object} options 
 */
export function scrollTo(target, options = {}) {
  if (target) {
    const opts = Object.assign({}, JUMP_CONFIG, options)
    jump(target, opts)
  }
}


/**
 * Get options from dataset
 * @param {DOMStringMap} dataset 
 * @return {Object} Jump options
 */
export function getOptions(dataset) {
  const options = {}

  if (dataset && typeof dataset === 'object') {
    for (const [dataName, dataValue] of Object.entries(dataset)) {
      const optionName = getOptionName(dataName)

      if (optionName) {
        const optionValue = getOptionValue(optionName, dataValue)

        if (optionValue !== null) {
          options[optionName] = optionValue
        }
      }
    }
  }

  return options
}


/**
 * Get option name from dataset name
 * @param {string} dataName 
 * @return {string|null} Jump option name
 */
export function getOptionName(dataName) {
  const dataKeywordSeparator = dataKeyword + dataSeparator

  // If an option is setted...
  if (dataName.startsWith(dataKeywordSeparator)) {
    const dataOptionName = dataName.slice(dataKeywordSeparator.length)

    // ...and exists in jump.js, add it
    return Object.hasOwn(JUMP_CONFIG, dataOptionName) ? dataOptionName : ''
  }

  return null
}


/**
 * Get option value from dataset string value
 * @param {string} optionName 
 * @param {string} optionValue 
 * @return {any} Value formatted
 */
export function getOptionValue(optionName, optionValue) {
  switch (JUMP_CONFIG_TYPE[optionName]) {
    case 'boolean':
      return optionValue === 'true'
    case 'function':
      return window[optionValue] || null
    case 'number':
      return optionValue * 1
    default:
      return optionValue
  }
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