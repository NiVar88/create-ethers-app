import { resolve } from 'path'

export default {
  eslint: {
    enable: false
  },

  style: {
    css: {
      loaderOptions: () => ({
        url: false
      })
    }
  },

  webpack: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  }
}
