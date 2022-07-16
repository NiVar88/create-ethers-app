import axios, { AxiosInstance } from 'axios'
import { configs } from '@/constants'
import { cookie, storage } from '@/utils/storage'

/**
 * Create axios instance.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: `${configs.isBrowser ? location.origin : configs.API_GATEWAY}/api`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE'
  }
})

/**
 * Axios also provides a request interceptor, allows changes to the request data before it is sent to the server
 * This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
 * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
 * FormData or Stream
 * You may modify the headers object.
 */
Axios.interceptors.request.use((reqConfig) => {
  if (reqConfig.headers) {
    const USER_ADDRESS = storage.get(configs.APP_USER_ADDRESS)
    if (USER_ADDRESS) {
      reqConfig.headers[configs.AUTH_ADDRESS] = USER_ADDRESS
    }

    const ACCESS_TOKEN = cookie.get(configs.APP_AUTH_ACCESS)
    if (ACCESS_TOKEN) {
      reqConfig.headers[configs.AUTH_ACCESS] = `bearer ${ACCESS_TOKEN}`
    }
  }

  return reqConfig
})

/**
 * allows changes to the response data to be made before
 * it is passed to then/catch
 */
// Axios.interceptors.response.use(
//   (res) => res,
//   (err) => err
// )

export default Axios
export const { CancelToken } = axios
