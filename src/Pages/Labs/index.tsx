import { useCallback, useState, useTransition } from 'react'
import { useDifferenceTime } from '@/Hooks'
import { logger } from '@/Utils'
import '@Styles/pages/labs.scss'

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

  // __EFFECTS
  logger.log(isPadding, dif())

  // __RENDER
  return (
    <div className='ui--labs'>
      <div className='ui--labs-container'>
        <i style={{ display: 'block', padding: '1rem 0' }}>
          .ui--labs-container: <b>{count}</b>
        </i>

        <button className='btn btn-primary' onClick={handleClick}>
          <span className='text'>button</span>
        </button>
      </div>
    </div>
  )
}
