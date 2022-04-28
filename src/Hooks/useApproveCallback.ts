import { useState, useEffect, useCallback, useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useERC20Contract } from './useContractFactory'
import { useTokenAllowance } from './useTokenAllowance'
import { GAS_PRICE_GWEI } from '@/Constants'
import { Fraction } from '@/Utils'
import { ApproveStatus } from '@/Types'

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

  const contract = useERC20Contract(address)
  const allowance = useTokenAllowance(address, spender)

  // __FUNCTIONS
  const approve = useCallback(async () => {
    if (!account) return void 0

    if (approveStatus !== ApproveStatus.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return void 0
    }

    setApproveStatus(ApproveStatus.PENDING)

    try {
      const gas = await contract.estimateGas.approve(spender, Fraction.BASE)
      const call = await contract.approve(spender, Fraction.BASE, {
        gasLimit: gas.toNumber(),
        gasPrice: GAS_PRICE_GWEI.default
      })
      const resp = await call.wait(call.confirmations)

      setApproveStatus(resp.status ? ApproveStatus.APPROVED : ApproveStatus.NOT_APPROVED)
    } catch (error) {
      setApproveStatus(ApproveStatus.NOT_APPROVED)
      console.error('Failed to approve token', error)
      throw error
    }
  }, [account, address, approveStatus, contract])

  // __EFFECTS
  useEffect(() => {
    if (allowance.isZero()) setApproveStatus(ApproveStatus.NOT_APPROVED)
  }, [allowance])

  // __RETUEN
  return useMemo(() => [approve, approveStatus], [approve, approveStatus])
}
