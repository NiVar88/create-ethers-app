import { GivenProvider } from '@/libs/web3'

export async function getBNBBalance(account: string) {
  const provider = GivenProvider()
  return await provider.getBalance(account)
}
