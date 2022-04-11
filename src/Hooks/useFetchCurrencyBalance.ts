import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { tokens } from '@/Constants'
import { ERC20_ABI } from '@/Contracts'
import { useMulticall } from '@/Hooks'
import { userActions } from '@/Collects'
import { differenceTime, Fraction, getBNBBalance } from '@/Utils'
import { Token } from '@/Types'

export function useFetchCurrencyBalance(refreshTimeMs: number = 1e5) {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const dispatch = useDispatch()
  const multiCalls = useMulticall(ERC20_ABI)

  // __FUNCTIONS
  const handleFetch = useCallback(
    async (account: string, currencies: Token[] = tokens) => {
      console.log('🚀 Currency Balance Fetching...')

      const t = differenceTime()
      const ignore = ['BNB', 'BTCB']
      const results = await multiCalls(
        currencies
          .filter(({ address, symbol }) => !!address && ignore.indexOf(symbol) < 0)
          .map((currency) => ({
            address: currency.address,
            method: 'balanceOf',
            params: [account]
          }))
      )

      if (results) {
        const BNB = await getBNBBalance(account)
        const payload = tokens.map(({ address, symbol }) => {
          const find = results.findOne('address', address)
          let value = find?.value.toString() || '0'

          if (symbol === 'BNB') value = BNB

          return { symbol, value: Fraction.from(value).dividedBy(Fraction.BASE).toString() }
        })

        dispatch(userActions.setCurrencyBalance(payload))

        console.log('✅ Currency Balance Updated.', t())
      } else {
        console.warn('❌ Currency Balance Fetch Failed.', t())
      }
    },
    [dispatch]
  )

  // __EFFECTS
  useEffect(() => {
    if (account && refreshTimeMs) {
      handleFetch(account)
      setTimeout(() => handleFetch(account), refreshTimeMs)
    }
  }, [account, refreshTimeMs])

  // __RETURN
  return null
}
