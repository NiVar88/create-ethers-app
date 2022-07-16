import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AvatarEditor, NextLink } from '@/components'
import { useWalletConnection } from '@/hooks'
import { dispatch, userActions, userSelector } from '@/store'
import { dialog, getMediaBlob, shortAddress } from '@/utils'

export function NavigatorComponent() {
  // __STATE <React.Hooks>
  const { disconnect } = useWalletConnection()
  const user = useSelector(userSelector.getProfile)

  // __FUNCTIONS
  const handleAvatarChange = useCallback((dataURL: string) => {
    getMediaBlob(dataURL).then((src) => {
      const action = userActions.setProfile({ avatar: src.url } as any)
      dispatch(action)
    })
  }, [])

  const handleDisconnect = useCallback(async () => {
    const { isConfirmed } = await dialog('Disconnection confirm?', { type: 'confirm' })
    if (isConfirmed) disconnect('/')
  }, [disconnect])

  // __EFFECTS

  // __RENDER
  return (
    <div className='ui--profile-navigator'>
      <div className='rows'>
        <AvatarEditor image={user?.avatar} onChange={handleAvatarChange} />
        <div className='name'>{user?.displayName}</div>
        <div className='address'>{shortAddress(user?.address)}</div>
        {user?.bio && <div className='bio'>{user.bio}</div>}
      </div>

      <div className='rows'>
        <NextLink className='btn btn-link' href='/profile/collectables'>
          <span className='icon bi bi-collection'></span>
          <span className='text'>collectables</span>
        </NextLink>

        <NextLink className='btn btn-link' href='/profile/favorites'>
          <span className='icon bi bi-heart'></span>
          <span className='text'>favorites</span>
        </NextLink>

        <NextLink className='btn btn-link' href='/profile/settings'>
          <span className='icon bi bi-gear'></span>
          <span className='text'>settings</span>
        </NextLink>

        <hr className='hr' />

        <a className='btn btn-link' onClick={handleDisconnect}>
          <span className='icon bi bi-box-arrow-right' style={{ color: 'var(--color-red)' }}></span>
          <span className='text'>disconnect</span>
        </a>
      </div>
    </div>
  )
}
