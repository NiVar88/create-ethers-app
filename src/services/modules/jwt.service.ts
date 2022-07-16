import { getUnixTime, isAfter as isExpired } from 'date-fns'
import { cookie } from '@/utils'

interface Payload {
  iat: number
  exp: number
}

export class JWT {
  static audit<T extends Payload>(cookieName: string): T | void {
    const _cookie = cookie.get(cookieName)

    if (_cookie) {
      const payload = this.decode<T>(_cookie)
      const now = getUnixTime(new Date())

      if (isExpired(now, payload.exp)) return void 0

      return payload
    }

    return void 0
  }

  static decode<T>(token: string): T {
    const [_, code] = token.split('.')
    const base64 = code.replace(/-/g, '+').replace(/_/g, '/')
    const payload = decodeURIComponent(window.atob(base64))

    return JSON.parse(payload)
  }
}
