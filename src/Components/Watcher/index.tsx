import { useEffect } from 'react'
import { useWeb3ReactCore, useEagerConnect, useFetchCurrencyBalance } from '@/Hooks'

export function WatcherContainer() {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const [onEager] = useEagerConnect()
  const [onFetchBalance] = useFetchCurrencyBalance()

  // __EFFECTS
  useEffect(() => {
    onEager(account)
  }, [account, onEager])

  useEffect(() => {
    if (account) {
      onFetchBalance(account)
    }
  }, [account, onFetchBalance])

  // __RETURN
  return null
}
