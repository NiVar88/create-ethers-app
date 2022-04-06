import { useCallback } from 'react'

export function useDifferenceTime() {
  // __STATE <React.Hooks>
  const start = Date.now()

  // __RETURN
  return useCallback(
    (digits: number = 3) => {
      const seconds = Date.now() - start

      if (seconds / 1e3 > 60) {
        return `~ ${(seconds / 1e3 / 60).toFixed(digits)}m`
      } else if (seconds / 1e3 > 1) {
        return `~ ${(seconds / 1e3).toFixed(digits)}s`
      } else {
        return `~ ${seconds}ms`
      }
    },
    [start]
  )
}
