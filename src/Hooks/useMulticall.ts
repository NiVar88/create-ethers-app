import { useCallback, useMemo } from 'react'
import { Addresses } from '@/Constants'
import { MulticallContract } from '@/Contracts'
import { Interface } from '@/Utils/web3'

export function useMulticall(contractAbi: any[]): Callback {
  // __STATE <React.Hooks>
  const multicallContract = useMemo(() => MulticallContract.build(Addresses.multicall), [])
  const multicallInterface = useMemo(() => new Interface(contractAbi), [])

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

export interface ReturnData {
  address: string
  value: any
}

export type Callback = (calls: Call[]) => Promise<ReturnData[] | void>
