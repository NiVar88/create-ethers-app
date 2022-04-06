import JSCookies, { CookieAttributes } from 'js-cookie'

export const cookies = JSCookies
export const cookieOptions: CookieAttributes = {
  domain: location.hostname,
  sameSite: 'strict',
  secure: true
}

export function getCookie(name: string, json?: boolean) {
  const results = JSCookies.get(name)
  return json && results ? JSON.parse(results) : results
}

export function setCookie(name: string, value: string | object, options?: CookieAttributes) {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }

  return JSCookies.set(name, value, options)
}

export function removeCookie(name: string, options?: CookieAttributes) {
  return JSCookies.remove(name, options)
}
