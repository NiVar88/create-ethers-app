import { useCallback, useState, useTransition } from 'react'
import { configs } from '@/Constants'
import { useAuth } from '@/Hooks'
import { BaseService } from '@/Services/base.service'
import { setCookie } from '@/Utils'
import { Connectors } from '@/Types'
import JWT from 'jsonwebtoken'
import '@Styles/pages/labs.scss'

export default function LabsContainer() {
  // __STATE <React.Hooks>
  const [count, setCount] = useState<number>(0)
  const [isPadding, startTransition] = useTransition()

  const { signin } = useAuth()

  // __FUNCTIONS
  const handleClick = useCallback(() => {
    startTransition(() => {
      setCount((prev) => prev + 1)
    })
  }, [])

  const handleCookie = useCallback(() => {
    setCookie(configs.APP_AUTH_ACCESS, JWT.sign({ uid: 1 }, 'secret', { expiresIn: '1h' }))
    setCookie(configs.APP_AUTH_REFRESH, JWT.sign({ uid: 1 }, 'secret', { expiresIn: '7 days' }))
  }, [])

  const handleService = useCallback(async () => {
    const r = await BaseService.get('todos/1')
    console.log(r)
  }, [])

  // __EFFECTS
  // console.log(isPadding)

  // __RENDER
  return (
    <div className='ui--labs'>
      <div className='ui--labs-container'>
        <i style={{ display: 'block', padding: '1rem 0' }}>
          .ui--labs-container: <b>{count}</b>
        </i>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(5, auto)' }}>
          <button className='btn btn-primary' onClick={handleClick}>
            <span className='text'>button</span>
          </button>

          <button className='btn btn-primary' onClick={() => signin(Connectors.Injected)}>
            <span className='text'>sign-in</span>
          </button>

          <button className='btn btn-primary' onClick={handleCookie}>
            <span className='text'>set cookies</span>
          </button>

          <button className='btn btn-primary' onClick={handleService}>
            <span className='text'>service</span>
          </button>
        </div>
      </div>
    </div>
  )
}
