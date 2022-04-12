import { configs } from '@/Constants'
import { BaseService } from '@/Services/base.service'
import { dispatch, userActions } from '@/Store'
import { getCookie, removeCookie, attrCookie } from '@/Utils'
import { IUser } from '@/Types'
import { formatISO } from 'date-fns'

export class AuthService extends BaseService {
  /**
   * Signin.
   *
   * @param {string} address
   */
  static async signin(address: string): Promise<any> {
    return ''
  }

  /**
   * GET user profile.
   *
   * @param {string} address Wallet Address
   */
  static async getProfile(address?: string): Promise<void> {
    const _address = address || getCookie(configs.APP_USER_ADDRESS)
    // const user = await this.get<IUser>('/auth/me', { params: { address: _address } })

    dispatch(userActions.setAuthenticated(_address))
    dispatch(
      userActions.setProfile({
        uid: 1,
        role: 'guest',
        avatar: 'https://picsum.photos/320',
        name: 'unnamed',
        createdAt: formatISO(new Date()),
        updatedAt: formatISO(new Date())
      })
    )
  }

  /**
   * Signout.
   */
  static async signout(redirectTo?: string): Promise<void> {
    removeCookie(configs.APP_AUTH_ACCESS, attrCookie())
    removeCookie(configs.APP_AUTH_REFRESH, attrCookie())
    removeCookie(configs.APP_USER_ADDRESS, attrCookie())
    removeCookie(configs.APP_USER_CONNECTOR, attrCookie())
    removeCookie(configs.APP_USER_INFO, attrCookie())

    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      // prettier-ignore
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    }

    if (redirectTo) location.href = redirectTo
    else {
      dispatch(userActions.setAuthenticated(null))
      dispatch(userActions.setProfile(null))
    }
  }
}
