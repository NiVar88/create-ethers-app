import { useState, useEffect, useCallback, useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useTokenAllowance } from './useTokenAllowance'
import { ERC20Contract } from '@/contracts'
import { Fraction } from '@/utils'
import { ApproveStatus } from '@/types'

export type ApproveFunction = () => Promise<void>
export type ApproveCallback = [ApproveFunction, ApproveStatus]

/**
 * USE: Approve Callback.
 *
 * @param {string} address
 * @param {string} spender
 */
export function useApproveCallback(address: string, spender: string): ApproveCallback {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const [approveStatus, setApproveStatus] = useState<ApproveStatus>(ApproveStatus.APPROVED)

  const allowance = useTokenAllowance(address, spender)

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (allowance.isZero() || allowance.isNaN()) setApproveStatus(ApproveStatus.NOT_APPROVED)
  }, [allowance])

  // __FUNCTIONS
  const approve = useCallback(async (): Promise<void> => {
    if (!account) return void 0

    if (approveStatus !== ApproveStatus.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return void 0
    }

    setApproveStatus(ApproveStatus.PENDING)

    try {
      const contract = ERC20Contract.build(address)
      const func = contract.methods.approve(spender, Fraction.BASE.toString(10))

      const gas = await func.estimateGas({ from: account })
      const response = await func.send({ from: account, gas })

      setApproveStatus(response.status ? ApproveStatus.APPROVED : ApproveStatus.NOT_APPROVED)
    } catch (error) {
      setApproveStatus(ApproveStatus.NOT_APPROVED)
      console.error('Failed to approve token', error)
      throw error
    }
  }, [account, address, approveStatus])

  // __RETUEN
  return useMemo(() => [approve, approveStatus], [approve, approveStatus])
}
