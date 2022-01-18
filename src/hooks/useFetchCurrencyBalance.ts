import { useCallback, useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { tokens } from '@/constants'
import { ERC20_ABI } from '@/contracts'
import { useMulticall } from '@/hooks'
import { useAppDispatch, userActions } from '@/store'
import { differenceTiming, Fraction, getBNBBalance, logger } from '@/utils'

export function useFetchCurrencyBalance(refreshTime: number = 1e5) {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const dispatch = useAppDispatch()
  const multiCalls = useMulticall(ERC20_ABI)

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (account) handleFetch(account)
  }, [account])

  // __FUNCTIONS
  const handleFetch = useCallback(
    async (account: string) => {
      logger.log('🚀 Currency Balance Fetching...')

      const timing = differenceTiming()
      const ignore = ['BNB', 'BTCB']
      const currencies = tokens.filter(({ address, symbol }) => !!address && ignore.indexOf(symbol) < 0)
      const results = await multiCalls(
        currencies.map((currency) => ({
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

        logger.log('✅ Currency Balance Updated.', timing())
        setTimeout(() => handleFetch(account), refreshTime)
      }
    },
    [dispatch]
  )

  // __RETURN
  return null
}
