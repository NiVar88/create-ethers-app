import { useCallback, useMemo } from 'react'
import { Fragment, Interface, JsonFragment } from '@ethersproject/abi'
import { Addresses } from '@/constants'
import { useMulticallContract } from '@/hooks'

export function useMulticall(contractAbi: string | readonly (string | Fragment | JsonFragment)[]): Callback {
  // __STATE <React.Hooks>
  const contract = useMulticallContract(Addresses.multicall)
  const contractInterface = useMemo(() => new Interface(contractAbi), [])

  // __RETURN
  return useCallback(
    async (calls: Call[]) => {
      try {
        const resp = await contract?.aggregate(
          calls.map(({ address, method, params }) => ({
            target: address,
            callData: contractInterface.encodeFunctionData(method, params)
          }))
        )

        return resp.returnData.map((data, index) => ({
          address: calls[index].address,
          value: contractInterface.decodeFunctionResult(calls[index].method, data)[0]
        }))
      } catch (error) {
        console.error('`useMulticall`', error)
      }
    },
    [contract, contractInterface]
  )
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
