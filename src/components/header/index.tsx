import { NextLink } from '@/components/next-link'
import { useProfile, useWalletConnection } from '@/hooks'
import { UserComponent } from './user'

export function HeaderComponent() {
  // __STATE <React.Hooks>
  const { modal, disconnect } = useWalletConnection()
  const user = useProfile()

  // __RENDER
  return (
    <header className='ui--header'>
      <div className='ui--header-container'>
        <div className='ui--header-context ltr'>
          <NextLink className='btn btn-logo' href='/'>
            <img className='logo' src='/static/images/play-button.png' />
            <span className='text'>alice</span>
          </NextLink>

          <div className='ui--header-menu'>
            <NextLink className='btn btn-menu' href='/'>
              <span className='text'>home</span>
            </NextLink>

            <NextLink className='btn btn-menu' href='/labs'>
              <span className='text'>labs</span>
            </NextLink>
          </div>
        </div>

        <div className='ui--header-context rtl' suppressHydrationWarning>
          {user ? (
            <UserComponent user={user} disconnect={disconnect} />
          ) : (
            <button className='btn btn-primary btn-connect' onClick={modal}>
              <span className='text'>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
