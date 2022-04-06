export const configs = {
  isBrowser: typeof window !== 'undefined',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelop: process.env.NODE_ENV === 'development',

  APP_MODE: process.env.NODE_ENV,
  APP_NAME: process.env.REACT_APP_NAME || 'project_alice',
  APP_BASE_URL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',
  APP_API_GATEWAY: process.env.REACT_APP_API_GATEWAY || 'http://localhost:3030',

  // STORAGE KEY-NAME
  APP_LANG: 'APP.Language',
  APP_THEME: 'APP.Theme',
  APP_AUTH_ACCESS: 'APP.AccessToken',
  APP_AUTH_REFRESH: 'APP.RefreshToken',

  // REQUEST HEADERS
  AUTH_ACCESS: 'Authorization',
  AUTH_ADDRESS: 'User-Address',
  CONTENT_LANG: 'Content-Language',
  XSRF_TOKEN: 'XSRF-TOKEN',
  X_CSRF_TOKEN: 'X-CSRF-TOKEN'
}
