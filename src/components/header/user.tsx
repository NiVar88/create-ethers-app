import { useCallback, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { NextLink } from '@/components/next-link'
import { dialog, shortAddress } from '@/utils'
import type { User } from '@/types'
import cls from 'classnames'

export interface Props {
  user: User
  disconnect: (redirectTo?: string) => void
}

export function UserComponent({ user, disconnect }: Props) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<boolean>(false)

  // __FUNCTIONS
  const handleDisconnect = useCallback(async () => {
    setState(false)

    const { isConfirmed } = await dialog('Disconnection confirm?', { type: 'confirm' })
    if (isConfirmed) disconnect('/')
  }, [disconnect])

  const handleClose = useCallback(() => {
    setState(false)
  }, [])

  // __EFFECTS
  useClickAway(nodeRef, handleClose, ['click'])

  // __RENDER
  return (
    <div className='ui--header-user' ref={nodeRef}>
      <div className='ui--header-user-avatar' onClick={() => setState(true)}>
        <div className='meta'>
          <strong className='name'>{user.displayName}</strong>
          <small className='address'>{shortAddress(user.address)}</small>
        </div>
        <img className='icon' src={user.avatar} />
      </div>

      <div className={cls('ui--header-user-menu', { active: state })}>
        <div className='ul'>
          <a className='btn btn-link'>
            <span className='icon bi bi-pen'></span>
            <span className='text'>create (Mint)</span>
          </a>

          <NextLink className='btn btn-link' href='/profile' onClick={handleClose}>
            <span className='icon bi bi-person'></span>
            <span className='text'>profile</span>
          </NextLink>

          <NextLink className='btn btn-link' href='/profile/collectables' onClick={handleClose}>
            <span className='icon bi bi-collection'></span>
            <span className='text'>collectables</span>
          </NextLink>

          <hr className='hr' />

          <a className='btn btn-link' onClick={handleDisconnect}>
            <span className='icon red bi bi-box-arrow-right'></span>
            <span className='text'>disconnect</span>
          </a>
        </div>
      </div>
    </div>
  )
}
