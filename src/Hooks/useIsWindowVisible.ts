import { useEffect, useState } from 'react'

const VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document
const isWindowVisible = VISIBILITY_STATE_SUPPORTED ? document.visibilityState === 'visible' : true

/**
 * Returns whether the window is currently visible to the user.
 */
export function useIsWindowVisible() {
  // __STATE <React.Hooks>
  const [isVisible, setIsVisible] = useState(isWindowVisible)

  // __EFFECTS
  useEffect(() => {
    function listener() {
      if (!VISIBILITY_STATE_SUPPORTED) return void 0
      setIsVisible(isWindowVisible)
    }

    addEventListener('visibilitychange', listener)
    return () => removeEventListener('visibilitychange', listener)
  }, [setIsVisible])

  // __RETURN
  return isVisible
}
