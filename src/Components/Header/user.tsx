import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useClickAway } from 'react-use'
import { useAuth, useModal } from '@/Hooks'
import { userSelector } from '@/Store'
import { shortAddress } from '@/Utils'
import { IModal as Modal, User } from '@/Types'
import cls from 'classnames'

export function UserComponent() {
  // __STATE <React.Hooks>
  const user = useSelector(userSelector.getProfile)
  const modal = useModal({ className: 'sign-in' })

  // __FUNCTIONS
  const handleConnect = useCallback(() => {
    if (user) return void 0

    modal.on(Modal.CONNECT_WALLET)
  }, [user, modal])

  // __EFFECTS
  useEffect(() => {
    if (user) setTimeout(modal.off, 256)
  }, [user, modal])

  // __RENDER
  return (
    <div className='ui--header-user'>
      {user ? (
        <AccountComponent user={user} />
      ) : (
        <button className='btn btn-primary btn-connect' onClick={handleConnect}>
          <span className='text'>sign-in</span>
        </button>
      )}
    </div>
  )
}

export function AccountComponent({ user }: { user: User }) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<boolean>(false)
  const { signout } = useAuth()

  // __EFFECTS
  useClickAway(nodeRef, () => setState(false), ['click'])

  // __RENDER
  return (
    <div className='ui--header-account' ref={nodeRef}>
      <div className='ui--header-account-avatar' onClick={() => setState(true)}>
        <img className='icon' src={user.avatar} />
        <span className='text'>{shortAddress(user.address)}</span>
      </div>

      <div className={cls('ui--header-account-menu', { active: state })}>
        <div className='ul'>
          <a className='btn btn-link'>
            <span className='icon bi bi-pen'></span>
            <span className='text'>create (Mint)</span>
          </a>

          <a className='btn btn-link'>
            <span className='icon bi bi-person'></span>
            <span className='text'>profile</span>
          </a>

          <a className='btn btn-link'>
            <span className='icon bi bi-collection'></span>
            <span className='text'>collectables</span>
          </a>

          <a className='btn btn-link' onClick={signout}>
            <span className='icon bi bi-box-arrow-right' style={{ color: 'var(--color-red)' }}></span>
            <span className='text'>disconnect</span>
          </a>
        </div>
      </div>
    </div>
  )
}
