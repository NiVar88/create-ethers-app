const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    ...defaultConfig,
    distDir: 'dist',

    eslint: {
      ignoreDuringBuilds: true
    },

    reactStrictMode: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: false
  }

  if (phase === PHASE_PRODUCTION_SERVER) {
    nextConfig.env = {
      APP_WEB_TITLE: 'Alicization Project',
      APP_BASE_URL: 'https://app-dot-alice.as.r.appspot.com',
      APP_API_GATEWAY: 'https://api.alice.com',
      APP_CHAIN_ID: 56
    }
  } else if (phase === PHASE_DEVELOPMENT_SERVER) {
    nextConfig.env = {
      APP_WEB_TITLE: 'Alicization Project',
      APP_BASE_URL: 'https://testnet-dot-alice.an.r.appspot.com',
      APP_API_GATEWAY: 'https://api.alice-dev.com',
      APP_CHAIN_ID: 97
    }
  }

  return nextConfig
}
