import { useCallback, useEffect, useMemo, useState } from 'react'
import { useERC20Contract } from './useContractFactory'
import { useUserProfile } from '@/Hooks'
import { Fraction } from '@/Utils'

/**
 * GET: Token Allowance.
 *
 * @param {string} address Contract Address
 * @param {string} spender
 */
export function useTokenAllowance(address: string, spender: string) {
  // __STATE <React.Hooks>
  const [state, setState] = useState<Fraction>(Fraction.ZERO)

  const user = useUserProfile()
  const contract = useERC20Contract(address)

  // __FUNCTIONS
  const getAllowance = useCallback(async () => {
    if (!user?.address) return void 0

    try {
      const resp = await contract.allowance(user.address, spender)
      setState(resp)
    } catch (error) {
      console.error('`useTokenAllowance`', error)
    }
  }, [user, address, contract, spender])

  // __EFFECTS
  useEffect(() => {
    if (user?.address) getAllowance()
  }, [user, address])

  // __RETURN
  return useMemo(() => state, [user, state])
}
