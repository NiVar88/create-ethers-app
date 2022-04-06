/**
 * Local Storege Manager.
 */
export class storage {
  static get(key: string): string | null | void {
    if (localStorage.getItem(key)) {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        localStorage.removeItem(key)
        throw error
      }
    }
  }

  static set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  static remove(key: string): void {
    localStorage.removeItem(key)
  }
}

/**
 * Session Storege Manager.
 */
export class session {
  static get(key: string): string | null | void {
    if (sessionStorage.getItem(key)) {
      try {
        return sessionStorage.getItem(key)
      } catch (error) {
        sessionStorage.removeItem(key)
        throw error
      }
    }
  }

  static set(key: string, value: string): void {
    sessionStorage.setItem(key, value)
  }

  static remove(key: string): void {
    sessionStorage.removeItem(key)
  }
}
