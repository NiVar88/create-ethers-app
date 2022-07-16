import { useEffect, useState } from 'react'
import { configs } from '@/constants'

export function useRendered() {
  // __STATE <React.Hooks>
  const [state, setState] = useState<boolean>(false)

  // __EFFECTS
  useEffect(() => {
    if (configs.isBrowser) setState(true)
  }, [])

  // __RETURN
  return state
}
