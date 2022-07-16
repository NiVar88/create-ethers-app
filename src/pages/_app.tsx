import HTMLHead from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { AppProvider, FooterComponent, HeaderComponent } from '@/components'
import { configs } from '@/constants'
import { useLoader } from '@/hooks'
import { Store } from '@/store'
import { givenLibrary } from '@/utils/ethers'
import '@/styles/main.scss'

export default function Application({ Component, pageProps }: AppProps) {
  // __STATE <Rect.Hooks>
  const router = useRouter()
  const loader = useLoader()

  // __EFFECTS
  useEffect(() => {
    router.events.on('routeChangeStart', loader.on)
    router.events.on('routeChangeComplete', loader.off)
    router.events.on('routeChangeError', loader.off)
  }, [])

  // __RENDER
  return (
    <>
      <HTMLHead>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{configs.APP_WEB_TITLE}</title>
      </HTMLHead>

      <Web3ReactProvider getLibrary={givenLibrary}>
        <ReduxProvider store={Store}>
          <AppProvider.Authorize />

          <div className='ui--app-wrapper'>
            <HeaderComponent />
            <main className='ui--router-view'>
              <Component {...pageProps} />
            </main>
            <FooterComponent />
          </div>

          <AppProvider.Loader />
          <AppProvider.Dialog />
          <AppProvider.Modal />
          <AppProvider.Notice />
        </ReduxProvider>
      </Web3ReactProvider>
    </>
  )
}
