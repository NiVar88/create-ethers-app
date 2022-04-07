import { useCallback, useState, useTransition } from 'react'
import { useDifferenceTime } from '@/Hooks'
import { logger, setCookie } from '@/Utils'
import '@Styles/pages/labs.scss'
import { configs } from '@/Constants'
import { BaseService } from '@/Services/base.service'

export default function LabsContainer() {
  // __STATE <React.Hooks>
  const [count, setCount] = useState<number>(0)
  const [isPadding, startTransition] = useTransition()

  const dif = useDifferenceTime()

  // __FUNCTIONS
  const handleClick = useCallback(() => {
    startTransition(() => {
      setCount((prev) => prev + 1)
    })
  }, [])

  const handleCookie = useCallback(() => {
    setCookie(
      configs.APP_AUTH_ACCESS,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY0OTMxODQwMCwiZXhwIjoxNjQ5MTc4MDAwfQ.osHQciT7ZLa9gIxWfsNWGkoOpZJ8N3Ca28sowwmvICg'
    )

    setCookie(
      configs.APP_AUTH_REFRESH,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY0OTMxODQwMCwiZXhwIjoxNjUxMzM4MDAwfQ.H8x_f202waVbDMJoKKhHjisNYfHLHKSI78wpPagGDWE'
    )
  }, [])

  const handleService = useCallback(async () => {
    const r = await BaseService.get('todos/1')
    logger.log(r)
  }, [])

  // __EFFECTS
  logger.log(isPadding, dif())

  // __RENDER
  return (
    <div className='ui--labs'>
      <div className='ui--labs-container'>
        <i style={{ display: 'block', padding: '1rem 0' }}>
          .ui--labs-container: <b>{count}</b>
        </i>

        <div style={{ display: 'grid', gap: '1rem', gridAutoFlow: 'column' }}>
          <button className='btn btn-primary' onClick={handleClick}>
            <span className='text'>button</span>
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
