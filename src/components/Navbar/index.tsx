import { useCallback, useEffect, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, UseModal as Modal } from '@/constants'
import { useAppSelector, userSelector } from '@/store'
import { modal, shortAddress } from '@/utils'

export function NavbarComponent() {
  // __STATE <React.Hooks>
  const { isAuth, profile } = useAppSelector(userSelector.getAll)

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (isAuth) setTimeout(modal.off, 256)
  }, [isAuth])

  // __FUNCTIONS
  const handleMenu = useCallback(() => {
    modal.on(<MenuComponent />, { name: 'navbar-menu', title: 'Main menu' })
  }, [])

  const handleConnect = useCallback(() => {
    if (isAuth) return void 0

    modal.on(Modal.CONNECT_WALLET, { name: 'connect-wallet', title: 'Connect to a wallet' })
  }, [isAuth])

  const handleAccount = useCallback(() => {
    if (!isAuth) return void 0

    modal.on(Modal.ACCOUNT_DETAILS, { name: 'account-details', title: 'Account' })
  }, [isAuth])

  // __RENDER
  return (
    <nav className='ui--navbar'>
      <div className='ui--navbar-container'>
        <div className='ui--navbar-column lf'>
          <div className='ui--navbar-logo'>
            <NavLink className='btn btn-text' to='/' end>
              <span className='text'>text logo</span>
            </NavLink>
          </div>

          <MenuComponent />
        </div>

        <div className='ui--navbar-column rg'>
          <button className='btn btn-primary btn-ellipsis' onClick={handleMenu}>
            <span className='text'>MENU</span>
          </button>

          {profile ? (
            <button className='btn btn-account' onClick={handleAccount}>
              <span className='icon wallet bi bi-wallet2'></span>
              <span className='text'>{shortAddress(profile.uid)}</span>
              <span className='icon arrow bi bi-chevron-down'></span>
            </button>
          ) : (
            <button className='btn btn-primary btn-connect' onClick={handleConnect}>
              <span className='icon bi bi-wallet2'></span>
              <span className='text'>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export function MenuComponent() {
  // __STATE <React.Hooks>
  const state = useMemo(() => Menu.findAll('enable', true), [])

  // __RENDER
  return (
    <div className='ui--navbar-menu'>
      {state.map((record) => (
        <NavLink className='btn btn-menu' to={record.to} end={record.end} key={record.id} onClick={modal.off}>
          <span className='text'>{record.label}</span>
        </NavLink>
      ))}
    </div>
  )
}
