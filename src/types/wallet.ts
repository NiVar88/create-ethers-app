import { Connectors } from '@/constants'

export interface Wallet {
  connector: Connectors
  name: string
  icon: string
  description: string
  recommended?: boolean
  primary?: true
  mobile?: true
  mobileOnly?: true
}
