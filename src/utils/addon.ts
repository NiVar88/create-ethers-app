import { authService } from '@/services/auth.service'
import { dialog } from './dialog'

/**
 * Convert address to short string.
 *
 * @param {string} address
 */
export function shortAddress(address?: string | null): string {
  if (address) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
  } else {
    return '...'
  }
}

/**
 * Provides a way to easily construct a set of key/value pairs representing form fields and their values,
 * which can then be easily sent using the XMLHttpRequest.send() method.
 *
 * @param {object} data FormData
 */
export function createFormData(data: { [key: string]: any }): [FormData, any] {
  const formData = new FormData()

  for (const name in data) {
    formData.append(name, data[name])
  }

  return [
    formData,
    {
      'Content-Type': 'multipart/form-data'
    }
  ]
}

/**
 * Axios response auditor.
 *
 * @param {object} payload
 */
export async function resAudit<Data = any>(payload: any): Promise<Data | void> {
  if (payload.isAxiosError) {
    let status = 'Network Error'
    let statusText = 'ERR_CONNECTION_REFUSED'

    if (payload.response) {
      status = payload.response.status
      statusText = payload.response.statusText || 'ERR_CONNECTION_REFUSED'
    }

    if (+status === 401) {
      authService.refreshToken()
      dialog('<p>Something was wrong!</p><small>Please try again.</small>')
    } else {
      dialog({
        title: 'XHR Error.',
        children: `<p>Something was wrong!</p><small>${status}: ${statusText}.</small>`
      })
    }

    return void 0
  } else {
    return payload.data
  }
}
