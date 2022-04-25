import { resolve } from 'path'

export default {
  eslint: {
    enable: false
  },

  style: {
    css: {
      loaderOptions: {
        url: false
      }
    },
    scss: {
      loaderOptions: {
        url: false
      }
    }
  },

  webpack: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@Styles': resolve(__dirname, 'src/Styles')
    }
  }
}
