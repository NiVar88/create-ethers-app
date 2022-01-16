export interface Token {
  id: string
  icon: string
  name: string
  symbol: string
  address: string
  decimals?: number
  description?: string
  native?: boolean
}
