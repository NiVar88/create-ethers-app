import { useEffect, useRef } from 'react'
import { useIsWindowVisible } from './useIsWindowVisible'
import { dispatch, useAppSelector, appActions, appSelector } from '@/store'
import { simpleRpcProvider } from '@/utils'

export function usePollBlockNumber(refreshTime: number = 12e3) {
  // __STATE <React.Hooks>
  const timer = useRef<any>(null)
  const isWindowVisible = useIsWindowVisible()

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (isWindowVisible) {
      timer.current = setInterval(async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber()
        dispatch(appActions.setBlock(blockNumber))
      }, refreshTime)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [timer, isWindowVisible, refreshTime])
}

export function useBlock() {
  return useAppSelector(appSelector.getBlock)
}
