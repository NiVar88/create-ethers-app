import { resolve } from 'path'

export default {
  eslint: {
    enable: false
  },

  webpack: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@Styles': resolve(__dirname, 'src/Styles')
    }
  }
}
