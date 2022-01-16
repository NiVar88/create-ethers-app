import { formatISO } from 'date-fns'
import { GivenProvider } from '@/contracts'
import { APP_AUTH, APP_CONNECTOR, USER_ADDRESS, USER_INFO } from '@/libs/configs'
import { getCookie, setCookie, removeCookie, cookieOptions } from '@/libs/cookies'
import { dispatch, userActions } from '@/store'
import { modal, notice } from '@/utils'
import Web3Token from 'web3-token'

export class authService {
  /**
   * Signin.
   */
  static async signin() {
    const { personal, getCoinbase } = GivenProvider()

    const address = await getCoinbase()
    const signature = await Web3Token.sign((body: string) => personal.sign(body, address, ''), '7d')

    if (signature) {
      await this.setAuthCookies(address, signature)
      await this.getProfile(address)
      notice.success({
        title: 'Wallet Connected',
        content: 'connecting success'
      })
    } else {
      notice.warn({
        title: 'Failed',
        content: 'User rejected the request.'
      })
    }
  }

  /**
   * GET user profile.
   *
   * @param {string} address Wallet Address
   */
  static async getProfile(address?: string) {
    const _address = address || getCookie(USER_ADDRESS)
    dispatch(userActions.setAuthenticated(_address))
    dispatch(
      userActions.setProfile({
        uid: _address,
        role: 'guest',
        avatar: 'https://picsum.photos/320',
        name: 'unnamed',
        createdAt: formatISO(Date.now()),
        updatedAt: formatISO(Date.now())
      })
    )
  }

  /**
   * GET refresh token.
   *
   * @param {string} address Wallet Address
   */
  static async refreshToken() {
    return void 0
  }

  /**
   * SET auth cookies.
   *
   * @param {string} address Wallet Address
   * @param {string} signature Web3 Token Signature
   */
  static async setAuthCookies(address: string, signature: string) {
    const options = cookieOptions()

    setCookie(APP_AUTH, signature, options)
    setCookie(USER_ADDRESS, address, options)
  }

  /**
   * Signout.
   */
  static async signout(redirectTo?: string) {
    const options = cookieOptions()

    removeCookie(APP_AUTH, options)
    removeCookie(APP_CONNECTOR, options)
    removeCookie(USER_ADDRESS, options)
    removeCookie(USER_INFO, options)

    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      // prettier-ignore
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    }

    if (redirectTo) location.href = redirectTo
    else {
      modal.off()
      dispatch(userActions.setAuthenticated(null))
      dispatch(userActions.setProfile(null))
    }
  }
}
