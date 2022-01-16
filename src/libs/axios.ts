import axios, { AxiosInstance } from 'axios'
import { API_GATEWAY, API_SECRET_KEY, APP_AUTH, AUTH_ADDRESS, AUTH_PASSPORT, USER_ADDRESS } from '@/libs/configs'
import { getCookie } from '@/libs/cookies'
import { resAudit } from '@/utils'

/**
 * Create axios instance.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: API_GATEWAY,
  headers: {
    'Api-Secret-Key': API_SECRET_KEY,
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
Axios.interceptors.request.use((requestConfig) => {
  if (requestConfig.headers) {
    const passportToken = getCookie(APP_AUTH)
    if (passportToken) {
      requestConfig.headers[AUTH_PASSPORT] = `bearer ${passportToken}`
    }

    const userAddress = getCookie(USER_ADDRESS)
    if (userAddress) {
      requestConfig.headers[AUTH_ADDRESS] = userAddress
    }
  }

  return requestConfig
})

/**
 * allows changes to the response data to be made before
 * it is passed to then/catch
 */
Axios.interceptors.response.use(
  (res) => res,
  (err) => {
    return new Promise((resolve) => {
      resAudit(err).then(resolve)
    })
  }
)

export default Axios
