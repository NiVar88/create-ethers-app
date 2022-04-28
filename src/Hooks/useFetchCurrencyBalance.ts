import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { tokens } from '@/Constants'
import { ERC20_ABI } from '@/Contracts'
import { useMulticall } from '@/Hooks'
import { userActions } from '@/Store'
import { vy, differenceTime, Fraction } from '@/Utils'
import type { Token } from '@/Types'

export function useFetchCurrencyBalance() {
  // __STATE <React.Hooks>
  const dispatch = useDispatch()
  const multiCall = useMulticall(ERC20_ABI)

  // __FUNCTIONS
  const func = useCallback(
    async (account: string, currencies: Token[] = tokens) => {
      console.log(vy(), '🚀 Currency Balance Fetching...')

      const t = differenceTime()
      const ignore = ['BNB', 'BTCB']
      const results = await multiCall(
        currencies
          .filter(({ address, symbol }) => !!address && ignore.indexOf(symbol) < 0)
          .map((currency) => ({
            address: currency.address,
            method: 'balanceOf',
            params: [account]
          }))
      )

      if (results) {
        const payload = tokens.map(({ address, symbol }) => {
          const find = results.findOne('address', address)
          let value = find?.value || '0'

          if (symbol === 'BNB') value = '0'

          return { symbol, value: Fraction.formatUnits(value) }
        })

        dispatch(userActions.setCurrencyBalance(payload))

        console.log(vy(), '✅ Currency Balance Updated.', t())
      } else {
        console.warn(vy(), '❌ Currency Balance Fetch Failed.', t())
      }
    },
    [multiCall]
  )

  // __RETURN
  return useMemo(() => [func], [func])
}
