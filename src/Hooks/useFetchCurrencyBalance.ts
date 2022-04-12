import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { tokens } from '@/Constants'
import { ERC20_ABI } from '@/Contracts'
import { useMulticall } from '@/Hooks'
import { userActions } from '@/Store'
import { vy, differenceTime, Fraction, getBNBBalance } from '@/Utils'
import { Token } from '@/Types'

export function useFetchCurrencyBalance(refreshTimeMs: number = 2e5) {
  // __STATE <React.Hooks>
  const dispatch = useDispatch()
  const multiCalls = useMulticall(ERC20_ABI)

  // __FUNCTIONS
  const func = useCallback(
    async (account: string, currencies: Token[] = tokens) => {
      console.log(vy(), '🚀 Currency Balance Fetching...')

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

        console.log(vy(), '✅ Currency Balance Updated.', t())

        setTimeout(() => func(account), refreshTimeMs)
      } else {
        console.warn(vy(), '❌ Currency Balance Fetch Failed.', t())
      }
    },
    [dispatch, refreshTimeMs]
  )

  // __RETURN
  return useMemo(() => [func], [func])
}
