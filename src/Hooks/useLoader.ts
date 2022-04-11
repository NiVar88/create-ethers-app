import { useCallback, useEffect, useMemo } from 'react'
import { dispatch, appActions } from '@/Collects'

export function useLoader(autoOff: boolean = true, delay: number = 1e3) {
  // __FUNCTIONS
  const handleAction = useCallback((active: boolean, delay: number = 5e2) => {
    const action = appActions.setLoader(active)

    if (active) {
      dispatch(action)
    } else {
      setTimeout(() => {
        dispatch(action)
      }, delay)
    }
  }, [])

  // __EFFECTS
  useEffect(() => {
    let timeoutId: any = null

    if (autoOff) {
      timeoutId = setTimeout(() => {
        const action = appActions.setLoader(false)
        dispatch(action)
      }, delay)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [autoOff, delay])

  // __RETURN
  return useMemo(
    () => ({
      on: () => handleAction(true),
      off: (delay?: number) => handleAction(false, delay)
    }),
    [handleAction]
  )
}
