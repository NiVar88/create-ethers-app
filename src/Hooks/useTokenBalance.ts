import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { ERC20Contract } from '@/contracts'
import { Fraction } from '@/utils'
import { Token } from '@/types'

/**
 * GET: Token Balance.
 *
 * @param {string} address
 * @param {string} spender
 */
export function useTokenBalance({ address }: Token) {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const [state, setState] = useState<Fraction>(Fraction.ZERO)

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (account) getBalance()
  }, [account, address])

  // __FUNCTIONS
  const getBalance = useCallback(async () => {
    if (!account) return void 0

    try {
      const { methods: contract } = ERC20Contract.build(address)
      const response = await contract.balanceOf(account).call()
      const vaule = Fraction.from(response)

      setState(vaule)
    } catch (error) {
      console.error('`useTokenBalance`', error)
    }
  }, [account, address])

  // __RETURN
  return useMemo(() => state, [account, state])
}
