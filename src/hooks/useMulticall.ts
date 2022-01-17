import { useCallback, useMemo } from 'react'
import { Addresses } from '@/constants'
import { MulticallContract } from '@/contracts'
import { Interface } from '@/libs/web3'

export function useMulticall(contractAbi: any[]) {
  // __STATE <React.Hooks>
  const { methods: multicallContract } = MulticallContract.build(Addresses.multicall)
  const multicallInterface = new Interface(contractAbi)

  // __FUNCTIONS
  const handleCalls = useCallback(async (calls: Call[]) => {
    try {
      const callData = calls.map(({ address, method, params }) => ({
        target: address,
        callData: multicallInterface.encodeFunctionData(method, params)
      }))

      const { returnData } = await multicallContract.aggregate(callData).call()

      return returnData.map((data, index) => ({
        address: calls[index].address,
        value: multicallInterface.decodeFunctionResult(calls[index].method, data)[0]
      }))
    } catch (error) {
      console.error('`useMulticall`', error)
    }
  }, [])

  // __RETURN
  return useMemo(() => handleCalls, [handleCalls])
}

export interface Call {
  /**
   * Address of the contract
   */
  address: string

  /**
   * Function name on the contract (example: balanceOf)
   */
  method: string

  /**
   * Function params
   */
  params?: any[]
}
