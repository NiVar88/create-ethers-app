import { configs } from '@/Constants'
import { BaseService } from '@/Services/base.service'
import { dispatch, userActions } from '@/Store'
import { getCookie, setCookie, removeCookie, attrCookie, generateId, notice } from '@/Utils'
import { GivenConnector, GivenProvider } from '@/Utils/web3'
import { Connectors, IUser } from '@/Types'
import { formatISO } from 'date-fns'
import JWT from 'jsonwebtoken'

export class AuthService extends BaseService {
  /**
   * Signin.
   *
   * @param {string} address
   */
  static async signin(address: string): Promise<void> {
    // const nonce = await this.getNonce(address)
    const signature = await this.getSignature(`Sign-In: ${generateId()}`, address)

    if (signature) {
      // const responce = await this.$axios.post('/auth/verifySignature', { address, signature })
      // if (responce) {
      // const { accessToken, refreshToken } = responce.data

      setCookie(configs.APP_USER_ADDRESS, address)
      setCookie(configs.APP_AUTH_ACCESS, JWT.sign({ uid: 1 }, 'S3C23T', { expiresIn: '1h' }))
      setCookie(configs.APP_AUTH_REFRESH, JWT.sign({ uid: 1 }, 'S3C23T', { expiresIn: '7 days' }))

      await this.getProfile(address)
      notice.success({
        title: 'Success',
        content: 'Your wallet connected.'
      })
      // }
    } else {
      notice.warn({
        title: 'Failed',
        content: 'User rejected the request.'
      })
    }
  }

  /**
   * GET nonce.
   *
   * @param {string} address Wallet Address
   */
  static async getNonce(address: string): Promise<any> {
    const response = await this.$axios.get<{ nonce: number }>(`/auth/nonce/${address}`)
    if (response.data) {
      return response.data.nonce
    }

    return void 0
  }

  /**
   * GET signature
   *
   * @param {string} dataToSign
   * @param {string} address
   */
  static async getSignature(dataToSign: string, address: string) {
    const connector = GivenConnector()

    if (!connector) return void 0

    let signature: string = ''

    switch (connector) {
      case Connectors.BSC:
        const { BinanceChain } = window
        const results = await BinanceChain!.bnbSign(address, dataToSign)
        signature = results.signature
        break

      default:
        const provider = GivenProvider()
        signature = await provider.personal.sign(dataToSign, address, '')
        break
    }

    return signature
  }

  /**
   * GET user profile.
   *
   * @param {string} address Wallet Address
   */
  static async getProfile(address?: string): Promise<void> {
    const _address = address || getCookie(configs.APP_USER_ADDRESS)
    // const user = await this.get<IUser>('/auth/me', { params: { address: _address } })

    dispatch(
      userActions.setProfile({
        uid: 1,
        role: 'guest',
        avatar: 'https://picsum.photos/320',
        address: _address,
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

    // Remove all for sure.
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      // prettier-ignore
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    }

    if (redirectTo) location.href = redirectTo
    else {
      dispatch(userActions.setProfile(null))
    }
  }
}
