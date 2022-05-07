import { getUnixTime, isAfter as isExpired } from 'date-fns'
import { getCookie } from '@/Utils'

interface Payload {
  iat: number
  exp: number
}

export class JWT {
  static async audit<T extends Payload>(cookieName: string): Promise<T | Void> {
    const cookie = getCookie(cookieName)

    if (cookie) {
      const payload = this.decode<T>(cookie)
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
