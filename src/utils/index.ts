export * from './addon'
export * from './connectors'
export { defineProperty } from './defineProperty'
export { dialog } from './dialog'
export { Fraction } from './fraction'
export { getBNBBalance } from './getBNBBalance'
export { logger } from './logger'
export { modal } from './modal'
export { setNetwork, registerToken } from './network'
export { notice } from './notice'
export { storage, session } from './storage'

export function addEventListener(type: keyof WindowEventMap | string, listener: Function | any): void {
  window.addEventListener(type, listener, true)
}

export function removeEventListener(type: keyof WindowEventMap | string, listener: Function | any): void {
  window.removeEventListener(type, listener, true)
}

export function isIE(): boolean {
  return new RegExp('MSIE|Trident').test(navigator.userAgent)
}

export function isEqual(a: any, b: any): boolean {
  return a === b || Object.is(a, b)
}

export function generateId(): string {
  return Math.random().toString(16).slice(2)
}

export function keyCode(): string {
  return `${1e8}-${1e4}-${1e4}-${1e4}-${1e12}`.replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

/**
 * Hidden overflow scroll.
 *
 * @param {boolean} input
 */
export function scrollOff(input: boolean = true): void {
  document.body.style.overflow = input ? 'hidden' : 'auto'
}

/**
 * Convert long number into abbreviated string.
 *
 * @param {number} input
 */
export function abbreviateNumber(input: number): number | string {
  if (input < 1e3) return input.toLocaleString()

  const suffixes = ['', 'k', 'm', 'b', 't', 'p', 'e']
  let value = input
  let suffixNum = 0
  while (value >= 1000) {
    value /= 1000
    suffixNum++
  }

  return value.toFixed(2) + suffixes[suffixNum]
}

/**
 * clone.
 *
 * @param {object|array} input
 */
export function clone(input: any) {
  return JSON.parse(JSON.stringify(input))
}

/**
 * Convert to Upper Case.
 *
 * @param {string} input
 */
export function upperCase(input: string): string {
  return input.toUpperCase()
}

/**
 * Convert to Lower Case.
 *
 * @param {string} input
 */
export function lowerCase(input: string): string {
  return input.toLowerCase()
}

/**
 * Convert to Capitalize.
 *
 * @param {string} input
 */
export function capitalize(input: string): string {
  const array = input.split(/[ ]+/)
  return array
    .map((word) => {
      return `${upperCase(word.charAt(0))}${word.slice(1)}`
    })
    .join(' ')
}

/**
 * Calculate timing start to end.
 */
export function differenceTiming() {
  const start = Date.now()

  return () => {
    const seconds = Date.now() - start
    switch (true) {
      case seconds / 1e3 > 60:
        return `~ ${(seconds / 1e3 / 60).toFixed(3)}m`

      case seconds > 1:
        return `~ ${(seconds / 1e3).toFixed(3)}s`

      default:
        return `~ ${seconds}ms`
    }
  }
}
