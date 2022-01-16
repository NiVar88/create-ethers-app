import { DEFAULT_CHAIN_ID } from '@/libs/configs'
import { ChainId } from '@/types'
import { RPCS } from './rpcs'

export enum UseDialog {
  DEMO = '@DIALOG:DEMO'
}

export enum UseModal {
  CONNECT_WALLET = '@MODAL:CONNECT_WALLET',
  ACCOUNT_DETAILS = '@MODAL:ACCOUNT_DETAILS'
}

/**
 * SET Address by current config chain-id,
 *
 * @param {Record} addresses
 */
export function setAddress(addresses: Record<ChainId, string | null>) {
  return addresses[DEFAULT_CHAIN_ID] || ''
}

/**
 * GET Random rpc url.
 *
 * @param {ChainId} chainId
 */
export function getRpcUrl(chainId: ChainId = DEFAULT_CHAIN_ID) {
  const index = Math.floor(Math.random() * RPCS[chainId].length)
  return RPCS[chainId][index]
}
