import { resolve } from 'path'

export default {
  eslint: {
    enable: false
  },

  webpack: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  }
}
