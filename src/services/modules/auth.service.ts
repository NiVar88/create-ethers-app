import { configs } from '@/constants'
import { dispatch, userActions } from '@/store'
import { cookie, notice, storage } from '@/utils'
import type { User, IRespNonce, IRespToken } from '@/types'
import { BaseService } from './base.service'

export class AuthService extends BaseService {
  /**
   * Signin.
   *
   * @param {string} address
   */
  static async signin(address: string, signature: string) {
    const resp = await this.$axios.post<IRespToken>('/auth/verifySignature', { address, signature })
    if (resp.data) {
      this.setCookies(resp.data)
      storage.set(configs.APP_USER_ADDRESS, address)

      await this.getProfile(address)
      notice.success({
        title: 'Success',
        content: 'Your wallet connected.'
      })
    }
  }

  /**
   * GET nonce.
   *
   * @param {string} address Wallet Address
   */
  static async getNonce(address: string) {
    const resp = await this.$axios.get<IRespNonce>('/auth/nonce', { params: { address } })
    if (resp.data) {
      return resp.data.nonce
    }
  }

  /**
   * GET user profile.
   *
   * @param {string} address Wallet Address
   */
  static async getProfile(address?: string) {
    const _address = address || storage.get(configs.APP_USER_ADDRESS)
    const response = await this.get<User>('/auth/me', { params: { address: _address } })
    if (response) {
      dispatch(userActions.setProfile(response))
    } else {
      dispatch(userActions.setProfile(null))
    }
  }

  /**
   * Signout.
   */
  static async signout(redirectTo?: string) {
    cookie.remove(configs.APP_AUTH_ACCESS)
    cookie.remove(configs.APP_AUTH_REFRESH)
    storage.remove(configs.APP_USER_CONNECTOR)
    storage.remove(configs.APP_USER_ADDRESS)
    storage.remove(configs.APP_USER_INFO)

    if (redirectTo) location.href = redirectTo
    else {
      dispatch(userActions.setProfile(null))
    }
  }
}
