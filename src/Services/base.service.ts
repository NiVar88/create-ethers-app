import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { addMinutes, addDays, getUnixTime } from 'date-fns'
import { configs } from '@/Constants'
import { getCookie, setCookie, cookieOptions } from '@/Utils'

export class BaseService {
  static axios: AxiosInstance = axios.create({
    baseURL: configs.APP_API_GATEWAY,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE'
    }
  })

  static async verify(): Promise<boolean> {
    const v = await JWT.audit(configs.APP_AUTH_ACCESS)
    if (!v) {
      const r = await this.refresh()
      if (!r) return false
    }

    return true
  }

  static async get(url: string, config?: AxiosRequestConfig) {
    const v = await this.verify()
    if (!v) return void 0

    const r = this.axios.get(url, config)
    return r
  }

  static async refresh() {
    const v = await JWT.audit(configs.APP_AUTH_REFRESH)

    if (v) {
      const refreshToken = getCookie(configs.APP_AUTH_REFRESH)
      const r = await this.axios.post('/auth/accessToken', { refreshToken })

      if (r) {
        this.axios.interceptors.request.use((requestConfig) => {
          if (requestConfig.headers) {
            requestConfig.headers[configs.AUTH_ACCESS] = `bearer ${r.data.accessToken}`
          }

          return requestConfig
        })

        setCookie(configs.APP_AUTH_ACCESS, r.data.accessToken, {
          ...cookieOptions,
          expires: addMinutes(new Date(), 90)
        })

        setCookie(configs.APP_AUTH_REFRESH, r.data.refreshToken, {
          ...cookieOptions,
          expires: addDays(new Date(), 6)
        })

        return true
      }
    }

    return void 0
  }
}

export class JWT {
  static async audit(cookieName: string) {
    const cookie = getCookie(cookieName)

    if (cookie) {
      const payload = this.decode<{ iat: number; exp: number }>(cookie)
      const now = getUnixTime(Date.now())

      if (now >= payload.exp) return false

      return payload
    }

    return false
  }

  static decode<T = any>(token: string): T {
    const [_, code] = token.split('.')
    const base64 = code.replace(/-/g, '+').replace(/_/g, '/')

    let payload = Buffer.from(base64, 'base64').toString()
    payload = decodeURIComponent(
      payload
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    )

    return JSON.parse(payload)
  }
}
