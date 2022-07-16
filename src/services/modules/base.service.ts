import { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios'
import { configs } from '@/constants'
import { cookie } from '@/utils'
import Axios, { CancelToken } from '@/utils/axios'
import type { IRespToken } from '@/types'
import { JWT } from './jwt.service'

export class BaseService {
  static $axios: AxiosInstance = Axios
  static $source: CancelTokenSource = CancelToken.source()

  static async get<D = any>(url: string, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.get<D>(url, {
          ...config,
          cancelToken: this.$source.token
        })

        return response.data
      } catch (error) {
        console.log(error)
        return void 0
      }
    }
  }

  static async post<D = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.post<D>(url, data, {
          ...config,
          cancelToken: this.$source.token
        })

        return response.data
      } catch (error) {
        console.log(error)
        return void 0
      }
    }
  }

  static async put<D = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.put<D>(url, data, {
          ...config,
          cancelToken: this.$source.token
        })

        return response.data
      } catch (error) {
        console.log(error)
        return void 0
      }
    }
  }

  static async patch<D = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.patch<D>(url, data, {
          ...config,
          cancelToken: this.$source.token
        })

        return response.data
      } catch (error) {
        console.log(error)
        return void 0
      }
    }
  }

  static async delete<D = any>(url: string, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.delete<D>(url, {
          ...config,
          cancelToken: this.$source.token
        })

        return response.data
      } catch (error) {
        console.log(error)
        return void 0
      }
    }
  }

  static async verify(): Promise<boolean> {
    const v = JWT.audit(configs.APP_AUTH_ACCESS)
    if (!v) {
      const r = await this.refresh()
      if (!r) {
        alert('HTTP/1.1 401 Unauthorized')
        return false
      }
    }

    return true
  }

  static async refresh(): Promise<boolean> {
    const v = JWT.audit(configs.APP_AUTH_REFRESH)

    if (v) {
      const refreshToken = cookie.get(configs.APP_AUTH_REFRESH)
      const response = await this.$axios.post<IRespToken>('/auth/refreshToken', {
        refreshToken
      })

      if (response) {
        this.setCookies(response.data)
        return true
      }
    }

    return false
  }

  static async setCookies({ accessToken, refreshToken }: IRespToken) {
    cookie.set(configs.APP_AUTH_ACCESS, accessToken.payload, cookie.attrs({ expires: new Date(accessToken.expiresAt) }))
    cookie.set(
      configs.APP_AUTH_REFRESH,
      refreshToken.payload,
      cookie.attrs({ expires: new Date(refreshToken.expiresAt) })
    )
  }

  static cancelRequest() {
    return this.$source.cancel()
  }
}
