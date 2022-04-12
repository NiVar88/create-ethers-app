import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { addDays } from 'date-fns'
import { configs } from '@/Constants'
import { JWT } from '@/Services/jwt.service'
import { getCookie, setCookie, attrCookie } from '@/Utils'
import Axios from '@/Utils/axios'

export class BaseService {
  static $axios: AxiosInstance = Axios

  static async get<D = any>(url: string, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.get<D>(url, config)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  }

  static async post<D = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.post<D>(url, data, config)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  }

  static async put<D = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.put<D>(url, data, config)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  }

  static async patch<D = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.patch<D>(url, data, config)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  }

  static async delete<D = any>(url: string, config?: AxiosRequestConfig): Promise<D | void> {
    const v = await this.verify()
    if (v) {
      try {
        const response = await this.$axios.delete<D>(url, config)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  }

  static async verify(): Promise<boolean> {
    const v = await JWT.audit(configs.APP_AUTH_ACCESS)
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
    const v = await JWT.audit(configs.APP_AUTH_REFRESH)

    if (v) {
      const refreshToken = getCookie(configs.APP_AUTH_REFRESH)
      const response = await this.$axios.post<{ accessToken: string; refreshToken: string }>('/auth/refreshToken', {
        refreshToken
      })

      if (response) {
        const { accessToken, refreshToken } = response.data

        setCookie(configs.APP_AUTH_ACCESS, accessToken, attrCookie())

        setCookie(
          configs.APP_AUTH_REFRESH,
          refreshToken,
          attrCookie({
            expires: addDays(new Date(), 6)
          })
        )

        return true
      }
    }

    return false
  }
}
