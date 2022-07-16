import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Theme } from '@/constants'
import { appActions } from '@/store'

export function useTheme() {
  // __STATE <React.Hooks>
  const dispatch = useDispatch()

  // __FUNCTIONS
  const get = useCallback(() => {
    return document.documentElement.getAttribute('theme') as Theme
  }, [])

  const set = useCallback((theme: Theme) => {
    document.documentElement.setAttribute('theme', theme)
    dispatch(appActions.setTheme(theme))
  }, [])

  const remove = useCallback(() => {
    document.documentElement.removeAttribute('theme')
    dispatch(appActions.setTheme(Theme.DEFAULT))
  }, [])

  // __EFFECTS
  useEffect(() => {
    const currentTheme = get() || Theme.DEFAULT
    set(currentTheme)
  }, [])

  // __RETURN
  return useMemo(() => {
    return {
      get,
      set,
      remove
    }
  }, [get, set, remove])
}
