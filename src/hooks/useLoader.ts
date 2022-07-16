import { useCallback, useMemo } from 'react'
import { dispatch, appActions } from '@/store'

export function useLoader() {
  // __FUNCTIONS
  const handleAction = useCallback((active: boolean, delay: number = 512) => {
    const action = appActions.setLoader(active)

    if (active) {
      dispatch(action)
    } else {
      setTimeout(() => {
        dispatch(action)
      }, delay)
    }
  }, [])

  // __RETURN
  return useMemo(() => {
    return {
      on: () => handleAction(true),
      off: (delay?: number) => handleAction(false, delay)
    }
  }, [handleAction])
}
