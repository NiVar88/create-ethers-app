import dynamic from 'next/dynamic'

export { NextLink } from './next-link'
export { FooterComponent } from './footer'
export { HeaderComponent } from './header'
export { MediaComponent } from './media'

export { AvatarComponent as AvatarEditor } from './avatar'
export { ConnectWallet } from './connect-wallet'

// Pages Component's
export * as Profile from './_pages/profile'

// Without SSR
export const AppProvider = {
  Authorize: dynamic(() => import('./authorize'), { ssr: false }),
  Dialog: dynamic(() => import('./base/dialog'), { ssr: false }),
  Loader: dynamic(() => import('./base/loader'), { ssr: false }),
  Modal: dynamic(() => import('./base/modal'), { ssr: false }),
  Notice: dynamic(() => import('./base/notice'), { ssr: false })
}
